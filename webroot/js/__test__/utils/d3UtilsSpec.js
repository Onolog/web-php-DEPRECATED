import {expect} from 'chai';

import {bisect, getInnerHeight, getInnerWidth, transform} from 'utils/d3Utils';

import {METRICS} from 'constants/Garmin';
import {ACTIVITY_METRICS} from 'constants/TestData';

const data = ACTIVITY_METRICS.map(({metrics}) => ({
  distance: metrics[METRICS.SUM_DISTANCE],
  hr: metrics[METRICS.HEART_RATE],
}));

describe('d3Utils', () => {
  it('bisects the given data', () => {
    const d = bisect(data, 9900, d => d.distance);
    expect(d.hr).to.equal(148);
  });

  it('returns the inner height', () => {
    expect(getInnerHeight(400)).to.equal(350);
    expect(getInnerHeight(400, {})).to.equal(350);
    expect(getInnerHeight(400, {bottom: 0})).to.equal(380);
    expect(getInnerHeight(400, {bottom: 0, top: 0})).to.equal(400);
  });

  it('returns the inner width', () => {
    expect(getInnerWidth(400)).to.equal(330);
    expect(getInnerWidth(400, {})).to.equal(330);
    expect(getInnerWidth(400, {left: 0})).to.equal(370);
    expect(getInnerWidth(400, {left: 0, right: 0})).to.equal(400);
  });

  it('returns a `translate` string value', () => {
    expect(transform(99, 234)).to.equal('translate(99, 234)');
  });
});
