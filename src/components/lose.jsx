import "../styles/stateScreen.css";

export function LoseScreen({ handle }) {
  return (
    <div className="container">
      <div>Lost</div>
      <button onClick={handle}>Again?</button>
    </div>
  );
}
