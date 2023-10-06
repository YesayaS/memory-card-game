import "../styles/stateScreen.css";

export function WinScreen({ handle }) {
  return (
    <div className="container">
      <div>Win</div>
      <button onClick={handle}>Again?</button>
    </div>
  );
}
