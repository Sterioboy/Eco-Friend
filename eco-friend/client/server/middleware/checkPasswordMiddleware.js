exports.isValidPassword = (req, res, next) => {
  const { password } = req.body;
  const regexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  regexp.test(password) ? next() : res.json(null);
};
