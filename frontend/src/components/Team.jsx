import React from "react";
import "./Team.css";

function Team() {
  return (
    <div className="team-container">
      <div className="team-header">
        <h1>Our Research Team</h1>
      </div>
      <div className="team-content">
        <p>Meet the dedicated researchers collaborating to advance wildlife conservation through secure and efficient data management.</p>
        <div className="team-members">
          <div className="team-card">
            <img src="https://via.placeholder.com/100" alt="Researcher 1" />
            <h2>Divyam Garg</h2>
            <p>Lead Ecologist</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/100" alt="Researcher 2" />
            <h2>Kunal Malik</h2>
            <p>Data Analyst</p>
          </div>
          <div className="team-card">
            <img src="https://via.placeholder.com/100" alt="Researcher 3" />
            <h2>Dr.Sourabh Shanu </h2>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;