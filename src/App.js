import "./App.css";
import React from "react";

import Main from "./components/Main";
function App() {
  let [gameStarted, setgameStarted] = React.useState(false);

  function startTenzies() {
    setgameStarted(true);
  }

  return (
    <div className="App">
      {gameStarted ? (
        <Main />
      ) : (
        <div className="start-page">
          <img src="images/dice.png" width="200" />
          <button className="roll" onClick={startTenzies}>
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
