import React, { useState } from 'react'
import './productRegistrationForm.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addproduct } from '../../store/store';


function productRegistrationForm() {

    const [productForm, setProductForm] = useState({
        productName: '',
        category: '',
        purchaseDate: '',
        company: '',
        underWarranty: 'Yes', // Default value
    });

    // Redux dispatch hook
    const dispatch = useDispatch();

    //Handle add product opration
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = localStorage.getItem('localuser');
            // Parse the JSON string to get the user object
            const storedUser = JSON.parse(user);

            const response = await axios.post('http://localhost:9000/product/add', { product: productForm, id: storedUser.id })
            if (response.data) {
                toast.success(response.data.message);
                dispatch(addproduct(response.data.data))
            } else {
                toast.error(response.data.message);
            }
        } catch (err) {
            console.error("User Not Register", err);
        }
        setProductForm({ productName: '', category: '', purchaseDate: '', company: '', underWarranty: 'Yes', })
    };

    return (
        <div className="product_registration main_container">
            <h1>Product Registration</h1>
            <form className='form_Container' onSubmit={handleProductSubmit}>
                <div className="user_box">
                    <label htmlFor="productName">Product Name</label>
                    <input
                        type="text"
                        value={productForm.productName}
                        name="productName"
                        onChange={(e) =>
                            setProductForm({ ...productForm, productName: e.target.value })
                        }
                    />
                </div>
                <div className="user-box">
                    <label htmlFor="category">Category</label>
                    <input
                        type="text"
                        value={productForm.category}
                        name="category"
                        onChange={(e) =>
                            setProductForm({ ...productForm, category: e.target.value })
                        }
                    />
                </div>

                <div className="user-box">
                    <label htmlFor="company">Company</label>
                    <input
                        type="text"
                        value={productForm.company}
                        name="company"
                        onChange={(e) =>
                            setProductForm({ ...productForm, company: e.target.value })
                        }
                    />
                </div>
                <div className="user-box">
                    <label htmlFor="purchaseDate">Purchase Date</label>
                    <input
                        type="date"
                        value={productForm.purchaseDate}
                        name="purchaseDate"
                        onChange={(e) =>
                            setProductForm({ ...productForm, purchaseDate: e.target.value })
                        }

                    />
                </div>
                <div className="user-box">
                    <label htmlFor="underWarranty">Under Warranty</label>
                    <select
                        value={productForm.underWarranty}
                        name="underWarranty"
                        onChange={(e) =>
                            setProductForm({ ...productForm, underWarranty: e.target.value })
                        }
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>
                <button className='submit_button' type="submit">Submit</button>
            </form>
        </div>
    )
}
export default productRegistrationForm;