<?php
echo $this->element('react_page', array(
  'data' => array(
    'users' => array($user),
  ),
  'page' => 'Settings',
  'title' => 'Settings',
));
