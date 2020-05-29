
$(document).ready(function() {  // to make sure that the DOM of the page is ready to manipulate.

  $('#tweet-text').on("keyup", function() {
    let typed = $(this).val().length
    if (typed > 140) {
      $('.counter').text(140 - typed).css("color", "red")
    } else {
      $('.counter').text(140 - typed).css("color", "darkslategray")
    }

  })

});