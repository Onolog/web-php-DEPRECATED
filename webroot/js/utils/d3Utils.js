// @flow
import * as d3 from 'd3';

import {MARGIN} from 'constants/d3';

export function bisectX(data, mouseX) {
  const bisect = d3.bisector(d => d.x).left;
  const i = bisect(data, mouseX, 1);
  const d0 = data[i - 1];
  const d1 = data[i];
  return d1 && (mouseX - d0.x > d1.x - mouseX) ? d1 : d0;
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
