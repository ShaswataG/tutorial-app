const { query } = require('express');
const { supabase } = require('../connect');
const { REALTIME_SUBSCRIBE_STATES } = require('@supabase/supabase-js');

const createCourse = async (userLoggedIn, newCourseInfo) => {
    try {
        console.log('courseModel.createCourse is being called');
        console.log(userLoggedIn);
        console.log(newCourseInfo);
        let { id } = userLoggedIn;
        let { title, description, isPaid, price } = newCourseInfo;
        isPaid = (isPaid === 'true') ? true : false;
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

const getBlog = async (userLoggedIn, blogId) => {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .single();
    if (error)
        throw new Error(`Couldn't fetch blog`);
    return data;
}

const getLecture = async (lectureId) => {
    console.log('Inside courseModel.getLecture');
    console.log('lectureId: ', lectureId);
    const { data, error } = await supabase
        .from('lectures')
        .select('*')
        .eq('id', lectureId)
        .single();
    if (error)
        throw new Error(error.message);
    console.log('data', data)
    return data;
}

const getEnrollment = async (userLoggedIn, courseId) => {
    const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .match({
            user_id: userLoggedIn.id,
            course_id: courseId
        })
    if (error)
        throw new Error(`Couldn't fetch user_roles`);
    return data;
}

const checkUserRoles = async (userLoggedIn, newBlog) => {
    const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .match({
            user_id: userLoggedIn.id,
            course_id: newBlog.course_id,
            role: 'admin'
        })
    if (error)
        throw new Error(`Couldn't fetch user_roles`);
    return data;
}

const insertBlog = async (userLoggedIn, newBlog) => {
    const { data, error } = await supabase
        .from('blogs')
        .insert({
            course_id: Number(newBlog.course_id),
            author_id: Number(userLoggedIn.id),
            title: newBlog.title,
            content: newBlog.content,
        });
    if (error)
        throw new Error(`Blog upload failed`);
    return true;
}

const insertLecture = async (userLoggedIn, newLecture) => {
    const { data, error } = await supabase
        .from('lectures')
        .insert({
            course_id: Number(newLecture.course_id),
            author_id: Number(userLoggedIn.id),
            title: newLecture.title,
            video_url: newLecture.video_url,
            description: newLecture.description
        })
    if (error)
        throw new Error(`Lecture upload failed`);
    return true;
}

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    getBlogs,
    getBlog,
    getLecture,
    getEnrollment,
    checkUserRoles,
    insertBlog,
    insertLecture
}