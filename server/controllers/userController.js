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
          .json({ error: error });
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
          .json({error: error});
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
          .json({error: error});
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
          .json({error: error});
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
          .json({ error: error });
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
          .json({ error: error });
    }
}

module.exports = {
    login,
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}