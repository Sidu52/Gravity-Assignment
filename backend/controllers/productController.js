require('dotenv').config();
const db = require('../config/mysql');

//My SQL query
const queries = {
    getAllData: `SELECT * FROM ${process.env.MYSQL_DATABASE}.product WHERE user_id=?`,
    getProduct: `SELECT * FROM ${process.env.MYSQL_DATABASE}.product WHERE id=?`,
    addProduct: `INSERT INTO ${process.env.MYSQL_DATABASE}.product(user_id,name,category,purchase_date,company,under_warranty) VALUES (?,?,?,?,?,?);`,
    deleteProduct: `DELETE FROM ${process.env.MYSQL_DATABASE}.product WHERE id=?`
}


async function dashboard(req, res) {
    return res.status(201).json({
        message: "Authenticated",
    })
}

//Get ProductData from DataBase
async function productsdata(req, res) {
    try {
        const { id } = req.params;
        //GET DATA
        db.query(queries.getAllData, [id], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error When Data Found",
                    error: err
                })
            }
            return res.status(201).json({
                message: "Data Found",
                data: result
            })
        })
    } catch (err) {
        return res.status(500).json({
            message: "Error when user login",
            error: err
        })
    }
}

//Add Product in DataBase
async function addproduct(req, res) {
    const { productName, category, purchaseDate, company, underWarranty } = req.body.product;
    const { id } = req.body

    try {
        //Add Product in Database
        db.query(queries.addProduct, [id, productName, category, purchaseDate, company, underWarranty], (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Error when Create Product",
                    error: err
                })
            }
            //Get Add Data by Id.
            db.query(queries.getProduct, [result.insertId], (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "Error when Create Product",
                        error: err
                    })
                }
                return res.status(201).json({
                    message: "Product Create Successful",
                    data: result[0],
                })
            })

        })

    } catch (err) {
        return res.status(500).json({
            message: "Error when user login",
            error: err
        })
    }
}

//Delete ProductData from DataBase
async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        db.query(queries.deleteProduct, [id], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error When Product Delete",
                    error: err
                })
            }
            return res.status(201).json({
                message: "Product Delete Successful",
            })
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error when user login",
            error: err
        })
    }

}

module.exports = { dashboard, productsdata, addproduct, deleteProduct };