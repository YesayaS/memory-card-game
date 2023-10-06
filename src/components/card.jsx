import cardBg from "../assets/VALORANT_Logo_V_thumbnail.jpg";

function FaceCard({ agent }) {
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

function BackCard() {
  return (
    <div className="back-card">
      <img src={cardBg} className="bgImage"></img>
    </div>
  );
}

export function Card({ agent, handle, cardFlip }) {
  const agentName = agent.displayName;

  return (
    <div
      className={`card-container ${cardFlip ? "flipped" : ""}`}
      onClick={() => {
        handle(agentName);
      }}
    >
      <div className="card">
        <FaceCard agent={agent}></FaceCard>
        <BackCard></BackCard>
      </div>
    </div>
  );
}
