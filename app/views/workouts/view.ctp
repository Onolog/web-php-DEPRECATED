<?php
/**
 * Displays a read-only view of a workout
 *
 * File: /app/views/workouts/view.ctp
 */
$activity = $workout['Workout'];
$page_url = 'http://www.onolog.com/workouts/view/' . $activity['id'];
$date = date('F jS, Y', $activity['date']);
$time = format_time($activity['time']);
$distance = number_format($activity['distance'], 2);

// Set OG meta tags
$this->Meta->og('og:title', $date . ' &middot; ' . $distance . ' miles &middot; ' . $time);
$this->Meta->og('og:url', $page_url);
$this->Meta->og('og:type', 'onolog:run');
$this->Meta->og('og:site_name', 'Onolog');
$this->Meta->og('og:description', idx($activity, 'notes'));
$this->Meta->og('onolog:distance', $distance);
$this->Meta->og('onolog:time', $time);
$this->Meta->og('fb:app_id', FB_APP_ID);

echo $this->element('react_page', array(
  'css' => array('app/Workout'),
  'data' => array(
    'shoes' => array($activity['shoes']),
    'workouts' => array($activity),
  ),
  'page' => 'Workout',
  'title' => $date,
));
