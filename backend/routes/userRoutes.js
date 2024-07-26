const express = require('express');
const router = express.Router();
const { getUserById, registerUser, loginUser, updateUserProfile, getProfile, upload } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Get a user by ID
router.get('/:id', authMiddleware, getUserById);

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Update user profile
router.put('/profile', authMiddleware, upload.single('profilePhoto'), updateUserProfile);

// Get user profile
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
