$(document).ready(function() {

  const newtweet = document.getElementById('tweet-text')

  newtweet.addEventListener("keyup", function() {
    let typed = $(this).val().length
    if (typed > 140) {
      $('.counter').text(140 - typed).css("color", "red")
    } else {
      $('.counter').text(140 - typed)
    }

  })

});