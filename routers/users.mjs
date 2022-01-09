import express from 'express';

import middlewareService from '../services/middlewareService.mjs';
import userController from '../controllers/users/user.controller.mjs';

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

export default router;
