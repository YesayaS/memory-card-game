import { useState, useEffect } from "react";
import "./App.css";
import { Card } from "./card";

function App() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("https://valorant-api.com/v1/agents")
      .then((r) => r.json())
      .then((json) => {
        setAgents([...json.data]);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <div>
        {agents.length ? <Card agent={agents[0]}></Card> : <p>Loading ... </p>}
      </div>
    </>
  );
}

export default App;
