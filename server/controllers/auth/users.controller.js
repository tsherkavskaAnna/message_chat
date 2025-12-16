const User = require("../../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");

const { SECRET_KEY } = process.env;

const getAllUsers = async (req, res) => {
  const users = await User.find();
  return res.status(201).json({
    status: "success",
    code: 200,
    data: { users },
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw HttpError(409, "Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarImage = req.file ? req.file.path : "";
  const veryficationCode = nanoid();

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    avatarImage: avatarImage,
    veryficationCode,
  });

  const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" });
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  const verifyEmailUrl = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${process.env.BASE_URL}/api/auth/verify/${veryficationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmailUrl);

  return res.status(201).json({
    status: "success",
    code: 201,
    message: "User created",
    data: { user },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const avatarImage = req.file ? req.file.path : "";

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email o password are wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  if (!user.verify) {
    throw HttpError(401, "Email not verified");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    message: "Login successfull",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      avatarImage: avatarImage,
    },
  });
};

// Cambiare dati di user o aggiungere avatar
const updateUser = async (req, res) => {
  const { username, email } = req.body;

  let avatarImage;

  if (req.file) {
    avatarImage = req.file.path;
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      ...(username && { username }),
      ...(email && { email }),
      ...(avatarImage && { avatarImage }),
    },
    { new: true }
  );
  return res.json({
    status: "success",
    code: 200,
    message: "User updated",
    data: { user },
  });
};

const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.json({
    id: user._id,
    email: user.email,
    username: user.username,
    avatarImage: user.avatarImage,
  });
};

//Controllare e mandare code per verificare email
const veryficationEmail = async (req, res) => {
  const { veryficationCode } = req.params;

  const user = await User.findOne({ veryficationCode });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    veryficationCode: "",
    verify: true,
  });
  res.json({
    message: "User verified with success",
  });
};
// Rimandare di nuovo email se user non ha ricevuto email prima
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  const verifyEmailUrl = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${process.env.BASE_URL}/api/auth/verify/${user.veryficationCode}">Click verify email</a>`,
  };

  await sendEmail(verifyEmailUrl);
  res.json({
    message: "Email resend with success",
  });
};

const logout = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({
    message: "Logout succesfull",
  });
};

module.exports = {
  getAllUsers: ctrlWrapper(getAllUsers),
  login: ctrlWrapper(loginUser),
  register: ctrlWrapper(registerUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateUser: ctrlWrapper(updateUser),
  veryficationEmail: ctrlWrapper(veryficationEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  logout: ctrlWrapper(logout),
};
