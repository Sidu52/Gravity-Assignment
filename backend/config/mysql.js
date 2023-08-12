require('dotenv').config();
const mysql = require('mysql2');

//Create a MySql connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: "apk",
})

//Connect to the database
db.connect((error) => {
    if (error) { console.error('Error connecting to the database:', error); return; }
    console.log("Connected to the database");
})

module.exports = db;