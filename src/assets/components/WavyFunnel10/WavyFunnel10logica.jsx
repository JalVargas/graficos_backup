import React, { useState } from "react";
import WavyFunnel from "../WavyFunnel/WavyFunnel";
import WavyFunnel10 from "./WavyFunnel10";
import { IconInfoCircle, IconMinus } from "@tabler/icons-react";
import LabelYValue from "../WavyFunnel/LabelYvalue";
import "../../../App.css";
import WavyFunnel10D3 from "./WavyFunnel10D3";

export const WavyFunnel10logica = () => {
  const [initialData, setInitialData] = useState([
    { label: "Sessions", value: 281717, color: "#64a9ab" },
    { label: "Vehicle Views", value: 112679, color: "#74c4c6" },
    { label: "TrueLeads", value: 1781, color: "#eab234" },
  ]);

  const [secondFunnelData, setSecondFunnelData] = useState([
    { label: "Total Impressions", value: 473830, color: "#1a5a5c" },
    { label: "Total Clicks", value: 12429, color: "#3d8a8c" },
    { label: "Known Shoppers", value: 500, color: "#6ab0b2" },
    { label: "High Marketing Score", value: 125, color: "#9dd4d6" },
  ]);

  const [thirdFunnelData, setThirdFunnelData] = useState([
    { label: "Sessions", value: 281717 },
    { label: "Vehicle Views", value: 112679 },
    { label: "True Leads", value: 1781 },
    { label: "Total Impressions", value: 473830 },
    { label: "Total Clicks", value: 12429 },
    { label: "Known Shoppers", value: 500 },
    { label: "High Marketing Score", value: 125 },
    { label: "Green", value: 300 },
    { label: "Gold", value: 100 },
  ]);

  // Filtrar los datos para mostrar solo los que tienen value > 0 y ordenarlos de mayor a menor
  const filterAndSort = (data) =>
    data.filter((item) => item.value > 0).sort((a, b) => b.value - a.value);

  return (
    <div className="app">
      <main className="app-main">
        <section className="wavy-funnel-section">
          <div className="wavy-content">
            <div className="funnel-section">
              <div className="funnel-card-wrapper">
                <LabelYValue data={initialData} setData={setInitialData} />
                <div className="section-header">
                  <IconMinus stroke={2} size={18} />
                  <h2 className="section-title">Website Traffic</h2>
                  <IconInfoCircle stroke={1.25} size={18} />
                </div>
                <WavyFunnel10D3
                  data={filterAndSort(initialData)}
                  width={450}
                  height={350}
                  waveAmplitude={15}
                  waveFrequency={6}
                  leftMargin={30}
                  segmentGap={0}
                  animated={true}
                />
              </div>
            </div>
            <div className="funnel-section">
              <div className="funnel-card-wrapper">
                <LabelYValue
                  data={secondFunnelData}
                  setData={setSecondFunnelData}
                />
                <div className="section-header">
                  <IconMinus stroke={2} size={18} />
                  <h2 className="section-title">Consumer Journey</h2>
                  <IconInfoCircle stroke={1.25} size={18} />
                </div>
                <WavyFunnel
                  data={filterAndSort(secondFunnelData)}
                  width={520}
                  height={400}
                  waveAmplitude={15}
                  waveFrequency={8}
                  leftMargin={30}
                  segmentGap={0}
                  animated={true}
                />
              </div>
            </div>
            <div className="funnel-section">
              <div className="funnel-card-wrapper">
                <LabelYValue
                  data={thirdFunnelData}
                  setData={setThirdFunnelData}
                />
                <div className="section-header">
                  <IconMinus stroke={2} size={18} />
                  <h2 className="section-title">Full Conversion Funnel</h2>
                  <IconInfoCircle stroke={1.25} size={18} />
                </div>
                <WavyFunnel10
                  data={filterAndSort(thirdFunnelData)}
                  width={580}
                  height={550}
                  waveAmplitude={15}
                  waveFrequency={7}
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
};
