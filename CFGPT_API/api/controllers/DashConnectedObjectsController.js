/**
 * ConnectedObjectController
 *
 * @description :: Server-side logic for managing Connectedobjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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
        if (err) return res.serverError({ "state": 'Error when trying add connected object on database', "error": err });
        return res.ok(createdConnObj);
      });
    },

    //GESTION DES LOGS
    logsByToken: function (req, res) {       //Récupération des logs d'un objet connecté à l'aide de son token
      var _tokenObject = req.param('tokenObject');

      //Si il manque le param, on drop
      if (!_tokenObject) return res.serverError({ "state": 'Param is incorrect' });

      ConnectedObjects.findOneByToken(_tokenObject).exec(function (err, connObject) {
        if (err) return res.serverError({ "state": "Error when trying access to Database", "error": err });
        if (!connObject) return res.ok({});     //No result

        Logs.find({ connectedobject: connObject.id }).populate('user').exec(function (err, logs) {
          if (err) return res.serverError({ "state": "Error when trying access to database", "error" : err });
          if (!logs) return res.ok({});      //No result

          return res.view('groups/serrures/logs/journaux_serrure_contenu', {
            _logs: logs,
            layout: null
          });
        });
      });
    },




    //CHANGEMENT DE STATUT POUR UNE SERRURE
    changeStateById: function (req, res) {
      var _connectedObjectId = req.param('objId');
      var _connectedObjectState = req.param('state');

      if (!_connectedObjectId ||  !_connectedObjectState) return res.serverError({ "state": 'PARAMS ERROR.' });          //Si il manque le param, on drop.

      ConnectedObjects.update({ id: _connectedObjectId }, { state: _connectedObjectState }).exec(function (err, updated) {
        if (err) return res.serverError({ "state": "Error when trying update database", "error": err });
        stateLog = _connectedObjectState == 'Ouvert' ? "Un utilisateur vient d'ouvrir une serrure." : "Un utilisateur vient de fermer une serrure";
        LogService.addLogs(updated[0].id, null, updated[0].state, stateLog);
        if (updated.length == 0) return res.json(400, { err: 'ERROR.' });

        ConnectedObjects.findOneById(updated[0].id).populate('groups').exec(function (err, connObjUpdated) {
          if (err) cb(err);
          if (!connObjUpdated) return res.json(400, {err: 'ERROR.'});

          ConnectedObjects.publishUpdate(connObjUpdated.id, {
            state: connObjUpdated.state,
            groupIds: connObjUpdated.groups,
            token: connObjUpdated.token,
            name: connObjUpdated.name,
            notif: false
          });
          return res.ok(connObjUpdated);
        });
      });
    },





    //SUBSCRIBE
    // méthode appelée par le dashboard pour souscrire aux changements de state
    changeStateSubscribe : function(req,res){
      ConnectedObjects.query(
        'SELECT co.id, co.token ' +
        'FROM connectedobjects co ' +
        'LEFT JOIN connectedobjects_groups__groups_connectedobjects cog ON (co.id = cog.connectedobjects_groups) ' +
        'LEFT JOIN groups g ON (cog.groups_connectedobjects = g.id) ' +
        'LEFT JOIN groupusers gu ON (g.id = gu.`group`) ' +
        'LEFT JOIN users u ON (gu.`user` = u.id) ' +
        'WHERE u.refreshToken = "' + req.session.userToken + '" ' ,
        function(err, result) {
          if (err) return res.json(400,{err:'error occured when connect to object'});
          console.log("subscribe change state key successfull")
          ConnectedObjects.subscribe(req, _.pluck(result,'id'),['update']);
          return res.json(result);
        }
      )
    },

}

