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
  /*DONE*/'POST /connectedobjects/reportState': 'ConnectedObjects.reportState', //(tokenObject, state)
  /*DONE*/'POST /connectedobjects/checkUserValidity': 'ConnectedObjects.checkUserValidity', //(tokenObject, idUser)
  'POST /connectedobjects/receiveVideoStream': 'ConnectedObjects.receiveVideoStream', //(tokenObject, stream)

// Url de gestion des users
  /*DONE*/'POST /app/account/new_account': 'Users.newAccount', //(email, password, firstName, lastName)
  /*DONE*/'POST /app/login' : 'Auth.login', //(email, password)
  /*DONE*/'POST /app/refresh': 'Auth.refresh',
  /*DONE*/'GET /app/users/groups' : 'Users.getGroupsByToken', //(tokenUser)
  /*DONE*/'POST /app/users/getByMail' : 'Users.getUserByMail', //(tokenUser)

// Url de gestion des objets connectés
//[VerifAccount]
  /*DONE*/'GET  /app/connectedobjects/': 'ConnectedObjects.getConnectedObjects',
  /*DONE*/'POST /app/connectedobjects/get' : 'ConnectedObjects.getByToken', //(tokenObject)
  /*DONE*/'POST /app/connectedobjects/add' : 'ConnectedObjects.addConnectedObject', //(tokenObject, name)
  /*DONE*/'POST /app/connectedobjects/remove' : 'ConnectedObjects.removeByToken', //(tokenObject)

// Url des interactions avec les objets connectés
//[VerifAccount]
  /*DONE*/'POST /app/connectedobjects/ringring' : 'ConnectedObjects.ringring', //(tokenObject)
  /*DONE*/'POST /app/connectedobjects/logs' : 'ConnectedObjects.logsByToken', //(tokenObject)
  'POST /app/connectedobjects/receiveVideoStream' : 'ConnectedObjects.receiveVideoStreamByToken', //(tokenObject)
  'POST /app/connectedobjects/sendAudioStream' : 'ConnectedObjects.sendAudioStreamByToken', //(tokenObject,stream)
  /*DONE*/'POST /app/connectedobjects/changeState' : 'ConnectedObjects.changeStateByToken', //(tokenObject,stateObject)
  //'GET /app/ConnectedObject/subscribe/:userToken' : 'connectedObjects.isToCallSubscribe', //(tokenuser)
  'GET /app/ConnectedObject/subscribe/:userToken' : 'connectedObjects.changeStateSubscribe', //(tokenuser)
  /*DONE*/'POST /app/connectedobjects/changeStateAfterRing' : 'ConnectedObjects.changeStateAfterRing', //(tokenObject, newState, tokenuser)

// Url de gestion des groupes
//[VerifAccount]
  /*DONE*/'POST /app/groups/add' : 'Groups.addGroup', //(name)
  /*DONE*/'POST /app/groups/remove' : 'Groups.removeByGroupId', //(groupId)

// Url des objets connectés dans les groupes
//[VerifAccount]
  /*DONE*/'GET  /app/groups/:groupId/connectedobjects' : 'Groups.getConnectedObjects', //(groupId)
  /*DONE*/'POST /app/groups/:groupId/connectedobjects/assign' : 'Groups.assignConnectedObjectById', //(groupId, tokenObjects)
  /*DONE*/'POST /app/groups/:groupId/connectedobjects/remove' : 'Groups.removeConnectedObjectById', //(groupId, tokenObjects)

// Url des users dans les groupes
//[VerifAccount]
  /*DONE*/'GET  /app/groups/:groupId/users' : 'Groups.getUsers', //(groupId)
  /*DONE*/'POST /app/groups/:groupId/users/assign' : 'Groups.assignUserById', //(groupId, userId, isAdmin, isToCall)
  /*DONE*/'POST /app/groups/:groupId/users/remove' : 'Groups.removeUserById' //(groupId, userId)
  /*DONE*/'POST /app/groups/:groupId/users/update' : 'Groups.updateUserById', //(groupId, userId)

};
