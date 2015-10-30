/**
 * ConnectedObjectController
 *
 * @description :: Server-side logic for managing Connectedobjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {

   //Récupération de tous les objets connectés de l'application
   getConnectedObjects : function(req,res){
     ConnectedObjects.find().exec(function(err,connObjects) {
       if (err) return res.json(400, {err: 'ERROR.'});
       return res.send(connObjects);
     });
   },


   //Récupération d'objet connectés à l'aide de son token
   getByToken: function (req, res) {
     var _tokenObject = req.param('tokenObject');

     //Si il manque le param, on drop.
     if (!_tokenObject) return res.json(400,{err:'PARAMS ERROR.'});

     ConnectedObjects.findOneByToken(_tokenObject).exec(function(err,connObject) {
       if (err) return res.json(400, {err: 'ERROR.'});
       if (!connObject) return res.json(400,{err:'ERROR.'});

       return res.send(connObject);
     });
   },


   //Création d'un objet connecté avec les paramètres : name & tokenObject
   addConnectedObject : function (req, res){
     var _name = req.param('name');
     var _tokenObject = req.param('tokenObject');

     //Si il manque un des params, on drop.
     if (!_name || !_tokenObject) return res.json(400,{err:'PARAMS ERROR.'});

     //Création de l'objet
     ConnectedObjects.create({
       name: _name,
       token: _tokenObject,
       state: 'Fermé'
     }).exec(function(err,createdConnObj){
       if (err) return res.json(400,{err:'ERROR.'});
       return res.send(createdConnObj);
     });
   },


   //Suppression d'un objet connecté à l'aide de son token
   removeByToken: function (req, res) {
     var _tokenObject = req.param('tokenObject');

     //Si il manque le param, on drop.
     if (!_tokenObject) return res.json(400,{err:'PARAMS ERROR.'});

     ConnectedObjects.findOneByToken(_tokenObject).exec(function(err,connObject) {
       if (err) return res.json(400, {err: 'ERROR.'});
       if (!connObject) return res.json(400,{err:'ERROR.'});

       //On supprime les liens de l'objet avec les groupes et les logs
       ConnectedObjects.update({token:_tokenObject},{groups: [], logs: []}).exec(function(err,connObject) {
         if (err) return res.json(400, {err: 'ERROR.'});
         if (connObject.length == 0) return res.json(400,{err:'ERROR.'});

         //Enfin, suppression de l'objet concerné
         ConnectedObjects.destroy({id:connObject[0]['id']}).exec(function (err, connObjToDestroy){
           if (err) return res.json(400,{err:'ERROR.'});

           return res.send(connObjToDestroy);
         });
       });
     });
   },

   //Récupération des logs d'un objet connecté à l'aide de son token
   logsByToken: function (req, res) {
     var _tokenObject = req.param('tokenObject');

     //Si il manque le param, on drop.
     if (!_tokenObject) return res.json(400,{err:'PARAMS ERROR.'});

     ConnectedObjects.findOneByToken(_tokenObject).exec(function(err,connObject) {
       if (err) return res.json(400, {err: 'ERROR.'});
       if (!connObject) return res.json(400,{err:'ERROR.'});

       Logs.find({connectedobject: connObject.id}).populate('user').exec(function(err,logs){
         if (err) return res.json(400, {err: 'ERROR.'});
         if (!logs) return res.json(400,{err:'ERROR.'});

         return res.send(logs);
       });
     });
   },



 	 reportState: function (req, res){
 		 var _state = req.param("state");
 		 var _tokenObject = req.param("tokenObject");
 		 if (["Fermé","Ouvert"].contains(state)) {
 			 ConnectedObjects.update({token:_tokenObject}, {state:_state}, function(err, created){
 				 console.log(err + created[0].name);
 			 });
 		 }
 	 },


 	checkUserValidity: function(req, res){
 		var _email = req.param("idUser");
 		var _idObject = null;

 		ConnectedObjects.findOne({token: req.param("tokenObject")}).exec(function findIdCO(err,idCo){
 			_idObject = idCo.id;

 			Users.findOne({id:_email}).exec(function findOneCB(err, found){
 				_user = found;
 				_groups = [];
 				GroupUsers.find({user:_user.id}).populate('group').exec(function findCB(err, foundGroup){
 					foundGroup.forEach(function(element, index, array){
 						_groups.push(element.group);
 					});
 					_connectedsObject = [];
 					_i = 0;
 					_groups.forEach(function(element, index, array){
 						Groups.findOne({id:element.id}).populate('connectedobjects').exec(function findOnee(err1,found1){
 							_conect = found1.connectedobjects;
 							_conect.forEach(function(element, index, array){
 								_connectedsObject.push(element.id);
 							});

 							_i ++;
 							if (_i >= _groups.length) {
 								if (Tools.contains(_connectedsObject,_idObject)) {
 									res.send("Success");
 								}
 								else{
 									res.send("Error");
 								}
 							}
 						});
 					});
 				});
 			});
 		});
 	},

 	changeStateByToken: function(req, res){
 		_connectedObjectToken = req.param('tokenObject');
 		_connectedObjectState = req.param('stateObject');
 		ConnectedObjects.update({token:_connectedObjectToken},{state:_connectedObjectState}).exec(function(err, updated){
 			ConnectedObjectsService.changeStateByToken_afterUpdate(req, res, err, updated);
 		});
 	},
 };

