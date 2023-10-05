import "./styles/card.css";

function FaceCard({ agent }) {
  console.log(agent);
  const agentBg = agent.background;
  const agentImg = agent.fullPortrait;
  return (
    <div className="faceCard">
      <img className="agentBg" src={agentBg} alt="" />
      <img className="agentImg" src={agentImg}></img>
      <div className="gradientFilter"></div>
      <div className="agentName">{agent.displayName}</div>
    </div>
  );
}

export function Card({ agent }) {
  return (
    <div className="cardContainer">
      <FaceCard agent={agent}></FaceCard>
    </div>
  );
}
