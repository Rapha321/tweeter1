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
      alert("Text content cannot be more than 140 characters!")
      return false
    }
    else if ($('#tweet-text').val() === "" || $('#tweet-text').val() === null) {
      alert("Text content cannot be empty or null")
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
            $('#tweet-text').val("") // emptied textarea after submit botton is clicked
            $('output').text("140")  //reset counter to 140
            $('.tweet').empty() // emptied form so that tweet does not get repeated
        })
        .fail(function () {
          alert('error')
        })
        .always(function () {
          console.log('completed POST request')
        })
    }

  })

});
























