import "../styles/App.css";

export function Card({ agent, cardFlip, handle }) {
  const name = agent.displayName;
  return (
    <div
      className={`card-container ${cardFlip ? "flip" : ""}`}
      onClick={handle}
    >
      <div className="card">
        <div className="face-card">{name}</div>
        <div className="back-card">V</div>
      </div>
    </div>
  );
}
