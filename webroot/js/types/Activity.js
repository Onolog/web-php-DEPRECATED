// @flow

export type Activity = {
  activity_type: ?string,
  avg_hr: ?number,
  calories: ?number,
  distance: number,
  duration: number,
  elevation_gain: ?number,
  elevation_loss: ?number,
  friends?: string,
  garmin_activity_id: ?number,
  id?: number,
  max_hr: ?number,
  notes?: string,
  shoe_id?: number,
  start_date: string,
  timezone: string,
  user_id?: number,
};
