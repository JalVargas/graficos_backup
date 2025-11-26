import WavyFunnel from "./components/WavyFunnel";
import { IconInfoCircle, IconMinus } from "@tabler/icons-react";
import "./App.css";

const initialData = [
  { label: "Sessions", value: 281717, color: "#64a9ab" },
  { label: "Vehicle Views", value: 112679, color: "#74c4c6" },
  { label: "TrueLeads", value: 1781, color: "#eab234" },
];

const secondFunnelData = [
  { label: "Total Impressions", value: 473830, color: "#1a5a5c" },
  { label: "Total Clicks", value: 12429, color: "#3d8a8c" },
  { label: "Known Shoppers", value: 500, color: "#6ab0b2" },
  { label: "High Marketing Score", value: 125, color: "#9dd4d6" },
];

function App() {
  return (
    <div className="app">
      <main className="app-main">
        <section className="wavy-funnel-section">
          <div className="wavy-content">
            <div className="funnel-section">
              <div className="funnel-card-wrapper">
                <div className="section-header">
                  <IconMinus stroke={2} size={18} />
                  <h2 className="section-title">Website Traffic</h2>
                  <IconInfoCircle stroke={1.25} size={18} />
                </div>
                <WavyFunnel
                  data={initialData}
                  width={450}
                  height={350}
                  waveAmplitude={15}
                  waveFrequency={3}
                  leftMargin={30}
                  segmentGap={0}
                  animated={true}
                />
              </div>
            </div>
            <div className="funnel-section">
              <div className="funnel-card-wrapper">
                <div className="section-header">
                  <IconMinus stroke={2} size={18} />
                  <h2 className="section-title">Consumer Journey</h2>
                  <IconInfoCircle stroke={1.25} size={18} />
                </div>
                <WavyFunnel
                  data={secondFunnelData}
                  width={520}
                  height={400}
                  waveAmplitude={15}
                  waveFrequency={3}
                  leftMargin={30}
                  segmentGap={0}
                  animated={true}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
