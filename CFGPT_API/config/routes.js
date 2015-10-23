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

'POST /connectedobjects/reportState': 'ConnectedObjects.reportState', //(tokenObject, state)
'POST /connectedobjects/checkUserValidity': 'ConnectedObjects.checkUserValidity', //(tokenObject, idUser)
'POST /connectedobjects/receiveVideoStream': 'ConnectedObjects.receiveVideoStream', //(tokenObject, stream)


'POST /app/account/new_account': 'Users.newAccount', //(email, password, firstName, lastName)
'POST /app/account/login' : 'Users.login', //(email, password)
'POST /app/account/logout': 'Users.logout',


//[VerifAccount]
'POST /app/connectedobjects/add' : 'ConnectedObjects.add', //(tokenObject, name)
'POST /app/connectedobjects/list': 'ConnectedObjects.list',


//[VerifAccount]
'POST /app/connectedobjects/remove/:tokenObject' : 'ConnectedObjects.removeByToken',
'POST /app/connectedobjects/logs/:tokenObject' : 'ConnectedObjects.logsByToken',
'POST /app/connectedobjects/receiveVideoStream/:tokenObject' : 'ConnectedObjects.receiveVideoStreamByToken',
'POST /app/connectedobjects/sendAudioStream/:tokenObject' : 'ConnectedObjects.sendAudioStreamByToken', //(stream)
'POST /app/connectedobjects/changeState/:tokenObject' : 'ConnectedObjects.changeStateByToken', //(state)


//[VerifAccount]
'POST /app/groups/new_group' : 'Groups.newGroup', //(name, groupId)
'POST /app/groups/remove/:groupId' : 'Groups.removeByGroupId', //(groupId)


//[VerifAccount]
'POST /app/groups/connectedobjects/:groupId' : 'Groups.getConnectedObjects', //(groupId)
'POST /app/groups/connectedobjects/assign/:groupId' : 'Groups.assignConnectedObjectsById', //(groupId, tokenObjects[])
'POST /app/groups/connectedobjects/remove/:groupId' : 'Groups.removeConnectedObjectsById', //(groupId, tokenObjects[])

'/' :{
  view: '404'
}

};
