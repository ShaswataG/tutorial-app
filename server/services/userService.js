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
const { sendOtp } = require('./emailService');
const { captureRejectionSymbol } = require('events');

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
                await sendOtp(email, otp);
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
    try {
        console.log('userService.verifyUser is being called');
        const otpEntry = await userModel.getOtpEntry(email);
        console.log('Otp entry', otpEntry);
        console.log(`new Date(): `, new Date(Date.now()));
        console.log(`otpEntry.expiration_time: `, otpEntry.expiration_time);
        // if (otp != otpEntry.otp || ((otp == otpEntry.otp) && (new Date() > otpEntry.expiration_time))) {
        if (otp !== otpEntry.otp || new Date() > otpEntry.expiration_time) {
            console.log(`Invalid OTP`)
            return false;
        }
        if (await userModel.verifyUser(email) === true) {
            await userModel.deleteOtp(email);
            return 'User verified successfully';
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

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
        } else if (checkUserExists.is_verified === false) {
            console.log('User not verfied')
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
        console.log(error);
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

const makeAdmin = async (userLoggedIn, userId, courseId) => {
    try {
        console.log('Inside userService.makeAdmin');
        console.log(userId, courseId);
        const checkUserRoles = await userModel.checkUserRoles(userLoggedIn, Number(courseId));
        console.log('checkUserRoles', checkUserRoles);
        if (checkUserRoles.length < 1) {
            throw new Error(`Unauthorised access`);
        }
        const makeAdmin = await userModel.makeAdmin(Number(userId), Number(courseId));
        console.log('makeAdmin', makeAdmin);
        if (makeAdmin === true) {
            return true;
        }
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

module.exports = {
    register,
    verifyUser,
    login,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    makeAdmin
}