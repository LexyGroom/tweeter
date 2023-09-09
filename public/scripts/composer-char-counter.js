$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    let textValue = this.value;
    let textLength = textValue.length;
    let remaining = 140 - textLength;
    
    let $counter = $(this)
      .closest('.new-tweet')
      .find('.counter');
    
    $counter.text(remaining);
    
    if (remaining < 0) {
      $counter.addClass('invalid-counter');
    } else {
      $counter.removeClass('invalid-counter');
    }
    
    console.log(textLength);
  });
});