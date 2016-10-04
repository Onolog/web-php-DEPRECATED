<?php

use Cake\Core\Configure;

/**
 * Displays a read-only view of a workout
 *
 * File: /app/views/workouts/view.ctp
 */
$page_url = 'http://www.onolog.com/activity/view/' . $activity['id'];
$date = date('F jS, Y', strtotime($activity['start_date']));
$time = format_time($activity['duration']);
$distance = number_format($activity['distance'], 2);

// Set OG meta tags
$this->Meta->og('og:title', $date . ' &middot; ' . $distance . ' miles &middot; ' . $time);
$this->Meta->og('og:url', $page_url);
$this->Meta->og('og:type', 'onolog:run');
$this->Meta->og('og:site_name', 'Onolog');
$this->Meta->og('og:description', idx($activity, 'notes'));
$this->Meta->og('onolog:distance', $distance);
$this->Meta->og('onolog:time', $time);
$this->Meta->og('fb:app_id', Configure::read('Facebook.appId'));

echo $this->element('react_page', [
  'data' => [
    'activities' => [$activity],
    'shoes' => $shoes,
    'users' => [$user],
  ],
  'page' => 'Workout',
  'title' => $date,
]);
