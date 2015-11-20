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
        if (!_tokenUser) return res.serverError({ 'state': 'error, invalid session token', 'error': 'Invalid session token.' });
        Users.findOneByToken(_tokenUser).exec(function (err, currUser) {
            if (err) return res.serverError({ 'state': 'error', 'error' : err });
            if (!currUser) return res.serverError({ 'state': 'There are no result :(' });
            GroupUsers.find({ user: currUser.id }).populate('group').exec(function (err, groupUsers) {
                if (err) return res.serverError({ 'state' : 'error when trying update database', 'error': err });
                return res.ok(groupUsers);
            });
        });
    },
    
    //Creation d'un nouvel utilisateur
    newAccount: function (req, res) {
        var _password = req.param("password");
        var _mail = req.param("email");
        var _name = req.param("lastname");
        var _firstname = req.param("firstname");
        
        if (!_mail || !_password || !_name || !_firstname) return res.serverError({ 'state': 'Params error.' });
        Users.create({ firstname: _firstname, lastname: _name, email: _mail, password: _password }).exec(function (err, created) {
            if (err) return res.serverError({ "state" : "Error when trying add new user", "error" : err });
            return res.ok("User '" + _firstname + " " + _name + "' was created :)");
        });
    },
    
    // Récupère les informations d'un user en fonction d'un mail
    getUserByMail: function (req, res) {
        var _email = req.param('email');
        
        if (!_email) return res.serverError({ 'state' : 'Email args was not correct' });
        Users.findOneByEmail(_email).exec(function (err, userWithMail) {
            if (err) return res.serverError({'state':'Error when trying update database', 'error' : err });
            return res.ok(userWithMail); //TODO - Si le user retourné est l'utilisateur en cours, on le drop
        });

    },
     getAdminedGroupsByToken: function (req, res) {
        var _tokenUser = req.headers.authorization;
        
        //Si pas de token, on drop
        if (!_tokenUser) return res.serverError({ 'state': 'error, invalid session token', 'error': 'Invalid session token.' });
        Users.findOneByToken(_tokenUser).exec(function (err, currUser) {
            if (err) return res.serverError({ 'state': 'error', 'error' : err });
            if (!currUser) return res.serverError({ 'state': 'There are no result :(' });
            GroupUsers.find({ user: currUser.id, is_admin : true }).populate('group').exec(function (err, groupUsers) {
                if (err) return res.serverError({ 'state' : 'error when trying update database', 'error': err });
                return res.ok(groupUsers);
            });
        });
    },
};

