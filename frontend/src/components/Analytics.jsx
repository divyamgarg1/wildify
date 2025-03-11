import React from "react";
import "./Analytics.css";

function Analytics() {
  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h1>Data Analytics</h1>
      </div>
      <div className="analytics-content">
        <p className="analytics-description">
          Explore trends, track species sightings, and analyze environmental shifts with powerful insights.
        </p>
        <div className="analytics-cards">
          <div className="analytics-card">
            <h2>Species Trends</h2>
            <p>Visualize population changes over time with interactive charts.</p>
          </div>
          <div className="analytics-card">
            <h2>Habitat Insights</h2>
            <p>Monitor environmental conditions and their impact on wildlife.</p>
          </div>
          <div className="analytics-card">
            <h2>Custom Reports</h2>
            <p>Generate and export detailed reports for research or publication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;