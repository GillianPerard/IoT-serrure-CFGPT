$(document).ready(function() {
    $('.ui.form').form({
      fields: {
        email: {
          identifier  : 'email',
          rules: [{
              type   : 'empty',
              prompt : 'Veuillez saisir votre adresse e-mail.'
            },
            {
              type   : 'email',
              prompt : 'Veuillez saisir une adresse e-mail valide.'
            }
          ]
        },
        password: {
          identifier  : 'password',
          rules: [{
              type   : 'empty',
              prompt : 'Veuillez saisir votre mot de passe.'
            }
          ]
        }
      }
    });
});
