import { useState, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

function Timer(props) {
  let [gamePaused, setGamePaused] = useState(false);

  const { seconds, minutes, start, pause, reset } = useStopwatch({
    autoStart: true,
  });

  function pauseTenzies() {
    setGamePaused((x) => !x);
  }

  useEffect(() => {
    gamePaused ? pause() : start();
  }, [gamePaused]);

  useEffect(() => {
    props.tenzies ? pause() : reset();
  }, [props.tenzies]);

  return (
    <div>
      {gamePaused && <div className="pause-overly"> game paused</div>}
      {!props.tenzies && (
        <i
          className={`play-btn ${
            gamePaused ? "fa fa-play-circle" : "fa fa-pause-circle-o"
          }`}
          onClick={pauseTenzies}
        ></i>
      )}
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
}

export default Timer;
