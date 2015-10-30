/**
* Groups.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	name: {
	    type: 'string',
	    required: true,
	    minLength: 2
    },
    parentgroup:{
      model: 'groups'
    },
    connectedobjects:{
      collection: 'connectedobjects',
      via: 'groups'
    },
    groupusers:{
      collection: 'groupusers',
      via: 'group'
    }
  },

  beforeDestroy: function(criteria, cb) {
    var _groupId = criteria['where']['id'];
    Groups.findOneById(_groupId).populate('connectedobjects').populate('groupusers').exec(function(err,myGroup){
      if (err) cb(err);

      //Je récupère les ids des connectedObjects liés à mon groupe
      var objectsOfGroup = [];
      myGroup.connectedobjects.forEach(function(element, index, array){
        objectsOfGroup.push(element['id']);
      });

      var groupUsersElem = [];
      myGroup.groupusers.forEach(function(element, index, array){
        groupUsersElem.push(element['id']);
      });

      //On supprime les liens du groupe avec les objets et les groupusers
      Groups.update({id:_groupId},{connectedobjects: [], groupusers: []}).exec(function(err,groupUpdated) {
        if (err) cb(err);

        //Si le groupe contenait des users, on va les supprimer.
        if (groupUsersElem.length > 0){
          GroupUsers.destroy({id:groupUsersElem}).exec(function (err, gpUsDestroyed){
            if (err) cb(err);
            GroupsService.destroyConnectedObjectsForGroup(_groupId, objectsOfGroup, cb);
          });
        } else {
          GroupsService.destroyConnectedObjectsForGroup(_groupId, objectsOfGroup, cb);
        }
      });
    });
  }
};

