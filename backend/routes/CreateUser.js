import express from 'express';
import { body, validationResult } from 'express-validator';
import useController from '../controllers/useController.js';

const router = express.Router();

// Add validation middleware directly in the route
router.post(
  '/createuser',
  [
    // Validation rules
    body('email').isEmail().withMessage('Email must be valid'),
    body('name').isLength({min:5}),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  ],
  (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Proceed to the controller if no validation errors
    next();
  },
  useController.create_user
);

router.post('/loginuser',useController.login_user)

export default router;
