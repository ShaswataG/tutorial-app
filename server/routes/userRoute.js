const express = require('express');
const userControllers = require('../controllers/userController');
const userRouter = express.Router();
const { authenticateToken } = require('../middlewares/authenticateToken');

userRouter.route('/').get(userControllers.getUsers).post(userControllers.createUser);
userRouter.route('/verify').post(userControllers.verifyMail);
userRouter.route('/:id').get(userControllers.getUser).patch(userControllers.updateUser).delete(userControllers.deleteUser);
userRouter.route('/login').post(userControllers.login);
userRouter.route('/coursesAdmins').post(authenticateToken, userControllers.addAdmin);

module.exports = {
    userRouter
};