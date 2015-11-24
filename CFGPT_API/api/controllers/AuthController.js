
var AuthController = {

  /** AUTH POUR API **/

  login: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if(!email || !password) return res.json(401,{err:'Email and password required !'});

    Users.findOne({email:email},function(err,user){
      if (err){
        console.log(err);
        return res.json(403,{err : 'forbidden'});
      }
      if(!user) return res.json(401, 'invalid email or password');

      Users.comparePassword(password,user, function(err,valid){
        if (err){
          console.log(err);
          return res.json(403,{err : 'forbidden'});
        }
        if(!valid) return res.json(401, 'invalid email or password');

        token = JwtHandler.generate({email:user.email,id:user.id});
        user.token = token;

        user.save(function(err){
          if (err) return res.json(403,{err : 'forbidden'});

          return res.json({
            user:user,
            token : token
          });
        });
      });
    });

  },
  refresh : function(req, res){
    var user = req.user || false;

    if(user){
      var decoded = JwtHandler.decode(user.refreshToken);
      if(decoded.email === user.email){
        token = JwtHandler.generate({email:user.email,id: user.id});
        user.token = token;
        user.save(function(err){
          if(err) return res.json(403, {err:'forbidden'});
          return res.json(
            {
              user: user,
              token:token
            }
          )
        })
      }
    }else{
      return res.json(403, {err:'forbidden'});
    }
  },


  /****************** DASHBOARD *******************/

  connexion :function (req, res) {
    if (req.session.authenticated && req.session.userToken) {
      return res.redirect('/trousseaux');
    };
    return res.view();
  },

  inscription :function (req, res) {
    if (req.session.authenticated && req.session.userToken) {
      return res.redirect('/trousseaux');
    };
    return res.view();
  },

  dashLogin: function (req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if(!email || !password) {
      req.flash('message', 'Veuillez renseigner les champs.');
      return res.redirect('/connexion');
    }

    Users.findOne({email:email},function(err,user){
      if (err){
        req.flash('message', 'Une erreur est survenue.');
        return res.redirect('/connexion');
        //return res.json(403,{err : 'forbidden'});
      }
      if(!user){
        req.flash('message', 'Identifiants incorrects ! Veuillez réessayer.');
        return res.redirect('/connexion');
      }

      Users.comparePassword(password,user, function(err,valid){
        if (err){
          req.flash('message', 'Une erreur est survenue.');
          return res.redirect('/connexion');
        }
        if(!valid) {
          req.flash('message', 'Identifiants incorrects ! Veuillez réessayer.');
          return res.redirect('/connexion');
        }

        token = JwtHandler.generate({email:user.email,id:user.id});
        user.refreshToken = token;

        user.save(function(err){
          if (err) {
            req.flash('message', 'Une erreur est survenue.');
            return res.redirect('/connexion');
          }

          //Sauvegarde de la session
          req.session.authenticated = true;
          req.session.userToken = token;

          return res.redirect('/trousseaux');
        });
      });
    });

  },

  dashLogout: function (req, res) {
    req.session.authenticated = false;
    req.session.userToken = undefined;
    req.flash('valid', 'Vous avez bien été déconnecté.');
    return res.redirect('/connexion');
  },

};

module.exports = AuthController;
