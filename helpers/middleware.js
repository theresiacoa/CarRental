
function middleware(status) {
  return (req, res, next) => {
    if (req.session.userLoggedIn.status = status) {
      next()
    } else {
      res.redirect('/user/register');
    }
  }
}

module.exports = middleware;