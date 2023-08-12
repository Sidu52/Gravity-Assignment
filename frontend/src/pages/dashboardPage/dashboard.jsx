import React, { useEffect } from 'react'
import './dashboard.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProductRegistrationForm, ProductData } from '../../component/product/index';

function dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchdata() {
            const token = localStorage.getItem('jwtToken');
            if (token) {
                const response = await axios.get('http://localhost:9000/product', {
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                if (response.data) {
                    console.log("User Authorized")

                } else {
                    console.log("User Not Authorized")
                    navigate('/login');
                }
            } else {
                console.log("Token Not Found Plz Login")
                navigate('/login');
            }
        }
        fetchdata();
    }, []);
    return (
        <div className="dashboard">
            <div className='productform_container'>
                <ProductRegistrationForm />
            </div>

            <ProductData />
        </div>
    )
}
export default dashboard;
