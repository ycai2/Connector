import React from 'react';

class Dot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dotColor = this.props.color;
    return (
      <li
        className={`dot hvr-ripple-out color-${dotColor}`}
        onMouseDown={this.props.onMouseDown}
        onMouseOver={this.props.onMouseOver}
      >
      </li>
    );
  }
}

export default Dot;
