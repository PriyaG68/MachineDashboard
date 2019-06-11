var express = require('express');
var app = express();
var sql= require('./db');
app.get('/', function (req, res) {
   
        // create Request object
        var request = new sql.Request(),machineId = req.query.machineId,
        command;
        if(machineId && machineId>0){
        command='SELECT sm.[StateName],ms.Occurance from StateMaster sm join (SELECT [State],Count([State]) [Occurance] from MachineState WHERE MachineId='+ machineId+' group by [State])as ms on sm.Id = ms.[State]';
        }
        else{
            command='SELECT sm.[StateName],ms.Occurance from StateMaster sm join (SELECT [State],Count([State]) [Occurance] from MachineState group by [State])as ms on sm.Id = ms.[State]';       
        }
   //console.log(command);    
   console.log('req.query.machineId:'+machineId);    
        // query to the database and get the records
        request.query(command, function (err, recordset) {
            
            if (err) console.log(err)
			res.send(recordset.recordset);           
            // send records as a response			
        });
});

var server = app.listen(5000, function () {
    console.log('Server is running at 5000..');
});