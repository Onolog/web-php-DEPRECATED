import {Children, cloneElement} from 'react';

const AppController = props => {
  return cloneElement(Children.only(props.children), props);
};

module.exports = AppController;
