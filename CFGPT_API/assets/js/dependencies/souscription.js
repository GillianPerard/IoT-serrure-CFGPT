/**
 * Created by udolwa on 22/11/15.
 */
$(document).ready(function() {
  //On souscrit seulement si on est sur une page "Normale"
  if ($("header").length > 0){
    gestionWebSocketSouscription();
    gestionWebSocketReaction();
  }
});

function gestionWebSocketSouscription(){
  //Souscription socket.io
  io.socket.get('/souscription/changeetat', function (data, jwres) {
    console.log(data);
    console.log(jwres);
  });
}

function gestionWebSocketReaction(){
//Si modification de serrures
  io.socket.on('connectedobjects', function (websock) {
    if (websock.verb == 'updated') {
      //Si on est sur une page listant les serrures d'un trousseau.
      noNotif = false;
      if (document.location.href.contains("/trousseau/")) {
        //On affiche des serrures.
        if ($("#partie_serrures").length > 0 && $("#partie_serrures").css("display") != 'none') {
          //On est sur la bonne page, on rafraichit la partie des serrures.
          if (notifContainsWithLabel(websock.data['groupIds'], $("#hid_trousseau_id").text(), 'id')) {
            $("#btn_show_serrures").click();
            noNotif = true;
          }
        }
      }
      //Si quelqu'un sonne
      if (websock.data['notif']) {
        localAjoutNotif("Une personne sonne à la serrure '"+websock.data['name']+"' !");
      } else { // C'est un changement de statut
        if (!noNotif)
          localAjoutNotif("La serrure '"+websock.data['name']+"' vient de changer d'état => '"+websock.data['state']+"' !");
      }
    }
  });
}

function localAjoutNotif(message){
  notif = {
    id : 'notif_cfgpt_'+Date.now(),
    contenu : message,
    date : new Date(),
  };
  ajoutNotificationToLocalSetting(notif);
}

// Vérifie qu'un tableau contient un élément en se basant sur une clé donnée (ex: id, name...)
function notifContainsWithLabel (array, item, label) {
  var isContains = false;
  var i = 0;
  while(i < array.length && isContains == false){
    if (array[i][label] == item) {isContains = true;};
    i++;
  }
  return isContains;
}
