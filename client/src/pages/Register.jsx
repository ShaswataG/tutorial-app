import { useEffect, useState } from "react";
import Textfield from "../components/Register/Textfield";
import SubmitButton from "../components/Register/SubmitButton";
import axios from 'axios';
import Validations from "../components/Register/Validations";

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
        // const data = await axios.post(url + '/users', user);
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
                <Textfield handleChange={handleChange} type="text" placeholder="Fullname" name="username" value={user.username} />
                <Textfield handleChange={handleChange} type="email" placeholder="abc@example.com" name="email" value={user.email} />
                <Textfield handleChange={handleChange} type="password" placeholder="Password" name="password" value={user.password} />
                <Textfield handleChange={handleChange} type="password" placeholder="Confirm Password" name="confirmPassword" value={user.confirmPassword} />
                <Validations length={validLength} hasDigit={hasDigit} hasUpperCase={hasUpperCase} hasLowerCase={hasLowerCase} hasSpecialChar={hasSpecialChar} passwordMatch={passwordMatch} />
                <SubmitButton handleSubmit={handleSubmit} text="Sign up" />
                <div className="boundary"></div>
                {/* <p>By continuing, you agree to the <a href="">Terms of use</a> and <a href="">Privacy Policy</a></p> */}
                <p>Already have an account? <a href="">Sign in</a></p>
            </form>
        </>
    )

}