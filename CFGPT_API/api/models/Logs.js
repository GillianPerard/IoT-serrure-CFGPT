/**
* Logs.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
	connectedobject: {
  		model: 'connectedobjects'
  	},
	user: {
		model: 'users'
	},
	date: {
		type: 'datetime',
		required: true
	},
	state: {
	    type: 'string',
	    enum: ['Ouvert', 'Fermé', 'Autre']
	},
	content: {
		type: 'string'
	}
  }
};

