const { supabase } = require('../connect');

const insertUser = async (newUserInfo) => {
    console.log('test 1');
    let { data:checkExistingData, error:error1 } = await supabase
        .from('users')
        .select('*')
        .eq('email', newUserInfo.email)
        .limit(1);
    console.log('test 2');
    console.log(checkExistingData, error1);
    if (error1)
        throw new Error(error1);
    if (checkExistingData.length > 0) {
        throw new Error("Email already registered");
    } else {
        const { data, error }= await supabase
            .from('users')
            .insert({
                username: newUserInfo.username,
                email: newUserInfo.email,
                password: newUserInfo.password
            })
        if (error)
            throw new Error(error);
        return data;
    }
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

module.exports = {
    insertUser,
    getUsers,
    getUser,
    updateUser
}