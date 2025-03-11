// import React, { useState } from "react";
// import { FaCloudUploadAlt } from "react-icons/fa";
// import "./Upload.css";

// const Upload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [previewUrl, setPreviewUrl] = useState("");
//   const [uploading, setUploading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//       setPreviewUrl(URL.createObjectURL(file));
//       setSuccessMessage(""); // Reset message on new file selection
//     }
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       alert("Please select a file to upload!");
//       return;
//     }

//     setUploading(true);
//     setTimeout(() => {
//       setUploading(false);
//       setSuccessMessage(`File "${selectedFile.name}" uploaded successfully!`);
//       setSelectedFile(null);
//       setPreviewUrl("");
//     }, 2000); // Simulating upload delay
//   };

//   return (
//     <div className="upload-container">
//       <div className="upload-frame">
//         <h3>📤 Upload Your Datasheet</h3>
//         <p>Upload any type of file (CSV, PDF, JPG, PNG, DOCX, etc.) for secure storage and analysis.</p>
        
//         <div className="upload-box">
//           <input type="file" id="fileInput" onChange={handleFileChange} />
//           <label htmlFor="fileInput" className="file-label">
//             <FaCloudUploadAlt className="upload-icon" /> Choose a File
//           </label>
//         </div>

//         {selectedFile && <p className="file-name">📄 {selectedFile.name}</p>}

//         <button className="upload-btn" onClick={handleUpload} disabled={!selectedFile || uploading}>
//           {uploading ? "Uploading..." : "Upload File"}
//         </button>

//         {successMessage && <p className="success-message">{successMessage}</p>}

//         <h3>📌 Preview</h3>
//         {previewUrl ? (
//           <div className="preview">
//             <img src={previewUrl} alt="Preview" className="preview-image" />
//           </div>
//         ) : (
//           <p className="no-preview">No preview available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Upload;
// frontend/src/components/Upload.js
// frontend/src/components/Upload.js
import React, { useState } from "react";
import axios from "axios";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Added for navigation
import "./Upload.css";

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // For redirecting to file list

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setSuccessMessage("");
      setErrorMessage("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("Please select a file to upload!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("You must be logged in to upload files!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      const response = await axios.post(
        "http://localhost:5000/api/protected/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccessMessage(response.data.message);
      setSelectedFile(null);
      setPreviewUrl("");
      // Redirect to file list after 2 seconds
      setTimeout(() => navigate("/files"), 2000);
    } catch (error) {
      console.error("Upload error:", error);
      const errorMsg = error.response?.data?.error || error.message;
      setErrorMessage(`Failed to upload file: ${errorMsg}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-frame">
        <h3>📤 Upload Your Datasheet</h3>
        <p>Upload any type of file (CSV, PDF, JPG, PNG, DOCX, etc.) for secure storage and analysis.</p>

        <div className="upload-box">
          <input
            type="file"
            id="fileInput"
            onChange={handleFileChange}
            accept=".csv,.pdf,.png,.jpg,.jpeg"
            disabled={uploading}
          />
          <label htmlFor="fileInput" className="file-label">
            <FaCloudUploadAlt className="upload-icon" /> Choose a File
          </label>
        </div>

        {selectedFile && <p className="file-name">📄 {selectedFile.name}</p>}

        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={!selectedFile || uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <h3>📌 Preview</h3>
        {previewUrl ? (
          <div className="preview">
            <img src={previewUrl} alt="Preview" className="preview-image" />
          </div>
        ) : (
          <p className="no-preview">No preview available.</p>
        )}
      </div>
    </div>
  );
};

export default Upload;