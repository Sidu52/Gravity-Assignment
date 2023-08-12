import React, { useState } from 'react'
import './RegistrationForm.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


function RegistrationForm() {

    const [form, setForm] = useState({
        email: "",
        name: "",
        mobile: "",
        password: "",
        DOB: "",
    })

    //handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/user/register', form)
            if (response.data) {
                toast.success(response.data.message);
            }
            toast.warn(response.data.message);

        } catch (err) {
            console.error("User Not Register", err);
        }
        setForm({ email: "", name: "", mobile: "", password: "", DOB: "", })
    };

    return (
        <div className='registration main_container'>
            <h1>Registration Page</h1>
            <form className='form_Container' onSubmit={handleSubmit}>
                <div className="user_box">
                    <label htmlFor="email">Email</label>
                    <input
                        type='email'
                        value={form.email}
                        name='email'
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    ></input>
                </div>
                <div className="user_box">
                    <label htmlFor="email">Name</label>
                    <input
                        type='name'
                        value={form.name}
                        name='name'
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    ></input>
                </div>
                <div className="user_box">
                    <label htmlFor="mobile">mobile</label>
                    <input
                        type='mobile'
                        value={form.mobile}
                        name='mobile'
                        onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    ></input>
                </div>
                <div className="user_box">
                    <label htmlFor="password">password</label>
                    <input
                        type='password'
                        value={form.password}
                        name='password'
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    ></input>
                </div>
                <div className="user_box">
                    <label htmlFor="date">DOB</label>
                    <input
                        type='date'
                        value={form.date}
                        name='date'
                        onChange={(e) => setForm({ ...form, DOB: e.target.value })}
                    ></input>
                </div>
                <button className='submit_button'>Submit</button>
                <p style={{ textAlign: "center", marginTop: "10px" }}>If you already Signup.. <Link to="/login">Click here</Link></p>
            </form>

        </div>
    )
}

export default RegistrationForm;
