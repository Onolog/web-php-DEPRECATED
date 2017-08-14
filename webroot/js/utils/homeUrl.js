// @flow

import pad from './pad';

/**
 * homeUrl
 *
 * Simple util function for defining the default home url.
 */
export default function(): string {
  var now = new Date();
  return `/${now.getFullYear()}/${pad(now.getMonth() + 1, 2)}`;
}
