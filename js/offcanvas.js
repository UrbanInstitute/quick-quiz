$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
  
  $('#sidebar').affix({
      offset: {
        top: 245
      }
});
  
});