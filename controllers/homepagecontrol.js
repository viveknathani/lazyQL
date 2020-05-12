const databaseHandler = require('../models/dbhandle');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app)
{
    app.get('/', function(req, res)
    {
        let text = ' ';
        let namesList=[];
        databaseHandler.getList(namesList);
        setTimeout(function()
                    {  
                        res.render('home', {name:text, dbnames:namesList} );
                    }, 10); 
    } );

    app.post('/', urlencodedParser,function(req, res)
    {
        let namesList=[];
        let databaseName = req.body.db_name;
        let paragraph = { text : " "};
        databaseHandler.createDatabase(databaseName, paragraph);
        setTimeout(function() 
                    {
                        databaseHandler.getList(namesList);
                        console.log(`controllerTime : ${paragraph.text}`);
                        setTimeout(() => { res.render('home', {name:paragraph.text, dbnames:namesList}); }, 30);
                    }, 20);
    } );

    app.delete('/', function(req, res)
    {

    } );
}
