import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export class Dot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dotColor = this.props.color;
    const connected = this.props.connected;
    const active = connected ? 'active' : '';
    return (
      <li
        className={`dot hvr-ripple-out color-${dotColor}`}
        onMouseDown={this.props.onMouseDown}
        onMouseOver={this.props.onMouseOver}
      >
        <div className={`${active}`}></div>
      </li>
    );
  }
}

export class DotObject {
  constructor(id, colId, rowId, color) {
    this.id = id;
    this.colId = colId;
    this.rowId = rowId;
    this.color = color;
  }
}
