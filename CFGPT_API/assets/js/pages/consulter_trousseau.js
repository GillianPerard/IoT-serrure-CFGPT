$(document).ready(function(){
  supprSerrureBtnDisabled = false;
  addSerrureBtnDisabled = false;
  linkSerrureBtnDisabled = false;
});

/******************************** SERRURES ******************************************/
/************************************************************************************/

function affichePartieSerrures (groupId){
  $("#partie_serrures").load(
    "/cfgpt/trousseau/serrures", {
      groupId: groupId
     },
     function(responseTxt, statusTxt, xhr){
       if(statusTxt == "success"){
         //alert("External content loaded successfully!");
         $("#partie_serrures").css("display",'');
         $("#no_info_warning").css("display",'none');
       }
       if(statusTxt == "error")
         alert("Error: " + xhr.status + ": " + xhr.statusText);
     }
  );
}


// SUPPRESSION D'UNE SERRURE
function showPopupSupprimerSerrure (id, name){
  $("#suppr_name_serr").text(name);
  $("#suppr_id_serr").text(id);

  $('#popup_suppr_serrure').modal('show');
}
function delSerrurePopupSupprimerSerrure(){
  if (!supprSerrureBtnDisabled){
    idObject = $("#suppr_id_serr").text();
    supprSerrureBtnDisabled = true;
    $.ajax({
      url : '/cfgpt/trousseau/connectedobjects/remove',
      type : 'POST',
      data: {
        groupId: $("#hid_trousseau_id").text(),
        conObjId: idObject
      },
      success : function(data, statut){
        $("#line_serrure_id_"+idObject).remove();

        if ( $(".line_serrure").length == 0 ){
          $("#line_no_serrure").css('display','');
        }

        gestionWebSocketSouscription();
        $("#btn_show_serrures").click();
      },
      error : function(resultat, statut, erreur){
        alert("Une erreur est survenue. Veuillez réessayer ultérieurement.");
      },
      complete : function(resultat, statut){
        supprSerrureBtnDisabled = false;
        $('#popup_suppr_serrure').modal('hide');
      }
    });
  }
}
function closePopupSupprimerSerrure (){
  if (!supprSerrureBtnDisabled){
    $('#popup_suppr_serrure').modal('hide');
  }
}



// AJOUT D'UNE SERRURE
function showPopupAjoutSerrure (){
  $('#popup_ajout_serrure').modal('show');
}
function addSerrurePopupAjoutSerrure(){
  if (!addSerrureBtnDisabled) {
    if ( $("#add_serrure_name").val() == "" || $("#add_serrure_token").val() == ""){
      alert("Veuillez renseigner les champs avant de continuer.")
    } else {
      nameSerrure = $("#add_serrure_name").val();
      tokenSerrure = $("#add_serrure_token").val();
      addSerrureBtnDisabled = true;
      $.ajax({
        url: '/cfgpt/connectedobjects/add',
        type: 'POST',
        data: {
          name: nameSerrure,
          tokenObject: tokenSerrure
        },
        success: function (data, statut) {
          $.ajax({
            url: '/cfgpt/trousseau/connectedobjects/assign',
            type: 'POST',
            data: {
              groupId: $("#hid_trousseau_id").text(),
              conObjId: data.id
            },
            success: function (data, statut) {
              gestionWebSocketSouscription();
              $("#btn_show_serrures").click();
            },
            error: function (resultat, statut, erreur) {
              alert("Une erreur est survenue. Veuillez réessayer ultérieurement.");
            }
          });
        },
        error: function (resultat, statut, erreur) {
          alert("Une erreur est survenue. Veuillez réessayer ultérieurement.");
        },
        complete: function (resultat, statut) {
          addSerrureBtnDisabled = false;
          $("#add_serrure_name").val("");
          $("#add_serrure_name").text("");
          $("#add_serrure_token").val("");
          $("#add_serrure_token").text("");
          $('#popup_ajout_serrure').modal('hide');
        }
      });
    }
  }
}
function closePopupAjoutSerrure(){
  if (!addSerrureBtnDisabled){
    $('#popup_ajout_serrure').modal('hide');
  }
}


// ASSOCIER/LINK UNE SERRURE
function showPopupLinkSerrure (){
  $('#popup_link_serrure').modal('show');
}
function linkSerrurePopupLinkSerrure(){
  if (!linkSerrureBtnDisabled) {
    if ( $("#link_serrure_token").val() == ""){
      alert("Veuillez renseigner le token avant de continuer.")
    } else {
      groupId = $("#hid_trousseau_id").text();
      tokenSerrure = $("#link_serrure_token").val();
      linkSerrureBtnDisabled = true;
      $.ajax({
        url: '/cfgpt/connectedobjects/addexist',
        type: 'POST',
        data: {
          groupId: groupId,
          conObjToken: tokenSerrure
        },
        success: function (data, statut) {
          gestionWebSocketSouscription();
          $("#btn_show_serrures").click();
        },
        error: function (resultat, statut, erreur) {
          if ( resultat['responseJSON']['message'] == 'ERR_BAD_TOKEN'){
            alert("Aucune serrure trouvée pour le Token indiqué.");
          } else if (resultat['responseJSON']['message'] == 'ERR_ALREADY_LINKED') {
            alert("Cette serrure fait déjà partie de ce trousseau !");
          } else {
            alert("Une erreur est survenue. Veuillez réessayer ultérieurement.");
          }
        },
        complete: function (resultat, statut) {
          linkSerrureBtnDisabled = false;
          $("#link_serrure_token").val("");
          $("#link_serrure_token").text("");
          $('#popup_link_serrure').modal('hide');
        }
      });
    }
  }
}
function closePopupLinkSerrure(){
  if (!linkSerrureBtnDisabled){
    $('#popup_link_serrure').modal('hide');
  }
}


// CHANGER ETAT
function serrureChangeEtat(objId, state){
  $.ajax({
    url : '/cfgpt/connectedobject/changeetat',
    type : 'POST',
    data: {
      objId: objId,
      state: (state == 0? 'Fermé':'Ouvert')
    },
    success : function(data, statut){
      //$("#btn_show_serrures").click(); -> Fait automatiquement par WebSocket
    },
    error : function(resultat, statut, erreur){
      alert("Une erreur est survenue. Veuillez réessayer ultérieurement.");
    }
  });
}

//Afficher les logs d'une serrure
function showPopupJournauxSerrure (token, name){
  $("#logs_name_serr").text(name);
  $("#logs_token_serr").text(token);
  $("#popup_journaux_serrure .content").load(
    "/cfgpt/connectedobject/logs", {
      tokenObject: token
    },
    function(responseTxt, statusTxt, xhr){
      if(statusTxt == "success"){
        $('#popup_journaux_serrure').modal('show');
      }
      if(statusTxt == "error")
        alert("Erreur de chargement. Veuillez réessayer ultérieurement.");
    }
  );


}

function closePopupJournauxSerrure(){
  $('#popup_journaux_serrure').modal('hide');
}



/******************************** UTILISATEURS ******************************************/
/************************************************************************************/




function affichePartieUtilisateurs (groupId){
  $("#no_info_warning").css("display",'none');
}
