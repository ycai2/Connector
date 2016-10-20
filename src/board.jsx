import React from 'react';
import Dot from './dot';
import Line from './line';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotArray: this.populateBoard(),
      connecting: false,
      connection: [],
      originColor: 0,
      origin: null
    };
    this.populateBoard = this.populateBoard.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.validConnect = this.validConnect.bind(this);
  }

  populateBoard() {
    let dotArray = [];
    for (let i = 0; i < this.props.width; i++) {
      let dotCol = [];
      for (let j = 0; j < this.props.height; j++) {
        dotCol.push({
          id: j + i * this.props.height,
          color: Math.floor(Math.random() * 4 + 1)
        });
      }
      dotArray.push(dotCol);
    }
    return dotArray;
  }

  onMouseDown(rowId, colId, dot) {
    const originColor = dot.color;
    return (e) => {
      e.preventDefault();
      const newConnection = this.state.connection.concat(dot.id);
      if (!this.state.connecting) {
        this.setState({
          connecting: true,
          connection: newConnection,
          originColor,
          origin: {x: rowId, y: colId}
        });
      }
    }
  }

  onMouseMove(e) {
    e.preventDefault();
  }

  onMouseOver(rowId, colId, dot) {
    const color = dot.color;
    return (e) => {
      e.preventDefault();
      if (this.state.connecting && color === this.state.originColor) {
        if (this.validConnect(this.state.origin, {x: rowId, y: colId})) {
          const newConnection = this.state.connection.concat(dot.id);
          console.log(dot);
          console.log(newConnection);
          this.setState({
            connection: newConnection,
            origin: {x: rowId, y: colId}
          });
        }
      }
    };
  }

  onMouseUp(e) {
    e.preventDefault();
    if (this.state.connecting) {
      this.setState({
        connecting: false,
        connection: [],
        originColor: 0,
        origin: null
      });
    }
  }

  validConnect(cur, next) {
    if (cur.x === next.x) {
      if (cur.y - next.y === 1 || cur.y - next.y === -1) {
        return true;
      }
    } else if (cur.y === next.y) {
      if (cur.x - next.x === 1 || cur.x - next.x === -1) {
        return true;
      }
    }
    return false;
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
                        key={rowId}
                        color={dot.color}
                        dotId={dot.id}
                        row_id={rowId}
                        col_id={colId}
                        onMouseDown={this.onMouseDown(rowId, colId, dot)}
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
