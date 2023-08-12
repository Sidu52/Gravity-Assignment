const express = require('express');
const router = express.Router();
const auth = require('../config/auth');
const { dashboard, productsdata, addproduct, deleteProduct } = require('../controllers/productController');

router.get('/', auth, dashboard);
router.get('/data', productsdata);
router.post('/add', addproduct);
router.post('/delete/:id', deleteProduct);

module.exports = router;