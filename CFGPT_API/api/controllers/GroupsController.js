/**
 * GroupsController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /* USERS */

  // Récupère les informations des users du group de l'id passé en paramètre (+ les infos associées à son groupuser)
	getUsers: function(req,res){
		//var plop = req.query.user;
    var _groupId = req.param('groupId');

		if (_groupId == undefined ||_groupId == "" ||_groupId == null){
			res.send("No groupId param.");
			return;
		}

		Groups.find({id: _groupId}).exec(function(err, group){
			if (group == undefined || group == "" || group == null){
				res.send("No group found.");
				return;
			}
			GroupUsers.find({group: group[0]['id']}).populate('user').exec(function(err, userWithGroup){
				if (userWithGroup == undefined || userWithGroup == "" || userWithGroup == null){
					res.send("No groupuser found.");
					return;
				}
				res.send(userWithGroup);
			})
		})
	},

  // Associe un user à un group (selon les params)
  assignUserById: function(req, res){
    var _groupId = req.param('groupId');
    var _userId = req.param('userId');
    var _isAdmin = req.param('isAdmin');
    var _isToCall = req.param('isToCall');

    //Si il manque des params, on drop.
    if (_groupId == undefined || _groupId == "" || _groupId == null ||
      _userId == undefined || _userId == "" || _userId == null ||
      _isAdmin == undefined || _isAdmin == "" || _isAdmin == null ||
      _isToCall == undefined || _isToCall == "" || _isToCall == null
    ){
      res.send("PARAMS ERROR");
      return;
    }

    Groups.findById(_groupId).exec(function(err,isFound){
      if (err) { res.send("ERREUR"); return;}
      if (isFound.length > 0){
        Users.findById(_userId).exec(function(err,isFound) {
          if (err) { res.send("ERREUR"); return;}
          if (isFound.length > 0){
            GroupUsers.count({group: _groupId, user: _userId}).exec(function(err, groupUser){
              if (err) { res.send("ERREUR"); return;}
              if (groupUser == undefined || groupUser == "" || groupUser == null){
                GroupUsers.create({
                  group:_groupId,
                  user:_userId,
                  is_admin: (_isAdmin == "true"? 1 : 0),
                  is_to_call: (_isToCall == "true"? 1 : 0)
                }).exec(function(err,finalGroupUser){
                  if (err) { res.send("ERREUR"); return;}
                  res.send(finalGroupUser);
                  return;
                })
              } else {
                res.send("USER IS ALREADY IN GROUP");
                return;
              }
            });
          } else {
            res.send("ERREUR");
            return;
          }
        })
      } else {
        res.send("ERREUR");
        return;
      }
    })
  },

  // Retire un user d'un group (selon les params)
  removeUserById: function(req,res){
    var _groupId = req.param('groupId');
    var _userId = req.param('userId');

    //Si il manque des params, on drop.
    if (_groupId == undefined || _groupId == "" || _groupId == null ||
      _userId == undefined || _userId == "" || _userId == null
    ){
      res.send("PARAMS ERROR");
      return;
    }

    Groups.findById(_groupId).exec(function(err,isFound) {
      if (err) {
        res.send("ERREUR");
        return;
      }
      if (isFound.length > 0) {
        Users.findById(_userId).exec(function (err, isFound) {
          if (err) {
            res.send("ERREUR");
            return;
          }
          if (isFound.length > 0) {
            GroupUsers.find({group: _groupId, user: _userId}).exec(function (err, groupUser) {
              if (err) { res.send("ERREUR"); return; }
              if (groupUser == undefined || groupUser == "" || groupUser == null) {
                res.send("USER IS NOT IN GROUP");
                return;
              }
              GroupUsers.destroy({id:groupUser[0].id}).exec(function (err, groupToDestroy){
                if (err) { res.send("ERREUR"); return; }
                res.send(groupToDestroy);
                return;
              });
            });
          } else {
            res.send("ERREUR");
            return;
          }
        })
      } else {
        res.send("ERREUR");
        return;
      }
    })
  },


  /* CONNECTED OBJECTS */

  getConnectedObjects : function(req, res){
    var groupId = req.param('groupId');

    if (!groupId) return res.json(400,{err:'No groupId param.'});

    Groups.findOne({id: groupId})
      .populate('connectedobjects')
      .exec(function(err, group){
        if (!group || !group.connectedobjects)return res.json(400,{err:'No group found.'});


        return res.json(group.connectedobjects);
      })

  }

};
