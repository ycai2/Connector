import React from 'react';
import Modal from 'react-modal';
import Board from './board';
import { LEVELS, COLORS, INSTRUCTION } from './levels.js';
import { reduceRequirement } from './util/util.js';
import { instructionStyle } from './util/modalStyle.js';

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
      instructionOpen: false,
    };

    this.reduceStep = this.reduceStep.bind(this);
    this.reduceColor = this.reduceColor.bind(this);
    this.openInstruction = this.openInstruction.bind(this);
    this.closeInstruction = this.closeInstruction.bind(this);
  }

  reduceStep() {
    this.setState({
      stepsLeft: this.state.stepsLeft - 1,
    });
  }

  reduceColor(elimination) {
    let newRequirement = this.state.requirement;
    newRequirement = reduceRequirement(newRequirement, elimination);
    this.setState({
      requirement: newRequirement,
    });
  }

  openInstruction() {
    this.setState({
      instructionOpen: true,
    });
  }

  closeInstruction() {
    this.setState({
      instructionOpen: false,
    });
  }

  componentWillMount() {
    Modal.setAppElement(document.body);
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">&nbsp;Connector</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><a href="#" onClick={this.openInstruction}>Instruction</a></li>
            </ul>
          </div>
        </nav>
        <ul className="score-board">
          Level {this.props.level} connect
          {Object.keys(this.state.requirement).map((color, idx) => {
            return (
              <li
                className={`dot color-${color}`}
                key={idx}>
                {this.state.requirement[color]}
              </li>
            );
          })}
          in {this.state.stepsLeft} steps
        </ul>
        <Board
          width={this.width}
          height={this.height}
          move={this.reduceStep}
          reduceColor={this.reduceColor}
        />
        <Modal
          isOpen={this.state.instructionOpen}
          onRequestClose={this.closeInstruction}
          style={instructionStyle}
          contentLabel="Modal"
          >
          <div className="instruction-text">
            <h1>Connector</h1>
            <p>The goal of Connector is to eliminate required dots in limited steps. </p>
            <p>To start with, you can connect two dots with same color to eliminate them. </p>
            <p>Click and hold to connect (You can also go back before release)</p>
            <p>If you see more dots are adjacent horizontally or vertically, you can connect all of them.</p>
            <p>Connect four same color dots with a square and see what happens :)</p>
          </div>
        </Modal>
      </div>
    );
  }
};

export default Game;
