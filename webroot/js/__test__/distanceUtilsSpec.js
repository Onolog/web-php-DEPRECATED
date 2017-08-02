import {expect} from 'chai';

import {metersToMiles, metersToFeet} from 'utils/distanceUtils';

describe('distanceUtils', () => {
  it('converts meters to miles', () => {
    expect(metersToMiles(1609.35)).to.equal(1);
    expect(metersToMiles(5000)).to.equal(3.11);
    expect(metersToMiles(1617.3967499999997)).to.equal(1.01);
  });

  it('converts meters to feet', () => {
    expect(metersToFeet(100)).to.equal(328);
    expect(metersToFeet(5000)).to.equal(16404);
  });
});
