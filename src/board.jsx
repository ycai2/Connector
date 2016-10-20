import React from 'react';
import Dot from './dot';
import Line from './line';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotArray: this.populateBoard(),
      connecting: false,
      originColor: 0,
    };
    this.populateBoard = this.populateBoard.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
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

  onMouseDown(originColor) {
    return (e) => {
      e.preventDefault();
      if (!this.state.connecting) {
        this.setState({
          connecting: true,
          originColor
        });
      }
    }
  }

  onMouseMove(e) {
    e.preventDefault();
  }

  onMouseOver(rowId, colId, color) {
    return (e) => {
      e.preventDefault();
      if (this.state.connecting && color === this.state.originColor) {
        console.log(color);
      }
    };
  }

  onMouseUp(e) {
    e.preventDefault();
    if (this.state.connecting) {
      this.setState({
        connecting: false
      });
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
          {this.state.dotArray.map((col, colId) => {
            return (
              <li key={colId}>
                <ul className="column">
                  {col.map((dot, rowId) => {
                    return (
                      <Dot
                        color={dot}
                        key={rowId}
                        row_id={rowId}
                        col_id={colId}
                        onMouseDown={this.onMouseDown(dot)}
                        onMouseOver={this.onMouseOver(rowId, colId, dot)}
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
