import React from 'react';
import Board from './board';
import { LEVELS, COLORS } from './levels.js';
import { reduceRequirement } from './util/util.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.level = LEVELS[this.props.level]
    this.width = this.level.width;
    this.height = this.level.height;
    this.colors = COLORS;
    this.state = {
      stepsLeft: this.level.maxSteps,
      requirement: this.level.requirement,
    };

    this.reduceStep = this.reduceStep.bind(this);

  }

  reduceStep() {
    this.setState({
      stepsLeft: this.state.stepsLeft - 1,
    });
  }

  reduceColor() {
    let newRequirement = this.state.requirement;
    newRequirement = reduceRequirement(newRequirement, elimination);
    this.setState({
      requirement: newRequirement,
    });
  }

  render() {
    return (
      <div>
        <div>Steps Left: {this.state.stepsLeft}</div>
        <ul className="score-board">
          {Object.keys(this.colors).map((color, idx) => {
            return (<li className={`dot color-${color}`} key={idx}></li>);
          })}
        </ul>
        <Board
          width={this.width}
          height={this.height}
          move={this.reduceStep}
          reduceColor={this.reduceColor}
        />
      </div>
    );
  }
};

export default Game;
