<?php
/**
 * Ajax endpoint for displaying friend data
 */


echo 
  '<div class="modal-header">' .
    '<button type="button" class="close" data-dismiss="modal">' .
      '<span aria-hidden="true">&times;</span>' .
      '<span class="sr-only">Close</span>' .
    '</button>' .
    '<h4 class="modal-title">' .
      'Modal Title' .
    '</h4>' .
  '</div>' .
  '<div class="modal-body">' .
    $this->element('friend_list', array(
      'friends' => $friends,
      'small'   => true
    )) .
  '</div>' .
  '<div class="modal-footer">' .
    'This is the footer' .
  '</div>';
