import Textfield from "../components/Login/Textfield";
import SubmitButton from "../components/Login/SubmitButton";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const baseURL = process.env.REACT_APP_BASE_URL;

export default function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loginFailed, setLoginFailed] = useState(false);

    const handleChange = async (event) => {
        const { name, value } = event.target;
        // console.log('test')
        // console.log(event.target);
        console.log(user);
        setUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user);
        try {
            const response = await axios.post(baseURL + '/users/login', user);
            // console.log(response.data);
            const token = response.data.token;
            localStorage.setItem('jwt_token', token);
            setLoginFailed(false);
            navigate('/dashboard');
            console.log(localStorage.getItem('jwt_token'));
        } catch (error) {
            setLoginFailed(true);
        }
    }
    
    return (
        <>
            <form className="login-form">
                <h1>Sign in</h1>
                {/* <Textfield handleChange={handleChange} type="email" placeholder="abc@example.com" name="email" value={user.email} />
                <Textfield handleChange={handleChange} type="password" placeholder="Password" name="password" value={user.password} /> */}
                <TextField 
                    id="standard-basic" 
                    label="Email" 
                    variant="standard" 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    onChange={handleChange} 
                    sx={
                        {
                            width: "60%",
                            input: {
                                fontSize: '1.6em',
                            },
                            label: {
                                fontSize: '1.4em',
                            }
                        }
                    }
                />
                <TextField 
                    id="standard-basic" 
                    label="Password" 
                    variant="standard" 
                    type="password" 
                    name="password" 
                    value={user.password} 
                    onChange={handleChange} 
                    sx={
                        {
                            width: "60%",
                            input: {
                                fontSize: '1.6em',
                            },
                            label: {
                                fontSize: '1.4em',
                            }
                        }
                    }
                />
                {/* <SubmitButton handleSubmit={handleSubmit} text="Sign up" /> */}
                <span className="login-warning">
                    {loginFailed && <p>Login failed</p>}
                </span>
                <Button variant="contained" onClick={handleSubmit}>Sign in</Button>
                <div className="boundary"></div>
                <p>Don't have an account? <a href="/register">Sign up</a></p>
            </form>
        </>
    )
}