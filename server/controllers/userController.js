const userService = require('../services/userService');

const login = async (req, res) => {
    try {
        const data = await userService.login(req.body);
        res
        .status(200)
        .json(data);
    } catch (error) {
        res
        .status(500)
        .json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const data = await userService.register(req.body);
        res
        .status(200)
        .json(data);
} catch (error) {
    res
        .status(500)
        .json({ message: error.message });
    }
}

const verifyMail = async (req, res) => {
    try {
        console.log('inside userController.verifyMail');
        console.log('req.body: ', req.body);
        const data = await userService.verifyUser(req.body);
        res
          .status(200)
          .json(data);
    } catch (error) {
        res
          .status(500)
          .json({ message: error.message });
    }
}

const getUsers = async (req, res) => {
    try {
        const data = await userService.getUsers(req.query);
        res
          .status(200)
          .json(data);
    } catch (error) {
        res
          .status(500)
          .json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const data = await userService.getUser(req.params.id);
        res
          .status(200)
          .json(data);
    } catch (error) {
        res
          .status(500)
          .json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const data = await userService.updateUser(req.params.id, req.body);
        res
          .status(200)
          .json(data);
    } catch (error) {
        res
          .status(500)
          .json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const data = await userService.deleteUser(req.params.id);
        res
          .status(200)
          .json(data);
    } catch (error) {
        res
          .status(500)
          .json({ message: error.message });
    }
}

const addAdmin = async (req, res) => {
    try {
        const data = await userService.makeAdmin(req.user, req.body.user_id, req.body.course_id);
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    login,
    createUser,
    verifyMail,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    addAdmin
}