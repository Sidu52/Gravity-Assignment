import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function LoginForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

    //handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9000/user/signin', form);

            if (response.data) {
                toast.success(response.data.message)
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('localuser', response.data.user);
                navigate('/');

            } else {
                toast.warn(response.data.message)
            }


        } catch (err) {
            console.error("User Not Login", err);
        }
        setForm({ email: "", password: "" })
    };

    return (
        <div className='Login main_container'>
            <h1>Login Page</h1>
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
                    <label htmlFor="password">password</label>
                    <input
                        type='password'
                        value={form.password}
                        name='password'
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    ></input>
                </div>
                <button className='submit_button'>Submit</button>
                <p style={{ textAlign: "center", marginTop: "10px" }}>Create New Account.. <Link to="/register">Click here</Link></p>

            </form>
        </div>
    )
}

export default LoginForm;