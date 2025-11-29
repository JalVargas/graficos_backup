import { WavyFunnel10logica } from "./assets/components/WavyFunnel10/WavyFunnel10logica.jsx";
import WavyFunnel10D3 from "./assets/components/WavyFunnel10/WavyFunnel10D3.jsx";
import "./assets/components/WavyFunnel10/WavyFunnel10.css";

const funnelData = [
  { label: "Sessions", value: 1200 },
  { label: "Vehicle Views", value: 900 },
  { label: "True Leads", value: 600 },
  { label: "Test Drives", value: 350 },
  { label: "Sales", value: 180 },
];

function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 40,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 40,
      }}
    >
      <div>
        <h3>Funnel original (manual)</h3>
        <WavyFunnel10logica data={funnelData} />
      </div>
      <div>
        <h3>Funnel d3-area</h3>
        <WavyFunnel10D3 data={funnelData} />
      </div>
    </div>
  );
}

export default App;
