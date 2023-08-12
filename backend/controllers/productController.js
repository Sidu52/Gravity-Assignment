require('dotenv').config();
const db = require('../config/mysql');


const queries = {
    getAllData: `SELECT * FROM ${process.env.MYSQL_DATABASE}.product`,
    addProduct: `INSERT INTO ${process.env.MYSQL_DATABASE}.product(user_id,name,category,purchase_date,company,under_warranty) VALUES (?,?,?,?,?,?);`,
    deleteProduct: `DELETE FROM ${process.env.MYSQL_DATABASE}.product WHERE id=?`
}

async function dashboard(req, res) {
    return res.status(201).json({
        message: "Authenticated",
    })
}


async function productsdata(req, res) {
    try {
        //GET DATA
        db.query(queries.getAllData, (err, result) => {
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
            return res.status(201).json({
                message: "Product Create Successful"
            })
        })

    } catch (err) {
        return res.status(500).json({
            message: "Error when user login",
            error: err
        })
    }
}

async function deleteProduct(req, res) {
    const { id } = req.params;
    console.log(id)
    try {
        db.query(queries.deleteProduct, [id], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error When Product Delete",
                    error: err
                })
            }
            return res.status(201).json({
                message: "Product Delete Successful"
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