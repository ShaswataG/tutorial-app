const { query } = require('express');
const { supabase } = require('../connect');

const createCourse = async (userLoggedIn, newCourseInfo) => {
    try {
        console.log('courseModel.createCourse is getting called');
        console.log(userLoggedIn);
        console.log(newCourseInfo);
        let { id } = userLoggedIn;
        let { title, description, isPaid, price } = newCourseInfo;
        isPaid = (isPaid === 'true');
        price = Number(price);
        console.log({
            isPaid: isPaid,
            price: price
        })
        let { data, error } = await supabase
            .from('courses')
            .insert({
                title: title,
                description: description,
                is_paid: isPaid,
                price: price,
                author_id: id
            });
        console.log('data', data);
        let { data:data1, error:error1 } = await supabase
            .from('courses')
            .select('*')
            .match({
                title: title,
                description: description,
                author_id: id
            })
        const courseId = data1[0].id;
        console.log('data1', data1);
        let { data:data2, error:error2 } = await supabase
            .from('user_roles')
            .insert({
                user_id: id,
                course_id: courseId,
                role: "admin",
            })
        console.log('data2', data2);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

const getCourses = async (query) => {
    console.log('courseModel.getCourses is getting called');
    let { data, error } = await supabase
        .from('courses')
        .select('*')
        .match(query);
    console.log(data);
    if (error)
        throw new Error(error);
    return data;
}

const getCourse = async (courseId) => {
    let { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId);
    if (error)
        throw new Error(error);
    return data;
}

const getBlogs = async (query) => {
    let { data, error } = await supabase
        .from('blogs')
        .select('*')
        .match(query);
    if (error)
        throw new Error(error);
    return data;
}

const createBlog = async (userLoggedIn, newBlog) => {
    console.log('courseModel.createBlog is being called');
    newBlog.course_id = Number(newBlog.course_id);
    console.log('userLoggedIn', userLoggedIn);
    console.log('newBlog', newBlog);
    let { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('course_id', Number(newBlog.course_id))
        .select();
    console.log(typeof(data[0].user_id), typeof(userLoggedIn.id));
    if (data[0].user_id != userLoggedIn.id) {
        console.log(`You don't have write access to this course`)
        throw new Error(`You don't have write access to this course`);
    }
    let { data1, error1 } = await supabase
        .from('blogs')
        .insert({
            course_id: newBlog.courseId,
            author_id: userLoggedIn.id,
            title: newBlog.title,
            content: newBlog.content,
        });
    if (error1)
        throw new Error(error1);
    return data1;
}

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    getBlogs,
    createBlog
}