// frontend/src/components/FileList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FileList.css";

const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editFileId, setEditFileId] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [emailFilter, setEmailFilter] = useState("");
  const userRole = localStorage.getItem("role");

  const fetchFiles = async (email = "") => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view files.");
      return;
    }

    setLoading(true);
    try {
      const url = userRole === "admin" && email
        ? `http://localhost:5000/api/protected/files?email=${email}`
        : "http://localhost:5000/api/protected/files";
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles(response.data.files);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch files.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleEdit = (fileId) => {
    setEditFileId(fileId);
  };

  const handleFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const handleUpdate = async (fileId) => {
    if (!newFile) {
      setError("Please select a new file to upload.");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", newFile);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/protected/files/${fileId}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFiles(files.map(f => f.id === fileId ? response.data.file : f));
      setEditFileId(null);
      setNewFile(null);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update file.");
    }
  };

  const handleDelete = async (fileId) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      console.log("Deleting file with ID:", fileId); // Debug log
      const response = await axios.delete(`http://localhost:5000/api/protected/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Delete response:", response.data);
      setFiles(files.filter(f => f.id !== fileId));
      setError(null);
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Failed to delete file.");
    }
  };

  const handleFilter = () => {
    fetchFiles(emailFilter);
  };

  return (
    <div className="file-list-container">
      <h2>Your Uploaded Files</h2>

      {userRole === "admin" && (
        <div className="filter-container">
          <input
            type="email"
            placeholder="Filter by researcher email (e.g., divyamgar12@gmail.com)"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
          />
          <button onClick={handleFilter} className="filter-btn">Filter</button>
        </div>
      )}

      {loading && <p>Loading files...</p>}
      {error && <p className="error-message">{error}</p>}
      {files.length === 0 && !loading && !error ? (
        <p>No files uploaded yet.</p>
      ) : (
        <ul className="file-list">
          {files.map((file) => (
            <li key={file.id} className="file-item">
              {editFileId === file.id ? (
                <>
                  <input type="file" onChange={handleFileChange} />
                  <button onClick={() => handleUpdate(file.id)}>Save</button>
                  <button onClick={() => setEditFileId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <a
                    href={`http://localhost:5000${file.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.filename}
                  </a>
                  <span> (Uploaded: {new Date(file.createdAt).toLocaleString()})</span>
                  {userRole === "researcher" && (
                    <div>
                      <button onClick={() => handleEdit(file.id)}>Edit</button>
                      <button onClick={() => handleDelete(file.id)}>Delete</button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => fetchFiles()} className="refresh-btn">Refresh List</button>
    </div>
  );
};

export default FileList;