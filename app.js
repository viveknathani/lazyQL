//choose a value that suits you
const port = 3000; 

//setting up an express application
const express = require('express');
const app = express();

//setting up our controllers
const homePageController = require('./controllers/homepagecontrol');

//since our template engine is ejs
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
homePageController(app);

//setting up our server
app.listen(port, () => console.log(`Server is running at http://localhost:${port}/`));
