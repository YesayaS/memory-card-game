import { useState, useEffect, useRef } from "react";
import "./styles/App.css";
import "./styles/card.css";
import { Card } from "./components/card.jsx";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Loading } from "./components/loading";
import { LoseScreen } from "./components/lose";
import { Transition } from "react-transition-group";
import { WinScreen } from "./components/win";

function App() {
  const cardLength = 5;
  const [agents, setAgents] = useState([]);
  const [pickHistory, setPickHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [isLose, setIsLose] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const [clickable, setClickable] = useState(true);
  const [cardFlip, setCardFlip] = useState(false);

  useEffect(() => {
    const handleResponseJson = (obj) => {
      const filteredData = obj.filter(
        (data) =>
          data.displayName !== null &&
          data.background !== null &&
          data.fullPortrait !== null,
      );
      const shuffleData = shuffle(filteredData);
      const reducedData = shuffleData.slice(0, cardLength);
      return reducedData;
    };

    fetch("https://valorant-api.com/v1/agents")
      .then((r) => r.json())
      .then((json) => {
        const data = handleResponseJson(json.data);
        setAgents([...data]);
      })
      .catch((e) => console.error(e));

    return () => {};
  }, []);

  function shuffleAgents() {
    const shuffleAgents = agents;
    return setAgents([...shuffle(shuffleAgents)]);
  }

  function shuffle(array) {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  function isPicked(agentName) {
    if (pickHistory.includes(agentName)) {
      return true;
    } else {
      return false;
    }
  }

  function resetAllState() {
    setPickHistory([]);
    setScore(0);
    shuffleAgents();
    setIsLose(false);
    setIsWin(false);
  }

  function handleClick(agentName) {
    if (!clickable) return;
    const agentIsPicked = isPicked(agentName);
    if (!agentIsPicked) {
      setClickable(false);
      setScore(score + 1);
      setCardFlip(true);
      setTimeout(() => {
        shuffleAgents();
        setPickHistory([...pickHistory, agentName]);
        setCardFlip(false);
      }, 400);
      setTimeout(() => {
        setClickable(true);
      }, 1000);
    } else lose();
  }

  function lose() {
    setIsLose(true);
  }

  function handlePlayAgain() {
    resetAllState();
  }

  useEffect(() => {
    score === 5 ? setIsWin(true) : null;
  }, [score]);

  return (
    <>
      {!agents.length ? (
        <Loading></Loading>
      ) : isLose ? (
        <LoseScreen handle={handlePlayAgain}></LoseScreen>
      ) : isWin ? (
        <WinScreen handle={handlePlayAgain}></WinScreen>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="gameBoard">
            <div className="title">VALORANT Memory Card Game</div>
            <div className="scoreBoard">
              Score: {score}/{cardLength}
            </div>
            <div className="card-list-container">
              {agents.map((agent, i) => {
                return (
                  <Tilt
                    key={i}
                    tiltReverse={true}
                    glareEnable={true}
                    glareReverse={true}
                  >
                    <Card
                      agent={agent}
                      handle={handleClick}
                      cardFlip={cardFlip}
                    ></Card>
                  </Tilt>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default App;
