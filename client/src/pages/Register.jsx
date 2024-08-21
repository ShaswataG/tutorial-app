import { useState } from "react";
import Textfield from "../components/Register/Textfield"
import SubmitButton from "../components/Register/SubmitButton"
import axios from 'axios';

export default function Register() {

    const [passwordUnmatch, setPasswordUnmatch] = false;
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "" 
    })

    const handleChange = async (event) => {

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.password !== user.confirmPassword) {
            setPasswordUnmatch(true);
        } else {
            setPasswordUnmatch(false);
        }
        const data = await axios.post(url + '/users', user);
    }


    return (
        <>
            <form>
                <h1>Sign Up</h1>
                <Textfield handleChange={handleChange} type="text" placeholder="Fullname" />
                <Textfield handleChange={handleChange} type="email" placeholder="abc@example.com" />
                <Textfield handleChange={handleChange} type="password" placeholder="Password" />
                <Textfield handleChange={handleChange} type="password" placeholder="Confirm Password" />
                {passwordUnmatch && <p>Passwords do not match</p>}
                <SubmitButton handleSubmit={handleSubmit} text="Sign Up" />
            </form>
        </>
    )

}