/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

// Url spécifique des objets connectés
  /*DONE*/'POST /connectedobjects/reportState': 'ConnectedObjectsController.reportState', //(tokenObject, state)
  /*DONE*/'POST /connectedobjects/checkUserValidity': 'ConnectedObjectsController.checkUserValidity', //(tokenObject, idUser)
  'POST /connectedobjects/receiveVideoStream': 'ConnectedObjectsController.receiveVideoStream', //(tokenObject, stream)

// Url de gestion des users
  'POST /app/account/new_account': 'Users.newAccount', //(email, password, firstName, lastName)
  /*DONE*/'POST /app/login' : 'AuthController.login', //(email, password)
  /*DONE*/'POST /app/refresh': 'AuthController.refresh',

// Url de gestion des objets connectés
//[VerifAccount]
  /*DONE*/'GET  /app/connectedobjects/': 'ConnectedObjectsController.getConnectedObjects',
  /*DONE*/'POST /app/connectedobjects/get' : 'ConnectedObjectsController.getByToken', //(tokenObject)
  /*DONE*/'POST /app/connectedobjects/add' : 'ConnectedObjectsController.addConnectedObject', //(tokenObject, name)
  /*DONE*/'POST /app/connectedobjects/remove' : 'ConnectedObjectsController.removeByToken', //(tokenObject)

// Url des interactions avec les objets connectés
//[VerifAccount]
  /*DONE*/'POST /app/connectedobjects/logs' : 'ConnectedObjectsController.logsByToken', //(tokenObject)
  'POST /app/connectedobjects/receiveVideoStream' : 'ConnectedObjectsController.receiveVideoStreamByToken', //(tokenObject)
  'POST /app/connectedobjects/sendAudioStream' : 'ConnectedObjectsController.sendAudioStreamByToken', //(tokenObject,stream)
  'POST /app/connectedobjects/changeState' : 'ConnectedObjectsController.changeStateByToken', //(tokenObject,state)

// Url de gestion des groupes
//[VerifAccount]
  'POST /app/groups/add' : 'GroupsController.addGroup', //(name, groupId)
  'POST /app/groups/remove' : 'GroupsController.removeByGroupId', //(groupId)

// Url des objets connectés dans les groupes
//[VerifAccount]
  /*DONE*/'GET  /app/groups/:groupId/connectedobjects' : 'Groups.getConnectedObjects', //(groupId)
  /*DONE*/'POST /app/groups/:groupId/connectedobjects/assign' : 'Groups.assignConnectedObjectById', //(groupId, tokenObjects)
  /*DONE*/'POST /app/groups/:groupId/connectedobjects/remove' : 'Groups.removeConnectedObjectById', //(groupId, tokenObjects)

// Url des users dans les groupes
//[VerifAccount]
  /*DONE*/'GET  /app/groups/:groupId/users' : 'GroupsController.getUsers', //(groupId)
  /*DONE*/'POST /app/groups/:groupId/users/assign' : 'GroupsController.assignUserById', //(groupId, userId, isAdmin, isToCall)
  /*DONE*/'POST /app/groups/:groupId/users/remove' : 'GroupsController.removeUserById', //(groupId, userId)

  '/' :{
    view: '404'
  }



};
