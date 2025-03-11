import React from "react";
import "./About.css";

function About() {
    // Function to split text into words and wrap each in a span
    const renderTextWithHover = (text) => {
        return text.split(" ").map((word, index) => (
            <span key={index} className="hover-word">
                {word} 
            </span>
        ));
    };

    return (
        <div className="about-container">
            <div className="about-header">
                <h1>About the Wildlife Research Datasheet Manager</h1>
            </div>
            <div className="about-content">
                <p>
                    {renderTextWithHover(
                        "The Wildlife Research Datasheet Manager is a cloud-based tool crafted to transform how wildlife researchers handle field data. Hosted on AWS EC2, it replaces fragile paper records with a secure, scalable, and centralized digital solution for tracking species, habitats, and environmental insights."
                    )}
                </p>
                <p>
                    {renderTextWithHover(
                        "Empower your research with customizable templates for data entry, seamless uploads of CSV files or scanned sheets, and team collaboration through role-based access. Powered by AWS RDS and S3, it ensures data safety and accessibility, while analytics tools reveal trends—like species sightings—and exportable reports elevate your work."
                    )}
                </p>
                <p>
                    {renderTextWithHover(
                        "Built for fieldwork, it offers offline mobile entry with auto-sync when connected. Leveraging AWS’s cost-effective infrastructure, it delivers scalability, backups, and global reach—letting you focus on conservation and discovery, not paperwork."
                    )}
                </p>
                <p>
                    {renderTextWithHover(
                        "Leave lost notes and damaged papers behind. Embrace a sustainable, efficient future for wildlife research with us."
                    )}
                </p>
            </div>
        </div>
    );
}

export default About;