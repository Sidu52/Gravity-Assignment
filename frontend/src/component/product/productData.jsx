import React, { useState, useEffect } from 'react';
import './prouctData.scss'
import axios from 'axios';
import { toast } from 'react-toastify';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { setproduct, deleteproduct } from '../../store/store';

function ProductData() {
    const user = localStorage.getItem('localuser');
    const storedUser = JSON.parse(user);
    // Redux hook
    const productData = useSelector((state) => state.product); // Get the product data from Redux store
    const dispatch = useDispatch();


    useEffect(() => {
        async function fetchdata() {
            const response = await axios.get('http://localhost:9000/product/data')
            if (response.data) {
                // setProductData(response.data.data);
                dispatch(setproduct(response.data.data));
            }
        }
        fetchdata();
    }, []);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:9000/product/delete/${id}`)
            if (response.data) {
                toast.success(response.data.message);
                dispatch(deleteproduct(id))
            } else {
                toast.error(response.data.message);
            }
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

