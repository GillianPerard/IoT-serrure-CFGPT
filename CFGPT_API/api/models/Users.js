/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	firstname: {
	    type: 'string',
	    required: true,
	    minLength: 2
	},
	lastname: {
	    type: 'string',
	    required: true,
	    minLength: 2
	},
	email: {
	    type: 'email',
	    required: true, 
	    unique: true
	},
	password: {
		type: 'string',
		required: true
	},
	groupusers:{
		collection: 'groupUsers',
		via: 'user'
	}
  }
};

