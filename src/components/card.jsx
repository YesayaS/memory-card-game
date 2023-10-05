import "../styles/card.css";

function FaceCard({ agent }) {
  // console.log(agent);
  const agentBg = agent.background;
  const agentImg = agent.fullPortrait;
  return (
    <div className="face-card">
      <img className="agent-bg" src={agentBg} alt="" />
      <img className="agent-portrait" src={agentImg}></img>
      <div className="gradient-filter"></div>
      <div className="agent-name">{agent.displayName}</div>
    </div>
  );
}

export function Card({ agent }) {
  return (
    <div className="card-container">
      <FaceCard agent={agent}></FaceCard>
    </div>
  );
}
