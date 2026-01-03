import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/api/ship/summary")
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError("Cannot connect to backend");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading Fleet Data...</h2>;
  }

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (

      /*
       =========================================================
       NAVAL FLEET DASHBOARD UI
       ---------------------------------------------------------
       This section renders:
       1. System Title & Description
       2. Fleet Statistics Summary
       3. Alert Level Visualization
       4. AI-based Command Recommendation
       5. Last Updated Timestamp
       =========================================================
      */
      <div className="container">

        {/* ===== 1️⃣ Dashboard Title ===== */}
        <h1>Naval Fleet Dashboard</h1>

        {/* ===== System Description ===== */}
        <p style={{ color: "gray", marginBottom: "20px" }}>
          Real-time Fleet Risk Monitoring System
        </p>

        {/* ===== 2️⃣ Fleet Statistics Section ===== */}
        {/* Shows total ships and risk distribution */}
        <div className="stats">
          <div className="stat-box">
            Total Ships:=
            <b>{data.totalShip}</b>
          </div>
          <br />

          <div className="stat-box">
            High Risk Ships:=
            <b>{data.highRiskShip}</b>
          </div>
          <br />

          <div className="stat-box">
            Low Risk Ships:=
            <b>{data.lowRiskShip}</b>
          </div>
          <br />
        </div>

        {/* ===== 3️⃣ Alert Level Section ===== */}
        {/* Visual alert based on overall fleet risk */}
        <div className={`alert ${data.alertLevel}`}>
          🚨 ALERT LEVEL: {data.alertLevel}
        </div>

        {/* ===== 4️⃣ AI-driven Command Recommendation ===== */}
        {/* Rule-based decision support logic */}
        <p style={{ marginTop: "15px" }}>
          <b>Command Recommendation:</b>{" "}
          {data.alertLevel === "CRITICAL"
            ? "Immediate operational review required"
            : data.alertLevel === "WARNING"
            ? "Increase monitoring and readiness"
            : "Operations normal"}
        </p>

        {/* ===== 5️⃣ System Timestamp ===== */}
        {/* Indicates latest data refresh time */}
        <p style={{ fontSize: "12px", color: "gray", marginTop: "20px" }}>
          Last Updated: {new Date().toLocaleString()}
        </p>

      </div>
  );
}

export default App;
