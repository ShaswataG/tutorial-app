const { supabase } = require('../connect');

const insertOtp = async (email, otp) => {
    const expirationTime = new Date(Date.now() + 10 * 60000);
    console.log('insertOtp 1');
    const { data:checkIfEmailExists, error:error1 } = await supabase
        .from('otp')
        .select('*')
        .eq('email', email)
    console.log('insertOtp 2');
    if (checkIfEmailExists.length > 0) {
        const { data:updateOtp, error:error2 } = await supabase
            .from('otp')
            .update({
                otp: otp,
                updated_at: new Date(Date.now()),
                expiration_time: expirationTime
            })
            .eq('email', email);
        console.log('insertOtp 3'); 
    } else {
        const { data:insertNewOtp, error:error3 } = await supabase
            .from('otp')
            .insert({
                email: email,
                otp: otp,
                created_at: new Date(Date.now()),
                updated_at: new Date(Date.now()),
                expiration_time: expirationTime,
            });
        console.log(insertNewOtp, error3);
        if (error3)
            throw new Error(error3.message);
        console.log('insertOtp 4')
    }
    if (error1)
        throw new Error(`Couldn't generate otp`);
    return true;
}

const insertUser = async (newUserInfo) => {
    console.log('test 1');
    let { data:checkExistingData, error:error1 } = await supabase
        .from('users')
        .select('*')
        .eq('email', newUserInfo.email)
        .limit(1);
    console.log('test 2');
    console.log(checkExistingData, error1);
    if (error1) {
        console.error(error.message);
        throw new Error(error1);
    }
    if (checkExistingData.length > 0) {
        console.log('Email already registered');
        throw new Error("Email already registered");
    } else {
        const { data, error }= await supabase
            .from('users')
            .insert({
                username: newUserInfo.username,
                email: newUserInfo.email,
                password: newUserInfo.password,
                is_verified: false
            });
        if (error) {
            console.error(error.message);
            throw new Error(error);
        }
        return true;
    }
}

const getOtpEntry = async (email) => {
    console.log('userModel.getOtpEntry is being called');
    const { data, error } = await supabase
        .from('otp')
        .select('*')
        .eq('email', email)
        .single();
    console.log(data, error);
    if (error)
        throw new Error(`Couldn't fetch otp entry`);
    console.log('Just before return', data);
    return data;
}

const verifyUser = async (email) => {
    console.log('userModel.verifyUser is being called');
    const { data, error } = await supabase
        .from('users')
        .update({ is_verified: true })
        .eq('email', email);
    if (error)
        throw new Error('Verification failed');
    return true;
}

const deleteOtp = async (email) => {
    console.log(`userModel.deleteOtp is being called`);
    const { data, error } = await supabase
        .from('otp')
        .delete()
        .eq('email', email);
    if (error)
        throw new Error(`Couldn't delete otp entry`);
    return true;
}

const getUsers = async (query) => {
    console.log('userModels.getUsers is being called');
    console.log('test 1');
    console.log(supabase);
    let { data, error } = await supabase
        .from('users')
        .select('*')
        // .match(query);
        .limit(1);
    console.log('test 2');
    console.log(data, error);
    if (error)
        throw new Error('Supabase error');
    return data;
}

const getUser = async (userId) => {
    let { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId);
    if (error)
        throw new Error(error);
    return data;
}

const updateUser = async (userId, updates) => {
    console.log('test 1');
    let { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId);
    if (error)
        throw new Error(error);
    return data;
}

const checkUserRoles = async (userLoggedIn, courseId) => {
    console.log(userLoggedIn, courseId);
    const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .match({
            user_id: userLoggedIn.id,
            course_id: courseId,
            role: 'admin'
        });
    if (error)
        throw new Error(`Couldn't fetch user_roles`);
    return data;
}

const makeAdmin = async (userId, courseId) => {
    const { data, error } = await supabase
        .from('user_roles')
        .upsert({
            user_id: userId,
            course_id: courseId,
            role: 'admin',
            is_owner: false
        },
        {
            onConflict: 'user_id, course_id'
        });
    if (error)
        throw new Error(error.message);
    return true;
}

module.exports = {
    insertOtp,
    getOtpEntry,
    verifyUser,
    insertUser,
    getUsers,
    getUser,
    updateUser,
    checkUserRoles,
    makeAdmin,
    deleteOtp
}