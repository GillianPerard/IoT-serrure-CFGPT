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
        $("#line_trousseau_id_"+groupid).remove();

        if ( $(".line_trousseau").length == 0 ){
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

function showPopupAjoutTrousseau (id, name){
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
          if ($(".line_trousseau").length == 0) {
            $("#line_no_trousseau").css('display', 'none');
          }

          var newRow =
            '<tr id="line_trousseau_id_'+data.group.id+'" class="line_trousseau">'
            + '<td class="left aligned">' + data.group.name + '</td>'
            + '<td>' + moment(data.group.updatedAt).format('DD/MM/YYYY HH:mm') + '</td>'
            + '<td>'
            + '<button class="ui blue button" onclick="">Consulter</button>'
            + '<button class="ui red button" onclick="showPopupSupprimerTrousseau(\'' + data.group.id + '\',\'' + data.group.name + '\');"'
            + '>Supprimer</button>'
            + '</td>'
            + '</tr>'

          $("#table_trousseaux").find('tbody').append($(newRow));


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
