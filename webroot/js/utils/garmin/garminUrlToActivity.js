import moment from 'moment';
import {metersToFeet, metersToMiles} from 'utils/distanceUtils';

/**
 * Normalizes activity data pulled from Garmin's endpoints.
 */
function garminUrlToActivity({activity, details, splits, weather}) {
  const {
    averageHR,
    calories,
    distance,
    duration,
    elevationGain,
    elevationLoss,
    maxHR,
    startTimeLocal,
  } = activity.summaryDTO;

  debugger;
  return {
    activity_type: activity.activityTypeDTO.typeKey,
    avg_hr: averageHR,
    // TODO: Accept decimal values?
    calories: calories && Math.round(calories),
    distance: metersToMiles(distance),
    // TODO: Accept decimal values?
    duration: Math.round(duration),
    elevation_gain: metersToFeet(elevationGain),
    elevation_loss: metersToFeet(elevationLoss),
    garmin_activity_id: activity.activityId,
    max_hr: maxHR,
    start_date: moment(startTimeLocal).format(),
    timezone: activity.timeZoneUnitDTO.timeZone,

    // TODO: Add these models to the schema.
    // device: {},
    // laps: splits.lapDTOs,
    // tracks: [],
  };
}

export default garminUrlToActivity;
