// @flow

import {MARGIN} from 'constants/d3';

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
