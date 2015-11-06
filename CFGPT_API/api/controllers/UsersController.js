/**
 * UsersController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    // Récupère les groupes d'un user à partir de son token (dans le HEADER)
    getGroupsByToken: function (req, res) {
        var _tokenUser = req.headers.authorization;
        
        //Si pas de token, on drop
        if (!_tokenUser) return res.json(400, { 'STATE': 'error', 'ERROR': 'Invalid session token.' });
        Users.findOneByToken(_tokenUser).exec(function (err, currUser) {
            if (err) return res.json(400, { 'STATE' : 'error' });
            if (!currUser) return res.json(400, { 'STATE' : 'error' });
            GroupUsers.find({ user: currUser.id }).populate('group').exec(function (err, groupUsers) {
                if (err) return res.json(400, { 'STATE' : 'error', 'ERROR': err });
                return res.send(groupUsers);
            });
        });
    },
    
    //Creation d'un nouvel utilisateur
    newAccount: function (req, res) {
        var _password = req.param("password");
        var _mail = req.param("mail");
        var _name = req.param("lastname");
        var _firstname = req.param("firstname");
        
        if (!_mail || !_password || !_name || !_firstname) return res.json(400, { 'STATE': 'Params error.' });
        Users.create({ firstname: _firstname, lastname: _name, email: _mail, password: _password }).exec(function (err, created) { 
            if (err)  return res.send(400, { "STATE" : "Error when trying add new user", "ERROR" : err });
            return res.send(200, "User '" + _firstname + " " + _name + "' was created :)");
        });
    },
    
    // Récupère les informations d'un user en fonction d'un mail
    getUserByMail: function (req, res) {
        var _email = req.param('email');
        
        if (!_email) return res.json(400, { 'STATE' : 'Email args was not correct' });
        Users.findOneByEmail(_email).exec(function (err, userWithMail) {
            if (err) return res.json(400, { 'ERROR' : err });
            return res.send(userWithMail); //TODO - Si le user retourné est l'utilisateur en cours, on le drop
        });

    }
};

