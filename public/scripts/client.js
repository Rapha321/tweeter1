/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// To escape text to prevent from Cross Site Scripting (XSS)
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


let renderTweets = function(tweets) {
  // loops through tweets and calls createTweetElement() on each tweet and append to container
  $.each(tweets, (index, tweet) => {
    const $tweet = createTweetElement(tweet)
    $('.tweet').prepend($tweet);
  });
}

// Create HTML element
let createTweetElement = function(data) {
  let section =  `
          <article>
            <header class="tweet-header">
              <img src=${escape(data.user.avatars)}>
              <span class="name">${escape(data.user.name)}</span>
              <span class="initial">${escape(data.user.handle)}</span>
            </header>

            <div class="content">
              ${escape(data.content.text)}
            </div>

            <footer class="footer">
              <span>${escape(data.created_at)}</span>
              <div class="icons">
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </footer>
          </article>
      `
  return section;
}


$(document).ready(function() {  // to make sure that the DOM of the page is ready to manipulate.

  // make tweet textarea focus when user open the app.
  $('#tweet-text:first').focus();

  // When the user scrolls down 300px from the top of the document, show the button
  $(window).scroll(function(){
    if($(this).scrollTop() > 300){
      $('.arrow-up').fadeIn();
    } else{
      $('.arrow-up').fadeOut();
    }
  });

  // when top arrow button is clicked, scrolled to the top
  $(".arrow-up").click(function(){
    $('html ,body').animate({scrollTop : 0},800);
  });

  // when 'write new tweet' button is clicked, textarea becomes visible if its not and vice versa
  $('.write-new-tweet').click(function() {
    if ($('.container .new-tweet').is(':visible')) {
      $('.container .new-tweet').slideUp()
    }
    else {
      $('.container .new-tweet').slideDown()
      $('#tweet-text').focus()
    }
  })

  // GET request from server
  let loadTweets = function (url) {
    $.ajax({
      url,
      method: 'GET',
    })
      .done(function (data) {
        renderTweets(data)
      })
      .fail(function () {
        alert('error')
      })
      .always(function () {
        console.log('completed GET request')
      })
  }

  // To check if form is submitable. Cannot submit form if input is null/empty or input length > 140
  let submitable = function () {
    if ($('#tweet-text').val().length > 140) {
      $('.error-text').css({'color': 'red'}).slideDown()
      return false
    }
    else if ($('#tweet-text').val() === "" || $('#tweet-text').val() === null) {
      $('.error-empty').css({'color': 'red'}).slideDown()
      return false
    }
    else {
      return true
    }
  }

  // POST request when form is submitted
  $('.form-submit').submit(function(event) {
    event.preventDefault();
    let $tweetContent = $(this);

    if (submitable()) {
      $.ajax('/tweets', {
          method: 'POST',
          data: $tweetContent.serialize()
       })
        .done(function () {
            loadTweets("http://localhost:8080/tweets")
            $('.error-text').slideUp()
            $('.error-empty').slideUp()
            $('#tweet-text').val("") // emptied textarea after submit botton is clicked
            $('output').text("140")  //reset counter to 140
            $('.tweet').empty() // emptied form so that tweet does not get repeated
            $('.container .new-tweet').slideUp()
        })
        .fail(function () {
          alert('error')
        })
        .always(function () {
          console.log('completed POST request')
        })
    }

  })

  $(window).scroll(function() {
   if($(window).scrollTop() + $(document).height() > $('.new-tweet').height()) {
      $('.arrow-up').css('display','block')
   }
});

});
























