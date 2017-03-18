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

  return {
    activity_type: activity.activityTypeDTO.typeKey,
    avg_hr: averageHR,
    calories: Math.round(calories),     // TODO: Accept decimal values?
    distance: metersToMiles(distance),
    duration: Math.round(duration),     // TODO: Accept decimal values?
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
