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

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

const signup = async (req, res, next) => {
  try {
    const { email } = req.body;
    const oldUser = await User.findOne({ email });

    // Check if user with email exists
    if (oldUser) {
      return res
        .status(400)
        .json({ error: 'User with this email already exists', field: 'email' });
    }

    // Create new user
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

    // Check if user exists
    if (!user) {
      return res
        .status(401)
        .json({
          error: 'Invalid credentials. User does not exist.',
          field: 'email',
        });
    }

    // Check if password is correct
    if (!(await user.correctPassword(password, user.password))) {
      return res
        .status(401)
        .json({
          error: 'Password is incorrect! please try again',
          field: 'password',
        });
    }

    // If everything ok, send token to client
    createSendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res
        .status(401)
        .json({ error: 'You are not logged in! Please log in to get access.' });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    req.user = user;

    next();
  } catch (error) {
    res.clearCookie('jwt');
    return res.redirect('/');
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  logout,
  signup,
  login,
  protect,
};
