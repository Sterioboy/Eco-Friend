const bcrypt = require("bcryptjs");
const User = require("../db/models/user");
const Entry = require("../db/models/entry");
const Comment = require("../db/models/comment");
const Map = require("../db/models/map");

const nodemailer = require("nodemailer");

const sendEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mebelmebel545@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"EcoFriend" <mebelmebel545@gmail.com>',
    to: user.email,
    subject: `Registration on EcoFriend ✔`,
    text: `Welcome to EcoFriend, ${user.name}!`,
  });
};

const sendLeavingEmail = async (user) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "mebelmebel545@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"EcoFriend" <mebelmebel545@gmail.com>',
    to: user.email,
    subject: "EcoFriend",
    text: `We will miss you, ${user.name}! If you ever decide to come back, we will welcome you warmly.`,
  });
};

function failAuth(res) {
  res.json(null);
}

function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

exports.createUserAndSession = async (req, res, next) => {
  const { name, password, email } = req.body;
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      name: name,
      password: hashedPassword,
      email: email,
    });

    req.session.user = serializeUser(user);
    sendEmail(user);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err.code);
    return failAuth(res);
  }
  res.json(req.session.user.id);
  res.status(200).end(); // ответ 200 + отправка cookies в заголовке на сервер
};

exports.checkUserAndCreateSession = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Пытаемся сначала найти пользователя в БД
    const user = await User.findOne({ email: email });
    if (!user) return failAuth(res);

    // Сравниваем хэш в БД с хэшем введённого пароля
    const isValidPassword = await bcrypt.compare(password, user.password);
    // const isValidPassword = user.password === password;

    if (!isValidPassword) return failAuth(res);

    // записываем в req.session.user данные (id & name) (создаем сессию)
    req.session.user = serializeUser(user);
    console.log(req.session.user);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err.code);
    return failAuth(res);
  }
  res.json(req.session.user.id);
  res.status(200).end(); // ответ 200 + отправка cookies в заголовке на сервер
};

exports.destroySession = (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie("sid");
      res.send({});
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  let { userId } = req.body;
  let { user } = req.session;
  try {
    if (req.session.user.id === req.params.id && req.session.user.role === 1) {
      await Comment.deleteMany({ author: req.params.id });
      await Entry.deleteMany({ author: req.params.id });
      await User.deleteMany({ _id: req.params.id });
      sendLeavingEmail(user);
    }
    if (req.session.user.role === 0) {
      await Comment.deleteMany({ author: userId });
      await Entry.deleteMany({ author: userId });
      await User.deleteMany({ _id: userId });
      await Map.deleteMany({ author: userId });
    }
  } catch (error) {
    console.log(error.message);
  }
  res.status(200).end();
};

// exports.editUserProfilePicture = async (req, res) => {
//   try {
//     const { id, link } = req.body;
//     const updatedUser = await User.updateOne(
//       { _id: id },
//       {
//         img: link,
//       }
//     );
//     res.json(updatedUser);
//   } catch (err) {
//     console.error("Err message:", err.message);
//     console.error("Err code", err);
//   }
//   res.status(200).end();
// };

// exports.getImg = async (req, res) => {
//   try {
//     const { _id } = req.body;
//     const user = await User.findOne({ _id });
//     res.json(user.img);
//   } catch (err) {
//     console.error("Err message:", err.message);
//     console.error("Err code", err);
//   }
//   res.status(200).end();
// };

// exports.getRating = async (req, res) => {
//   try {
//     const { _id } = req.body;
//     const user = await User.findOne({ _id });
//     res.json(user.rating);
//   } catch (err) {
//     console.error("Err message:", err.message);
//     console.error("Err code", err);
//   }
//   res.status(200).end();
// };

exports.editUserPassword = async (req, res) => {
  try {
    const { prev, newpass } = req.body;
    const id = `new ObjectId(\"${req.session.user.id}\")`; //id user in DB

    // Пытаемся сначала найти пользователя в БД
    const user = await User.findOne({ _id: req.session.user.id });
    if (!user) return failAuth(res);

    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(newpass, saltRounds);

    // Сравниваем хэш в БД с хэшем введённого пароля
    const isValidPassword = await bcrypt.compare(prev, user.password);
    if (isValidPassword) {
      await User.updateOne(
        { _id: req.session.user.id },
        { password: newHashedPassword }
      );
      res.json({ message: "ok" });
    }
    if (!isValidPassword) return failAuth(res);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err.code);

    return failAuth(res);
  }
  res.status(200).end(); // ответ 200 + отправка cookies в заголовке на сервер
};
