const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken } = require('../middlewares/authenticateToken');

courseRouter.route('/').get(courseController.getCourses).post(authenticateToken, courseController.createCourse);
courseRouter.route('/:id').get(courseController.getCourse)
// .patch(courseController.updateCourse);
courseRouter.route('/blogs').get(courseController.getBlogs).post(authenticateToken, courseController.createBlog);
courseRouter.route('/blogs/:id').get(authenticateToken, courseController.getBlog);
courseRouter.route('/lectures').post(authenticateToken, courseController.createLecture);
courseRouter.route('/lectures/:id').get(authenticateToken, courseController.getLecture);

module.exports = {
    courseRouter
}