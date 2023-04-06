const express = require('express');
const router = express.Router();

const {
  registerUser,
  loginUser,
  kakaoLoginUser,
} = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/kakaologin', kakaoLoginUser);

module.exports = router;
