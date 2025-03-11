import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-text">
          <h1>Wildlife Research Datasheet Manager</h1>
          <p>
            A cloud-based platform designed to help researchers efficiently manage, store, and analyze field datasheets. 
            Say goodbye to manual records and embrace digital accessibility.
          </p>
          <button className="cta-button" onClick={() => navigate("/upload")}>Get Started</button>
        </div>
      </header>

      <section className="features">
        <div className="feature">
          <h2>📊 Data Analytics</h2>
          <p>Visualize trends, analyze species sightings, and generate insightful reports with our built-in analytics tools.</p>
        </div>
        <div className="feature">
          <h2>📂 Secure Cloud Storage</h2>
          <p>Store datasheets safely in AWS RDS and retrieve them effortlessly with role-based access controls.</p>
        </div>
        <div className="feature">
          <h2>🌍 Global Accessibility</h2>
          <p>Access and update your research data anytime, anywhere with our scalable cloud infrastructure.</p>
        </div>
      </section>

      <section className="about-platform">
        <h2>Why Choose Our Platform?</h2>
        <p>
          Traditional paper-based field datasheets are prone to loss, damage, and inefficiencies. Our digital solution ensures seamless data input, retrieval, 
          and secure storage, making research easier and more organized.
        </p>
      </section>
    </div>
  );
};

export default Home;
