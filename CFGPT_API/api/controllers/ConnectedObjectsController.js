/**
 * ConnectedObjectController
 *
 * @description :: Server-side logic for managing Connectedobjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    
    //Récupération de tous les objets connectés de l'application
    getConnectedObjects : function (req, res) {
        ConnectedObjects.find().exec(function (err, connObjects) {
            if (err) return res.json(400, { err: 'ERROR.' });
            return res.send(connObjects);
        });
    },
    
    
    //Récupération d'objet connectés à l'aide de son token
    getByToken: function (req, res) {
        var _tokenObject = req.param('tokenObject');
        
        //Si il manque le param, on drop.
        if (!_tokenObject) return res.json(400, { err: 'PARAMS ERROR.' });
        
        ConnectedObjects.findOneByToken(_tokenObject).exec(function (err, connObject) {
            if (err) return res.json(400, { err: 'ERROR.' });
            if (!connObject) return res.json(400, { err: 'ERROR.' });
            
            return res.send(connObject);
        });
    },
    
    
    //Création d'un objet connecté avec les paramètres : name & tokenObject
    addConnectedObject : function (req, res) {
        var _name = req.param('name');
        var _tokenObject = req.param('tokenObject');
        
        //Si il manque un des params, on drop.
        if (!_name || !_tokenObject) return res.json(400, { err: 'PARAMS ERROR.' });
        
        //Création de l'objet
        ConnectedObjects.create({
            name: _name,
            token: _tokenObject,
            state: 'Fermé'
        }).exec(function (err, createdConnObj) {
            if (err) return res.json(400, { err: 'ERROR.' });
            return res.send(createdConnObj);
        });
    },
    
    
    //Suppression d'un objet connecté à l'aide de son token
    removeByToken: function (req, res) {
        var _tokenObject = req.param('tokenObject');
        
        //Si il manque le param, on drop.
        if (!_tokenObject) return res.json(400, { err: 'PARAMS ERROR.' });
        
        ConnectedObjects.findOneByToken(_tokenObject).exec(function (err, connObject) {
            if (err) return res.json(400, { err: 'ERROR.' });
            if (!connObject) return res.json(400, { err: 'ERROR.' });
            
            //On supprime les liens de l'objet avec les groupes et les logs
            ConnectedObjects.update({ token: _tokenObject }, { groups: [], logs: [] }).exec(function (err, connObject) {
                if (err) return res.json(400, { err: 'ERROR.' });
                if (connObject.length == 0) return res.json(400, { err: 'ERROR.' });
                
                //Enfin, suppression de l'objet concerné
                ConnectedObjects.destroy({ id: connObject[0]['id'] }).exec(function (err, connObjToDestroy) {
                    if (err) return res.json(400, { err: 'ERROR.' });
                    
                    return res.send(connObjToDestroy);
                });
            });
        });
    },
    
    //Récupération des logs d'un objet connecté à l'aide de son token
    logsByToken: function (req, res) {
        var _tokenObject = req.param('tokenObject');
        
        //Si il manque le param, on drop.
        if (!_tokenObject) return res.json(400, { err: 'PARAMS ERROR.' });
        
        ConnectedObjects.findOneByToken(_tokenObject).exec(function (err, connObject) {
            if (err) return res.json(400, { err: 'ERROR.' });
            if (!connObject) return res.json(400, { err: 'ERROR.' });
            
            Logs.find({ connectedobject: connObject.id }).populate('user').exec(function (err, logs) {
                if (err) return res.json(400, { err: 'ERROR.' });
                if (!logs) return res.json(400, { err: 'ERROR.' });
                
                return res.send(logs);
            });
        });
    },
    
    
    
    reportState: function (req, res) {
        var _state = req.param("state");
        var _tokenObject = req.param("tokenObject");
        if (["Fermé", "Ouvert"].contains(state)) {
            ConnectedObjects.update({ token: _tokenObject }, { state: _state }, function (err, created) {
                console.log(err + created[0].name);
            });
        }
    },
    
    
    checkUserValidity: function (req, res) {
        var _token = req.headers.authorization;
        var _tokenObject = req.param("tokenObject");
        
        if (!_token || !_tokenObject) return res.send(400, { "state": "Params missing" });

        ConnectedObjects.query('SELECT co.token ' + 
                                'FROM connectedobjects co ' +
                                'LEFT JOIN connectedobjects_groups__groups_connectedobjects cog ON (co.id = cog.connectedobjects_groups) ' +
                                'LEFT JOIN groups g ON (cog.groups_connectedobjects = g.id) ' +
                                'LEFT JOIN groupusers gu ON (g.id = gu.`group`) ' +
                                'LEFT JOIN users u ON (gu.`user` = u.id) ' +
                                'WHERE u.token = "' + _token + '"', 
                                function (err, results) {
            if (err) return res.send(400,{ "state" : "Erreur when getting information on database", "error" : err });
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
        
        //Si il manque le param, on drop.
        if (!_connectedObjectToken ||  !_connectedObjectState) return res.json(400, { err: 'PARAMS ERROR.' });
        
        ConnectedObjects.update({ token: _connectedObjectToken }, { state: _connectedObjectState }).exec(function (err, updated) {
            ConnectedObjectsService.changeStateByToken_afterUpdate(req, res, err, updated);
        });
    },
    
    //Action appelée dès lors qu'un utilisateur sonne à une sonnette
    ringring: function (req, res) {
        var _tokenObject = req.param('tokenObject');
        
        //Si il manque le param, on drop.
        if (!_tokenObject) return res.json(400, { err: 'PARAMS ERROR.' });
        
        ConnectedObjects.update({ token: _tokenObject }, { state: 'Sonne' }).exec(function (err, connObjectUpdated) {
            if (err) cb(err);
            if (connObjectUpdated.length == 0) return res.json(400, { err: 'ERROR.' });
            
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
    }
};

