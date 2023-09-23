$(document).ready(function() {

  const renderTweets = function(tweets) {
    const $tweetsContainer = $('#tweets-container');

    $tweetsContainer.empty();

    for (let tweet of tweets) {
      const $tweetElement = createTweetElement(tweet);
      $tweetsContainer.prepend($tweetElement);
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
          <p class="timestamp" data-time=${tweet.created_at}></p>
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

  $("#myForm").submit(function(event) {
    event.preventDefault();
    let formData = $(this).serialize();

    if (formData.trim() === 'text=') {
      $('.error-messages').text("Your tweet cannot be empty!").slideDown();
      return;
    }

    const remainingChars = 140 - $("#tweet-text").val().length;
    if (remainingChars < 0) {
      $('.error-messages').text("Your tweet cannot be more than 140 characters!").slideDown();
      return;
    }

    $.post("http://localhost:8080/tweets/", formData, function(response) {
      $(".result").html(response);
      $(".error-messages").slideUp();
      loadTweets();
    });
    $(this)[0].reset();
  });

  let loadTweets = function() {
    $.get("http://localhost:8080/tweets", function(data) {
      renderTweets(data);
      $('.timestamp').each(function() {
        const timestamp = $(this).data('time');
        $(this).text(timeago.format(timestamp));
      });
    })
  }
  loadTweets();
});