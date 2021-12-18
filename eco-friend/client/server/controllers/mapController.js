const Map = require("../db/models/map");
const User = require("../db/models/user");

exports.getMap = async (req, res) => {
  try {
    const map = await Map.find().populate("author");
    res.json(map);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }

  res.status(200).end();
};

exports.setNewMarker = async (req, res) => {
  try {
    await Map.create(req.body);
    res.status(200).end();
  } catch (error) {
    console.error("Error message:", error.message);
    console.error("Error code", error);
    res.status(500).end();
  }
};

exports.editMapPoint = async (req, res) => {
  try {
    const { values, link } = req.body;
    const id = req.params.id;
    await Map.updateOne(
      { _id: id },
      {
        confirmed: true,
      }
    );
    const updatedPoint = await Map.findOne({ _id: id }).populate("author");
    res.json(updatedPoint);
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.status(200).end();
};

exports.deletePoint = async (req, res) => {
  const id = req.params.id;
  try {
    await Map.deleteOne({ _id: id });
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.json({ message: "ok" });
  res.status(200).end();
};

exports.addStar = async (req, res) => {
  const pointId = req.params.id;
  const currentUserId = req.session.user.id;
  let authorOfPoint;
  let updatedRating;

  try {
    const point = await Map.findOne({ _id: pointId }).populate("author");
    authorOfPoint = point.author._id;
    const findStar = point.stars.indexOf(currentUserId);

    if (findStar === -1) {
      point.stars.push(currentUserId);
      updatedRating = point.author.rating + 1;
    } else {
      point.stars.splice(findStar, 1);
      updatedRating = point.author.rating - 1;
    }
    await Map.updateOne({ _id: pointId }, { $set: { stars: point.stars } });
    await User.updateOne({ _id: authorOfPoint }, { rating: updatedRating });
    await User.findOne({ _id: point.author._id });
  } catch (err) {
    console.error("Err message:", err.message);
    console.error("Err code", err);
  }
  res.json({ authorOfPoint });
  res.status(200).end();
};
