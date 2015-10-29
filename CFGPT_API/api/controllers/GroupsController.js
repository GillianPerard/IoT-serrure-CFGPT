/**
 * GroupsController
 *
 * @description :: Server-side logic for managing Groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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
	}



/*
	userByLogicielName : function(req,res){
		Logiciels.findBy({name:'Toto Adventure!'}).populate('owner').exec(function(err,logiciels){
			res.send(logiciels);
		})

		Logiciels.count({name:'Toto Adventure!'}).exec(function(err,count){
			if(err) return;
			res.send(count);
		})
	},

	userByLogicielName : function(req,res){
		var owner = req.query.user;
		var name = req.param('name');
		Logiciels.create({name:name, owner:owner}).exec(function(err,logiciel){
		})
	}
*/
};

