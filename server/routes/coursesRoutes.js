const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken } = require('../middlewares/authenticateToken');
const { getCourse } = require('../models/courseModel');

courseRouter.route('/').get(courseController.getCourses).post(authenticateToken, courseController.createCourse);
// courseRouter.route('/:id').get(courseController.getCourse).patch(courseController.updateCourse);
courseRouter.route('/blogs').get(courseController.getBlogs).post(authenticateToken, courseController.createBlog);

module.exports = {
    courseRouter
}