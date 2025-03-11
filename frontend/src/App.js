// // 

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Upload from "./components/Upload";
// import Auth from "./components/Auth";
// import AdminAuth from "./components/AdminAuth";
// import About from "./components/About";
// import Analytics from "./components/Analytics";
// import Team from "./components/Team";
// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Auth />} />
//         <Route path="/signup" element={<Auth />} />
//         <Route path="/admin-login" element={<AdminAuth />} />
        
//         <Route path="/about" element={<ProtectedRoute allowedRoles={["Admin", "Researcher", "Viewer"]}><About /></ProtectedRoute>} />
//         <Route path="/team" element={<ProtectedRoute allowedRoles={["Admin", "Researcher", "Viewer"]}><Team /></ProtectedRoute>} />
        
//         <Route path="/upload" element={<ProtectedRoute allowedRoles={["Admin", "Researcher"]}><Upload /></ProtectedRoute>} />
//         <Route path="/analytics" element={<ProtectedRoute allowedRoles={["Admin", "Researcher", "Viewer"]}><Analytics /></ProtectedRoute>} />

//         <Route path="/admin" element={<ProtectedRoute allowedRoles={["Admin"]}><h2>Admin Dashboard</h2></ProtectedRoute>} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;





// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Upload from "./components/Upload";
// import Auth from "./components/Auth";
// import AdminAuth from "./components/AdminAuth";
// import About from "./components/About";
// import Analytics from "./components/Analytics";
// import Team from "./components/Team";
// import Footer from "./components/Footer"; // Add Footer import
// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Auth />} />
//         <Route path="/signup" element={<Auth />} />
//         <Route path="/admin-login" element={<AdminAuth />} />
        
//         <Route path="/about" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><About /></ProtectedRoute>} />
//         <Route path="/team" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><Team /></ProtectedRoute>} />
        
//         <Route path="/upload" element={<ProtectedRoute allowedRoles={["admin", "researcher"]}><Upload /></ProtectedRoute>} />
//         <Route path="/analytics" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><Analytics /></ProtectedRoute>} />

//         <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><h2>Admin Dashboard</h2></ProtectedRoute>} />
//       </Routes>
//       <Footer /> {/* Add Footer here */}
//     </Router>
//   );
// };

// export default App;




// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Upload from "./components/Upload";
// import Auth from "./components/Auth";
// import AdminAuth from "./components/AdminAuth";
// import About from "./components/About";
// import Analytics from "./components/Analytics";
// import Team from "./components/Team";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);

//   // Update userRole when localStorage changes (e.g., on login/logout)
//   useEffect(() => {
//     const handleStorageChange = () => {
//       setUserRole(localStorage.getItem("role") || null);
//     };

//     // Listen for storage changes (e.g., from other tabs, though not needed here)
//     window.addEventListener("storage", handleStorageChange);

//     // Initial check and manual trigger for this tab
//     handleStorageChange();

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <Router>
//       <Navbar userRole={userRole} setUserRole={setUserRole} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Auth setUserRole={setUserRole} />} />
//         <Route path="/signup" element={<Auth setUserRole={setUserRole} />} />
//         <Route path="/admin-login" element={<AdminAuth />} />
        
//         <Route path="/about" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><About /></ProtectedRoute>} />
//         <Route path="/team" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><Team /></ProtectedRoute>} />
        
//         <Route path="/upload" element={<ProtectedRoute allowedRoles={["admin", "researcher"]}><Upload /></ProtectedRoute>} />
//         <Route path="/analytics" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><Analytics /></ProtectedRoute>} />

//         <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><h2>Admin Dashboard</h2></ProtectedRoute>} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;




// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./components/Home";
// import Upload from "./components/Upload";
// import Auth from "./components/Auth";
// import AdminAuth from "./components/AdminAuth";
// import About from "./components/About";
// import Analytics from "./components/Analytics";
// import Team from "./components/Team";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// const App = () => {
//   const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       setUserRole(localStorage.getItem("role") || null);
//     };

//     window.addEventListener("storage", handleStorageChange);
//     handleStorageChange();

//     return () => {
//       window.removeEventListener("storage", handleStorageChange);
//     };
//   }, []);

//   return (
//     <Router>
//       <Navbar userRole={userRole} setUserRole={setUserRole} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Auth setUserRole={setUserRole} />} />
//         <Route path="/signup" element={<Auth setUserRole={setUserRole} />} />
//         <Route path="/admin-login" element={<AdminAuth setUserRole={setUserRole} />} />
        
//         <Route path="/about" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><About /></ProtectedRoute>} />
//         <Route path="/team" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><Team /></ProtectedRoute>} />
        
//         <Route path="/upload" element={<ProtectedRoute allowedRoles={["admin", "researcher"]}><Upload /></ProtectedRoute>} />
//         <Route path="/analytics" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><Analytics /></ProtectedRoute>} />

//         <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><h2>Admin Dashboard</h2></ProtectedRoute>} />
//       </Routes>
//       <Footer />
//     </Router>
//   );
// };

// export default App;



// frontend/src/App.js
// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Upload from "./components/Upload";
import FileList from "./components/FileList"; // Added
import Auth from "./components/Auth";
import AdminAuth from "./components/AdminAuth";
import About from "./components/About";
import Analytics from "./components/Analytics";
import Team from "./components/Team";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserRole(localStorage.getItem("role") || null);
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Navbar userRole={userRole} setUserRole={setUserRole} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth setUserRole={setUserRole} />} />
        <Route path="/signup" element={<Auth setUserRole={setUserRole} />} />
        <Route path="/admin-login" element={<AdminAuth setUserRole={setUserRole} />} />
        
        <Route path="/about" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><About /></ProtectedRoute>} />
        <Route path="/team" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><Team /></ProtectedRoute>} />
        <Route path="/upload" element={<ProtectedRoute allowedRoles={["admin", "researcher"]}><Upload /></ProtectedRoute>} />
        <Route path="/files" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><FileList /></ProtectedRoute>} /> {/* Added */}
        <Route path="/analytics" element={<ProtectedRoute allowedRoles={["admin", "researcher", "viewer"]}><Analytics /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><h2>Admin Dashboard</h2></ProtectedRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;