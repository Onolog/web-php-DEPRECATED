<?php
class Vdot extends AppModel {
	var $name = 'Vdot';
	var $validate = array(
    'distance' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				'message' => 'Please enter a valid distance',
				'allowEmpty' => false,
			),
		),
		'time' => array(
			'numeric' => array(
				'rule' => array('numeric'),
				'message' => 'Please enter a valid time',
				'allowEmpty' => true,
			),
		),
	);

  const DISTANCE_1500     = 1;
  const DISTANCE_MILE     = 2;
  const DISTANCE_3k       = 3;
  const DISTANCE_2MILE    = 4;
  const DISTANCE_5k       = 5;
  const DISTANCE_10k      = 6;
  const DISTANCE_15k      = 7;
  const DISTANCE_HALF     = 8;
  const DISTANCE_MARATHON = 9;

  /**
   * Retrieves the corresponding VDOT for a given distance & performance.
   * Returns the VDOT value if the performance falls within the scope of the
   * table, -1 if it is too slow, and 0 if it is too fast.
   *
   * @param int   $distance   Corresponds to class constants
   * @param int   $perf       In seconds
   *
   * @return int  $value
   */
  public function getVdotFromPerformance($distance, $perf) {
    $values = $this->getVdotValues();
    $times = $values[$distance];
    $value = -1;
    $last_time = end($times);
    foreach ($times as $vdot => $time) {
      // Default to a lower VDOT rather than higher
      if ($perf <= $time) {
        $value = $vdot;
      }
      // Reset value if performance exceeds the bounds of the table
      // (and human ability)
      if ($perf < $last_time) {
        $value = 0;
      }
    }
    return $value;
  }

  /**
   * Get all the paces for a given VDOT
   */
  public function getPacesFromVdot($vdot) {
    $vdot_paces = $this->getPaces();
    $paces = $vdot_paces[$vdot];
    
    return $paces;
  }

/*
  private function addPaceLabels($paces) {
    $labeled = array();
    foreach ($paces as $type => $distances) {
      for ($i=0; $i<count($distances); $i++) {
        switch ($type) {
          case 'e':
            $labled[$type]['mile'] = 
            break;
          case 'm':
            break;
          case 't':
            break;
          case 'i':
            break;
          case 'r':
            break;
        }
      }
    }
  }
*/

  /**
   * Basically just a wrapper around getDistances()
   */
  public function getDistancesForDropdown() {
    $distances = array();
    foreach ($this->getDistances() as $distance) {
      $distances[$distance['value']] = $distance['label'];
    }
    return $distances;
  }

  /**
   * For a given VDOT value, returns the corresponding
   * E, M, T, I and R paces, in seconds
   *
   * @param   int  $vdot
   * @return  arr
   */
  private function getPaces() {
    return array(
      30 => array('e' => array('mile' => 760), 'm' => array('mile' => 661), 't' => array('400m' => 153, '1000m' => 384, 'mile' => 618), 'i' => array('400m' => 142, '1000m' => null, '1200m' => null, 'mile' => null), 'r' => array('200m' => 67, '400m' => 136, '800m' => null)),
      31 => array('e' => array('mile' => 742), 'm' => array('mile' => 645), 't' => array('400m' => 150, '1000m' => 374, 'mile' => 602), 'i' => array('400m' => 138, '1000m' => null, '1200m' => null, null), 'r' => array(65, 132, null)),
      32 => array('e' => array('mile' => 724), 'm' => array('mile' => 629), 't' => array('400m' => 146, '1000m' => 365, 'mile' => 587), 'i' => array('400m' => 134, '1000m' => null, '1200m' => null, null), 'r' => array(63, 128, null)),
      33 => array('e' => array('mile' => 708), 'm' => array('mile' => 614), 't' => array('400m' => 143, '1000m' => 356, 'mile' => 573), 'i' => array('400m' => 131, '1000m' => null, '1200m' => null, null), 'r' => array(62, 125, null)),
      34 => array('e' => array('mile' => 692), 'm' => array('mile' => 600), 't' => array('400m' => 139, '1000m' => 348, 'mile' => 560), 'i' => array('400m' => 128, '1000m' => null, '1200m' => null, null), 'r' => array(60, 122, null)),
      35 => array('e' => array('mile' => 677), 'm' => array('mile' => 586), 't' => array('400m' => 136, '1000m' => 340, 'mile' => 547), 'i' => array('400m' => 125, '1000m' => null, '1200m' => null, null), 'r' => array(59, 119, null)),
      36 => array('e' => array('mile' => 662), 'm' => array('mile' => 573), 't' => array('400m' => 133, '1000m' => 333, 'mile' => 535), 'i' => array('400m' => 122, '1000m' => 307, '1200m' => null, null), 'r' => array(57, 115, null)),
      37 => array('e' => array('mile' => 649), 'm' => array('mile' => 560), 't' => array('400m' => 130, '1000m' => 325, 'mile' => 524), 'i' => array('400m' => 119, '1000m' => 300, '1200m' => null, null), 'r' => array(56, 113, null)),
      38 => array('e' => array('mile' => 635), 'm' => array('mile' => 548), 't' => array('400m' => 127, '1000m' => 319, 'mile' => 513), 'i' => array('400m' => 116, '1000m' => 294, '1200m' => null, null), 'r' => array(54, 110, null)),
      39 => array('e' => array('mile' => 623), 'm' => array('mile' => 537), 't' => array('400m' => 125, '1000m' => 312, 'mile' => 502), 'i' => array('400m' => 114, '1000m' => 288, '1200m' => null, null), 'r' => array(53, 108, null)),
      40 => array('e' => array('mile' => 611), 'm' => array('mile' => 526), 't' => array('400m' => 122, '1000m' => 306, 'mile' => 492), 'i' => array('400m' => 112, '1000m' => 282, '1200m' => null, null), 'r' => array(52, 106, null)),
      41 => array('e' => array('mile' => 599), 'm' => array('mile' => 515), 't' => array('400m' => 120, '1000m' => 300, 'mile' => 482), 'i' => array('400m' => 110, '1000m' => 276, '1200m' => null, null), 'r' => array(51, 104, null)),
      42 => array('e' => array('mile' => 588), 'm' => array('mile' => 505), 't' => array('400m' => 117, '1000m' => 294, 'mile' => 472), 'i' => array('400m' => 108, '1000m' => 271, '1200m' => null, null), 'r' => array(50, 102, null)),
      43 => array('e' => array('mile' => 577), 'm' => array('mile' => 495), 't' => array('400m' => 115, '1000m' => 289, 'mile' => 462), 'i' => array('400m' => 106, '1000m' => 266, '1200m' => null, null), 'r' => array(49, 100, null)),
      44 => array('e' => array('mile' => 567), 'm' => array('mile' => 486), 't' => array('400m' => 113, '1000m' => 283, 'mile' => 453), 'i' => array('400m' => 104, '1000m' => 261, '1200m' => null, null), 'r' => array(48, 98, null)),
      45 => array('e' => array('mile' => 557), 'm' => array('mile' => 477), 't' => array('400m' => 111, '1000m' => 278, 'mile' => 445), 'i' => array('400m' => 102, '1000m' => 256, '1200m' => null, null), 'r' => array(47, 96, null)),
      46 => array('e' => array('mile' => 547), 'm' => array('mile' => 468), 't' => array('400m' => 109, '1000m' => 273, 'mile' => 437), 'i' => array('400m' => 100, '1000m' => 252, '1200m' => 300, null), 'r' => array(46, 94, null)),
      47 => array('e' => array('mile' => 538), 'm' => array('mile' => 460), 't' => array('400m' => 107, '1000m' => 269, 'mile' => 430), 'i' => array('400m' => 98, '1000m' => 247, '1200m' => 294, null), 'r' => array(45, 92, null)),
      48 => array('e' => array('mile' => 529), 'm' => array('mile' => 452), 't' => array('400m' => 105, '1000m' => 264, 'mile' => 422), 'i' => array('400m' => 96, '1000m' => 243, '1200m' => 289, null), 'r' => array(44, 90, null)),
      49 => array('e' => array('mile' => 520), 'm' => array('mile' => 444), 't' => array('400m' => 103, '1000m' => 260, 'mile' => 415), 'i' => array('400m' => 95, '1000m' => 239, '1200m' => 285, null), 'r' => array(44, 89, null)),
      50 => array('e' => array('mile' => 512), 'm' => array('mile' => 437), 't' => array('400m' => 102, '1000m' => 255, 'mile' => 411), 'i' => array('400m' => 93, '1000m' => 235, 281, null), 'r' => array(43, 87, null)),
      51 => array('e' => array('mile' => 504), 'm' => array('mile' => 429), 't' => array('400m' => 100, '1000m' => 251, 'mile' => 404), 'i' => array('400m' => 92, '1000m' => 231, 276, null), 'r' => array(42, 86, null)),
      52 => array('e' => array('mile' => 496), 'm' => array('mile' => 422), 't' => array('400m' => 98, '1000m' => 247, 'mile' => 398), 'i' => array('400m' => 91, '1000m' => 228, 273, null), 'r' => array(42, 85, null)),
      53 => array('e' => array('mile' => 489), 'm' => array('mile' => 416), 't' => array('400m' => 97, '1000m' => 244, 'mile' => 392), 'i' => array('400m' => 90, '1000m' => 224, 269, null), 'r' => array(41, 84, null)),
      54 => array('e' => array('mile' => 481), 'm' => array('mile' => 409), 't' => array('400m' => 95, '1000m' => 240, 'mile' => 386), 'i' => array('400m' => 88, '1000m' => 221, 265, null), 'r' => array(40, 82, null)),
      55 => array('e' => array('mile' => 474), 'm' => array('mile' => 403), 't' => array('400m' => 94, '1000m' => 236, 'mile' => 380), 'i' => array('400m' => 87, '1000m' => 217, 261, null), 'r' => array(40, 81, null)),
      56 => array('e' => array('mile' => 468), 'm' => array('mile' => 397), 't' => array('400m' => 93, '1000m' => 233, 'mile' => 375), 'i' => array('400m' => 86, '1000m' => 214, 258, null), 'r' => array(39, 80, null)),
      57 => array('e' => array('mile' => 461), 'm' => array('mile' => 391), 't' => array('400m' => 91, '1000m' => 230, 'mile' => 369), 'i' => array('400m' => 85, '1000m' => 211, 255, null), 'r' => array(39, 79, null)),
      58 => array('e' => array('mile' => 454), 'm' => array('mile' => 385), 't' => array('400m' => 90, '1000m' => 225, 'mile' => 364), 'i' => array('400m' => 83, '1000m' => 208, 250, null), 'r' => array(38, 77, null)),
      59 => array('e' => array('mile' => 448), 'm' => array('mile' => 379), 't' => array('400m' => 89, '1000m' => 223, 'mile' => 359), 'i' => array('400m' => 82, '1000m' => 205, 247, null), 'r' => array(37, 76, null)),
      60 => array('e' => array('mile' => 442), 'm' => array('mile' => 374), 't' => array('400m' => 88, '1000m' => 220, 'mile' => 354), 'i' => array('400m' => 81, '1000m' => 203, 243, null), 'r' => array(37, 75, 150)),
      61 => array('e' => array('mile' => 436), 'm' => array('mile' => 369), 't' => array('400m' => 86,'1000m' =>  217, 'mile' => 350), 'i' => array('400m' => 80, '1000m' => 200, 240, null), 'r' => array(36, 74, 148)),
      62 => array('e' => array('mile' => 431), 'm' => array('mile' => 364), 't' => array('400m' => 85,'1000m' =>  214, 'mile' => 345), 'i' => array('400m' => 79, '1000m' => 197, 237, null), 'r' => array(36, 73, 146)),
      63 => array('e' => array('mile' => 425), 'm' => array('mile' => 359), 't' => array('400m' => 84,'1000m' =>  212, 'mile' => 341), 'i' => array('400m' => 78, '1000m' => 195, 234, null), 'r' => array(35, 72, 144)),
      64 => array('e' => array('mile' => 420), 'm' => array('mile' => 354), 't' => array('400m' => 83, '1000m' => 209, 'mile' => 336), 'i' => array('400m' => 77, '1000m' => 192, 231, null), 'r' => array(35, 71, 142)),
      65 => array('e' => array('mile' => 414), 'm' => array('mile' => 349), 't' => array('400m' => 82, '1000m' => 206, 'mile' => 332), 'i' => array('400m' => 76, '1000m' => 190, 228, null), 'r' => array(34, 70, 140)),
      66 => array('e' => array('mile' => 409), 'm' => array('mile' => 345), 't' => array('400m' => 81, '1000m' => 204, 'mile' => 328), 'i' => array('400m' => 75, '1000m' => 188, 225, 300), 'r' => array(34, 69, 138)),
      67 => array('e' => array('mile' => 404), 'm' => array('mile' => 340), 't' => array('400m' => 80, '1000m' => 201, 'mile' => 324), 'i' => array('400m' => 74, '1000m' => 185, 222, 297), 'r' => array(33, 68, 136)),
      68 => array('e' => array('mile' => 399), 'm' => array('mile' => 336), 't' => array('400m' => 79, '1000m' => 199, 'mile' => 320), 'i' => array('400m' => 73, '1000m' => 183, 219, 293), 'r' => array(33, 67, 134)),
      69 => array('e' => array('mile' => 395), 'm' => array('mile' => 332), 't' => array('400m' => 78, '1000m' => 196, 'mile' => 316), 'i' => array('400m' => 72, '1000m' => 181, 216, 290), 'r' => array(32, 66, 132)),
      70 => array('e' => array('mile' => 390), 'm' => array('mile' => 328), 't' => array('400m' => 77, '1000m' => 194, 'mile' => 313), 'i' => array('400m' => 71, '1000m' => 179, 214, 286), 'r' => array(32, 65, 130)),
      71 => array('e' => array('mile' => 386), 'm' => array('mile' => 324), 't' => array('400m' => 76, '1000m' => 192, 'mile' => 309), 'i' => array('400m' => 70, '1000m' => 177, 211, 283), 'r' => array(31, 64, 128)),
      72 => array('e' => array('mile' => 381), 'm' => array('mile' => 320), 't' => array('400m' => 76, '1000m' => 190, 'mile' => 305), 'i' => array('400m' => 69, '1000m' => 175, 209, 280), 'r' => array(31, 63, 126)),
      73 => array('e' => array('mile' => 377), 'm' => array('mile' => 316), 't' => array('400m' => 75, '1000m' => 188, 'mile' => 302), 'i' => array('400m' => 69, '1000m' => 173, 207, 277), 'r' => array(31, 62, 125)),
      74 => array('e' => array('mile' => 373), 'm' => array('mile' => 312), 't' => array('400m' => 74, '1000m' => 186, 'mile' => 299), 'i' => array('400m' => 68, '1000m' => 171, 205, 274), 'r' => array(30, 62, 124)),
      75 => array('e' => array('mile' => 369), 'm' => array('mile' => 309), 't' => array('400m' => 74, '1000m' => 184, 'mile' => 296), 'i' => array('400m' => 67, '1000m' => 169, 202, 271), 'r' => array(30, 61, 123)),
      76 => array('e' => array('mile' => 365), 'm' => array('mile' => 305), 't' => array('400m' => 73, '1000m' => 182, 'mile' => 292), 'i' => array('400m' => 66, '1000m' => 168, 200, 268), 'r' => array(29, 60, 122)),
      77 => array('e' => array('mile' => 361), 'm' => array('mile' => 301), 't' => array('400m' => 72, '1000m' => 180, 'mile' => 289), 'i' => array('400m' => 65, '1000m' => 166, 198, 265), 'r' => array(29, 59, 120)),
      78 => array('e' => array('mile' => 357), 'm' => array('mile' => 298), 't' => array('400m' => 71, '1000m' => 178, 'mile' => 286), 'i' => array('400m' => 65, '1000m' => 164, 196, 263), 'r' => array(29, 59, 119)),
      79 => array('e' => array('mile' => 354), 'm' => array('mile' => 295), 't' => array('400m' => 70, '1000m' => 176, 'mile' => 283), 'i' => array('400m' => 64, '1000m' => 162, 194, 260), 'r' => array(28, 58, 118)),
      80 => array('e' => array('mile' => 350), 'm' => array('mile' => 292), 't' => array('400m' => 70, '1000m' => 174, 'mile' => 281), 'i' => array('400m' => 64, '1000m' => 161, 192, 257), 'r' => array(28, 58, 116)),
      81 => array('e' => array('mile' => 346), 'm' => array('mile' => 289), 't' => array('400m' => 69, '1000m' => 173, 'mile' => 278), 'i' => array('400m' => 63, '1000m' => 159, 190, 255), 'r' => array(28, 57, 115)),
      82 => array('e' => array('mile' => 343), 'm' => array('mile' => 286), 't' => array('400m' => 68, '1000m' => 171, 'mile' => 275), 'i' => array('400m' => 62, '1000m' => 158, 188, 252), 'r' => array(27, 56, 114)),
      83 => array('e' => array('mile' => 340), 'm' => array('mile' => 283), 't' => array('400m' => 68, '1000m' => 169, 'mile' => 272), 'i' => array('400m' => 62, '1000m' => 156, 187, 250), 'r' => array(27, 56, 113)),
      84 => array('e' => array('mile' => 336), 'm' => array('mile' => 280), 't' => array('400m' => 67, '1000m' => 168, 'mile' => 270), 'i' => array('400m' => 61, '1000m' => 155, 185, 248), 'r' => array(27, 55, 112)),
      85 => array('e' => array('mile' => 333), 'm' => array('mile' => 277), 't' => array('400m' => 66, '1000m' => 166, 'mile' => 267), 'i' => array('400m' => 61, '1000m' => 153, 183, 245), 'r' => array(27, 55, 111)),
    );
  }

  /**
   * Returns VDOT value by performance for a given distance:
   *
   *    array(time30 => vdot30, ... time85 => vdot85)
   * 
   * All times in seconds
   *
   * @return arr
   */
  private function getVdotValues() {
    return array(
      self::DISTANCE_1500 => array(
        30 => 510, 31 => 495, 32 => 482, 33 => 469, 34 => 457, 35 => 445, 36 => 434, 37 => 424, 38 => 414, 39 => 404, 
        40 => 395, 41 => 387, 42 => 379, 43 => 371, 44 => 363, 45 => 356, 46 => 349, 47 => 342, 48 => 336, 49 => 330, 
        50 => 324, 51 => 318, 52 => 313, 53 => 307, 54 => 302, 55 => 297, 56 => 293, 57 => 288, 58 => 284, 59 => 279, 
        60 => 275, 61 => 271, 62 => 267, 63 => 264, 64 => 260, 65 => 256, 66 => 253, 67 => 250, 68 => 246, 69 => 243, 
        70 => 240, 71 => 237, 72 => 234, 73 => 232, 74 => 229, 75 => 226, 76 => 224, 77 => 221, 78 => 218.8, 79 => 216.5, 
        80 => 214.2, 81 => 211.9, 82 => 209.7, 83 => 207.6, 84 => 205.5, 85 => 203.5, 
      ),
      self::DISTANCE_MILE => array(
        30 => 551, 31 => 535, 32 => 521, 33 => 507, 34 => 494, 35 => 481, 36 => 469, 37 => 458, 38 => 447, 39 => 437, 
        40 => 427, 41 => 418, 42 => 409, 43 => 401, 44 => 392, 45 => 385, 46 => 377, 47 => 370, 48 => 363, 49 => 356, 
        50 => 350, 51 => 344, 52 => 338, 53 => 332, 54 => 327, 55 => 321, 56 => 316, 57 => 311, 58 => 306, 59 => 302, 
        60 => 297, 61 => 293, 62 => 289, 63 => 285, 64 => 281, 65 => 277, 66 => 273, 67 => 270, 68 => 266, 69 => 263, 
        70 => 259, 71 => 256, 72 => 253, 73 => 250, 74 => 247, 75 => 244, 76 => 242, 77 => 238, 78 => 236.2, 79 => 233.7, 
        80 => 231.2, 81 => 228.7, 82 => 226.4, 83 => '224.0', 84 => 221.8, 85 => 219.6, 
      ),
      self::DISTANCE_3k => array(
        30 => 1076, 31 => 1047, 32 => 1019, 33 => 993, 34 => 969, 35 => 945, 36 => 923, 37 => 901, 38 => 881, 39 => 861, 
        40 => 843, 41 => 825, 42 => 808, 43 => 791, 44 => 775, 45 => 760, 46 => 746, 47 => 732, 48 => 718, 49 => 705, 
        50 => 693, 51 => 681, 52 => 669, 53 => 656, 54 => 647, 55 => 637, 56 => 627, 57 => 617, 58 => 608, 59 => 598, 
        60 => 590, 61 => 581, 62 => 573, 63 => 565, 64 => 557, 65 => 549, 66 => 542, 67 => 535, 68 => 528, 69 => 521, 
        70 => 514, 71 => 508, 72 => 502, 73 => 496, 74 => 490, 75 => 484, 76 => 478, 77 => 473, 78 => 468, 79 => 463, 
        80 => 457.5, 81 => 452.5, 82 => 447.7, 83 => '443.0', 84 => 438.5, 85 => '434.0', 
      ),
      self::DISTANCE_2MILE => array(
        30 => 1159, 31 => 1128, 32 => 1098, 33 => 1070, 34 => 1044, 35 => 1018, 36 => 994, 37 => 971, 38 => 949, 39 => 929, 
        40 => 908, 41 => 889, 42 => 871, 43 => 853, 44 => 836, 45 => 820, 46 => 805, 47 => 790, 48 => 775, 49 => 761, 
        50 => 748, 51 => 735, 52 => 722, 53 => 710, 54 => 699, 55 => 688, 56 => 677, 57 => 666, 58 => 656, 59 => 646, 
        60 => 637, 61 => 627, 62 => 618, 63 => 610, 64 => 601, 65 => 593, 66 => 585, 67 => 577, 68 => 570, 69 => 563, 
        70 => 556, 71 => 549, 72 => 542, 73 => 535, 74 => 529, 75 => 523, 76 => 517, 77 => 511, 78 => 505, 79 => 500, 
        80 => 494.2, 81 => 488.9, 82 => 483.7, 83 => 478.6, 84 => 473.6, 85 => 468.8, 
      ),
      self::DISTANCE_5k => array(
        30 => 1840, 31 => 1791, 32 => 1745, 33 => 1701, 34 => 1659, 35 => 1620, 36 => 1582, 37 => 1546, 38 => 1512, 39 => 1479, 
        40 => 1448, 41 => 1418, 42 => 1389, 43 => 1361, 44 => 1335, 45 => 1310, 46 => 1285, 47 => 1262, 48 => 1239, 49 => 1218, 
        50 => 1197, 51 => 1176, 52 => 1157, 53 => 1138, 54 => 1120, 55 => 1102, 56 => 1085, 57 => 1069, 58 => 1053, 59 => 1037, 
        60 => 1023, 61 => 1008, 62 => 994, 63 => 980, 64 => 967, 65 => 954, 66 => 942, 67 => 929, 68 => 918, 69 => 906, 
        70 => 895, 71 => 884, 72 => 873, 73 => 863, 74 => 853, 75 => 843, 76 => 834, 77 => 824, 78 => 815, 79 => 806, 
        80 => 797.8, 81 => 789.3, 82 => 781.1, 83 => '773.0', 84 => 765.2, 85 => 757.4, 
      ),
      self::DISTANCE_10k => array(
        30 => 3826, 31 => 3723, 32 => 3626, 33 => 3534, 34 => 3446, 35 => 3363, 36 => 3284, 37 => 3209, 38 => 3137, 39 => 3069, 
        40 => 3003, 41 => 2941, 42 => 2881, 43 => 2824, 44 => 2769, 45 => 2716, 46 => 2665, 47 => 2616, 48 => 2570, 49 => 2524, 
        50 => 2481, 51 => 2439, 52 => 2399, 53 => 2360, 54 => 2322, 55 => 2286, 56 => 2251, 57 => 2217, 58 => 2184, 59 => 2152, 
        60 => 2122, 61 => 2092, 62 => 2063, 63 => 2035, 64 => 2008, 65 => 1981, 66 => 1955, 67 => 1931, 68 => 1906, 69 => 1883, 
        70 => 1860, 71 => 1838, 72 => 1816, 73 => 1795, 74 => 1774, 75 => 1754, 76 => 1735, 77 => 1716, 78 => 1697, 79 => 1679, 
        80 => 1661, 81 => 1644, 82 => 1627, 83 => 1611, 84 => 1594, 85 => 1579, 
      ),
      self::DISTANCE_15k => array(
        30 => 5894, 31 => 5736, 32 => 5587, 33 => 5445, 34 => 5310, 35 => 5182, 36 => 5060, 37 => 4944, 38 => 4833, 39 => 4727, 
        40 => 4626, 41 => 4529, 42 => 4436, 43 => 4347, 44 => 4262, 45 => 4180, 46 => 4102, 47 => 4026, 48 => 3953, 49 => 3884, 
        50 => 3816, 51 => 3751, 52 => 3689, 53 => 3628, 54 => 3570, 55 => 3513, 56 => 3459, 57 => 3406, 58 => 3355, 59 => 3306, 
        60 => 3258, 61 => 3212, 62 => 3167, 63 => 3123, 64 => 3081, 65 => 3040, 66 => 3000, 67 => 2962, 68 => 2924, 69 => 2888, 
        70 => 2852, 71 => 2818, 72 => 2784, 73 => 2751, 74 => 2719, 75 => 2688, 76 => 2658, 77 => 2629, 78 => 2600, 79 => 2572, 
        80 => 2545, 81 => 2518, 82 => 2492, 83 => 2466, 84 => 2442, 85 => 2417, 
      ),
      self::DISTANCE_HALF => array(
        30 => 8464, 31 => 8241, 32 => 8029, 33 => 7827, 34 => 7636, 35 => 7453, 36 => 7279, 37 => 7114, 38 => 6955, 39 => 6804, 
        40 => 6659, 41 => 6484, 42 => 6387, 43 => 6260, 44 => 6137, 45 => 6020, 46 => 5907, 47 => 5798, 48 => 5693, 49 => 5592, 
        50 => 5495, 51 => 5402, 52 => 5311, 53 => 5224, 54 => 5140, 55 => 5058, 56 => 4980, 57 => 4903, 58 => 4830, 59 => 4758, 
        60 => 4689, 61 => 4622, 62 => 4557, 63 => 4494, 64 => 4433, 65 => 4373, 66 => 4316, 67 => 4260, 68 => 4205, 69 => 4152, 
        70 => 4101, 71 => 4051, 72 => 4002, 73 => 3954, 74 => 3908, 75 => 3863, 76 => 3819, 77 => 3776, 78 => 3735, 79 => 3694, 
        80 => 3654, 81 => 3615, 82 => 3578, 83 => 3541, 84 => 3507, 85 => 3470, 
      ),
      self::DISTANCE_MARATHON => array(
        30 => 17357, 31 => 16917, 32 => 16499, 33 => 16100, 34 => 15723, 35 => 15363, 36 => 15019, 37 => 14690, 38 => 14375, 39 => 14074,
        40 => 13785, 41 => 13509, 42 => 13243, 43 => 12988, 44 => 12743, 45 => 12506, 46 => 12279, 47 => 12060, 48 => 11849, 49 => 11646,
        50 => 11449, 51 => 11259, 52 => 11076, 53 => 10899, 54 => 10727, 55 => 10561, 56 => 10400, 57 => 10245, 58 => 10094, 59 => 9947,
        60 => 9805, 61 => 9668, 62 => 9534, 63 => 9404, 64 => 9278, 65 => 9155, 66 => 9036, 67 => 8920, 68 => 8807, 69 => 8697,
        70 => 8590, 71 => 8486, 72 => 8384, 73 => 8285, 74 => 8189, 75 => 8095, 76 => 8003, 77 => 7914, 78 => 7827, 79 => 7742,
        80 => 7658, 81 => 7577, 82 => 7497, 83 => 7420, 84 => 7344, 85 => 7270,
      ),
    );
  }

  private function getDistances() {
    return array(
      array(
        'label' => '1500m',
        'value' => self::DISTANCE_1500
      ),
      array(
        'label' => 'Mile',
        'value' => self::DISTANCE_MILE
      ),
      array(
        'label' => '3000m',
        'value' => self::DISTANCE_3k
      ),
      array(
        'label' => '2-Mile',
        'value' => self::DISTANCE_2MILE
      ),
      array(
        'label' => '5000m',
        'value' => self::DISTANCE_5k
      ),
      array(
        'label' => '10,000m',
        'value' => self::DISTANCE_10k
      ),
      array(
        'label' => '15k',
        'value' => self::DISTANCE_15k
      ),
      array(
        'label' => 'Half-Marathon',
        'value' => self::DISTANCE_HALF
      ),
      array(
        'label' => 'Marathon',
        'value' => self::DISTANCE_MARATHON
      ),
    );
  }

}
