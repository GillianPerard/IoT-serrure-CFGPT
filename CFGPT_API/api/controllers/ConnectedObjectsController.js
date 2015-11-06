/**
 * ConnectedObjectController
 *
 * @description :: Server-side logic for managing Connectedobjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    getConnectedObjects : function (req, res) { //Récupération de tous les objets connectés de l'application
        ConnectedObjects.find().exec(function (err, connObjects) {
            if (err) return res.serverError({ "state": "Error when trying access to database" , "error" : err });
            return res.ok(connObjects);
        });
    },
    
    getByToken: function (req, res) {  //Récupération d'objet connectés à l'aide de son token
        var _tokenObject = req.param('tokenObject');
        
        if (!_tokenObject) return res.serverError({ "state" : "Params error" });  //Si il manque le param, on drop.
        
        ConnectedObjects.findOneByToken(_tokenObject).exec(function (err, connObject) {
            if (err) return res.serverError({ "state": "Error when trying acces to database", "error": err });
            if (!connObject) return res.ok({});     //No result
            
            return res.ok(connObject);
        });
    },
    
    addConnectedObject : function (req, res) {   //Création d'un objet connecté avec les paramètres : name & tokenObject
        var _name = req.param('name');
        var _tokenObject = req.param('tokenObject');
        
        if (!_name || !_tokenObject) return res.serverError({ "state": "Params error" });         //Si il manque un des params, on drop.
        
        ConnectedObjects.create({
            //Création de l'objet
            name: _name,
            token: _tokenObject,
            state: 'Fermé'
        }).exec(function (err, createdConnObj) {
            if (err) return res.serverError({ "State": 'Error when trying add connected object on database', "error": err });
            return res.ok(createdConnObj);
        });
    },
    
    removeByToken: function (req, res) {    //Suppression d'un objet connecté à l'aide de son token
        var _tokenObject = req.param('tokenObject');
        
        if (!_tokenObject) return res.serverError({ "state": 'Params error' });  //Si il manque le param, on drop.
        
        ConnectedObjects.findOneByToken(_tokenObject).exec(function (err, connObject) {
            if (err) return res.serverError({ "state": "Error when trying access to database", "error" : err });
            if (!connObject) return res.ok({});       //No result
            
            ConnectedObjects.update({ token: _tokenObject }, { groups: [], logs: [] }).exec(function (err, connObject) {     //On supprime les liens de l'objet avec les groupes et les logs
                if (err) return res.serverError({ "state" : "Error when trying update database", "error": err });
                if (connObject.length == 0) return res.ok({});  //No result
                
                ConnectedObjects.destroy({ id: connObject[0]['id'] }).exec(function (err, connObjToDestroy) {   //Enfin, suppression de l'objet concerné
                    if (err) return res.serverError({ "state": "Error when trying delete on Database", "error": err });
                    
                    return res.ok(connObjToDestroy);
                });
            });
        });
    },
    
    logsByToken: function (req, res) {       //Récupération des logs d'un objet connecté à l'aide de son token
        var _tokenObject = req.param('tokenObject');
        
        if (!_tokenObject) return res.serverError({ "state": 'Param is incorrect' });      //Si il manque le param, on drop.
        
        ConnectedObjects.findOneByToken(_tokenObject).exec(function (err, connObject) {
            if (err) return res.serverError({ "state": "Error when trying access to Database", "error": err });
            if (!connObject) return res.ok({});     //No result
            
            Logs.find({ connectedobject: connObject.id }).populate('user').exec(function (err, logs) {
                if (err) return res.serverError({ "state": "Error when trying access to database", "error" : err });
                if (!logs) return res.ok({});      //No result
                
                return res.ok(logs);
            });
        });
    },
    
    reportState: function (req, res) {
        var _state = req.param("state");
        var _tokenObject = req.param("tokenObject");
        if (["Fermé", "Ouvert", "Sonne"].contains(state)) {
            ConnectedObjects.update({ token: _tokenObject }, { state: _state }, function (err, created) {
                if (err) res.serverError({ "state" : "Error when trying update state on database", "error" : err });
                res.ok(created);
            });
        }
    },
    
    checkUserValidity: function (req, res) {
        var _token = req.headers.authorization;
        var _tokenObject = req.param("tokenObject");
        
        if (!_token || !_tokenObject) return res.serverError({ "state": "Params missing" });
        
        ConnectedObjects.query('SELECT co.token ' + 
'FROM connectedobjects co ' +
'LEFT JOIN connectedobjects_groups__groups_connectedobjects cog ON (co.id = cog.connectedobjects_groups) ' +
'LEFT JOIN groups g ON (cog.groups_connectedobjects = g.id) ' +
'LEFT JOIN groupusers gu ON (g.id = gu.`group`) ' +
'LEFT JOIN users u ON (gu.`user` = u.id) ' +
'WHERE u.token = "' + _token + '"', 
function (err, results) {
            if (err) return res.serverError({ "state" : "Erreur when getting information on database", "error" : err });
            var listToken = [];
            results.forEach(function (factor, index) {
                listToken.push(factor.token);
            });
            return res.ok(Tools.contains(listToken, _tokenObject));
        });
    },
    
    changeStateByToken: function (req, res) {
        var _connectedObjectToken = req.param('tokenObject');
        var _connectedObjectState = req.param('stateObject');
        
        if (!_connectedObjectToken ||  !_connectedObjectState) return res.json(400, { err: 'PARAMS ERROR.' });          //Si il manque le param, on drop.
        
        ConnectedObjects.update({ token: _connectedObjectToken }, { state: _connectedObjectState }).exec(function (err, updated) {
            if (err) return res.serverError({ "state": "Error when trying update database", "error": err });
            return res.ok('Success Updated Element ' + updated);
        });
    },
    
    ringring: function (req, res) {         //Action appelée dès lors qu'un utilisateur sonne à une sonnette
        var _tokenObject = req.param('tokenObject');
        
        if (!_tokenObject) return res.serverError({ "state": "Params error" });        //Si il manque le param, on drop.
        
        ConnectedObjects.update({ token: _tokenObject }, { state: 'Sonne' }).exec(function (err, connObjectUpdated) {
            if (err) cb(err);
            if (connObjectUpdated.length == 0) return res.json(400, { err: 'ERROR.' });
             ConnectedObjects.publishUpdate(connObjectUpdated[0].id,{ state:connObjectUpdated[0].state });
            Logs.create({
                connectedobject: connObjectUpdated[0].id,
                date: new Date(),
                state: connObjectUpdated[0].state,
                content: 'Un visiteur vient de sonner à la serrure "' + connObjectUpdated[0].name + '".'
            }).exec(function (err, log) {
                if (err) return res.json(400, { err: 'ERROR.' });

                return res.send(connObjectUpdated);
            });
        });
    },
    // méthode appelé par l'apli pour souscrire au modification effectué sur les connectobject des groups istocall
    isToCallSubscribe : function(req,res){
        console.log("subscribe call")
        var _token = req.param('userToken');
        ConnectedObjects.query(
            'SELECT co.id, co.token ' + 
            'FROM connectedobjects co ' +
            'LEFT JOIN connectedobjects_groups__groups_connectedobjects cog ON (co.id = cog.connectedobjects_groups) ' +
            'LEFT JOIN groups g ON (cog.groups_connectedobjects = g.id) ' +
            'LEFT JOIN groupusers gu ON (g.id = gu.`group`) ' +
            'LEFT JOIN users u ON (gu.`user` = u.id) ' +
            'WHERE u.token = "' + _token + '" AND gu.is_to_call = True' , 
            function(err, result) {
                if (err) return res.json(400,{err:'error occured when connect to object'});
                console.log("subscribe successfull")
                ConnectedObjects.subscribe(req, _.pluck(result,'id'),['update']);
                return res.json(result);
            }
        )
    },

    //Action appelée dès lors qu'un utilisateur veut répondre à une sonnette qui sonne
    changeStateAfterRing: function (req, res) {
        var _tokenObject = req.param('tokenObject');
        var _newState = req.param('newState');
        var _tokenUser = req.headers.authorization;
        
        if (!_tokenObject || !_newState) return res.serverError({ "state": "Params error" });        //Si il manque le param, on drop.
        
        ConnectedObjects.findOneByToken(_tokenObject).exec(function (err, connObject) {         //Je cherche le connectedObject with Token
            if (err) return res.serverError({ "state": "Error when trying access to database", "error" : err });
            if (!connObject) return res.serverError({ "state": "The connected object doesn't exist" });
            
            if (connObject.state == 'Sonne') {
                Users.findOneByToken(_tokenUser).exec(function (err, theUser) {
                    if (err) return res.serverError({ "state": "Error when trying access database", "error": err });
                    if (!theUser) return res.serverError({ "state": "The is no user to call" });
                    
                    ConnectedObjects.update({ token: _tokenObject }, { state: _newState }).exec(function (err, connObjectUpdated) {
                        if (err) cb(err);
                        if (connObjectUpdated.length == 0) return res.serverError({ "state" : "Error when trying update database" });
                        
                        Logs.create({
                            user: theUser.id,
                            connectedobject: connObjectUpdated[0].id,
                            date: new Date(),
                            state: connObjectUpdated[0].state,
                            content: 'Un utilisateur vient de modifier le statut de la serrure "' + connObjectUpdated[0].name + '".'
                        }).exec(function (err, log) {
                            if (err) return res.serverError({ "state": "Error when trying create log", "error": err });
                            return res.ok(connObjectUpdated);
                        });
                    });
                });
            } else { // if "Ouvert" ou "Ferme"
                return res.ok('Another user already managed this notification.');
            }
        });
    }
};

