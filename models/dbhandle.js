'use strict';

const mysql = require('mysql');

const connectionHandler = mysql.createConnection( 
    {
        database : 'lazyQL',
        host : 'localhost',
        user : 'root',
        password : 'password'
    } );

function createDatabase(databaseName, msgObject)
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
                if(err)
                {
                    msgObject.text = 'Try a different name, this exists.';
                    console.log('Name already exists.');
                    console.log(msgObject);
                }
                else
                {
                    console.log('Database created');
                    msgObject.text = 'Perfect';

                    let useDB = `use lazyQL;`;
                    let updateOurDatabase = `insert into List (Names) values ('${databaseName}');`;
                    connectionHandler.query(useDB, 
                                    (err, result) => { 
                                                        if (err) console.log('Syntax Error');
                                                        else console.log('Upating lazyQL database...');
                                                     } );
                    connectionHandler.query(updateOurDatabase, 
                                    (err, result) => { 
                                                        if (err) console.log('Syntax Error');
                                                        else console.log('lazQL database updated.');
                                                     } );

                    console.log(msgObject);                        
                }
            } );
        }
        else
        {
            msgObject.text = 'Invalid name';
            console.log('Invalid name for a database');
            console.log(msgObject);
        }
    } );
}

function getDatabasesList(namesList, tablesList)
{

            let useDB = `use lazyQL;`;   
            let query = `select * from List`;
            connectionHandler.query(useDB, 
                (err, result) => { 
                                    if (err) console.log('Syntax Error');
                                    else console.log('Fetching list from lazyQL database...');
                                 } );  
            connectionHandler.query(query, 
                (err, result) => { 
                                    if (err) console.log('Syntax Error');
                                    else
                                    {
                                        for(let i=0; i<result.length; i++)
                                        {
                                            namesList[i]=result[i].Names;
                                        }
                                    }              
                                 } );
                                 
}


function createTable(information)
{
    //clone the information except the first two keys
    let {DB_NAME, Table_Name, ...cloneObject} = information;

    let useDB = `use ${information.DB_NAME};`;


    information.Table_Name = information.Table_Name.slice(1, information.Table_Name.length);

    //string to create table
    let create = `create table ${information.Table_Name} ( `;

    let objectSize = Object.keys(cloneObject).length;
    let ctr = 0;
    for(let i in cloneObject)
    {
        create+=`${information[i][0]} ${information[i][1]}`;
        ctr++;
        if(ctr!=objectSize) create+=', ';
    }
    create+=' );';

    //SQL queries
    connectionHandler.query(useDB, 
        (err, result) => { 
                            if (err) console.log('Syntax Error');
                            else console.log(`using ${information.DB_NAME} database`);
                         } );

    connectionHandler.query(create, 
        (err, result) => {
                            console.log(create);    
                            if(err) console.log(err.message);
                            else console.log(`${information.Table_Name} table is created`);
                         } );
}


module.exports = { createDatabase : createDatabase, getList : getDatabasesList, createTable : createTable };
