//simple script to generate .sql files from the command line

const { exec } = require('child_process');

let goBackCommand = 'cd ..';

function generateSQLFile(DB)
{
    let command = `mysqldump -u root -ppassword ${DB} > ${DB}.sql 2> /dev/null`;

    exec(goBackCommand, (err, stout, stderr) => 
    {
        if(err) console.log(err.message);
        if(stderr) console.log(stderr);
        else console.log('in the root level...');
    } );

    exec(command, (err, stdout, stderr) => 
    {
        console.log('processing user request...')
        if(err) console.log(err.message);
        if(stderr) console.log(stderr);
        else console.log('file generated successfully');
    } );
}

module.exports = { generateSQLFile : generateSQLFile};