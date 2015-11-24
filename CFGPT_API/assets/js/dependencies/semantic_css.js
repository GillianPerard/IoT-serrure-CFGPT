$(document).ready(function() {
  $('.ui.menu .ui.dropdown').dropdown({on: 'hover' });
  $('.ui.menu a.item').on('click', function() {
      $(this).addClass('active').siblings().removeClass('active');
  });
  //$('.special.card .image').dimmer({on: 'hover'});
  //$('.star.rating').rating();
  $('.card .dimmer').dimmer({on: 'hover'});
});
