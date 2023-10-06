import { useState, useEffect } from "react";
import "./styles/App.css";
import { Card } from "./components/card";
import uniqid from "uniqid";

function App() {
  const [agents, setAgents] = useState([]);
  const [pickHistory, setPickHistory] = useState([]);
  const [score, setScore] = useState(0);

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

  function isPicked(e) {
    const agentName = e.target.closest(".card-container").dataset.key;
    if (pickHistory.includes(agentName)) {
      return true;
    } else {
      setPickHistory([...pickHistory, agentName]);
      shuffleAgents();
      return false;
    }
  }

  function updateScore(agentName) {
    const agentIsPicked = isPicked(agentName);
    if (!agentIsPicked) setScore(score + 1);
    else resetAllState();
  }

  function resetAllState() {
    setPickHistory([]);
    setScore(0);
    shuffleAgents();
  }

  return (
    <>
      <div>Score: {score}/10</div>
      <div className="card-list-container">
        <div className="card-list">
          {!agents.length ? (
            <p>Loading ... </p>
          ) : (
            agents.map((agent) => {
              return (
                <Card
                  agent={agent}
                  updateScore={updateScore}
                  key={uniqid()}
                ></Card>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
