const { captureRejectionSymbol } = require('nodemailer/lib/xoauth2');
const courseModel = require('../models/courseModel');

const createSection = async (userLoggedIn, sectionInfo) => {
    return await courseModel.createSection(userLoggedIn, sectionInfo)
}

const createCourse = async (userLoggedIn, courseInfo) => {
    console.log('courseService.createCourse is getting called');
    return await courseModel.createCourse(userLoggedIn, courseInfo);
}

const getCourses = async (query) => {
    // return await courseModel.getCourses(query);
    try {
        let courses = await courseModel.getCourses(query);
        courses = await Promise.all(courses.map(async (course) => {
            let admins = await courseModel.getCourseAdmins(course.id);
            admins = admins.map(admin => admin.users.username);
        
            return {
                ...course,
                admins
            };
        }));
        console.log(courses);
        return courses;
    } catch (error) {
        throw new Error(error);
    }
}

const getCourse = async (courseId) => {
    try {
        console.log(`courseService.getCourse is being called`);
        let course = await courseModel.getCourse(courseId)
        course = course[0];
        console.log(`courseService.getCourse: 1`);
        let courseLearningPoints = await courseModel.getCourseLearningPoints(courseId);
        console.log(`courseService.getCourse: 2`);
        courseLearningPoints = courseLearningPoints.map(courseLearningPoint => courseLearningPoint.point);
        console.log(courseLearningPoints);
        let courseAdmins = await courseModel.getCourseAdmins(courseId);
        courseAdmins = courseAdmins.map(courseAdmin => admin.users.username);
        let courseContent = await courseModel.getCourseContent(courseId);
        courseContent = courseContent
        course = {
            ...course,
            courseAdmins,
            courseLearningPoints
        }
        console.log(course);
        return course;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getEnrolledCourses = async (userLoggedIn) => {
    try {
        console.log(`courseService.getEnrolledCourses is called`);
        let enrolledCourses = await courseModel.getEnrolledCourses(userLoggedIn);
        enrolledCourses = enrolledCourses.map(enrolledCourse => {
            return enrolledCourse.courses;
        })
        enrolledCourses = await Promise.all(enrolledCourses.map(async (enrolledCourse) => {
            let admins = await courseModel.getCourseAdmins(enrolledCourse.id);
            admins = admins.map(admin => admin.users.username);
            return {
                ...enrolledCourse,
                admins
            };
        }))
        console.log(enrolledCourses);
        return enrolledCourses;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

const getInstructedCourses = async (userLoggedIn) => {
    try {
        let instructedCourses = await courseModel.getInstructedCourses(userLoggedIn);
        instructedCourses = instructedCourses.map(instructedCourse => {
            return instructedCourse.courses;
        })
        instructedCourses = await Promise.all(instructedCourses.map(async (instructedCourse) => {
            let admins = await courseModel.getCourseAdmins(instructedCourse.id);
            admins = admins.map(admin => admin.users.username);
            return {
                ...instructedCourse,
                admins
            };
        }))
        console.log(instructedCourses);
        return instructedCourses;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
}

const getBlogs = async (query) => {
    return await courseModel.getBlogs(query);
}

// const getBlog = async (userLoggedIn, blogId) => {
//     return await courseModel.getBlog(userLoggedIn, blogId);
// }

const getBlog = async (userLoggedIn, blogId) => {
    try {
        const blog = await courseModel.getBlog(blogId);
        const { course_id } = blog;
        const userRole = await courseModel.getEnrollment(userLoggedIn, course_id);
        const isAccessible = (userRole.length < 1) ? false : true;
        if (isAccessible === true)
            return blog;
        else
            throw new Error(`Unauthorized access`);
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

const getLecture = async (userLoggedIn, lectureId) => {
    try {
        console.log(`Inside userService.getLecture`);
        console.log(`lectureId: `, lectureId);
        const lecture = await courseModel.getLecture(Number(lectureId));
        const { course_id } = lecture;
        const userRole = await courseModel.getEnrollment(userLoggedIn, course_id);
        const isAccessible = (userRole.length < 1) ? false : true;
        if (isAccessible === true)
            return lecture;
        else
            throw new Error(`Unauthorized access`);
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

const createBlog = async (userLoggedIn, newBlog) => {
    try {
        console.log(`courseService.createBlog is being called`);
        const checkUserRoles = await courseModel.checkUserRoles(userLoggedIn, newBlog);
        if (checkUserRoles.length < 1) {
            throw new Error(`You don't have write access to this course`);
        }
        if (await courseModel.insertBlog(userLoggedIn, newBlog) === true)
            return true;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

const createLecture = async (userLoggedIn, newLecture) => {
    try {
        console.log(`courseService.createBlog is being called`);
        const checkUserRoles = await courseModel.checkUserRoles(userLoggedIn, newLecture);
        if (checkUserRoles.length < 1) {
            throw new Error(`You don't have write access to this course`);
        }
        if (await courseModel.insertLecture(userLoggedIn, newLecture) === true)
            return true;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}

module.exports = {
    createSection,
    createCourse,
    getCourses,
    getCourse,
    getEnrolledCourses,
    getInstructedCourses,
    getBlogs,
    getBlog,
    createBlog,
    getLecture,
    createLecture
}