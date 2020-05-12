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
    //removing trailing whitespaces
    databaseName = databaseName.replace(/\s+$/, '');

    //regular expression for a database name
    let regex = /^[0-9a-zA-Z$_]+$/g;

    //validate
    let nameIsValid = regex.test(databaseName);

    connectionHandler.connect(function(err)
    {
        if(nameIsValid)
        {
            console.log('In connection with MySQL...');
            let dbQuery=`create database ${databaseName}`;
            connectionHandler.query(dbQuery, function(err, result) 
            {
                if(err) console.log('Name already exists.');
                else console.log('Database created.');
            } );
        }
        else console.log('Invalid name for a database');
    } );
}

module.exports = { createDatabase : createDatabase };