const express = require('express');
const courseRouter = express.Router();
const courseController = require('../controllers/courseController');

courseRouter.route('/').get(courseController.getCourses);
courseRouter.route('/:id').get(courseController.getCourse).patch(courseController.updateCourse);