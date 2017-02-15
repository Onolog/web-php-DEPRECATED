import cx from 'classnames';
import React, {PropTypes} from 'react';

import FlexContainer from 'components/FlexContainer/FlexContainer.react';
import Loader from 'components/Loader/Loader.react';
import ScrollContainer from 'components/ScrollContainer/ScrollContainer.react';

import './css/PageFrame.css';

const PageFrame = ({children, fill, isLoading, scroll}) => {
  const contents = scroll ?
    <ScrollContainer className="page-frame-content">
      {children}
    </ScrollContainer> :
    <div className="page-frame-content">
      {children}
    </div>;

  return (
    <FlexContainer className={cx('page-frame', {'fill': fill})}>
      {isLoading && <Loader background full />}
      {contents}
    </FlexContainer>
  );
};

PageFrame.propTypes = {
  fill: PropTypes.bool,
  isLoading: PropTypes.bool,
  scroll: PropTypes.bool,
};

PageFrame.defaultProps = {
  fill: false,
  isLoading: false,
  scroll: false,
};

export default PageFrame;
