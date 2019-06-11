var express = require('express');
var app = express();
var sql= require('./db');
app.get('/', function (req, res) {
   console.log('Inserted Machine: name:'+req.query.name+'MachineId:'+req.query.spec);
		
        // create Request object
        var request = new sql.Request()
		, name = req.query.name
		 ,command,spec=req.query.spec;
	command = "INSERT INTO Machines([MachineName],[Specifications]) VALUES('"+name+"','"+spec+"')";
   console.log(command);      // query to the database and get the records
         request.query(command, function (err, recordset) {
            
             if (err) console.log(err)
			 res.send('SUCCESS:'+req.query.state);           
             // send records as a response			
         });
});
var server = app.listen(5004, function () {
    console.log('Insert Machine Server is running at 5004..');
});