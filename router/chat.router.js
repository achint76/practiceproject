const ChatController = require('../controller/chat.controller');
const Router = require("express").Router();

Router.post('/write-message', ChatController.startChat);
module.exports = Router;