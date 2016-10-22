import cx from 'classnames';
import React, {PropTypes} from 'react';

const AppPageContent = props => (
  <div className={cx('app-page-content', {'narrow-page': props.narrow})}>
    <div className="clearfix container-fluid">
      {props.children}
    </div>
  </div>
);

AppPageContent.propTypes = {
  narrow: PropTypes.bool,
};

AppPageContent.defaultProps = {
  narrow: false,
};

export default AppPageContent;
