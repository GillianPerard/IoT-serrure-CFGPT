/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  // Récupère les groupes d'un user à partir de son token (dans le HEADER)
  getGroupsByToken: function(req,res){
    var _tokenUser = req.headers.authorization;

    //Si pas de token, on drop
    if (!_tokenUser) return res.json(400,{err:'PARAMS ERROR.'});

    Users.findOneByToken(_tokenUser).exec(function(err,currUser) {
      if (err) return res.json(400, {err: 'ERROR.'});
      if (!currUser) return res.json(400, {err: 'ERROR.'});

      GroupUsers.find({user: currUser.id}).populate('group').exec(function(err,groupUsers){
        if (err) return res.json(400, {err: 'ERROR.'});

        return res.send(groupUsers);
      });

    });

  },

  // Récupère les informations d'un user en fonction d'un mail
  getUserByMail: function(req,res) {
    var _email = req.param('email');

    if (!_email) return res.json(400, {err: 'PARAMS ERROR.'});

    Users.findOneByEmail(_email).exec(function(err,userWithMail) {
      if (err) return res.json(400, {err: 'ERROR.'});

      //TODO - Si le user retourné est l'utilisateur en cours, on le drop
      return res.send(userWithMail);
    });

  }
};

