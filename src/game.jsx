import React from 'react';
import Board from './board';

class Game extends React.Component {
  render() {
    return (
      <Board
        width={4}
        height={4}
      />
    );
  }
};

export default Game;
