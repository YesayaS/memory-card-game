import { useState, useEffect } from "react";
import "./styles/App.css";
import { Card } from "./components/card";
import uniqid from "uniqid";

function App() {
  const [agents, setAgents] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch("https://valorant-api.com/v1/agents")
      .then((r) => r.json())
      .then((json) => {
        const data = handleResponseJson(json.data);
        setAgents([...data]);
      })
      .catch((e) => console.log(e));
  }, []);

  function handleResponseJson(obj) {
    const filteredData = obj.filter(
      (data) =>
        data.displayName !== null &&
        data.background !== null &&
        data.fullPortrait !== null,
    );
    const reducedData = filteredData.slice(0, 10);
    const shuffleData = shuffleAgents(reducedData);
    return shuffleData;
  }

  const shuffleAgents = (array) => {
    return array
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  };

  return (
    <>
      <div className="card-list-container">
        <div className="card-list">
          {!agents.length ? (
            <p>Loading ... </p>
          ) : (
            agents.map((agent) => {
              return <Card agent={agent} key={uniqid()}></Card>;
            })
          )}
        </div>
      </div>
    </>
  );
}

export default App;
