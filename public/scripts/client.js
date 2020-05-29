/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


let renderTweets = function(tweets) {
  // loops through tweets and calls createTweetElement() on each tweet and append to container
  $.each(tweets, (index, tweet) => {
    const $tweet = createTweetElement(tweet)
    $('.container').append($tweet);
  });
}

// Create HTML element
let createTweetElement = function(data) {
  let section =  `
        <section class="tweet">
          <article>
            <header class="tweet-header">
              <img src=${data.user.avatars}>
              <span class="name">${data.user.name}</span>
              <span class="initial">${data.user.handle}</span>
            </header>

            <div class="content">
              ${data.content.text}
            </div>

            <footer class="footer">
              <span>${data.created_at}</span>
              <div class="icons">
                <i class="fas fa-flag"></i>
                <i class="fas fa-retweet"></i>
                <i class="fas fa-heart"></i>
              </div>
            </footer>
          </article>
        </section>
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


  // POST request when form is submitted
  $('.form-submit').submit(function(event) {
    event.preventDefault();
    let $tweetContent = $(this);

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
  })

});
























