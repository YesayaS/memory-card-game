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
  const [cardFlip, setCardFlip] = useState(false);
  const [clickable, setClickable] = useState(true);

  useEffect(() => {
    const handleResponseJson = (obj) => {
      const filteredData = obj.filter(
        (data) =>
          data.displayName !== null &&
          data.background !== null &&
          data.fullPortrait !== null,
      );
      const shuffleData = shuffle(filteredData);
      const slicedData = shuffleData.slice(0, 5);
      const keyData = slicedData.map((data) => {
        data.uniqueKey = uniqid();
        return data;
      });
      return keyData;
    };

    fetch("https://valorant-api.com/v1/agents")
      .then((r) => r.json())
      .then((json) => {
        const data = handleResponseJson(json.data);
        setAgents([...data]);
      })
      .catch((e) => console.error(e));

    return () => {
      null;
    };
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

  function handleClick() {
    if (!clickable) return;
    setCardFlip(true);
    setClickable(false);
    setTimeout(() => {
      shuffleAgents();
      setCardFlip(false);
    }, 600);
    setTimeout(() => {
      setClickable(true);
    }, 1000);
  }

  return (
    <div className="game-display">
      {!agents.length
        ? null
        : agents.map((agent, i) => {
            const key = agent.uniqueKey;
            return (
              <Card
                key={key}
                agent={agent}
                cardFlip={cardFlip}
                handle={handleClick}
              ></Card>
            );
          })}
    </div>
  );
}

export default App;
