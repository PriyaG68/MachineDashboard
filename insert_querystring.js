var express = require('express');
var app = express();
var sql= require('./db');
app.get('/', function (req, res) {
   console.log('Inserted State:'+req.query.state+'name:'+req.query.name+'MachineId:'+req.query.machineId);
		
        // create Request object
        var request = new sql.Request()
		, employeeName = req.query.name
		 ,command,machineId=req.query.machineId;
if(employeeName!=""){
	command = "INSERT INTO MachineState([State],[EmployeeName],[MachineId]) VALUES("+req.query.state+",'"+employeeName+"',"+machineId+")";
}		 
else{
	command = "INSERT INTO MachineState([State],[MachineId]) VALUES("+req.query.state+","+machineId+")";
}
   console.log(command);      // query to the database and get the records
         request.query(command, function (err, recordset) {
            
             if (err) console.log(err)
			 res.send('SUCCESS:'+req.query.state);           
             // send records as a response			
         });
});
// app.post('/query',function(req,res){
	        // var body='',POST;
            // req.on('data', function (data) {
                // body +=data;
            // });
            // req.on('end',function(){
                // POST =  qs.parse(body);
                // console.log(POST);
            // });
			// res.send('query'+POST);
// });
var server = app.listen(5002, function () {
    console.log('Insert command Server is running..');
});