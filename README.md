# lazyQL

lazyQL is a web application that provides a really simple interface between the human and the mysql server. 

### Tech Stack 

NodeJS for dealing with MySQL databases
Express for robust handling of HTTP requests
HTML, CSS, Vanilla Javascript for the front end.

### Dependencies

EJS
Express
Body Parser

### Build

Clone this repository, 
`$ git clone https://github.com/viveknathani/lazyQL.git`

Install dependencies, 
`$ npm install`

Go to ./app.js and edit the port number to a value that you prefer.
```javascript
const port = 3000; 
``` 

Go to ./models/dbhandle.js and make changes in the following area :
```javascript
const connectionHandler = mysql.createConnection( 
    {
        database : 'lazyQL',
        host : 'localhost',
        user : 'root',
        password : 'password',
    } );
``` 

Start the server and play with the interface!
`$ node app.js`





