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
'POST /connectedobjects/:tokenObject/reportState': 'ConnectedObjects.reportState', //(tokenObject, state)
'POST /connectedobjects/:tokenObject/checkUserValidity': 'ConnectedObjects.checkUserValidity', //(tokenObject, idUser)
'POST /connectedobjects/:tokenObject/receiveVideoStream': 'ConnectedObjects.receiveVideoStream', //(tokenObject, stream)

// Url de gestion des users
'POST /app/account/new_account': 'Users.newAccount', //(email, password, firstName, lastName)
'POST /app/login' : 'AuthController.login', //(email, password)
'POST /app/refresh': 'AuthController.refresh',

// Url de gestion des objets connectés
//[VerifAccount]
'GET  /app/connectedobjects/': 'ConnectedObjects.getConnectedObjects',
'POST /app/connectedobjects/add' : 'ConnectedObjects.add', //(tokenObject, name)

// Url des interactions avec les objets connectés
//[VerifAccount]
'POST /app/connectedobjects/:tokenObject/remove' : 'ConnectedObjects.removeByToken',
'POST /app/connectedobjects/:tokenObject/logs' : 'ConnectedObjects.logsByToken',
'POST /app/connectedobjects/:tokenObject/receiveVideoStream' : 'ConnectedObjects.receiveVideoStreamByToken',
'POST /app/connectedobjects/:tokenObject/sendAudioStream' : 'ConnectedObjects.sendAudioStreamByToken', //(stream)
'POST /app/connectedobjects/:tokenObject/changeState' : 'ConnectedObjects.changeStateByToken', //(state)

// Url de gestion des groupes
//[VerifAccount]
'POST /app/groups/new_group' : 'Groups.newGroup', //(name, groupId)
'POST /app/groups/remove/:groupId' : 'Groups.removeByGroupId', //(groupId)

// Url des objets connectés dans les groupes
//[VerifAccount]
'GET  /app/groups/:groupId/connectedobjects' : 'Groups.getConnectedObjects', //(groupId)
'POST /app/groups/:groupId/connectedobjects/assign' : 'Groups.assignConnectedObjectById', //(groupId, tokenObjects)
'POST /app/groups/:groupId/connectedobjects/remove' : 'Groups.removeConnectedObjectById', //(groupId, tokenObjects)

// Url des users dans les groupes
//[VerifAccount]
'GET  /app/groups/:groupId/users' : 'Groups.getUsers', //(groupId)
'POST /app/groups/:groupId/users/assign' : 'Groups.assignUserById', //(groupId, userId)
'POST /app/groups/:groupId/users/remove' : 'Groups.removeUserById', //(groupId, userId)

'/' :{
  view: '404'
}



};
