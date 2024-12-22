const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken } = require('../middlewares/authenticateToken');

courseRouter.route('/').get(courseController.getCourses).post(authenticateToken, courseController.createCourse);
// courseRouter.route('/:id').get(courseController.getCourse);     /* WARNING: this line makes every requests with base URL 'courses' get redirected to '/courses/:id' */
// // .patch(courseController.updateCourse);
courseRouter.route('/enrolledCourses').get(authenticateToken, courseController.getEnrolledCourses);
courseRouter.route('/instructedCourses').get(authenticateToken, courseController.getInstructedCourses)
courseRouter.route('/blogs').get(courseController.getBlogs).post(authenticateToken, courseController.createBlog);
courseRouter.route('/blogs/:id').get(authenticateToken, courseController.getBlog);
courseRouter.route('/lectures').post(authenticateToken, courseController.createLecture);
courseRouter.route('/lectures/:id').get(authenticateToken, courseController.getLecture);
courseRouter.route('/:id').get(courseController.getCourse);     /* WARNING: this line makes every requests with base URL 'courses' get redirected to '/courses/:id' */
// .patch(courseController.updateCourse);
courseRouter.route('/section').post(authenticateToken, courseController.createSection);

courseRouter.route('/admin/isAuth/:id').get(authenticateToken, courseController.isAdmin);

module.exports = {
    courseRouter
}