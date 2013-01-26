<?php
class VdotsController extends AppController {

	var $name = 'Vdots';

	function beforeFilter() {
    parent::beforeFilter();
    $this->Auth->allowedActions = array('*');
  }

	function index() {
    $title_for_layout = __(
      'Calculate Your Current VDOT Level and Training Intensity', 1
    );

    $paces = array();
    if (isset($this->params['data'])) {
      $data = $this->params['data']['Vdot'];

      $distance = idx($data, 'distances');
      $hh = idx($data, 'hh');
      $mm = idx($data, 'mm');
      $ss = idx($data, 'ss');

      // TODO: Better form validation
      $errors = array();
      if (!$distance) {
        $errors[] = __('Please select a distance.', 1);
      }

      if (!is_numeric($hh) || !is_numeric($mm) || !is_numeric($ss)) {
        $errors[] = __('Please enter a valid time.', 1);
      }

      if (empty($errors)) {
        $time = time_to_sec(array($hh, $mm, $ss));
        $vdot = $this->Vdot->getVdotFromPerformance($distance, $time);

        switch($vdot) {
          case -1:
            $errors[] = __('Dear lord you are slow.', 1);
            break;
          case 0:
            $errors[] = __('Oh really? That fast?', 1);
            break;
          default:
            break;
        }
      }

      if (empty($errors)) {
        $paces = $this->Vdot->getPacesFromVdot($vdot);
        $this->set(compact('paces', 'vdot'));
      } else {
        $this->Session->setFlash(
          implode(' ', $errors),
          'default',
          array('class' => 'error-message')
        );
      }
    }

    $distances = $this->Vdot->getDistancesForDropdown();
    $this->set(compact('distances', 'title_for_layout'));
	}

}
