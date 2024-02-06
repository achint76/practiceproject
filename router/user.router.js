const UserController = require('../controller/user.controller');
const Router = require("express").Router();

Router.get('/get-user', UserController.getUser);
Router.post('/add-user', UserController.createUser);
Router.put('/update-user', UserController.updateUser);
Router.put('/delete-user', UserController.deleteUser);
Router.get('/listing-user',UserController.listUser);
Router.post('/login', UserController.userLogin);
module.exports = Router;