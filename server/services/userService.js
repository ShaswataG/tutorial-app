const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { supabase } = require('../connect');
const { query } = require('express');

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
        const { email, password } = user;
        const { data:checkUserExists, error:error1 } = await supabase
            .from('users')
            .select('*')
            .eq('email', email);
        if (checkUserExists.length == 0) {
            throw new Error('Email not registered');
        } else if (await bcrypt.compare(password, data[0].password)) {
            const accessToken =  jwt.sign(data[0], process.env.ACCESS_TOKEN_SECRET);
            return accessToken;
        }
    } catch (error) {

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
    getUsers,
    getUser,
    updateUser,
    deleteUser
}