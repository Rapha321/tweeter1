/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const tweetData = [
        {
          "user": {
            "name": "Newton",
            "avatars": "https://i.imgur.com/73hZDYK.png"
            ,
            "handle": "@SirIsaac"
          },
          "content": {
            "text": "If I have seen further it is by standing on the shoulders of giants"
          },
          "created_at": 1461116232227
        },
        {
          "user": {
            "name": "Descartes",
            "avatars": "https://i.imgur.com/nlhLi3I.png",
            "handle": "@rd" },
          "content": {
            "text": "Je pense , donc je suis"
          },
          "created_at": 1461113959088
        }
      ]


  const renderTweets = function(tweets) {
    // loops through tweets and calls createTweetElement for each tweet and append to container
    $.each(tweets, (index, tweet) => {
      const $tweet = createTweetElement(tweet)
      $('.container').append($tweet);
    });
  }


// Create HTML element
   const createTweetElement = function(data) {
    return `
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
  }


  renderTweets(tweetData)

});

