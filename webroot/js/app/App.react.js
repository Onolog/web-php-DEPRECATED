import React, {Children, cloneElement} from 'react';

const App = React.createClass({
  render() {
    return (
      cloneElement(Children.only(this.props.children), this.props)
    );
  },
});

module.exports = App;
