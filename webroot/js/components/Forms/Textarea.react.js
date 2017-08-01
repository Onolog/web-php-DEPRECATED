var React = require('react');
var cx = require('classnames');

/**
 * Textarea.react
 *
 * React wrapper around a standard textarea.
 */
class Textarea extends React.Component {
  static displayName = 'Textarea';

  render() {
    return (
      <textarea
        {...this.props}
        className={cx(this.props.className, 'form-control')}
      />
    );
  }
}

module.exports = Textarea;
