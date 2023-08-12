import React, { useState, useEffect } from 'react';
import './prouctData.scss'
import axios from 'axios';
import { MdOutlineDeleteOutline } from 'react-icons/md';

function ProductData() {
    const user = localStorage.getItem('localuser');
    const storedUser = JSON.parse(user);
    const [productData, setProductData] = useState([]);

    async function fetchdata() {
        const response = await axios.get('http://localhost:9000/product/data')
        if (response.data) {
            setProductData(response.data.data);
        }
    }
    useEffect(() => {
        fetchdata();
    }, []);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:9000/product/delete/${id}`)
            console.log(response.data.message);
            fetchdata();

        } catch (err) {
            console.log("Error", err)
        }
    }

    return (
        <div>
            <h1>Product Data</h1>
            <div className="cartContainer">
                {productData.map((product, index) => (
                    <div key={index} className='cartItem'>
                        <MdOutlineDeleteOutline
                            style={{ display: storedUser.id === product.user_id ? "block" : "none" }}
                            onClick={((e) => handleDelete(e, product.id))} />
                        <h3>{product.name}</h3>
                        <p>Company: {product.company}</p>
                        <p>Category: {product.category}</p>
                        <p>Purchase_Date: {product.purchase_date}</p>
                        <p>Warranty: {product.under_warranty}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductData;

