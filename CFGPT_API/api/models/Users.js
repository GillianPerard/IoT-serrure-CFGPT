/**
* Users.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcryptjs');

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
      collection: 'groupusers',
      via: 'user'
    },
    logs:{
      collection: 'logs',
      via: 'user'
    },
    token:{
    	type : 'text'
    },
    refreshToken:{
    	type : 'text'
    },
    imagePath: {
      type: 'string'
    },
    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.refreshToken;
      delete obj.createdAt;
      delete obj.updatedAt;
      delete obj.token;
      delete obj.groupusers;
      delete obj.logs;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) {
          console.log(err);
          return cb(err);
        }

        user.password = hash;
        user.refreshToken = JwtHandler.generate({email:user.email});
        cb();

      });
    });
  },

  comparePassword : function(password, user, cb){
  	bcrypt.compare(password, user.password, function(err, match){
  		if (err) cb(err);
  		if (match){
  			cb(null,true);
  		}else{
  			cb(err);
  		}
  	})
  }





};

