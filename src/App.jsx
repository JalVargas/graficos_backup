import { useState, useEffect, useCallback } from 'react';
import WavyFunnel from './components/WavyFunnel';
import './App.css';

const initialData = [
  { label: 'Visitantes', value: 10000, color: '#6366f1' },
  { label: 'Leads', value: 7500, color: '#8b5cf6' },
  { label: 'Prospectos', value: 5000, color: '#a855f7' },
  { label: 'Negociaciones', value: 2500, color: '#d946ef' },
  { label: 'Ventas', value: 1000, color: '#ec4899' }
];

function App() {
  const [data, setData] = useState(initialData);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleValueChange = (index, newValue) => {
    const numValue = parseInt(newValue, 10) || 0;
    setData(prevData => {
      const newData = [...prevData];
      newData[index] = { ...newData[index], value: numValue };
      return newData;
    });
  };

  const generateRandomValues = () => {
    setData(prevData =>
      prevData.map(item => ({
        ...item,
        value: Math.floor(Math.random() * 10000) + 500
      }))
    );
  };

  const simulateRealTime = useCallback(() => {
    setIsSimulating(true);
    let iterations = 0;
    const maxIterations = 7;

    const interval = setInterval(() => {
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setIsSimulating(false);
        return;
      }

      setData(prevData =>
        prevData.map(item => ({
          ...item,
          value: Math.max(100, item.value + Math.floor(Math.random() * 2000 - 1000))
        }))
      );
      iterations++;
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      setIsSimulating(false);
    };
  }, []);

  const codeExample = `// Uso programático del componente
import WavyFunnel from './components/WavyFunnel';

const myData = [
  { label: 'Paso 1', value: 1000, color: '#6366f1' },
  { label: 'Paso 2', value: 750, color: '#8b5cf6' },
  { label: 'Paso 3', value: 500, color: '#a855f7' }
];

<WavyFunnel
  data={myData}
  width={400}
  height={500}
  waveAmplitude={15}
  waveFrequency={3}
  animated={true}
/>`;

  return (
    <div className="app">
      <header className="app-header">
        <h1>🌊 Wavy Funnel Chart</h1>
        <p>Gráfico de embudo con lado derecho ondulado</p>
      </header>

      <main className="app-main">
        <div className="funnel-section">
          <WavyFunnel
            data={data}
            width={400}
            height={500}
            waveAmplitude={15}
            waveFrequency={3}
            leftMargin={50}
            segmentGap={4}
            animated={true}
          />
        </div>

        <div className="controls-section">
          <div className="card">
            <h2>📊 Controles de Datos</h2>
            <div className="inputs-grid">
              {data.map((item, index) => (
                <div key={index} className="input-group">
                  <label>
                    <span 
                      className="color-dot" 
                      style={{ backgroundColor: item.color }}
                    />
                    {item.label}
                  </label>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    min="0"
                  />
                </div>
              ))}
            </div>

            <div className="buttons-row">
              <button 
                className="btn btn-secondary"
                onClick={generateRandomValues}
              >
                🎲 Valores Aleatorios
              </button>
              <button 
                className="btn btn-primary"
                onClick={simulateRealTime}
                disabled={isSimulating}
              >
                {isSimulating ? '⏳ Simulando...' : '🔄 Simular Tiempo Real'}
              </button>
            </div>
          </div>

          <div className="card">
            <h2>💻 Ejemplo de Código</h2>
            <pre className="code-block">
              <code>{codeExample}</code>
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
