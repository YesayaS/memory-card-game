import { useEffect } from "react";
import "../styles/card.css";

const motionMatchMedia = window.matchMedia("(prefers-reduced-motion)");

function handleHover(e) {
  const THRESHOLD = 5;
  const { clientX, clientY, currentTarget } = e;
  const { clientWidth, clientHeight, offsetLeft, offsetTop } = currentTarget;

  const horizontal = (clientX - offsetLeft) / clientWidth;
  const vertical = (clientY - offsetTop) / clientHeight;
  const rotateX = -(THRESHOLD / 2 - horizontal * THRESHOLD).toFixed(2);
  const rotateY = -(vertical * THRESHOLD - THRESHOLD / 2).toFixed(2);

  this.style.transform = `perspective(${clientWidth}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg) scale3d(1.1, 1.1, 1.1)`;
}

function resetStyles(e) {
  this.style.transform = `perspective(${e.currentTarget.clientWidth}px) rotateX(0deg) rotateY(0deg)`;
}

function hoverEffect() {
  document.querySelectorAll(".card-container").forEach((card) => {
    if (!motionMatchMedia.matches) {
      card.addEventListener("mousemove", handleHover);
      card.addEventListener("mouseleave", resetStyles);
    }
  });
}

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

export function Card({ agent, updateScore }) {
  useEffect(() => {
    hoverEffect();
  }, [agent]);
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
