const express = require("express");

const router = express.Router();

const {
  createEntry,
  getAllEntries,
  likeEntry,
  getAllComments,
  createComment,
  deleteEntry,
  editEntry,
  deleteComment,
} = require("../controllers/entryController");

router.delete("/delete", deleteEntry);
router.post("/new", createEntry);
router.get("/", getAllEntries);
router.put("/:id", editEntry);
router.put("/:id/like", likeEntry);

router.get("/:id", getAllComments);
router.post("/comment/new", createComment);
router.delete("/comment/delete", deleteComment);

module.exports = router;
