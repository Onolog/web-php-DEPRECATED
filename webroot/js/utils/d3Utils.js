// @flow

import {MARGIN} from 'constants/d3';

export function getInnerHeight(height: number): number {
  return height - MARGIN.top - MARGIN.bottom;
}

export function getInnerWidth(width: number): number {
  return width - MARGIN.left - MARGIN.right;
}

export function transform(x: number, y: number): string {
  return `translate(${x}, ${y})`;
}
