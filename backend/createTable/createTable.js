const db = require("../config/mysql");

//Create Table for user
const createUser = `
    CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name varchar (200),
        email varchar(250),
        mobile varchar(20),
        password varchar(220),
        dob DATE NOT NULL
    )

`;

//Create Table for product
const createProduct = `
    CREATE TABLE IF NOT EXISTS product ( 
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name varchar(200) NOT NULL,
        category VARCHAR(100) NOT NULL,
        purchase_date DATE NOT NULL,
        company VARCHAR(255) NOT NULL,
        under_warranty ENUM('yes','no')NOT NULL )

`;

// Execute queries
db.query(createUser, (err, result) => {
    if (err) throw err;
});

db.query(createProduct, (err, result) => {
    if (err) throw err;
});