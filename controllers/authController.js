import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    createSendToken(newUser, 201, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    // Check if user provided email or password
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Please Provide email and password' });
    }

    if (!user) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials. User does not exist.' });
    }

    // Check if password is correct
    if (!(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .json({ error: 'Password is incorrect! please try again' });
    }

    // If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  signup,
  login,
};
