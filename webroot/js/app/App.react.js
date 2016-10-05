import React, {cloneElement} from 'react';

const App = React.createClass({
  render() {
    return cloneElement(this.props.children, this.props);
  },
});

export default App;
