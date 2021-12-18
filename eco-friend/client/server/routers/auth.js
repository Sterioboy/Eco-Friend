const express = require("express");

const router = express.Router();

const {
  createUserAndSession,
  checkUserAndCreateSession,
  destroySession,
  deleteUser,
  editUserPassword,
} = require("../controllers/authController");
const { isValidPassword } = require("../middleware/checkPasswordMiddleware");

router.post("/signup", isValidPassword, createUserAndSession);
router.post("/signin", checkUserAndCreateSession);
router.post("/logout", destroySession);
router.delete("/:id", deleteUser);
router.put("/password", editUserPassword);

router.get("/check", (req, res) => {
  if (req.session.user.role === 1) res.json(req.session.user);
  if (req.session.user.role === 0) res.json(req.session.user);
  else res.json({});
});

module.exports = router;
