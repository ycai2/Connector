import React from 'react';
import Dot from './dot';
import Line from './line';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotArray: this.populateBoard(),
      selectStartX: 0,
      selectStartY: 0,
      selectEndX: 0,
      selectEndY: 0,
      drawing: false
    };
    this.populateBoard = this.populateBoard.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  populateBoard() {
    let dotArray = [];
    for (let i = 0; i < this.props.width; i++) {
      let dotCol = [];
      for (let j = 0; j < this.props.height; j++) {
        dotCol.push(Math.floor(Math.random() * 4 + 1));
      }
      dotArray.push(dotCol);
    }
    return dotArray;
  }

  onMouseDown(e) {
    e.preventDefault();
    if (!this.state.drawing) {
      this.setState({
        selectStartX: e.screenX,
        selectStartY: e.screenY,
        selectEndX: e.screenX,
        selectEndY: e.screenY,
        drawing: true
      });
    }
  }

  onMouseMove(e) {
    e.preventDefault();
    if (this.state.drawing) {
      this.setState({
        selectEndX: e.screenX,
        selectEndY: e.screenY,
      });
    }
  }

  onMouseUp(e) {
    e.preventDefault();
    if (this.state.drawing) {
      this.setState({
        selectStartX: 0,
        selectStartY: 0,
        selectEndX: 0,
        selectEndY: 0,
        drawing: false,
      })
    }
  }

  render() {
    return (
      <div className="game">
        <ul
        className="board"
        onMouseMove={this.onMouseMove}
        onMouseUp={this.onMouseUp}
        >
          {this.state.dotArray.map((col, col_num) => {
            return (
              <li key={col_num}>
                <ul className="column">
                  {col.map((dot, dotId) => {
                    return (
                      <Dot
                        color={dot}
                        key={dotId}
                        onMouseDown={this.onMouseDown}
                      />
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
};

export default Board;
