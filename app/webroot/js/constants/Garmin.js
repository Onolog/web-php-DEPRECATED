/**
 * Garmin-related constants
 */
define({
  API_KEY: '2b3f4a3a13900af73dd5a19c1c8f77e3',

  BASE_IMG_URL: 'https://static.garmincdn.com/com.garmin.connect/content/images/device-images/',

  BASE_STORE_URL: 'https://buy.garmin.com/shop/shop.do',

  // Garmin measures one mile as 1609.35 meters
  MILES_IN_METERS: 1609.35,

  // URL for downloading activities as tcx
  // https://connect.garmin.com/proxy/activity-service-1.1/tcx/activity/{activity_id}?full=true

  PRODUCT_ID: {
    'forerunner': {
      '910xt': 90671,
      '620':   122785,
      '610':   84374,
      '310xt': 27335,
      '305':   null,
      '220':   129397,
      '210':   83280,
      '110':   63511,
      '10':    107143
    }
  }
});
