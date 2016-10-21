import React from 'react';
import Board from './board';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.width = 6;
    this.height = 6;
    this.state = {
      stepLeft: this.props.maxSteps
    };
  }
  render() {
    return (
      <Board
        width={this.width}
        height={this.height}
      />
    );
  }
};

export default Game;
