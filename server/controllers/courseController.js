const { supabase } = require("../connect");
const courseService = require('../services/courseService');

const createCourse = async (req, res) => {
    try {
        console.log('courseController.createCourse is getting called');
        const data = await courseService.createCourse(req.user, req.body);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getCourses = async (req, res) => {
    try {
        const data = await courseService.getCourses(req.body);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getBlogs = async (req, res) => {
    try {
        const data = await courseService.getBlogs(req.query);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

const getBlog = async (req, res) => {
    try {
        const data = await courseService.getBlog(req.user, req.params.id);
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

const createBlog = async (req, res) => {
    try {
        const data = await courseService.createBlog(req.user, req.body);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = {
    createCourse,
    getCourses,
    getBlogs,
    getBlog,
    createBlog
}