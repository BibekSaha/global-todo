import express from 'express';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.route('/signin')
  .post(authController.login);

router.route('/signup')
  .post(authController.signup);

export default router;
