<?php
echo $this->element('react_page', array(
  'css' => array(
    'app/Activity',
    'app/Workout',
    'components/Calendar',
    'components/DateTimePicker',
    'components/Facepile',
    'components/FBFriendTokenizer',
    'components/Topline',
  ),
  'page' => 'React',
  'title' => 'React Components',
));
