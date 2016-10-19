import React from 'react';
import Dot from './dot';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dotArray: this.populateBoard()
    };
    this.populateBoard = this.populateBoard.bind(this);
  }

  populateBoard() {
    let dotArray = [];
    for (let i = 0; i < this.props.width; i++) {
      let dotCol = [];
      for (let j = 0; j < this.props.height; j++) {
        dotCol.push("red");
      }
      dotArray.push(dotCol);
    }
    return dotArray;
  }

  render() {
    return (
      <ul className="board">
        {this.state.dotArray.map((col, col_num) => {
          return (
            <li key={col_num}>
              <ul className="column">
                {col.map((dot, dotId) => {
                  return (
                    <Dot color={dot} key={dotId} />
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default Board;
