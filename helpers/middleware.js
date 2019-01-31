
function middleware(status = null) {
  return (req, res, next) => {
    if (!req.session.userLoggedIn) {
      res.redirect('/user/login');
    } else {
      if (req.session.userLoggedIn) {
        next();
      } else if (status && req.session.userLoggedIn.status === status) {
        next();
      } else {
        res.redirect('/user/login');
      }
    }
  }
}

module.exports = middleware;