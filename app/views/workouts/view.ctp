<?php
/**
 * Displays a read-only view of a workout
 *
 * File: /app/views/workouts/view.ctp
 */

// Array of the info we want to display
// TODO: Should all this go in the Model or Controller?

$this->Include->css('workout');
$this->set('page_classes', array('workout_view'));

$page_url = 'http://www.onolog.com/workouts/view/'.$workout['Workout']['id'];
$date = date('F jS, Y', $workout['Workout']['date']);
$time = format_time($workout['Workout']['time_arr']);
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


$shoe = null;
if (idx($brand['Brand'], 'name') && idx($workout['Shoe'], 'model')) {
  $shoe = $brand['Brand']['name']. ' ' .$workout['Shoe']['model'];
}

$user_img = 'https://graph.facebook.com/' . $workout['User']['id'] . '/picture';


$page_header = '<h2>' . $date . '</h2>';

// Render the markup
$r =
  '<div class="clearfix">' .
    '<div class="left_col">' .
      $this->Html->image($user_img, array(
        'class' => 'owner_img'
      )) .
      '<fb:like ' .
        'href="onolog.com/workouts/view/'.$workout['Workout']['id'].'" ' .
        'send="true" ' .
        'layout="box_count" ' .
        'width="50" ' .
        'show_faces="false" ' .
        'action="like" ' .
        'font="lucida grande">' .
      '</fb:like>' .
    '</div>' .

    '<div class="right_col">' .
        $this->element('topline',
          array(
            'stats' => array(
              'Miles' => $distance,
              'Time'  => $time,
              'Pace'  => calculate_pace($workout['Workout']['time'], $workout['Workout']['distance'])
            )
          )
        );

      // Friends
      if (!empty($friends)) {
        $r .= '<div class="friends">';

        foreach ($friends as $friend) {
          $src = 'https://graph.facebook.com/' . $friend['id'] . '/picture';
          $r .= $this->Html->image($src);
        }
        $r .= '</div>';
      }

    // Notes
    $r .=
      '<div class="notes">' .
        idx($workout['Workout'], 'notes') .
      '</div>' .

      // Comments
      '<fb:comments href="'. $page_url . '" num_posts="4" width="600">' .
      '</fb:comments>' .
    '</div>' .
  '</div>';

echo $r;

// Sidebar
$sidebar = '';
if ($is_owner) {
  $sidebar =
    $this->element(
      'sidebar',
      array(
        'items' => array(
          array(
            'label' => __('Edit Workout', 1),
            'actions' => array('action' => 'edit', $workout['Workout']['id'])
          ),
  
          array(
            'label' => __('Delete Workout', 1),
            'actions' => array(
              'action' => 'delete',
              $workout['Workout']['id']
            ),
            'confirmation' => __('Are you sure you want to delete this workout?', 1)
          ),
          array(
            'label' => __('All Workouts', 1),
            'actions' => array('controller' => 'users', 'action' => 'index')
          ),
          array(
            'label' => __('New Workout', 1),
            'actions' => array('action' => 'add')
          ),
        )
      )
    );
}

$this->set('page_header', $page_header);
$this->set('sidebar', $sidebar);
