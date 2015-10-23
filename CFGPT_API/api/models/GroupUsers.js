/**
* GroupUsers.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	user:{
		model: 'users'
	},
	group:{
		model: 'groups'
	},
	is_admin:{
		type: 'boolean'
	},
	is_to_call:{
		type: 'boolean'
	}
  }
};

