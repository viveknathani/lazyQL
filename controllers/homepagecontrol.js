'use strict';

const databaseHandler = require('../models/dbhandle');
const fileGenerator = require('../scripts/generate');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app)
{
    app.get('/', function(req, res)
    {
        let text = ' ';
        let namesList=[];
        let tablesList=[100];
        for(let i = 0; i < tablesList.length; i++)
        {
            tablesList[i]=new Array();
        }
        databaseHandler.getList(namesList);
        setTimeout(function()
                    {   
                        setTimeout(function()
                        {
                            databaseHandler.getTables(namesList, tablesList);
                        }, 50);
                    }, 100); 
        setTimeout(function()
                    {
                        res.render('home', {name:text, dbnames:namesList, Tables:tablesList} );
                    }, 200);            
    } );

    app.get('/:dbname/:tablename', urlencodedParser, function(req, res) 
    {
        let rowsList=[]
        let columns=[]
        databaseHandler.fetchTables(req.params.dbname, req.params.tablename, rowsList);
        setTimeout(() => 
        {
            if(typeof rowsList != "undefined" && rowsList != null && rowsList != null
            && rowsList.length > 0)
            {
              columns = Object.keys(rowsList[0]);

              setTimeout(() => res.render('seeTable', 
                        {
                            rows:rowsList, 
                            columns:columns, 
                            dbName:req.params.dbname,
                            tableName:req.params.tablename
                        }), 20);
            }

            else
            { 
               databaseHandler.getColumnNames(req.params.dbname, req.params.tablename, columns);
               setTimeout(() => res.render('emptyTable', 
                        {
                            columns:columns,
                            dbName:req.params.dbname,
                            tableName:req.params.tablename
                        }), 20);
            }    
        }, 10);
    } );

    app.post('/insert/:dbname/:tablename', urlencodedParser, function(req, res) 
    {
        console.log(req.body);
        databaseHandler.insertValues(req.params.dbname, req.params.tablename, req.body);
        res.redirect(`/${req.params.dbname}/${req.params.tablename}`);
    } );

    app.post('/', urlencodedParser,function(req, res)
    {
        let namesList=[];
        let databaseName = req.body.db_name;
        let paragraph = { text : " "};
        databaseHandler.createDatabase(databaseName, paragraph);
        let tablesList=[100];
        for(let i = 0; i < tablesList.length; i++)
        {
            tablesList[i]=new Array();
        }
        setTimeout(function() 
                    {
                        databaseHandler.getList(namesList);
                    }, 20);

        setTimeout(function()
        {   
            setTimeout(function()
            {
                databaseHandler.getTables(namesList, tablesList);
            }, 50);
        }, 100);             

        setTimeout(function(){
            console.log(`controllerTime : ${paragraph.text}`);
            setTimeout(() => { res.render('home', {name:paragraph.text, dbnames:namesList, Tables:tablesList}); }, 30);
        }, 200);
    } );

    app.post('/filledform', urlencodedParser, function(req, res) 
    {
        databaseHandler.createTable(req.body);
        res.sendFile('CreateTable.html', {root : 'public/assets'});
    } );

    app.post('/generate/:dbname', urlencodedParser, function(req, res) 
    {
        fileGenerator.generateSQLFile(req.params.dbname);
        res.sendFile('File.html', {root : 'public/assets'});
    } );

    app.post('/:dbname', urlencodedParser, function(req, res) 
    {
        res.render('table');
    } );

    app.delete('/', function(req, res)
    {

    } );
}
