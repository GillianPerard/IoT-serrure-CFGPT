module.exports = {
  destroyConnectedObjectsForGroup : function (groupId, objectsOfGroup, cb)
  {

    //Je récupère les ex-objets du groupe et je regarde s'ils sont encore liés à un/plusieurs groupes
    //Si ce n'est pas le cas, on les delete (ajout à une liste de delete)
    ConnectedObjects.findByIdIn(objectsOfGroup).populate('groups').exec(function (err, objectsToMaybeDestroy) {
      if (err) cb(err);

      //S'il existe au moins un objet concerné
      if (objectsToMaybeDestroy.length > 0) {
        var objectsOfGroupToDelete = [];
        objectsToMaybeDestroy.forEach(function (element, index, array) {
          if (element['groups'].length == 0) objectsOfGroupToDelete.push(element['id']);
        });

        //S'il existe au moins un objet à supprimer
        if (objectsOfGroupToDelete.length > 0) {
          //Suppression des objets qui ne sont plus liés
          ConnectedObjects.destroy({id: objectsOfGroupToDelete}).exec(function (err, objectsDestroyed) {
            if (err) cb(err);
            cb();
          });
        } else {
          cb();
        }
      } else {
        cb();
      }
    });
  }
}
