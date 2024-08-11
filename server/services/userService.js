require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { supabase } = require('../connect');
const { query } = require('express');
const { jwtsecret } = require('../connect');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: ''
    }
})

const register = async (userInfo) => {
    const { username, email, password } = userInfo;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
        const newUser = {
            username: username,
            email: email,
            password: hashedPassword
        }
        const data = await userModel.insertUser(newUser);
        if (data) {
            console.log('Test A');
            if (await userModel.insertOtp(email, otp)) {
                console.log('Test B');
                const mailOptions = {
                    from: '',
                    to: email,
                    subject: 'Your OTP Code',
                    html: `Your otp is ${otp}`
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    console.log(error)
                    // if (error) {
                    //     throw new Error(error);
                    // }
                    return info;
                });
                console.log('Inserted otp in OTP table')
            } else {
                console.log('Test C');
                throw new Error(`Couldn't generate otp`);
            }
            return true;
        } else {
            console.log('Test D');
            throw new Error(`Couldn't register user`);
        }
    } catch (error) {
        throw error;
    }
}

const insertOtp = async (email) => {
    try {
        const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
        if (await userModel.insertOtp(email, otp)) {
            const mailOptions = {
                from: '',
                to: email,
                subject: 'Your OTP Code',
                text: `Your otp is ${otp}`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    throw new Error(error);
                }
                return info;
            });
        }
    } catch (error) {
        throw new Error(error);
    }
}

const verifyUser = async ({ email, otp }) => {
    console.log('Inside userService.verifyUser');
    return await userModel.verifyUser(email, otp);
}

// const register = async (userInfo) => {
//     const { username, email, password } = userInfo;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const otp = crypto.randomInt(100000, 999999);
//         const newUser = {
//             username: username,
//             email: email,
//             password: hashedPassword,
//             otp: otp
//         }
//         const data = await userModel.insertUser(newUser);
//         await supabase.from('otps').upsert({ email, otp });
//         const mailOptions = {
//             from: '',
//             to: email,
//             subject: 'Your OTP Code',
//             text: `Your otp is ${otp}`
//         };
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 return res.status(500).send(error.toString());
//             }
//             res.status(200).send('OTP sent!');
//         })
//         return data;
//     } catch (error) {
//         throw error;
//     }
// }

// const verifyMail = async (verificationInfo) {
//     const { email, otp } = req.body;
//     const { data, error } = await supabase
//         .from('otps')
//         .select('*')
//         .eq('email', email)
//         .eq('otp', otp)
//         .single();
//     if (error || !data) {
//         return res.status(400).send('Invalid OTP');
//     }
//     await supabase
//         .from('users')
//         .select('*')
//         .eq('email', email)
//         .update({ registered: true });
    
// }

const login = async (user) => {
    try {
        console.log('userService.login is getting called');
        const { email, password } = user;
        console.log(user);
        let { data:checkUserExists, error:error1 } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        console.log(checkUserExists, error1);
        if (checkUserExists.length == 0) {
            console.log('Email not registered');
            throw new Error('Email not registered');
        } else if (checkUserExists.is_verified) {
            throw new Error('Users not verified');
        } else if (await bcrypt.compare(password, checkUserExists.password)) {
            const accessToken =  jwt.sign({
                id: checkUserExists.id,
                username: checkUserExists.username,
                email: checkUserExists.email 
            }, jwtsecret);
            console.log('Access Token: ', accessToken);
            return accessToken;
        } else {
            console.log('Incorrect password');
            throw new Error('Incorrect password');
        }
    } catch (error) {
        throw new Error(error);
    }
}

const getUsers = async (query) => {
    return await userModel.getUsers(query);
}

const getUser = async (userId) => {
    return await userModel.getUser(userId);
}

const updateUser = async (userId, updates) => {
    return await userModel.updateUser(userId, updates);
}

const deleteUser = async (userId) => {
    return await userModel.deleteUser(userId);
}

module.exports = {
    register,
    verifyUser,
    login,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}