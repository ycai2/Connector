import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Dot, DotObject } from './dot';
import ConnectionBoard from './connection_board';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotArray: this.populateBoard(),
      connecting: false,
      connection: [],
      originColor: 0,
      origin: null,
      maxDotId: props.width * props.height - 1,
    };
    this.populateBoard = this.populateBoard.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.validConnect = this.validConnect.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
    this.eliminate = this.eliminate.bind(this);
    this.eliminateAll = this.eliminateAll.bind(this);
  }

  populateBoard() {
    let dotArray = [];
    for (let i = 0; i < this.props.width; i++) {
      let dotCol = [];
      for (let j = 0; j < this.props.height; j++) {
        dotCol.push(new DotObject(
          j + i * this.props.height,
          i,
          j,
          Math.floor(Math.random() * 4 + 1)
        ));
      }
      dotArray.push(dotCol);
    }
    return dotArray;
  }

  onMouseDown(rowId, colId, dot) {
    const originColor = dot.color;
    return (e) => {
      e.preventDefault();
      // console.log(dot.id);
      // console.log(dot.rowId, dot.colId);
      const newConnection = this.state.connection.concat(dot);
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

  onMouseOver(rowId, colId, dot) {
    const color = dot.color;
    return (e) => {
      e.preventDefault();
      if (this.state.connecting && color === this.state.originColor) {
        if (this.validConnect(this.state.origin, {x: rowId, y: colId})) {
          this.handleConnection(e, rowId, colId, dot);
        }
      }
    };
  }

  handleConnection(e, rowId, colId, dot) {
    const newConnection = this.state.connection.concat(dot);
    if (newConnection[newConnection.length - 1] === newConnection[newConnection.length - 3]) {
      newConnection.splice(-2);
    }

    this.setState({
      connection: newConnection,
      origin: {x: rowId, y: colId}
    });
  }

  onMouseUp(e) {
    e.preventDefault();
    if (this.state.connecting) {
      let newDotArray = this.state.dotArray;
      if (this.state.connection.length > 1) {
        this.props.move();
        newDotArray = this.eliminate(this.state.dotArray, this.state.connection);
      }
      this.setState({
        connecting: false,
        connection: [],
        originColor: 0,
        origin: null,
        dotArray: newDotArray,
      });
    }
  }

  reindex(col, rowId) {
    const arr = col;
    for (let i = 0; i < rowId; i++) {
      arr[i].rowId++;
    }
    return arr;
  }

  eliminate(dotArray, connection) {
    let maxDotId = this.state.maxDotId;
    let newState = {};

    if (connection.length >= 5 && connection[0].id === connection[connection.length - 1].id) {
      //connected a square

      const result = this.eliminateAll(connection[0].color);
      newState = result.newState;
      this.props.reduceColor({[this.state.originColor]: result.eliminatedDots});
    } else {
      this.props.reduceColor({[this.state.originColor]: connection.length});
      connection.forEach((connectDot) => {
        dotArray.forEach((col, colId) => {
          const rowId = col.findIndex((dot) => {
            return (dot.id === connectDot.id);
          });
          if (rowId >= 0) {
            col.splice(rowId, 1);
            this.reindex(col, rowId);
            col.unshift(new DotObject(
              ++maxDotId,
              colId,
              0,
              Math.floor(Math.random() * 4 + 1)
            ));
          }
        });
      });
      newState = {maxDotId};
    }
    this.setState(newState);

    return dotArray;
  }

  eliminateAll(color) {
    let newDotArray = this.state.dotArray;
    let maxDotId = this.state.maxDotId;
    let newDotsCounter = 0;
    newDotArray.forEach((col) => {
      col.forEach((dot) => {
        if (dot.color === color) {
          col.splice(dot.rowId, 1);
          maxDotId++;
          this.reindex(col, dot.rowId);
          col.unshift(new DotObject(
            maxDotId,
            dot.colId,
            0,
            Math.floor(Math.random() * 4 + 1)
          ));
        }
      });
    });

    return {
      newState: {dotArray: newDotArray, maxDotId},
      eliminatedDots: maxDotId - this.state.maxDotId,
    };
  }

  validConnect(cur, next) {
    const inConn = this.state.connection.findIndex((dot) => {
      return (dot.rowId === next.x && dot.colId === next.y);
    });

    if (inConn >= 0) {
      if (this.state.connection.length - 2 === inConn) {
        return true;
      } else if (this.state.connection.length !== 4) {
        return false;
      }
    }

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
                <ReactCSSTransitionGroup
                  className="column"
                  transitionName="bounce"
                  transitionEnterTimeout={2000}
                  transitionLeaveTimeout={2000}
                  transitionAppear={true}
                  transitionAppearTimeout={2000}
                  component="ul"
                >
                  {col.map((dot, rowId) => {
                    const connected = this.state.connection.includes(dot);
                    return (
                      <Dot
                        key={dot.id}
                        connected={connected}
                        color={dot.color}
                        dotId={dot.id}
                        onMouseDown={this.onMouseDown(rowId, colId, dot)}
                        onMouseOver={this.onMouseOver(rowId, colId, dot)}
                      />
                    );
                  })}
                </ReactCSSTransitionGroup>
              </li>
            );
          })}
        </ul>
        <ConnectionBoard width={this.props.width} height={this.props.height} />
      </div>
    );
  }
};

export default Board;
