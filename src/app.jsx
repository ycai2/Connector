import React from 'react';
import Game from './game';

class App extends React.Component {
  render() {
    return (
      <div>
        <Game level={0} />
      </div>
    );
  }
}

export default App;
