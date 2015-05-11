<?php

/**
 * /libs/response.php
 */
class Response {

  private $response = array();

  public function __construct() {
    $this->response = array(
      'success' => false
    );
  }

  /**
   * By default, encode the response as JSON, since we're generally sending
   * this to the client to be used in javascript.
   */
  public function send($asJson=true) {
    if ($asJson) {
      return json_encode($this->response);
    }
    return $this->response;
  }

  /**
   * The message to be displayed, if any
   */
  public function setMessage($message) {
    $this->response['message'] = $message;
    return $this;
  }

  /**
   * The payload to be delivered.
   */
  public function setPayload(/*any*/ $payload) {
    $this->response['payload'] = $payload;
    return $this;
  }

  /**
   * Set whether the request succeeded or not.
   */
  public function setSuccess(/*bool*/ $success) {
    $this->response['success'] = !!$success;
    return $this;
  }

  /**
   * Freeform method for sending back data. Should not be used frequently.
   */
  public function setField($field, $value) {
    $this->response[$field] = $value;
    return $this;
  }
}
