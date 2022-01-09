const express = require('express');

const middlewareService = require('../services/middlewareService.js');
const userController = require('../controllers/users/user.controller.js');

const router = express.Router();

router.param('user_id', userController.getUserById);

router.route('/login').post(userController.login);

router.route('/users/suggest').get(middlewareService.authenticateToken, userController.getSuggest);

router.route('/users').get(middlewareService.authenticateToken, userController.getUsers);

router
    .route('/user/:user_id')
    .get(middlewareService.authenticateToken, userController.getUser)
    .put(middlewareService.authenticateToken, userController.putUser)
    .delete(middlewareService.authenticateToken, userController.deleteUser);

router.route('/user').post(middlewareService.authenticateToken, userController.postUser);

module.exports = router;
