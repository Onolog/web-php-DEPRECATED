<?php
/**
 * Friend typeahead element
 * /app/views/elements/friend_typeahead.ctp
 *
 * Creates a text input with typeahead functionality that returns
 * a tokenized list of the user's facebook friends.
 */

$this->Include->css('token-input-facebook');
$this->Include->js('jquery.tokeninput');

// This shouldn't be necessary, but it's an extra precaution
// in case the friends data isn't set. Default to null.
if (!isset($friends) || !$friends) {
  $friends = 'null';
}

// Render the typeahead
$r =
  $form->input(
    'friends',
    array('id' => 'typeahead')
  );

echo $r;

// Set JS for the element
$this->Html->scriptStart(array('inline' => false));
echo "
  $(document).ready(function () {
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
