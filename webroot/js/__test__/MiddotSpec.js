import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import React from 'react';

import Middot from 'components/Middot.react';

describe('<Middot/>', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Middot />);
    expect(wrapper.find('.middot')).to.have.length(1);
  });
});
