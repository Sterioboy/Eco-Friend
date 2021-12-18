const Entry = require("../db/models/entry");
const Comment = require("../db/models/comment");
const Like = require("../db/models/like");

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await Entry.find().populate("author");

    const sortedEntries = entries.sort(
      (a, b) => Date.parse(b.date) - Date.parse(a.date)
    );
    res.json(sortedEntries);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }

  res.status(200).end();
};

exports.createEntry = async (req, res, next) => {
  try {
    const { values, link } = req.body;

    const newEntry = await Entry.create({
      text: values.text,
      category: values.category,
      img: link,
      author: req.session.user.id,
      date: new Date(),
    });

    const entry = await Entry.findOne({
      text: values.text,
      category: values.category,
      img: link,
      author: req.session.user.id,
    }).populate("author");
    res.json(entry);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }

  res.status(200).end();
};

exports.editEntry = async (req, res) => {
  try {
    const { values, link } = req.body;
    const entryId = req.params.id;
    await Entry.updateOne(
      { _id: entryId },
      {
        text: values.text,
        category: values.category,
        img: link,
      }
    );
    const updatedEntry = await Entry.findOne({ _id: entryId });
    res.json({ updatedEntry });
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.status(200).end();
};
exports.likeEntry = async (req, res) => {
  const entryId = req.params.id;
  const userId = req.session.user.id;
  try {
    const entry = await Entry.findOne({ _id: entryId });
    const likeIndex = entry.likes.indexOf(userId);

    likeIndex === -1
      ? entry.likes.push(userId)
      : entry.likes.splice(likeIndex, 1);

    await Entry.updateOne({ _id: entryId }, { likes: entry.likes });

    const like = await Like.findOne({ entry: entryId, user: userId });
    if (like) {
      await Like.findOne({ entry: entryId, user: userId }).remove().exec();
    } else {
      const addedLike = await Like.create({
        user: userId,
        entry: entryId,
        date: new Date(),
      });
    }
    res.json({ message: "ok" });
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.status(200).end();
};

exports.deleteEntry = async (req, res) => {
  const { id } = req.body;
  try {
    await Entry.deleteOne({ _id: id });
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.json({ message: "ok" });
  res.status(200).end();
};

exports.getAllComments = async (req, res) => {
  const entryId = req.params.id;
  try {
    const comments = await Comment.find({ entry: entryId }).populate("author");

    const sortedComments = comments.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );
    res.json(sortedComments);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.status(200).end();
};
exports.createComment = async (req, res, next) => {
  try {
    const { values, entryId } = req.body;

    const newComment = await Comment.create({
      text: values.text,
      entry: entryId,
      author: req.session.user.id,
      date: new Date(),
    });
    const comment = await Comment.findOne({
      text: values.text,
      entry: entryId,
      author: req.session.user.id,
    }).populate("author");

    res.json(comment);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }

  res.status(200).end();
};
exports.deleteComment = async (req, res) => {
  const { id } = req.body;
  try {
    await Comment.deleteOne({ _id: id });
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.json({ message: "ok" });
  res.status(200).end();
};
