<?php
/**
 * Friend typeahead element
 * /app/views/elements/friend_typeahead.ctp
 *
 * Creates a text input with typeahead functionality that returns
 * a tokenized list of the user's facebook friends.
 */

$this->Include->css('token-input-facebook');

// This shouldn't be necessary, but it's an extra precaution
// in case the friends data isn't set. Default to null.
if (!isset($friends) || !$friends) {
  $friends = 'null';
}

// Render the typeahead
$r =
  '<div class="typeahead-container">' .
    $form->input(
      'friends',
      array(
        'id' => 'typeahead',
        'class' => 'form-control',
        'placeholder' => 'Friends'
      )
    ) .
  '</div>';

echo $r;

// Set JS for the element
$this->Html->scriptStart(array('inline' => false));
echo "
  require(['lib/TokenInput'], function(tokenInput) {
    $('#typeahead').tokenInput('/ajax/users/friends_list/', {
      theme: 'facebook',
      hintText: 'Type a friend\'s name',
      preventDuplicates: true,
      animateDropdown: false,
      prePopulate: $friends
    });
  });
";
$this->Html->scriptEnd();
