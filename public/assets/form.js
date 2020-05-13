'use strict';

//get the name of the database
let path = window.location.pathname;
let pathDB = path.slice(1, path.length);

//get button element
let numberButtonDOM = document.getElementById('number_button');

let number;

numberButtonDOM.onclick = function () 
{
    //get number of columns and store the value
    let str = document.getElementById('number_input').value;
    number = parseInt(str);

    //store database name in the form 
    let databaseName = document.createElement('input');
    databaseName.name = 'DB_NAME';
    databaseName.value = pathDB;
    databaseName.readOnly = true;

    //input for table name
    let tableNameInput = document.createElement('input');
    tableNameInput.placeholder = 'table name';
    tableNameInput.name = 'Table_Name';
    tableNameInput.value = '';

    //our form DOM
    let formElement = document.getElementById('table_form');

    //append content
    formElement.appendChild(databaseName);
    formElement.appendChild(tableNameInput);

    let dataTypes = ['int', 'float'];
    //loop to generate input fields for columns and their datatypes
    for(let i = 0; i < number; i++)
    {
        //more DOM stuff
        let labelElement = document.createElement('label');
        let columnNameInput = document.createElement('input');
        let selectElement = document.createElement('select');
        
        //input name = column name (dynamically)
        let nameString = `Column_${i+1}`;
        labelElement.innerText = nameString;
        columnNameInput.placeholder = nameString;
        columnNameInput.name = nameString;
        columnNameInput.value= '';
        selectElement.id = nameString;
        selectElement.name = nameString;

        //more of DOM
        for(let i = 0; i < dataTypes.length; i++)
        {
            let option = document.createElement('option');
            option.value = dataTypes[i];
            option.text = dataTypes[i];
            selectElement.appendChild(option);
        }

        //finally, append!
        formElement.appendChild(labelElement);
        formElement.appendChild(columnNameInput);
        formElement.appendChild(selectElement);
    }

    //button to POST this form
    let submitStuff = document.createElement('button');
    submitStuff.type='submit';
    submitStuff.innerText = 'Submit'
    formElement.appendChild(submitStuff);
}

