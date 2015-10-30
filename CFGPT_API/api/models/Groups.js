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
  }
};

