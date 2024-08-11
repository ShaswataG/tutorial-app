const courseModel = require('../models/courseModel');

const createCourse = async (userLoggedIn, courseInfo) => {
    console.log('courseService.createCourse is getting called');
    return await courseModel.createCourse(userLoggedIn, courseInfo);
}

const getCourses = async (query) => {
    return await courseModel.getCourses(query);
}

const getCourse = async (courseId) => {
    return await courseModel.getCourse(courseId);
}

const getBlogs = async (query) => {
    return await courseModel.getBlogs(query);
}

const getBlog = async (userLoggedIn, blogId) => {
    return await courseModel.getBlog(userLoggedIn, blogId);
}

const createBlog = async (userLoggedIn, newBlog) => {
    return await courseModel.createBlog(userLoggedIn, newBlog);
}

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    getBlogs,
    getBlog,
    createBlog
}