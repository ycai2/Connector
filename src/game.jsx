import React from 'react';
import Modal from 'react-modal';
import Board from './board';
import { LEVELS, COLORS, INSTRUCTION } from './levels.js';
import { reduceRequirement } from './util/util.js';
import { instructionStyle, resultStyle } from './util/modalStyle.js';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.level = LEVELS[this.props.level];
    this.width = this.level.width;
    this.height = this.level.height;
    this.colors = COLORS;
    this.initialReq = {};
    Object.keys(this.level.requirement).forEach((color) => {
      this.initialReq[color] = this.level.requirement[color];
    });
    this.state = {
      currentLevel: this.props.level,
      stepsLeft: this.level.maxSteps,
      requirement: this.level.requirement,
      instructionOpen: false,
      won: false,
      lost: false,
    };

    this.reduceStep = this.reduceStep.bind(this);
    this.reduceColor = this.reduceColor.bind(this);
    this.openInstruction = this.openInstruction.bind(this);
    this.closeInstruction = this.closeInstruction.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.restart = this.restart.bind(this);
  }

  reduceStep() {
    if (this.state.stepsLeft <= 1) {
      Object.keys(this.state.requirement).forEach((req) => {
        if (this.state.requirement[req] > 0) {
          this.setState({
            lost: true,
            won: false,
            stepsLeft: 0,
          });
          return;
        }
      });
    } else {
      this.setState({
        stepsLeft: this.state.stepsLeft - 1,
      });
    }
  }

  reduceColor(elimination) {
    let newRequirement = this.state.requirement;
    newRequirement = reduceRequirement(newRequirement, elimination);
    const won = Object.keys(newRequirement).every((req) => {
      return this.state.requirement[req] === 0;
    });
    if (won) {
      this.setState({
        won: true,
        lost: false,
        stepsLeft: 0,
      });
      return;
    }
    this.setState({
      requirement: newRequirement,
    });
  }

  openInstruction(e) {
    e.preventDefault();
    this.setState({
      instructionOpen: true,
    });
  }

  closeInstruction() {
    this.setState({
      instructionOpen: false,
    });
  }

  nextLevel(e) {
    e.preventDefault();
    const next = this.state.currentLevel + 1;
    this.setState({
      won: false,
      lost: false,
      stepsLeft: LEVELS[next].maxSteps,
      requirement: LEVELS[next].requirement,
      currentLevel: next,
    });
  }

  restart(e) {
    e.preventDefault();
    this.setState({
      lost: false,
      stepsLeft: this.level.maxSteps,
      requirement: this.initialReq,
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
              <li><a href="https://github.com/ycai2/Connector">Github</a></li>
            </ul>
          </div>
        </nav>

        <ul className="score-board">
          Level {this.state.currentLevel} connect
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

        <Modal
          isOpen={this.state.won}
          onRequestClose={this.nextLevel}
          style={resultStyle}
          contentLabel="won"
        >
          <div className="won-popup">
            Hey, you won.
          </div>
          <button onClick={this.nextLevel} className="waves-effect waves-light btn"><i className="material-icons right">play_arrow</i>Next Level</button>
        </Modal>
        <Modal
          isOpen={this.state.lost}
          onRequestClose={this.restart}
          style={resultStyle}
          contentLabel="lost"
        >
          <div className="lost-popup">
            Sorry, you lost.
          </div>
          <button onClick={this.restart} className="waves-effect waves-light btn"><i className="material-icons right">replay</i>Restart</button>
        </Modal>
      </div>
    );
  }
};

export default Game;
