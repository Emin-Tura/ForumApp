import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import tryCatch from "./utils/tryCatch.js";

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const emailLowerCase = email.toLowerCase();

  const existedUser = await User.findOne({ email: emailLowerCase });
  if (!existedUser)
    return res.status(404).json({
      success: false,
      message: "Giriş Bilgileri Hatalı veya Böyle Bir Kullanıcı Yok",
    });
  const correctPassword = await bcrypt.compare(password, existedUser.password);

  if (!correctPassword)
    return res.status(400).json({
      success: false,
      message: "Giriş Bilgileri Hatalı veya Böyle Bir Kullanıcı Yok",
    });

  const { _id: id, email: tempEmail, authority } = existedUser;
  const token = jwt.sign({ id, tempEmail, password }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({
    success: true,
    result: {
      id,
      email: tempEmail,
      authority,
      token,
    },
  });
});

export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
});

export const createUser = tryCatch(async (req, res) => {
  const { username, email, password, authority } = req.body;

  const emailLowerCase = email.toLowerCase();
  const userNameLowerCase = username.toLowerCase();
  const existedUser = await User.findOne({
    $or: [{ username: userNameLowerCase }, { email: emailLowerCase }],
  });

  if (existedUser)
    return res
      .status(400)
      .json({ success: false, message: "Kullanıcı Zaten Var!" });

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    username,
    email: emailLowerCase,
    password: hashedPassword,
    authority,
  });
  const { _id: id } = user;
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.status(201).json({
    success: true,
    result: {
      id,
      username,
      email: user.email,
      password: hashedPassword,
      token,
      authority,
    },
  });
});
