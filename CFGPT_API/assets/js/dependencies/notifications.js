/**
 * Created by udolwa on 22/11/15.
 */
$(document).ready(function() {
  //Si l'utilisateur ne stocke pas encore ses notifs, on crée un espace aloué
  if ( localStorage.getItem("CFGPT_NOTIFS") == undefined){
    localStorage.setItem("CFGPT_NOTIFS","");
  } else {
    gestionAffichageHeaderNotif();
    gestionRemplissagePopupNotif();
  }
});

///////////// HEADER ////////////////

function showPopupNotifications(){
  $('#popup_notifs_user').modal('show');
}
function closePopupNotifications(){
  $('#popup_notifs_user').modal('hide');
  $('#header_notif').removeClass('active');
}

function gestionAffichageHeaderNotif(){
  //Si on a des notifs, on mets le bouton en rouge.
  if (localStorage.getItem("CFGPT_NOTIFS") != "") {
    $("#header_notif").css('background','orangered');
    $("#header_notif").css('font-weight','bold');
  } else {
    $("#header_notif").css('background','');
    $("#header_notif").css('font-weight','');
  }
}


//////////// TABLEAU /////////////

function gestionRemplissagePopupNotif(){
  //On remplit le tableau des notifs avec les notifications stockées
  if (localStorage.getItem("CFGPT_NOTIFS") != "") {
    notifs = JSON.parse(localStorage.getItem("CFGPT_NOTIFS"));
    notifs.forEach(function (notif) {
      ajoutLignePopupNotifs(notif);
    });
  }
}


function ajoutLignePopupNotifs(notif){
  var newRow =
    '<tr id="line_notif_id_'+notif.id+'" class="line_notifications">'
    + '<td class="left aligned">' + notif.contenu + '</td>'
    + '<td>' + moment(notif.date).format('DD/MM/YYYY HH:mm') + '</td>'
    + '<td>'
    + '<button class="ui red button" onclick="supprLignePopupNotif(\'' + notif.id + '\');"'
    + '>Supprimer</button>'
    + '</td>'
    + '</tr>'

  $("#table_notifs").find('tbody').append($(newRow));

  gestionAffichageHeaderNotif();
  $("#line_no_notifs").css('display', 'none');
}

function supprLignePopupNotif(idNotif){
  deleteNotificationFromLocalSetting(idNotif);

  //Suppression de la ligne
  $("#line_notif_id_"+idNotif).remove();

  //Si il n'y a plus de ligne, on affiche la ligne "vide"
  if ($(".line_notifications").length == 0) {
    $("#line_no_notifs").css('display', '');
    gestionAffichageHeaderNotif();
  }
}

/*
 To convert an object to a string, use JSON.stringify:
 var json_text = JSON.stringify(your_object, null, 2);

 To convert a JSON string to object, use JSON.parse:
 var your_object = JSON.parse(json_text);
 */


//GESTION LOCAL SETTING
function ajoutNotificationToLocalSetting(notif){
  notifs = localStorage.getItem("CFGPT_NOTIFS");
  if ( notifs == ""){
    notifs = new Array;
  } else {
    notifs = JSON.parse(notifs);
  }
  notifs.push(notif);
  localStorage.setItem("CFGPT_NOTIFS", JSON.stringify(notifs));
  ajoutLignePopupNotifs(notif);
}

function deleteNotificationFromLocalSetting (idNotif){
  notifs = JSON.parse(localStorage.getItem("CFGPT_NOTIFS"));

  var trouve = -1;
  for (i = 0; i < notifs.length; i++){
    if ( notifs[i].id == idNotif) {
      trouve = i;
    }
  }
  //Si on a trouvé l'élément, on le vire
  if (trouve != -1) notifs.splice(trouve, 1);

  if ( notifs.length == 0 ) {
    localStorage.setItem("CFGPT_NOTIFS","");
  } else {
    localStorage.setItem("CFGPT_NOTIFS", JSON.stringify(notifs));
  }
}


/*
 localStorage.
 setItem(clé,valeur) : stocke une paire clé/valeur
 getItem(clé) : retourne la valeur associée à une clé
 removeItem(clé) : supprime la paire clé/valeur en indiquant le nom de la clé
 key(index): retourne la clé stockée à l'index spécifié
 clear(): efface toutes les paires
 */
