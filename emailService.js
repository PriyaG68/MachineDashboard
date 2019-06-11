var express = require('express');
var app = express();
var sql= require('./db');
app.get('/', function (req, res) {
   console.log('Inserted State:'+req.query.state+'name:'+req.query.name);
		
        // create Request object
        var request = new sql.Request()
		, employeeName = req.query.name
		 ,command;
if(employeeName!=""){
	command = "INSERT INTO MachineState([State],[EmployeeName]) VALUES("+req.query.state+",'"+employeeName+"')";
}		 
else{
	command = 'INSERT INTO MachineState([State]) VALUES('+req.query.state+')';
}
   console.log(command);      // query to the database and get the records
         request.query(command, function (err, recordset) {
            
             if (err) console.log(err)
			 res.send('SUCCESS:'+req.query.state);           
             // send records as a response			
         });
});
// SELECT *
// FROM
// MachineState WHERE StateChangedOn >=DATEADD(MINUTE,-30,'2019-01-21 20:39:10.993')
// AND StateChangedOn < '2019-01-21 20:39:10.993' AND [State] IN(SELECT Id from StateMaster WHERE StateName != 'OFF')
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