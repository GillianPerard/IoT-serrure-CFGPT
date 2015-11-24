module.exports = function dashAuthenticated(req, res, next) {
  var token = null;
  //For session
  if (req.session.authenticated && req.session.userToken) {
    token = req.session.userToken;
  }

  if(!token) {
    req.flash('message', 'Vous devez être connecté pour accéder à cette page.');
    return res.redirect('/connexion');
  }

  JwtHandler.verify(token,function(err, decode){
    if (err) {
      req.flash('message', 'Vous devez être connecté pour accéder à cette page.');
      return res.redirect('/connexion');
    }
    Users.findOne({refreshToken:token}, function(err,user){
      if (err|| !user) {
        req.session.authenticated = false;
        req.session.userToken = undefined;
        req.flash('message', 'Vous devez être connecté pour accéder à cette page.');
        return res.redirect('/connexion');
      }
      next();
    });
  });
};
