const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  editUserProfilePicture,
  getImg,
  getRating,
} = require("../controllers/userController");

router.get("/", getAllUsers);

router.post("/img", editUserProfilePicture);
router.post("/check-img", getImg);
router.post("/check-rating", getRating);

module.exports = router;
