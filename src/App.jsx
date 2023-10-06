import { useState, useEffect } from "react";
import "./styles/App.css";
import "./styles/card.css";
import { Card } from "./components/card.jsx";
import uniqid from "uniqid";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Loading } from "./components/loading";

function App() {
  const [agents, setAgents] = useState([]);
  const [pickHistory, setPickHistory] = useState([]);
  const [score, setScore] = useState(0);

  const [isClicked, setIsClicked] = useState(false);
  const [cardFlip, setCardFlip] = useState(false);

  useEffect(() => {
    const handleResponseJson = (obj) => {
      const filteredData = obj.filter(
        (data) =>
          data.displayName !== null &&
          data.background !== null &&
          data.fullPortrait !== null,
      );
      const reducedData = filteredData.slice(0, 10);
      const shuffleData = shuffle(reducedData);
      return shuffleData;
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

  function updateScore(agentName) {
    const agentIsPicked = isPicked(agentName);
    if (!agentIsPicked) {
      setIsClicked(true);
      if (isClicked) return;
      // setScore(score + 1);
      setCardFlip(true);
      setTimeout(() => {
        // shuffleAgents();
        // setPickHistory([...pickHistory, agentName]);
      }, 800);
      setTimeout(() => {
        setCardFlip(false);
        setIsClicked(false);
      }, 1300);
    } else resetAllState();
  }

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
  }

  return (
    <>
      {!agents.length ? (
        <Loading></Loading>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="gameBoard">
            <div className="title">VALORANT Memory Card Game</div>
            <div className="scoreBoard">Score: {score}/10</div>
            <div className="card-list-container">
              <div className="card-list">
                {agents.map((agent) => {
                  return (
                    <Tilt
                      key={uniqid()}
                      tiltReverse={true}
                      glareEnable={true}
                      glareReverse={true}
                    >
                      <Card
                        agent={agent}
                        handle={updateScore}
                        cardFlip={cardFlip}
                      ></Card>
                    </Tilt>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}

export default App;
