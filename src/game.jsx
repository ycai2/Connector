import React from 'react';
import Board from './board';
import { LEVELS } from './levels.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.level = LEVELS[this.props.level]
    this.width = this.level.width;
    this.height = this.level.height;
    this.state = {
      stepLeft: this.level.maxSteps,
      requirement: this.level.requirement,
    };

    this.reduceStep = this.reduceStep.bind(this);
  }

  reduceStep() {
    this.setState({
      stepLeft: this.state.stepLeft - 1,
    });
  }

  render() {
    return (
      <div>
        <div>Steps Left: {this.state.stepLeft}</div>
        <Board
          width={this.width}
          height={this.height}
          move={this.reduceStep}
        />
      </div>
    );
  }
};

export default Game;
