const { wait } = require('@testing-library/user-event/dist/utils');
const { useCallback } = require('react');

//Import sqlite3
const sqlite3 = require('sqlite3').verbose();
// Initialize database object with table file name
const db = new sqlite3.Database('name_id.tbl')
// global var for returning a name b/c JS is asynchronous :(
var returned_name;

// Creates a name and id table with field values defined
function make_reg_tbl() // make 'register' table
{
    // serialize ensures that the sql statements are ran in order
    db.serialize(() =>
    {
        db.run("CREATE TABLE IF NOT EXISTS name_id (name CHAR(30), id CHAR(8), PRIMARY KEY(id))");
    });
}

function reg_user(name, id)
{
    db.run("INSERT INTO name_id (name, id) VALUES (?, ?)", [name, id]);
}

function print_reg_tbl()
{
    // Gets each row in the table
    db.each("SELECT name, id FROM name_id", (err, row) => 
    {
        // Print database values
        console.log(row.name + ": " + row.id);
    });
}

function get_name(sid)
{
    return new Promise(resolve => {
        db.get("SELECT name FROM name_id WHERE id = (?)", sid, function (err, row)
        {
            if (err)
            {
                return console.error(err.message);
            }
            else
            {
                returned_name = row.name;
            }
            resolve(returned_name);
        });
    });
}



function main()
{
    db.serialize(() => 
    {
        db.run("DROP TABLE IF EXISTS name_id");
        make_reg_tbl();
        reg_user('Anthony', 47191956);
        reg_user('Test', 12345678);
        print_reg_tbl();
        //console.log("-----Getting name from 47191956-----");
        //returned_name = get_name(47191956);
        //console.log("Get Name: " + returned_name.name);
    });
}

main();

    /* ---------- REGISTER ----------
    GETS INPUT FROM WEBSITE (NAME, PHONENUMBER/ID)
    SQLITE WILL INSERT THAT INFO INTO THE DB

    How will this work
    1) db prepares the insert statement
    2) db receives the name and phonenumber/ID
    3) if the phonenumber (key) already exists, then throw an error
    4) otherwise, db runs using their name and key to fill in (?, ?) variables
        for the insert sql statement
    */

    /* --------- COURT SIGN-UP ---------
    GETS UNIQUE (PHONE NUMBER/ID) INPUT
    DB CHECKS IF THE KEY EXISTS
    IF NOT, TELLS USER TO REGISTER
    OTHERWISE RETURN THE NAME TO THE WEBSITE AND 
    UPPERLEVEL ASSIGNS THE USER A COURT

    How will this work
    1) DB
    */