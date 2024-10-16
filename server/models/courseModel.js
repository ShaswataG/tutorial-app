const { query } = require('express');
const { supabase } = require('../connect');
const { REALTIME_SUBSCRIBE_STATES } = require('@supabase/supabase-js');
const { errorMonitor } = require('nodemailer/lib/ses-transport');

// const createCourse = async (userLoggedIn, newCourseInfo) => {
//     let { title, description, isPaid, price } = newCourseInfo;
//     isPaid = (isPaid === 'true') ? true : false;
//     price = Number(price);
//     const { data, error } = await supabase
//         .from('courses')
//         .insert({
//             title: title,
//             description: description,
//             is_paid: isPaid,
//             price: price,
//             author_id: userLoggedIn.id
//         })
//         .select('id');
//     if (error)
//         throw new Error(`Couldn't insert course`);
//     return data;
// }

const createSection = async (userLoggedIn, newSectionInfo) => {
    const { courseId, title, position } = newSectionInfo;
    const data = await supabase
        .from('sections')
        .insert({
            course_id: courseId,
            title: title,
            position: position
        });
    if (error)
        throw new Error(error);
    return data;
}

const createCourse = async (userLoggedIn, newCourseInfo) => {
    try {
        console.log('courseModel.createCourse is being called');
        console.log(userLoggedIn);
        console.log(newCourseInfo);
        let { id } = userLoggedIn;
        let { title, description, level, isPaid, price } = newCourseInfo;
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
                level: level,
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
                is_owner: true
            });
        console.log('data2', data2);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

const getCourses = async (query) => {
    console.log('courseModel.getCourses is getting called');
    console.log(query);
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
    console.log(`courseModel.getCourse is called`);
    let { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId);
    console.log(`courseModel.getCourse: 1`);
    if (error)
        throw new Error(error);
    return data;
}

const getCourseContent= async (courseId) => {
    let { data, error } = await supabase
        .from('sections')
        .select(`
            id: title,
            lectures: lectures(id, title, position)
            blogs: blogs('id, title, position')
        `)
        .eq('course_id', courseId)
        .order('position', { ascending: true });
    if(error)
        throw new Error(error);
    return data;
}

const getCourseSections = async (courseId) => {
    // console.log('courseModel.getCourseSections');
    let { data, error } = await supabase
        .from('sections')
        .select('*')
        .eq('course_id', courseId)
        .order('position', { ascending: true });
    if (error)
        throw new Error(error);
    // console.log('data', data);
    return data;
}

const getAllSectionContent = async (sectionId) => {
    console.log(`courseModel.getSectionContent is being called`);
    console.log('sectionId: ', sectionId);
    let { data, error } = await supabase
        .from('section_content')
        .select('*, lectures(*), blogs(*)')
        .eq('section_id', sectionId)
        .order('position', { ascending: true });
    if (error) {
        console.error(error);
        throw new Error(error);
    }
    console.log(data[0]);
    return data;
}

const getEnrolledCourses = async (userLoggedIn) => {
    console.log(`courseModel.getEnrolledCourses is called`);
    let { data, error } = await supabase
        .from('user_roles')
        .select('courses(*)')
        .match({
            user_id: userLoggedIn.id,
            role: 'student'
        });
    if (error)
        throw new Error(error);
    return data;
}

const getInstructedCourses = async (userLoggedIn) => {
    let { data, error } = await supabase
        .from('user_roles')
        .select('courses(*)')
        .match({
            user_id: userLoggedIn.id,
            role: 'admin'
        });
    if (error)
        throw new Error(error);
    return data;
}

const getCourseAdmins = async (courseId) => {
    let { data, error } = await supabase
        .from('user_roles')
        .select('*, users(username)')
        .eq('course_id', courseId)
        .eq('role', 'admin');
    if (error)
        throw new Error(error);
    return data;
}

const getCourseLearningPoints = async (courseId) => {
    console.log(`courseModel.getCourseLearningPoints is called`);
    let { data, error } = await supabase
        .from('course_learning_points')
        .select('*')
        .eq('course_id', courseId);
    console.log(`courseModel.getCourseLearningPoints: 1`);
    if (error) {
        console.error(error);
        throw new Error(error.message);
    }
    console.log(`courseModel.getCourseLearningPoints: 2`);
    return data;
}

const insertSectionContent = async (sectionId, title, position) => {
    console.log('sectionId', sectionId);
    let { data, error } = await supabase
        .from('section_content')
        .insert({
            section_id: sectionId,
            title: title,
            position: position
        })
        .select();
    if (error) {
        console.error(error);
        throw new Error(error);
    }
    return data;
}

const getSectionContent = async (sectionId) => {
    let { data, error } = await supabase
        .from('section_content')
        .select('blogs(*), lectures(*)')
        .eq('section_id', sectionId)
        .order('position', { ascending: true });
    if (error)
        throw new Error(error);
    // console.log('data: ', data);
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

const getBlog = async (blogId) => {
    const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', blogId)
        .single();
    if (error) {
        console.error(error);
        throw new Error(`Couldn't fetch blog`);
    }
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
            section_content_id: newBlog.section_content_id,
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
            section_id: Number(newLecture.section_id),
            author_id: Number(userLoggedIn.id),
            title: newLecture.title,
            video_url: newLecture.video_url,
            description: newLecture.description
        });
    if (error)
        throw new Error(`Lecture upload failed`);
    return true;
}

module.exports = {
    createSection,
    createCourse,
    insertSectionContent,
    getCourses,
    getCourse,
    getCourseContent,
    getCourseSections,
    getSectionContent,
    getAllSectionContent,
    getEnrolledCourses,
    getInstructedCourses,
    getCourseAdmins,
    getCourseLearningPoints,
    getBlogs,
    getBlog,
    getLecture,
    getEnrollment,
    checkUserRoles,
    insertBlog,
    insertLecture
}