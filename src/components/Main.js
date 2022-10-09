import { useState, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Timer from "./Timer";

function Main() {
  let [dice, setDice] = useState(createNewDice());

  let [rollsNumbers, setRollsNumbers] = useState(0);

  let [tenzies, setTenzies] = useState(false);

  let [bestReocrd, setBestReocrd] = useState(
    JSON.parse(localStorage.getItem("best-record")) || 0
  );

  function generateNewDie() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    };
  }

  function createNewDice() {
    let newDice = [];

    while (newDice.length < 10) {
      newDice.push(generateNewDie());
    }

    return newDice;
  }

  function rollDice() {
    if (tenzies) {
      setDice(createNewDice());
      setTenzies(false);
      setRollsNumbers(0);
    } else {
      setDice((oldDice) =>
        oldDice.map((die) => {
          if (die.isHeld) {
            return die;
          } else {
            return generateNewDie();
          }
        })
      );
      setRollsNumbers((prevNum) => prevNum + 1);
    }
  }

  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) => {
        return die.id === id
          ? {
              ...die,
              isHeld: !die.isHeld,
            }
          : die;
      })
    );
  }

  useEffect(() => {
    let isSucceed = dice.every(
      (x, i, arr) => x.isHeld && x.value === arr[0].value
    );
    if (isSucceed) {
      setTenzies(true);

      let prevBestRecord = localStorage.getItem("best-record");
      if (prevBestRecord === null || rollsNumbers < prevBestRecord) {
        localStorage.setItem("best-record", JSON.stringify(rollsNumbers));
        setBestReocrd(rollsNumbers);
      }
    }
  }, [dice]);

  let dieElements = dice.map((dieItem, i) => (
    <Die
      key={dieItem.id}
      id={dieItem.id}
      value={dieItem.value}
      isHeld={dieItem.isHeld}
      handleHeld={() => holdDice(dieItem.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <div className="main">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{dieElements}</div>

        <button className="roll" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>

        <div className="game-info">
          <span className="sub-title">Number Of Rolls:</span> {rollsNumbers}
          <br />
          <Timer tenzies={tenzies} />
          <span className="sub-title">Best Record:</span> {bestReocrd}
        </div>
      </div>
    </main>
  );
}

export default Main;
