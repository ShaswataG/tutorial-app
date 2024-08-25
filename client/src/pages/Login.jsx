import Textfield from "../components/Login/Textfield";
import SubmitButton from "../components/Login/SubmitButton";
import { useState } from "react";
import axios from 'axios';

// import * as React from 'react';
// import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
// import GlobalStyles from '@mui/joy/GlobalStyles';
// import CssBaseline from '@mui/joy/CssBaseline';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Checkbox from '@mui/joy/Checkbox';
// import Divider from '@mui/joy/Divider';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import IconButton, { IconButtonProps } from '@mui/joy/IconButton';
// import Link from '@mui/joy/Link';
// import Input from '@mui/joy/Input';
// import Typography from '@mui/joy/Typography';
// import Stack from '@mui/joy/Stack';
// import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
// import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
// import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';
// import GoogleIcon from '../assets/GoogleIcon';

export default function Login() {

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setUser(prev => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const response = await axios.post(baseURL + '/users/login', user);
        // const token = response.data;
        // localStorage.setItem('jwt_token', token);
    }


    
    return (
        <>
            <form className="login-form">
                <h1>Sign in</h1>
                <Textfield handleChange={handleChange} type="email" placeholder="abc@example.com" name="email" value={user.email} />
                <Textfield handleChange={handleChange} type="password" placeholder="Password" name="password" value={user.password} />
                <SubmitButton handleSubmit={handleSubmit} text="Sign up" />
                <div className="boundary"></div>
                <p>Don't have an account? <a href="">Sign up</a></p>
            </form>
        </>
    )
}