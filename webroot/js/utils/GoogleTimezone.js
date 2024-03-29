// @flow

import $ from 'jquery';
import {TIMEZONE_API_KEY} from 'constants/Google';

const BASE_URL = 'https://maps.googleapis.com/maps/api/timezone/json';

/**
 * GoogleTimezone
 *
 * Retrieves timezone information from the Google Maps Timezone API given
 * location and time data.
 */
export default function(params: Object, callback: Function): void {
  $.get(BASE_URL, {
    location: params.latitude + ',' + params.longitude,
    timestamp: params.timestamp,
    key: TIMEZONE_API_KEY,
  }).done(callback);
}
