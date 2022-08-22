import express from 'express';

const router = express.Router();

router.route('/me')
  .get()
  .delete();

export default router;
