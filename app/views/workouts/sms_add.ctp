<?php
/**
 * Add a workout
 *
 * Path: /views/workouts/sms_add.ctp
 */

$page_header = '<h2>' . $title . '</h2>';

echo $r;

$this->set('page_header', $page_header);

$headers = $_REQUEST;
$body = $headers['Body'];
$num= $headers['From'];

header("content-type: text/xml");
echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
?>

<Response>
  <Sms>
    Got it (<?php echo $body . " - " . $num ?>)
  </Sms>
</Response>
