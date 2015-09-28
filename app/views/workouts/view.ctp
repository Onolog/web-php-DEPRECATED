<?php
/**
 * Displays a read-only view of a workout
 *
 * File: /app/views/workouts/view.ctp
 */
$page_url = 'http://www.onolog.com/workouts/view/' . $workout['Workout']['id'];
$date = date('F jS, Y', $workout['Workout']['date']);
$time = format_time($workout['Workout']['time']);
$distance = number_format($workout['Workout']['distance'], 2);

// Set OG meta tags
$this->Meta->og('og:title', $date . ' &middot; ' . $distance . ' miles &middot; ' . $time);
$this->Meta->og('og:url', $page_url);
$this->Meta->og('og:type', 'onolog:run');
$this->Meta->og('og:site_name', 'Onolog');
$this->Meta->og('og:description', idx($workout['Workout'], 'notes'));
$this->Meta->og('onolog:distance', $distance);
$this->Meta->og('onolog:time', $time);
$this->Meta->og('fb:app_id', FB_APP_ID);

echo $this->element('react_page', array(
  'css' => array(
    'app/Activity',
    'app/Workout',
    'components/Facepile',
    'components/Topline'
  ),
  'data' => array(
    'viewer' => $viewer,
    'workout' => $workout['Workout']
  ),
  'page' => 'Workout',
  'title' => $date,
));
