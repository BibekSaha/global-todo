import express from 'express';
import { authenticated } from '../middlewares/authenticated.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.route('/me')
  .delete(authenticated, userController.deleteUser);

export default router;
