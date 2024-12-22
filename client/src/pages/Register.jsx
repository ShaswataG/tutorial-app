import { useEffect, useState } from "react";
import Textfield from "../components/Register/Textfield";
import SubmitButton from "../components/Register/SubmitButton";
import axios from 'axios';
import Validations from "../components/Register/Validations";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const baseURL = process.env.REACT_APP_BASE_URL;

export default function Register() {

    let minPasswordLength = 10;

    const [validLength, setValidLength] = useState(false);
    const [hasDigit, setHasDigit] = useState(false);
    const [hasUpperCase, setHasUpperCase] = useState(false);
    const [hasLowerCase, setHasLowerCase] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "" 
    });

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
        console.log(user);
        try {
            const data = await axios.post(baseURL + '/users', user);
            console.log(data);
        } catch (error) {
            console.error(error);        
        }
    }

    useEffect(() => {
        setValidLength(
            user.password.length > minPasswordLength ? true : false
        );
        setHasUpperCase(
            user.password.toLowerCase() !== user.password
        );
        setHasLowerCase(
            user.password.toUpperCase() !== user.password
        );
        setHasDigit(/\d/.test(user.password));
        setHasSpecialChar(/[`!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(user.password));
        setPasswordMatch(user.password.length > 0 && user.password === user.confirmPassword);
    }, [user]);


    return (
        <>
            <form className="register-form">
                <h1>Sign up</h1>
                {/* <Textfield handleChange={handleChange} type="text" placeholder="Fullname" name="username" value={user.username} />
                <Textfield handleChange={handleChange} type="email" placeholder="abc@example.com" name="email" value={user.email} />
                <Textfield handleChange={handleChange} type="password" placeholder="Password" name="password" value={user.password} />
                <Textfield handleChange={handleChange} type="password" placeholder="Confirm Password" name="confirmPassword" value={user.confirmPassword} /> */}

                <TextField 
                    id="standard-basic" 
                    label="Full Name" 
                    variant="standard" 
                    type="text" 
                    name="username" 
                    value={user.username} 
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
                <TextField 
                    id="standard-basic" 
                    label="Confirm password" 
                    variant="standard" 
                    type="password" 
                    name="confirmPassword" 
                    value={user.confirmPassword} 
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
                <Validations length={validLength} hasDigit={hasDigit} hasUpperCase={hasUpperCase} hasLowerCase={hasLowerCase} hasSpecialChar={hasSpecialChar} passwordMatch={passwordMatch} />
                {/* <SubmitButton handleSubmit={handleSubmit} text="Sign up" /> */}
                <Button variant="contained" onClick={handleSubmit}>Sign up</Button>
                <div className="boundary"></div>
                {/* <p>By continuing, you agree to the <a href="">Terms of use</a> and <a href="">Privacy Policy</a></p> */}
                <p>Already have an account? <a href="/login">Sign in</a></p>
            </form>
        </>
    )

}