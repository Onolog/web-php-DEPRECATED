// @flow

import calculatePace from './calculatePace';
import {METERS_PER_MILE} from 'constants/metrics';

/**
 * Converts speed (meters/second) to pace (mins/mile or mins/km).
 */
export default function speedToPace(speed: number): string {
  return calculatePace(1, (1/speed) * METERS_PER_MILE);
}
