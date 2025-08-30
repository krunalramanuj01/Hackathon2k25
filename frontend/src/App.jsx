import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Import your custom CSS file
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/data");
        setData((prev) => [...prev, res.data.data]);
        setAlerts(res.data.anomalies);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
     <div className="dashboard-container">
        {/* Header Section */}
        <header className="header-section">
          <h1 className="header-title">
            <span style={{ fontSize: '1.5em', verticalAlign: 'middle', marginRight: '0.5rem' }}>
              🌊
            </span>
            Coastal Sentinel Dashboard
          </h1>
          <p className="header-subtitle">Real-time environmental data monitoring</p>
        </header>

        {/* Main Content Grid */}
        <main className="main-content">
          {/* Chart Card */}
          <div className="card chart-card">
            <h2 className="card-title">Live Sensor Readings</h2>
            <div style={{ height: 400, width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <XAxis dataKey="timestamp" stroke={getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary')} />
                  <YAxis stroke={getComputedStyle(document.documentElement).getPropertyValue('--color-text-secondary')} />
                  <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card-bg)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
                    }}
                    labelStyle={{ color: "var(--color-text-primary)" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="sea_level"
                    stroke="var(--color-accent-blue)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="var(--color-accent-red)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="wave_height"
                    stroke="var(--color-accent-green)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Alerts Card */}
          <div className="card alerts-card">
            <h2 className="card-title">
              ⚠️ Alerts & Anomalies
            </h2>
            <div className="alerts-list-wrapper">
              <ul className="alerts-list">
                {alerts?.length > 0 ? (
                  alerts.map((a, i) => (
                    <li key={i}>
                      {a}
                    </li>
                  ))
                ) : (
                  <li className="no-alerts">No active alerts.</li>
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>
  );
}

export default App;
