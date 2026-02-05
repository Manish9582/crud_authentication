exports.isAdminLoggedIn = (req, res, next) => {
  if (req.path === '/login' || req.path === '/sign' ||
      req.path === '/login/admin' || req.path === '/add-new/admin') {
    return next();
  }

  if (req.session.admin) {
    next();
  } else {
    res.redirect('/login');
  }
};
