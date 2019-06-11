var express = require('express');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var sql= require('./db');
app.get('/chartdata', function (req, res) {
   
        // create Request object
        var request = new sql.Request(),machineId = req.query.machineId,
        command;
        if(machineId && machineId>0){
        command='SELECT sm.[StateName],ms.Occurance,sm.Color from StateMaster sm join (SELECT [State],Count([State]) [Occurance] from MachineState WHERE MachineId='+ machineId+' group by [State])as ms on sm.Id = ms.[State]';
        }
        else{
            command='SELECT sm.[StateName],ms.Occurance,sm.Color from StateMaster sm join (SELECT [State],Count([State]) [Occurance] from MachineState group by [State])as ms on sm.Id = ms.[State]';       
        }
   //console.log(command);    
   //console.log('req.query.machineId:'+machineId);    
        // query to the database and get the records
        request.query(command, function (err, recordset) {
            
            if (err) console.log(err)
			res.send(recordset.recordset);           
            // send records as a response			
        });
});
app.get('/GetMachineDetails', function (req, res) {
   
    // config for your database
        var request = new sql.Request(),
		command='SELECT [MachineId],[MachineName],[Specifications] FROM Machines WHERE IsActive = 1';
           
        // query to the database and get the records
        request.query(command, function (err, recordset) {
            
            if (err) console.log(err)
			res.send(recordset.recordset);           
            // send records as a response			
        });
});
app.post('/InsertStateDetails', function (req, res) {
    console.log('Inserted State:'+req.body.state+'name:'+req.body.name+'MachineId:'+req.body.machineId);
         
         // create Request object
         var request = new sql.Request()
         , employeeName = req.body.name,state=req.body.state
          ,command,machineId=req.body.machineId;
 if(employeeName!=""){
     command = "INSERT INTO MachineState([State],[EmployeeName],[MachineId]) VALUES("+state+",'"+employeeName+"',"+machineId+")";
 }		 
 else{
     command = "INSERT INTO MachineState([State],[MachineId]) VALUES("+state+","+machineId+")";
 }
    console.log(command);      // query to the database and get the records
          request.query(command, function (err, recordset) {
             
              if (err) console.log(err)
              res.send('SUCCESS:'+req.body.state);           
              // send records as a response			
          });
 });
 app.post('/InsertMachineDetails', function (req, res) {
    console.log('Inserted Machine: name:'+req.body.name+'MachineId:'+req.body.spec);
         
         // create Request object
         var request = new sql.Request()
         , name = req.body.name
          ,command,spec=req.body.spec;
     command = "INSERT INTO Machines([MachineName],[Specifications]) VALUES('"+name+"','"+spec+"')";
    console.log(command);      // query to the database and get the records
          request.query(command, function (err, recordset) {
             
              if (err) console.log(err)
              res.send('SUCCESS:'+req.body.name);           
              // send records as a response			
          });
 });
 app.get('/excel',function(req,res){
    var nodeExcel=require('excel-export');
    var conf={}
    conf.cols=[{
            caption:'StateChangedOn',
            type:'Date',
            width:3
        },
        {
            caption:'State Name',
            type:'string',
            width:50
        },
        {
            caption:'Employee Name',
            type:'string',
            width:15
        },
        {
            caption:'Machine Name',
            type:'string',
            width:15
        }
        ];
        var request = new sql.Request(),command;
        command="SELECT FORMAT(StateChangedOn,'dd/MM/yyyy hh\.mm\.ss') StateChangedOn,StateName,EmployeeName,MachineName FROM  MachineState ms JOIN StateMaster sm on ms.State = sm.Id JOIN Machines m on ms.MachineId = m.MachineId AND m.IsActive = 1";       
   //console.log(command);    
   console.log('Export content:');    
        // query to the database and get the records
        request.query(command, function (err, recordset) {
            
            if (err) console.log(err);
            var arr=[],job,a,rows=recordset.recordset;
            console.log(rows.length);
            for(i=0;i<rows.length;i++){
                a=[rows[i].StateChangedOn,rows[i].StateName,rows[i].EmployeeName,rows[i].MachineName];
                arr.push(a);
                }
                conf.rows=arr;
    var result=nodeExcel.execute(conf);
    res.setHeader('Content-Type','application/vnd.openxmlformates');
    res.setHeader("Content-Disposition","attachment;filename="+"export.xlsx");
    res.end(result,'binary');
		//	res.send(recordset.recordset);           
            // send records as a response		
    });
});

app.post('/login',function(req,res){
    //var user_name=req.body.user;
    //var password=req.body.password;
    console.log("User name = ");//+user_name+", password is "+password);
    res.end("yes");
  });
var server = app.listen(6868, function () {
    console.log('Server is running at 6868..');
});