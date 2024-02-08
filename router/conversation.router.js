const ConversationController = require('../controller/conversation.controller');
const Router = require("express").Router();

Router.post('/start-conversation', ConversationController.createConversation);
module.exports = Router;