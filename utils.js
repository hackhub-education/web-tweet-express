exports.requireLogin = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.redirect('/login');
};