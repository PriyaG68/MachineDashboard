var sql = require("mssql");
    // config for your database
    var config = {
        user: 'sa',
        password: 'password-1',
        server: 'DELL', 
        database: 'Zero' 
    };

    // connect to your database
 var connection=   sql.connect(config, function (err) {
    
        if (err) console.log(err);
});
module.exports = sql;