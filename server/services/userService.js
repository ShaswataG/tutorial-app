require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { supabase } = require('../connect');
const { query } = require('express');
const { jwtsecret } = require('../connect');

const register = async (userInfo) => {
    const { username, email, password } = userInfo;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username: username,
            email: email,
            password: hashedPassword
        }
        const data = await userModel.insertUser(newUser);
        return data;
    } catch (error) {
        throw error
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
    login,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}