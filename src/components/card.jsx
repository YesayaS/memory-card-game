import "../styles/card.css";

function FaceCard({ agent }) {
  // console.log(agent);
  const agentBg = agent.background;
  const agentPortrait = agent.fullPortrait;
  const agentName = agent.displayName;
  return (
    <div className="face-card">
      <img className="agent-bg" src={agentBg} alt="" />
      <img className="agent-portrait" src={agentPortrait}></img>
      <div className="gradient-filter"></div>
      <div className="agent-name">{agentName}</div>
    </div>
  );
}

export function Card({ agent, updateScore }) {
  return (
    <div
      className="card-container"
      data-key={agent.displayName}
      onClick={(e) => updateScore(e)}
    >
      <FaceCard agent={agent}></FaceCard>
    </div>
  );
}
