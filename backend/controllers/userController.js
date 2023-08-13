require('dotenv').config();
const db = require('../config/mysql');
const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

//My SQL querys
const queries = {
    adduser: `INSERT INTO ${process.env.MYSQL_DATABASE}.user(email,name,mobile,password,DOB) VALUES (?,?,?,?,?);`,
    readuser: `SELECT * FROM ${process.env.MYSQL_DATABASE}.user WHERE email=?`
}

//Create User
async function register(req, res) {
    const { email, name, mobile, password, DOB } = req.body;
    try {
        //Hash a password
        const hashPassword = await bycrpt.hash(password, 10);
        //Add data on DataBase
        db.query(queries.adduser, [email, name, mobile, hashPassword, DOB], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error when Create user",
                    error: err
                })
            }
            return res.status(201).json({
                message: "User Register Successful",
                data: result
            })
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error when Create user",
            error: err
        })
    }
}

//Login user
async function login(req, res) {
    const { email, password } = req.body;
    try {
        //Take user from database
        db.query(queries.readuser, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error when Create user",
                    error: err
                })
            } else if (result.length === 0) {
                return res.status(401).json({
                    message: "User Not Found",
                })
            } else {
                // Convert the result object to a JSON string
                const user = JSON.stringify(result[0]);
                //Genrate token
                const token = jwt.sign({ userId: result[0].id }, `${process.env.SECREAT_KEY}`, { expiresIn: '1h' });
                const hashpassword = result[0].password;
                const passwordMatch = await bycrpt.compare(password, hashpassword);
                if (passwordMatch) {
                    return res.status(201).json({
                        message: "User Login Successful",
                        token: token,
                        user: user
                    })
                } return res.status(401).json({
                    message: "Password Not Match",
                })
            }
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error when user login",
            error: err
        })
    }
}

module.exports = { register, login };