exports.checkAuthForUser = (req, res, next) => {
  if (req.session.user.role === '1') next();
  else res.redirect('/');
};
