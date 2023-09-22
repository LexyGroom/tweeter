$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense, donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');

    $tweetsContainer.empty();

    for (let tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $tweetsContainer.append($tweetElement);
    }
  };

  const createTweetElement = function(tweet) {
    let $tweet = $(`
      <article class="tweets-container">
        <header class="user-info">
          <h3>
            <i class="fas fa-user"></i> 
            <span class="user-name">${tweet.user.name}</span>
          </h3>
          <span class="user-handle">${tweet.user.handle}</span>
        </header>
        <p>${tweet.content.text}</p>
        <footer class="tweets-footer">
          <p>${tweet.created_at}</p>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
    return $tweet;
  };

  renderTweets(data);
});

$(document).ready(function() {
  $("#myForm").submit(function(event) {
    event.preventDefault();
    let formData = $(this).serialize();

    console.log("Serialized Form Data:", formData);

    $.post("http://localhost:8080/tweets/", formData, function(response) {
      $(".result").html(response);
    });
  });
});