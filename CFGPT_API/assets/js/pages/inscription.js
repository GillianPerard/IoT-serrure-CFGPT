$(document).ready(function() {
  $('.ui.form').form({
    fields: {
      email: {
        identifier  : 'email',
        rules: [{
            type   : 'empty',
            prompt : 'Veuillez saisir une adresse e-mail.'
          },
          {
            type   : 'email',
            prompt : 'Veuillez saisir une adresse e-mail valide.'
          }
        ]
      },
      firstname: {
        identifier  : 'firstname',
        rules: [{
          type   : 'empty',
          prompt : 'Veuillez saisir votre prénom.'
        }
        ]
      },
      lastname: {
        identifier  : 'lastname',
        rules: [{
          type   : 'empty',
          prompt : 'Veuillez saisir votre nom.'
        }
        ]
      },
      password: {
        identifier  : 'password',
        rules: [{
            type   : 'empty',
            prompt : 'Veuillez saisir un mot de passe.'
          }
        ]
      }
    }
  });
});
