var express = require('express');
var app = express();
var sql= require('./db');
var rn = require('random-number');
var options = {
  min:  -1000
, max:  1000
, integer: true
}
var num = rn(options);

var state= 1;
if(num%2==0)
{state = 2;}
else if (num%3 ==0)
{state = 3;}
app.get('/', function (req, res) {
   
        // create Request object
        var request = new sql.Request(),
		command='INSERT INTO MachineState([State]) VALUES('+state+')';          
        // query to the database and get the records
        request.query(command, function (err, recordset) {
            
            if (err) console.log(err)
			res.send(num+'SUCCESS:'+state);           
            // send records as a response			
        });
});

var server = app.listen(5001, function () {
    console.log('Insert command Server is running..');
});