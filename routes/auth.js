const routes = require('express').Router();
const passport = require('passport');

routes.get(
  '/login',
  // #swagger.ignore=true
  passport.authenticate('google', { scope: ['profile'] })
);

routes.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api-docs',
    session: false,
  }),
  (req, res) => {
    // #swagger.ignore=true
    req.session.user = req.user;
    res.redirect('/');
  }
);

routes.get('/logout', (req, res, next) => {
  // #swagger.ignore=true
  req.logout((error) => {
    if (error) {
      return next(error);
    }
    res.redirect('/');
  });
});

module.exports = routes;
