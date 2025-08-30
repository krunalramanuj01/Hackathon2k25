import { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:8000/data");
      setData((prev) => [...prev, res.data.data]);
      setAlerts(res.data.anomalies);
    };
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">🌊 Coastal Sentinel Dashboard</h1>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="timestamp" />
        <YAxis />
        <CartesianGrid stroke="#ccc" />
        <Tooltip />
        <Line type="monotone" dataKey="sea_level" stroke="blue" />
        <Line type="monotone" dataKey="temperature" stroke="red" />
        <Line type="monotone" dataKey="wave_height" stroke="green" />
      </LineChart>
      <div className="mt-4">
        <h2 className="font-bold">⚠️ Alerts</h2>
        <ul>
          {alerts?.map((a, i) => (
            <li key={i} className="text-red-500">{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
