import React, { useEffect } from 'react'
import './dashboard.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
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
                if (!response.data) {
                    toast.error("User Not Authorize")
                    navigate('/login');
                }
            } else {
                toast.warn("Token Not Found Plz Login")
                navigate('/login');
            }
        }
        fetchdata();
    }, []);

    const handlelogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('localuser');
        localStorage.removeItem('jwtToken');
        navigate('/login')
    }
    return (
        <div className="dashboard">
            <div className='productform_container'>
                <ProductRegistrationForm />
            </div>
            <ProductData />
            <button
                className='signoutbtn'
                onClick={handlelogout}
            >Logout</button>
        </div>
    )
}
export default dashboard;
