import {expect} from 'chai';

import speedToPace from 'utils/speedToPace';

describe('secondsToTime', () => {
  it('converts meters/second to minutes/mile', () => {
    expect(speedToPace(2.6110000610351562)).to.equal('10:16');
  });
});
