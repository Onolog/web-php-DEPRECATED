const DISTANCE_1500     = 1;
const DISTANCE_MILE     = 2;
const DISTANCE_3k       = 3;
const DISTANCE_2MILE    = 4;
const DISTANCE_5k       = 5;
const DISTANCE_10k      = 6;
const DISTANCE_15k      = 7;
const DISTANCE_HALF     = 8;
const DISTANCE_MARATHON = 9;

module.exports = {
  DISTANCES: [
    { 'label': '1500m',
      'value': DISTANCE_1500,
    },
    { 'label': 'Mile',
      'value': DISTANCE_MILE,
    },
    { 'label': '3000m',
      'value': DISTANCE_3k,
    },
    { 'label': '2-Mile',
      'value': DISTANCE_2MILE,
    },
    { 'label': '5000m',
      'value': DISTANCE_5k,
    },
    { 'label': '10,000m',
      'value': DISTANCE_10k,
    },
    { 'label': '15k',
      'value': DISTANCE_15k,
    },
    { 'label': 'Half-Marathon',
      'value': DISTANCE_HALF,
    },
    { 'label': 'Marathon',
      'value': DISTANCE_MARATHON,
    },
  ],

  /**
   * For a given VDOT value, returns the corresponding
   * E, M, T, I and R paces, in seconds
   *
   * @param   int  $vdot
   * @return  arr
   */
  PACES: {
    30: {'e': {'mile': 760}, 'm': {'mile': 661}, 't': {'400m': 153, '1000m': 384, 'mile': 618}, 'i': {'400m': 142, '1000m': null, '1200m': null, 'mile': null}, 'r': {'200m': 67, '400m': 136, '800m': null}},
    31: {'e': {'mile': 742}, 'm': {'mile': 645}, 't': {'400m': 150, '1000m': 374, 'mile': 602}, 'i': {'400m': 138, '1000m': null, '1200m': null, 'mile': null}, 'r': {'200m': 65, '400m': 132, '800m': null}},
    32: {'e': {'mile': 724}, 'm': {'mile': 629}, 't': {'400m': 146, '1000m': 365, 'mile': 587}, 'i': {'400m': 134, '1000m': null, '1200m': null, 'mile': null}, 'r': {'200m': 63, '400m': 128, '800m': null}},
    33: {'e': {'mile': 708}, 'm': {'mile': 614}, 't': {'400m': 143, '1000m': 356, 'mile': 573}, 'i': {'400m': 131, '1000m': null, '1200m': null, 'mile': null}, 'r': {'200m': 62, '400m': 125, '800m': null}},
    34: {'e': {'mile': 692}, 'm': {'mile': 600}, 't': {'400m': 139, '1000m': 348, 'mile': 560}, 'i': {'400m': 128, '1000m': null, '1200m': null, 'mile': null}, 'r': {'200m': 60, '400m': 122, '800m': null}},
    35: {'e': {'mile': 677}, 'm': {'mile': 586}, 't': {'400m': 136, '1000m': 340, 'mile': 547}, 'i': {'400m': 125, '1000m': null, '1200m': null, 'mile': null}, 'r': {'200m': 59, '400m': 119, '800m': null}},
    36: {'e': {'mile': 662}, 'm': {'mile': 573}, 't': {'400m': 133, '1000m': 333, 'mile': 535}, 'i': {'400m': 122, '1000m': 307, '1200m': null, 'mile': null}, 'r': {'200m': 57, '400m': 115, '800m': null}},
    37: {'e': {'mile': 649}, 'm': {'mile': 560}, 't': {'400m': 130, '1000m': 325, 'mile': 524}, 'i': {'400m': 119, '1000m': 300, '1200m': null, 'mile': null}, 'r': {'200m': 56, '400m': 113, '800m': null}},
    38: {'e': {'mile': 635}, 'm': {'mile': 548}, 't': {'400m': 127, '1000m': 319, 'mile': 513}, 'i': {'400m': 116, '1000m': 294, '1200m': null, 'mile': null}, 'r': {'200m': 54, '400m': 110, '800m': null}},
    39: {'e': {'mile': 623}, 'm': {'mile': 537}, 't': {'400m': 125, '1000m': 312, 'mile': 502}, 'i': {'400m': 114, '1000m': 288, '1200m': null, 'mile': null}, 'r': {'200m': 53, '400m': 108, '800m': null}},
    40: {'e': {'mile': 611}, 'm': {'mile': 526}, 't': {'400m': 122, '1000m': 306, 'mile': 492}, 'i': {'400m': 112, '1000m': 282, '1200m': null, 'mile': null}, 'r': {'200m': 52, '400m': 106, '800m': null}},
    41: {'e': {'mile': 599}, 'm': {'mile': 515}, 't': {'400m': 120, '1000m': 300, 'mile': 482}, 'i': {'400m': 110, '1000m': 276, '1200m': null, 'mile': null}, 'r': {'200m': 51, '400m': 104, '800m': null}},
    42: {'e': {'mile': 588}, 'm': {'mile': 505}, 't': {'400m': 117, '1000m': 294, 'mile': 472}, 'i': {'400m': 108, '1000m': 271, '1200m': null, 'mile': null}, 'r': {'200m': 50, '400m': 102, '800m': null}},
    43: {'e': {'mile': 577}, 'm': {'mile': 495}, 't': {'400m': 115, '1000m': 289, 'mile': 462}, 'i': {'400m': 106, '1000m': 266, '1200m': null, 'mile': null}, 'r': {'200m': 49, '400m': 100, '800m': null}},
    44: {'e': {'mile': 567}, 'm': {'mile': 486}, 't': {'400m': 113, '1000m': 283, 'mile': 453}, 'i': {'400m': 104, '1000m': 261, '1200m': null, 'mile': null}, 'r': {'200m': 48, '400m': 98, '800m': null}},
    45: {'e': {'mile': 557}, 'm': {'mile': 477}, 't': {'400m': 111, '1000m': 278, 'mile': 445}, 'i': {'400m': 102, '1000m': 256, '1200m': null, 'mile': null}, 'r': {'200m': 47, '400m': 96, '800m': null}},
    46: {'e': {'mile': 547}, 'm': {'mile': 468}, 't': {'400m': 109, '1000m': 273, 'mile': 437}, 'i': {'400m': 100, '1000m': 252, '1200m': 300, 'mile': null}, 'r': {'200m': 46, '400m': 94, '800m': null}},
    47: {'e': {'mile': 538}, 'm': {'mile': 460}, 't': {'400m': 107, '1000m': 269, 'mile': 430}, 'i': {'400m': 98, '1000m': 247, '1200m': 294, 'mile': null}, 'r': {'200m': 45, '400m': 92, '800m': null}},
    48: {'e': {'mile': 529}, 'm': {'mile': 452}, 't': {'400m': 105, '1000m': 264, 'mile': 422}, 'i': {'400m': 96, '1000m': 243, '1200m': 289, 'mile': null}, 'r': {'200m': 44, '400m': 90, '800m': null}},
    49: {'e': {'mile': 520}, 'm': {'mile': 444}, 't': {'400m': 103, '1000m': 260, 'mile': 415}, 'i': {'400m': 95, '1000m': 239, '1200m': 285, 'mile': null}, 'r': {'200m': 44, '400m': 89, '800m': null}},
    50: {'e': {'mile': 512}, 'm': {'mile': 437}, 't': {'400m': 102, '1000m': 255, 'mile': 411}, 'i': {'400m': 93, '1000m': 235, '1200m': 281, 'mile': null}, 'r': {'200m': 43, '400m': 87, '800m': null}},
    51: {'e': {'mile': 504}, 'm': {'mile': 429}, 't': {'400m': 100, '1000m': 251, 'mile': 404}, 'i': {'400m': 92, '1000m': 231, '1200m': 276, 'mile': null}, 'r': {'200m': 42, '400m': 86, '800m': null}},
    52: {'e': {'mile': 496}, 'm': {'mile': 422}, 't': {'400m': 98, '1000m': 247, 'mile': 398}, 'i': {'400m': 91, '1000m': 228, '1200m': 273, 'mile': null}, 'r': {'200m': 42, '400m': 85, '800m': null}},
    53: {'e': {'mile': 489}, 'm': {'mile': 416}, 't': {'400m': 97, '1000m': 244, 'mile': 392}, 'i': {'400m': 90, '1000m': 224, '1200m': 269, 'mile': null}, 'r': {'200m': 41, '400m': 84, '800m': null}},
    54: {'e': {'mile': 481}, 'm': {'mile': 409}, 't': {'400m': 95, '1000m': 240, 'mile': 386}, 'i': {'400m': 88, '1000m': 221, '1200m': 265, 'mile': null}, 'r': {'200m': 40, '400m': 82, '800m': null}},
    55: {'e': {'mile': 474}, 'm': {'mile': 403}, 't': {'400m': 94, '1000m': 236, 'mile': 380}, 'i': {'400m': 87, '1000m': 217, '1200m': 261, 'mile': null}, 'r': {'200m': 40, '400m': 81, '800m': null}},
    56: {'e': {'mile': 468}, 'm': {'mile': 397}, 't': {'400m': 93, '1000m': 233, 'mile': 375}, 'i': {'400m': 86, '1000m': 214, '1200m': 258, 'mile': null}, 'r': {'200m': 39, '400m': 80, '800m': null}},
    57: {'e': {'mile': 461}, 'm': {'mile': 391}, 't': {'400m': 91, '1000m': 230, 'mile': 369}, 'i': {'400m': 85, '1000m': 211, '1200m': 255, 'mile': null}, 'r': {'200m': 39, '400m': 79, '800m': null}},
    58: {'e': {'mile': 454}, 'm': {'mile': 385}, 't': {'400m': 90, '1000m': 225, 'mile': 364}, 'i': {'400m': 83, '1000m': 208, '1200m': 250, 'mile': null}, 'r': {'200m': 38, '400m': 77, '800m': null}},
    59: {'e': {'mile': 448}, 'm': {'mile': 379}, 't': {'400m': 89, '1000m': 223, 'mile': 359}, 'i': {'400m': 82, '1000m': 205, '1200m': 247, 'mile': null}, 'r': {'200m': 37, '400m': 76, '800m': null}},
    60: {'e': {'mile': 442}, 'm': {'mile': 374}, 't': {'400m': 88, '1000m': 220, 'mile': 354}, 'i': {'400m': 81, '1000m': 203, '1200m': 243, 'mile': null}, 'r': {'200m': 37, '400m': 75, '800m': 150}},
    61: {'e': {'mile': 436}, 'm': {'mile': 369}, 't': {'400m': 86, '1000m': 217, 'mile': 350}, 'i': {'400m': 80, '1000m': 200, '1200m': 240, 'mile': null}, 'r': {'200m': 36, '400m': 74, '800m': 148}},
    62: {'e': {'mile': 431}, 'm': {'mile': 364}, 't': {'400m': 85, '1000m': 214, 'mile': 345}, 'i': {'400m': 79, '1000m': 197, '1200m': 237, 'mile': null}, 'r': {'200m': 36, '400m': 73, '800m': 146}},
    63: {'e': {'mile': 425}, 'm': {'mile': 359}, 't': {'400m': 84, '1000m': 212, 'mile': 341}, 'i': {'400m': 78, '1000m': 195, '1200m': 234, 'mile': null}, 'r': {'200m': 35, '400m': 72, '800m': 144}},
    64: {'e': {'mile': 420}, 'm': {'mile': 354}, 't': {'400m': 83, '1000m': 209, 'mile': 336}, 'i': {'400m': 77, '1000m': 192, '1200m': 231, 'mile': null}, 'r': {'200m': 35, '400m': 71, '800m': 142}},
    65: {'e': {'mile': 414}, 'm': {'mile': 349}, 't': {'400m': 82, '1000m': 206, 'mile': 332}, 'i': {'400m': 76, '1000m': 190, '1200m': 228, 'mile': null}, 'r': {'200m': 34, '400m': 70, '800m': 140}},
    66: {'e': {'mile': 409}, 'm': {'mile': 345}, 't': {'400m': 81, '1000m': 204, 'mile': 328}, 'i': {'400m': 75, '1000m': 188, '1200m': 225, 'mile': 300}, 'r': {'200m': 34, '400m': 69, '800m': 138}},
    67: {'e': {'mile': 404}, 'm': {'mile': 340}, 't': {'400m': 80, '1000m': 201, 'mile': 324}, 'i': {'400m': 74, '1000m': 185, '1200m': 222, 'mile': 297}, 'r': {'200m': 33, '400m': 68, '800m': 136}},
    68: {'e': {'mile': 399}, 'm': {'mile': 336}, 't': {'400m': 79, '1000m': 199, 'mile': 320}, 'i': {'400m': 73, '1000m': 183, '1200m': 219, 'mile': 293}, 'r': {'200m': 33, '400m': 67, '800m': 134}},
    69: {'e': {'mile': 395}, 'm': {'mile': 332}, 't': {'400m': 78, '1000m': 196, 'mile': 316}, 'i': {'400m': 72, '1000m': 181, '1200m': 216, 'mile': 290}, 'r': {'200m': 32, '400m': 66, '800m': 132}},
    70: {'e': {'mile': 390}, 'm': {'mile': 328}, 't': {'400m': 77, '1000m': 194, 'mile': 313}, 'i': {'400m': 71, '1000m': 179, '1200m': 214, 'mile': 286}, 'r': {'200m': 32, '400m': 65, '800m': 130}},
    71: {'e': {'mile': 386}, 'm': {'mile': 324}, 't': {'400m': 76, '1000m': 192, 'mile': 309}, 'i': {'400m': 70, '1000m': 177, '1200m': 211, 'mile': 283}, 'r': {'200m': 31, '400m': 64, '800m': 128}},
    72: {'e': {'mile': 381}, 'm': {'mile': 320}, 't': {'400m': 76, '1000m': 190, 'mile': 305}, 'i': {'400m': 69, '1000m': 175, '1200m': 209, 'mile': 280}, 'r': {'200m': 31, '400m': 63, '800m': 126}},
    73: {'e': {'mile': 377}, 'm': {'mile': 316}, 't': {'400m': 75, '1000m': 188, 'mile': 302}, 'i': {'400m': 69, '1000m': 173, '1200m': 207, 'mile': 277}, 'r': {'200m': 31, '400m': 62, '800m': 125}},
    74: {'e': {'mile': 373}, 'm': {'mile': 312}, 't': {'400m': 74, '1000m': 186, 'mile': 299}, 'i': {'400m': 68, '1000m': 171, '1200m': 205, 'mile': 274}, 'r': {'200m': 30, '400m': 62, '800m': 124}},
    75: {'e': {'mile': 369}, 'm': {'mile': 309}, 't': {'400m': 74, '1000m': 184, 'mile': 296}, 'i': {'400m': 67, '1000m': 169, '1200m': 202, 'mile': 271}, 'r': {'200m': 30, '400m': 61, '800m': 123}},
    76: {'e': {'mile': 365}, 'm': {'mile': 305}, 't': {'400m': 73, '1000m': 182, 'mile': 292}, 'i': {'400m': 66, '1000m': 168, '1200m': 200, 'mile': 268}, 'r': {'200m': 29, '400m': 60, '800m': 122}},
    77: {'e': {'mile': 361}, 'm': {'mile': 301}, 't': {'400m': 72, '1000m': 180, 'mile': 289}, 'i': {'400m': 65, '1000m': 166, '1200m': 198, 'mile': 265}, 'r': {'200m': 29, '400m': 59, '800m': 120}},
    78: {'e': {'mile': 357}, 'm': {'mile': 298}, 't': {'400m': 71, '1000m': 178, 'mile': 286}, 'i': {'400m': 65, '1000m': 164, '1200m': 196, 'mile': 263}, 'r': {'200m': 29, '400m': 59, '800m': 119}},
    79: {'e': {'mile': 354}, 'm': {'mile': 295}, 't': {'400m': 70, '1000m': 176, 'mile': 283}, 'i': {'400m': 64, '1000m': 162, '1200m': 194, 'mile': 260}, 'r': {'200m': 28, '400m': 58, '800m': 118}},
    80: {'e': {'mile': 350}, 'm': {'mile': 292}, 't': {'400m': 70, '1000m': 174, 'mile': 281}, 'i': {'400m': 64, '1000m': 161, '1200m': 192, 'mile': 257}, 'r': {'200m': 28, '400m': 58, '800m': 116}},
    81: {'e': {'mile': 346}, 'm': {'mile': 289}, 't': {'400m': 69, '1000m': 173, 'mile': 278}, 'i': {'400m': 63, '1000m': 159, '1200m': 190, 'mile': 255}, 'r': {'200m': 28, '400m': 57, '800m': 115}},
    82: {'e': {'mile': 343}, 'm': {'mile': 286}, 't': {'400m': 68, '1000m': 171, 'mile': 275}, 'i': {'400m': 62, '1000m': 158, '1200m': 188, 'mile': 252}, 'r': {'200m': 27, '400m': 56, '800m': 114}},
    83: {'e': {'mile': 340}, 'm': {'mile': 283}, 't': {'400m': 68, '1000m': 169, 'mile': 272}, 'i': {'400m': 62, '1000m': 156, '1200m': 187, 'mile': 250}, 'r': {'200m': 27, '400m': 56, '800m': 113}},
    84: {'e': {'mile': 336}, 'm': {'mile': 280}, 't': {'400m': 67, '1000m': 168, 'mile': 270}, 'i': {'400m': 61, '1000m': 155, '1200m': 185, 'mile': 248}, 'r': {'200m': 27, '400m': 55, '800m': 112}},
    85: {'e': {'mile': 333}, 'm': {'mile': 277}, 't': {'400m': 66, '1000m': 166, 'mile': 267}, 'i': {'400m': 61, '1000m': 153, '1200m': 183, 'mile': 245}, 'r': {'200m': 27, '400m': 55, '800m': 111}},
  },

  TIMES: {
    DISTANCE_1500: {
      30: 510, 31: 495, 32: 482, 33: 469, 34: 457, 35: 445, 36: 434, 37: 424, 38: 414, 39: 404, 
      40: 395, 41: 387, 42: 379, 43: 371, 44: 363, 45: 356, 46: 349, 47: 342, 48: 336, 49: 330, 
      50: 324, 51: 318, 52: 313, 53: 307, 54: 302, 55: 297, 56: 293, 57: 288, 58: 284, 59: 279, 
      60: 275, 61: 271, 62: 267, 63: 264, 64: 260, 65: 256, 66: 253, 67: 250, 68: 246, 69: 243, 
      70: 240, 71: 237, 72: 234, 73: 232, 74: 229, 75: 226, 76: 224, 77: 221, 78: 218.8, 79: 216.5, 
      80: 214.2, 81: 211.9, 82: 209.7, 83: 207.6, 84: 205.5, 85: 203.5, 
    },
    DISTANCE_MILE: {
      30: 551, 31: 535, 32: 521, 33: 507, 34: 494, 35: 481, 36: 469, 37: 458, 38: 447, 39: 437, 
      40: 427, 41: 418, 42: 409, 43: 401, 44: 392, 45: 385, 46: 377, 47: 370, 48: 363, 49: 356, 
      50: 350, 51: 344, 52: 338, 53: 332, 54: 327, 55: 321, 56: 316, 57: 311, 58: 306, 59: 302, 
      60: 297, 61: 293, 62: 289, 63: 285, 64: 281, 65: 277, 66: 273, 67: 270, 68: 266, 69: 263, 
      70: 259, 71: 256, 72: 253, 73: 250, 74: 247, 75: 244, 76: 242, 77: 238, 78: 236.2, 79: 233.7, 
      80: 231.2, 81: 228.7, 82: 226.4, 83: '224.0', 84: 221.8, 85: 219.6, 
    },
    DISTANCE_3k: {
      30: 1076, 31: 1047, 32: 1019, 33: 993, 34: 969, 35: 945, 36: 923, 37: 901, 38: 881, 39: 861, 
      40: 843, 41: 825, 42: 808, 43: 791, 44: 775, 45: 760, 46: 746, 47: 732, 48: 718, 49: 705, 
      50: 693, 51: 681, 52: 669, 53: 656, 54: 647, 55: 637, 56: 627, 57: 617, 58: 608, 59: 598, 
      60: 590, 61: 581, 62: 573, 63: 565, 64: 557, 65: 549, 66: 542, 67: 535, 68: 528, 69: 521, 
      70: 514, 71: 508, 72: 502, 73: 496, 74: 490, 75: 484, 76: 478, 77: 473, 78: 468, 79: 463, 
      80: 457.5, 81: 452.5, 82: 447.7, 83: '443.0', 84: 438.5, 85: '434.0', 
    },
    DISTANCE_2MILE: {
      30: 1159, 31: 1128, 32: 1098, 33: 1070, 34: 1044, 35: 1018, 36: 994, 37: 971, 38: 949, 39: 929, 
      40: 908, 41: 889, 42: 871, 43: 853, 44: 836, 45: 820, 46: 805, 47: 790, 48: 775, 49: 761, 
      50: 748, 51: 735, 52: 722, 53: 710, 54: 699, 55: 688, 56: 677, 57: 666, 58: 656, 59: 646, 
      60: 637, 61: 627, 62: 618, 63: 610, 64: 601, 65: 593, 66: 585, 67: 577, 68: 570, 69: 563, 
      70: 556, 71: 549, 72: 542, 73: 535, 74: 529, 75: 523, 76: 517, 77: 511, 78: 505, 79: 500, 
      80: 494.2, 81: 488.9, 82: 483.7, 83: 478.6, 84: 473.6, 85: 468.8, 
    },
    DISTANCE_5k: {
      30: 1840, 31: 1791, 32: 1745, 33: 1701, 34: 1659, 35: 1620, 36: 1582, 37: 1546, 38: 1512, 39: 1479, 
      40: 1448, 41: 1418, 42: 1389, 43: 1361, 44: 1335, 45: 1310, 46: 1285, 47: 1262, 48: 1239, 49: 1218, 
      50: 1197, 51: 1176, 52: 1157, 53: 1138, 54: 1120, 55: 1102, 56: 1085, 57: 1069, 58: 1053, 59: 1037, 
      60: 1023, 61: 1008, 62: 994, 63: 980, 64: 967, 65: 954, 66: 942, 67: 929, 68: 918, 69: 906, 
      70: 895, 71: 884, 72: 873, 73: 863, 74: 853, 75: 843, 76: 834, 77: 824, 78: 815, 79: 806, 
      80: 797.8, 81: 789.3, 82: 781.1, 83: '773.0', 84: 765.2, 85: 757.4, 
    },
    DISTANCE_10k: {
      30: 3826, 31: 3723, 32: 3626, 33: 3534, 34: 3446, 35: 3363, 36: 3284, 37: 3209, 38: 3137, 39: 3069, 
      40: 3003, 41: 2941, 42: 2881, 43: 2824, 44: 2769, 45: 2716, 46: 2665, 47: 2616, 48: 2570, 49: 2524, 
      50: 2481, 51: 2439, 52: 2399, 53: 2360, 54: 2322, 55: 2286, 56: 2251, 57: 2217, 58: 2184, 59: 2152, 
      60: 2122, 61: 2092, 62: 2063, 63: 2035, 64: 2008, 65: 1981, 66: 1955, 67: 1931, 68: 1906, 69: 1883, 
      70: 1860, 71: 1838, 72: 1816, 73: 1795, 74: 1774, 75: 1754, 76: 1735, 77: 1716, 78: 1697, 79: 1679, 
      80: 1661, 81: 1644, 82: 1627, 83: 1611, 84: 1594, 85: 1579, 
    },
    DISTANCE_15k: {
      30: 5894, 31: 5736, 32: 5587, 33: 5445, 34: 5310, 35: 5182, 36: 5060, 37: 4944, 38: 4833, 39: 4727, 
      40: 4626, 41: 4529, 42: 4436, 43: 4347, 44: 4262, 45: 4180, 46: 4102, 47: 4026, 48: 3953, 49: 3884, 
      50: 3816, 51: 3751, 52: 3689, 53: 3628, 54: 3570, 55: 3513, 56: 3459, 57: 3406, 58: 3355, 59: 3306, 
      60: 3258, 61: 3212, 62: 3167, 63: 3123, 64: 3081, 65: 3040, 66: 3000, 67: 2962, 68: 2924, 69: 2888, 
      70: 2852, 71: 2818, 72: 2784, 73: 2751, 74: 2719, 75: 2688, 76: 2658, 77: 2629, 78: 2600, 79: 2572, 
      80: 2545, 81: 2518, 82: 2492, 83: 2466, 84: 2442, 85: 2417, 
    },
    DISTANCE_HALF: {
      30: 8464, 31: 8241, 32: 8029, 33: 7827, 34: 7636, 35: 7453, 36: 7279, 37: 7114, 38: 6955, 39: 6804, 
      40: 6659, 41: 6484, 42: 6387, 43: 6260, 44: 6137, 45: 6020, 46: 5907, 47: 5798, 48: 5693, 49: 5592, 
      50: 5495, 51: 5402, 52: 5311, 53: 5224, 54: 5140, 55: 5058, 56: 4980, 57: 4903, 58: 4830, 59: 4758, 
      60: 4689, 61: 4622, 62: 4557, 63: 4494, 64: 4433, 65: 4373, 66: 4316, 67: 4260, 68: 4205, 69: 4152, 
      70: 4101, 71: 4051, 72: 4002, 73: 3954, 74: 3908, 75: 3863, 76: 3819, 77: 3776, 78: 3735, 79: 3694, 
      80: 3654, 81: 3615, 82: 3578, 83: 3541, 84: 3507, 85: 3470, 
    },
    DISTANCE_MARATHON: {
      30: 17357, 31: 16917, 32: 16499, 33: 16100, 34: 15723, 35: 15363, 36: 15019, 37: 14690, 38: 14375, 39: 14074,
      40: 13785, 41: 13509, 42: 13243, 43: 12988, 44: 12743, 45: 12506, 46: 12279, 47: 12060, 48: 11849, 49: 11646,
      50: 11449, 51: 11259, 52: 11076, 53: 10899, 54: 10727, 55: 10561, 56: 10400, 57: 10245, 58: 10094, 59: 9947,
      60: 9805, 61: 9668, 62: 9534, 63: 9404, 64: 9278, 65: 9155, 66: 9036, 67: 8920, 68: 8807, 69: 8697,
      70: 8590, 71: 8486, 72: 8384, 73: 8285, 74: 8189, 75: 8095, 76: 8003, 77: 7914, 78: 7827, 79: 7742,
      80: 7658, 81: 7577, 82: 7497, 83: 7420, 84: 7344, 85: 7270,
    },
  },
};
