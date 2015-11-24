$(document).ready(function(){
  supprBtnDisabled = false;
  addBtnDisabled = false;
});


// SUPPRESSION D'UN TROUSSEAU

function showPopupSupprimerTrousseau (id, name){
  $("#suppr_name").text(name);
  $("#suppr_id_trousseau").text(id);
  $('.ui.basic.modal').modal('show');
}

function delTrousseauPopupSupprimerTrousseau(){
  if (!supprBtnDisabled){
    groupid = $("#suppr_id_trousseau").text();
    supprBtnDisabled = true;
    $.ajax({
      url : '/cfgpt/groups/remove',
      type : 'POST',
      data: {
        groupId: groupid
      },
      success : function(data, statut){
        $("#card_trousseau_id_"+groupid).remove();

        if ( $(".card_trousseau").length == 0 ){
          $("#line_no_trousseau").css('display','');
        }
      },
      error : function(resultat, statut, erreur){
        alert("Une erreur est survenue. Veuillez réessayer ultérieurement.");
      },
      complete : function(resultat, statut){
        supprBtnDisabled = false;
        $('.ui.basic.modal').modal('hide');
      }
    });
  }
}

function closePopupSupprimerTrousseau(){
  if (!supprBtnDisabled){
    $('.ui.basic.modal').modal('hide');
  }
}



// AJOUT D'UN TROUSSEAU

function showPopupAjoutTrousseau (){
  $('.ui.small.modal').modal('show');
}

function addTrousseauPopupAjoutTrousseau(){
  if (!addBtnDisabled) {
    if ( $("#add_trousseau_name").val() == ""){
      alert("Veuillez indiquer le nom du nouveau trousseau.")
    } else {
      nameTrousseau = $("#add_trousseau_name").val();
      addBtnDisabled = true;
      $.ajax({
        url: '/cfgpt/groups/add',
        type: 'POST',
        data: {
          name: nameTrousseau
        },
        success: function (data, statut) {
          if ($(".card_trousseau").length == 0) {
            $("#line_no_trousseau").css('display', 'none');
          }

          var newCard =
           '<div class="ui card" id="card_trousseau_id_'+data.group.id+'" class="card_trousseau">'
           + '<div class=" blurring image dimmable">'
           +  '<div class="ui blurring inverted dimmer transition hidden">'
           +   '<div class="content">'
           +    '<div class="center">'
           +     '<div class="ui blue button">'
           +      '<a style="width:100%;color:white" href="/trousseau/'+data.group.id+'">Consulter</a>'
           +     '</div>'
           +     '<div class="ui red button" onclick="showPopupSupprimerTrousseau(\'' + data.group.id + '\',\'' + data.group.name + '\');"'
           +    '>Supprimer</div>'
           +   '</div>'
           +  '</div>'
           + '</div>'
           + '<img src="images/maison.jpeg">'
           +'</div>'
           +'<div class="content">'
           + '<div class="header">' + data.group.name + '</div>'
           +  '<div class="meta">'
           +   '<a class="group">Dernière modification : <span>' + moment(data.group.updatedAt).format('DD/MM/YYYY HH:mm') + '</span></a>'
           +  '</div>'
           + '</div>'
           +'</div>'


          $("#cards_trousseaux").append($(newCard));
          $('.card .dimmer').dimmer({on: 'hover'});


        },
        error: function (resultat, statut, erreur) {
          alert("Une erreur est survenue. Veuillez réessayer ultérieurement.");
        },
        complete: function (resultat, statut) {
          addBtnDisabled = false;
          $("#add_trousseau_name").val("");
          $("#add_trousseau_name").text("");
          $('.ui.small.modal').modal('hide');
        }
      });
    }
  }
}

function closePopupAjoutTrousseau(){
  if (!addBtnDisabled){
    $('.ui.small.modal').modal('hide');
  }
}
