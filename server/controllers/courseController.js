const { supabase } = require("../connect");
const courseService = require('../services/courseService');

/* POST: http://localhost:4000/courses */
const createCourse = async (req, res) => {
    try {
        console.log('courseController.createCourse is getting called');
        const data = await courseService.createCourse(req.user, req.body);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

/* GET: http://localhost:4000/courses */
const getCourses = async (req, res) => {
    try {
        const data = await courseService.getCourses(req.body);
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

module.exports = {
    createCourse,
    getCourses,
    getBlogs,
    getBlog,
    getLecture,
    createBlog,
    createLecture
}