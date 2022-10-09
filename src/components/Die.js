function Die(props) {
  let dotStyles = {
    backgroundColor: props.isHeld ? "#f8de4e" : "rgb(124, 123, 123)",
  };

  function getDots() {
    let dots = [];
    for (let i = 0; i < props.value; i++) {
      dots.push(<span className="dot" style={dotStyles}></span>);
    }
    return dots;
  }

  let faceStyles = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };

  return (
    <div
      // className={`die-face ${props.isHeld ? "held-die" : ""}`}
      className="die-face"
      style={faceStyles}
      onClick={props.handleHeld}
    >
      {getDots()}
    </div>
  );
}

export default Die;
