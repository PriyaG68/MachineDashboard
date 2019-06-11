var express = require('express');
var app = express();
var sql= require('./db');

app.get('/excel',function(req,res){
    var nodeExcel=require('excel-export');
    var dateFormat = require('dateformat');
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
var server = app.listen(5005, function () {
    console.log('Server is running at 5005..');
});