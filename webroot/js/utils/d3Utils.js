// @flow
import * as d3 from 'd3';

import {MARGIN} from 'constants/d3';

export function bisect(
  data: Array<Object>,
  position: number,
  accessor: string
): Object {
  const bisect = d3.bisector(d => d[accessor]).left;
  const i = bisect(data, position, 1);
  const d0 = data[i - 1];
  const d1 = data[i];
  return d1 && (position - d0[accessor] > d1[accessor] - position) ? d1 : d0;
}

export function getInnerHeight(
  height: number,
  margin?: {bottom: number, top: number},
): number {
  margin = {...MARGIN, ...margin};
  return height - margin.top - margin.bottom;
}

export function getInnerWidth(
  width: number,
  margin?: {left: number, right: number},
): number {
  margin = {...MARGIN, ...margin};
  return width - margin.left - margin.right;
}

export function transform(x: number, y: number): string {
  return `translate(${x}, ${y})`;
}
