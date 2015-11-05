/**
* ConnectedObject.js
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
    token: {
        type: 'string',
        required: true,
        unique: true,
        minLength: 2
    },
    state: {
        type: 'string',
        enum: ['Ouvert', 'Fermé', 'Sonne', 'Autre'],
        required: true
    },
    logs:{
      collection: 'logs',
      via: 'connectedobject'
    },
    groups:{
      collection: 'groups',
      via: 'connectedobjects'
    }
  }
};

