const mysql = require('mysql');

const connectionHandler = mysql.createConnection( 
    {
        database : 'lazyQL',
        host : 'localhost',
        user : 'root',
        password : 'password'
    } );

function createDatabase(databaseName)
{
    connectionHandler.connect(function(err)
    {
        if(err) throw err;

        console.log('In connection with MySQL...');

        let dbQuery=`create database ${databaseName}`;

        connectionHandler.query(dbQuery, function(err, result) 
        {
            if(err)
            {
                console.log('Error in creating the database.');
            }
            else 
            {
                console.log('Database created.');
            }
        } );
    
    } );
}

module.exports = { createDatabase : createDatabase };