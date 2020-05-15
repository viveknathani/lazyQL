# lazyQL

lazyQL is a web application that provides a really simple interface between the human and the mysql server. 

### Tech Stack 

1. NodeJS for dealing with MySQL databases
2. Express for robust handling of HTTP requests
3. HTML, CSS, Vanilla Javascript for the front end.

### Dependencies

1. EJS
2. Express
3. Body Parser

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





