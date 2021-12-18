const User = require("../db/models/user");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }

  res.status(200).end();
};

exports.editUserProfilePicture = async (req, res) => {
  try {
    const { id, link } = req.body;
    const updatedUser = await User.updateOne(
      { _id: id },
      {
        img: link,
      }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.status(200).end();
};

exports.getImg = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findOne({ _id });
    res.json(user.img);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.status(200).end();
};

exports.getRating = async (req, res) => {
  try {
    const { _id } = req.body;
    const user = await User.findOne({ _id });
    res.json(user.rating);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.status(200).end();
};
