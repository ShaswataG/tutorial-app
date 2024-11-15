const { supabase } = require("../connect");
const courseService = require('../services/courseService');

/* POST: http://localhost:4000/courses */
const createCourse = async (req, res) => {
    console.log('inside courseController.createCourse');
    try {
        console.log('courseController.createCourse is getting called');
        const data = await courseService.createCourse(req.user, req.body);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}

/* GET: http:localhost:4000/courses/:id */
const getCourse = async (req, res) => {
    try {
        console.log(`courseController.getCourse is called`);
        const data = await courseService.getCourse(req.params.id);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error });
    }
}

/* GET: http://localhost:4000/courses/enrolledCourses */
const getEnrolledCourses = async (req, res) => {
    try {
        console.log(`courseController.getEnrolledCourses is called`);
        const data = await courseService.getEnrolledCourses(req.user);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error });
    }
}

const getInstructedCourses = async (req, res) => {
    try {
        console.log('inside courseController.getInstructedCourses is called');
        const data = await courseService.getInstructedCourses(req.user);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/* GET: http://localhost:4000/courses */
const getCourses = async (req, res) => {
    try {
        console.log(`courseController.getCourses is called`);
        console.log(req.body);
        const data = await courseService.getCourses(req.query);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/* PATCH: http://localhost:4000/courses/:id */
const updateCourse = async (req, res) => {
    try {
        const data = await courseService.updateCourse(req.params.id);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/* GET: http://localhost:4000/courses/blogs */
const getBlogs = async (req, res) => {
    try {
        const data = await courseService.getBlogs(req.query);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/* GET: http://localhost:4000/courses/blogs/:id */
const getBlog = async (req, res) => {
    try {
        const data = await courseService.getBlog(req.user, req.params.id);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/* GET: http://localhost:4000/courses/lectures/:id */
const getLecture = async (req, res) => {
    try {
        console.log(`Inside courseController.getLecture`);
        console.log(`req.params.id`, req.params.id);
        const data = await courseService.getLecture(req.user, req.params.id);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/* POST: http://localhost:4000/courses/blogs */
const createBlog = async (req, res) => {
    try {
        const data = await courseService.createBlog(req.user, req.body);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/* POST: http://localhost:4000/courses/lectures */
const createLecture = async (req, res) => {
    try {
        const data = await courseService.createLecture(req.user, req.body);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

/* GET: http://localhost:4000/courses/admin/isAuth/:id */
const isAdmin = async (req, res) => {
    try {
        const data = await courseService.isAdmin(req.user, req.params.id);
        return res.status(200).json(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createCourse,
    getCourse,
    getCourses,
    getEnrolledCourses,
    getInstructedCourses,
    getBlogs,
    getBlog,
    getLecture,
    createBlog,
    createLecture,
    isAdmin
}