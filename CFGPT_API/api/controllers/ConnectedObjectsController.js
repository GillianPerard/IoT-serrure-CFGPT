/**
 * ConnectedObjectController
 *
 * @description :: Server-side logic for managing Connectedobjects
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 module.exports = {
 	reportState: function (req, res){
 		var _state = req.param("state");
 		var _tokenObject = req.param("tokenObject");
 		if (["Fermé","Ouvert"].contains(state)) {
 			ConnectedObjects.update({token:_tokenObject}, {state:_state}, function(err, created){
 				console.log("Error when trying modify state of " + created[0].name);
 			} );
 		};

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
 								};
 							};
 						}); 							
 					});		
 				});
 			});
 		});

 		
 	}
 }

