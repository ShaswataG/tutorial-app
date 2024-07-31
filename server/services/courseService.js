const courseModel = require('../models/courseModel');

const createCourse = async (courseInfo) => {
    return await courseModel.createCourse(courseInfo);
}

const getCourses = async (courseInfo) => {
    return await courseModel.getCourses();
}

const getCourse = async (courseId) => {
    return await courseModel.getCourse(courseId);
}