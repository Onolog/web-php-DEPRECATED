<?php
echo $this->element('react_page', array(
  'classes' => array('narrow-page'),
  'css' => array(
    'app/Activity',
    'components/Facepile',
    'components/Topline'
  ),
  'path' => '/build/Garmin',
  'title' => 'Garmin File Uploader',
));
