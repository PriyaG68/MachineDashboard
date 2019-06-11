var express = require('express');
var app = express();
var sql= require('./db');
app.get('/', function (req, res) {
   
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

var server = app.listen(5003, function () {
    console.log('Server is running at 5003..');
});