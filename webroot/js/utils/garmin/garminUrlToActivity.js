import {metersToMiles} from 'utils/distanceUtils';

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
    calories,
    distance: metersToMiles(distance),
    duration,
    max_hr: maxHR,
    start_date: startTimeLocal,
    timezone: activity.timeZoneUnitDTO.timeZone,

    // TODO: Add these fields to the schema.
    //
    // elevation_gain: metersToFeet(elevationGain),
    // elevation_loss: metersToFeet(elevationLoss),
    // device: {},
    // laps: splits.lapDTOs,
    // tracks: [],
  };
}

export default garminUrlToActivity;
