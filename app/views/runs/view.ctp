<?php
/**
 * Displays a read-only view of a workout
 *
 * File: /app/views/workouts/view.ctp
 */

$this->Include->css('workout');
$this->set('page_classes', array('workout_view'));

$page_url = 'http://www.onolog.com/runs/view/' . $run['RunDetail']['id'];
$date = date('F jS, Y', $run['Run']['date']);
$time = format_time($run['RunDetail']['time_arr']);
$distance = number_format($run['RunDetail']['distance'], 2);
$notes = idx($run['RunDetail'], 'notes', '');

// Set OG meta tags
$this->Meta->og('og:title', $date . ' &middot; ' . $distance . ' miles &middot; ' . $time);
$this->Meta->og('og:url', $page_url);
$this->Meta->og('og:type', 'onolog:run');
$this->Meta->og('og:site_name', 'Onolog');
$this->Meta->og('og:description', $notes);
$this->Meta->og('fb:app_id', FB_APP_ID);

$shoe = null;
if (idx($brand['Brand'], 'name') && idx($run['Shoe'], 'model')) {
  $shoe = $brand['Brand']['name']. ' ' .$run['Shoe']['model'];
}

$user_img = 'https://graph.facebook.com/' . $run['User']['id'] . '/picture';

// Render the markup
$r =
  '<h2>' . $date . '</h2>' .

  '<div class="clearfix">' .
    '<div class="left_col">' .
      $this->Html->image($user_img, array(
        'class' => 'owner_img'
      )) .
      '<fb:like ' .
        'href="onolog.com/run/view/'.$run['RunDetail']['id'].'" ' .
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
              'Pace'  => calculate_pace($run['RunDetail']['time'], $distance)
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
        $notes .
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
            'actions' => array('action' => 'edit', $run['RunDetail']['id'])
          ),
  
          array(
            'label' => __('Delete Workout', 1),
            'actions' => array(
              'action' => 'delete',
              $run['RunDetail']['id']
            ),
            'confirmation' => __('Are you sure you want to delete this workout?', 1)
          ),
          array(
            'label' => __('All Workouts', 1),
            'actions' => array('action' => 'index')
          ),
          array(
            'label' => __('New Workout', 1),
            'actions' => array('action' => 'add')
          ),
        )
      )
    );
}

$this->set('sidebar', $sidebar);
