import React from 'react';

import FlexContainer from 'components/FlexContainer/FlexContainer.react';

const PageFrame = props => (
  <FlexContainer className="page-frame">
    {props.children}
  </FlexContainer>
);

export default PageFrame;
