// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="logo">Wildlife Research Datasheets</div>
//       <ul className="nav-links">
//         <li><Link to="/" className="nav-link">Home</Link></li>
//         <li><Link to="/upload" className="nav-link">Upload</Link></li>
//         <li><Link to="/analytics" className="nav-link">Analytics</Link></li>
//         <li><Link to="/about" className="nav-link">About</Link></li>
//         <li><Link to="/team" className="nav-link">Team</Link></li>
//       </ul>
//       <div className="auth-links">
//         <Link to="/login" className="login-btn">Login/Signup</Link>
//         {/* <Link to="/signup" className="signup-btn">Sign Up</Link> */}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <nav className="navbar">
//       {user ? (
//         <>
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/team">Team</Link>
          
//           {["Admin", "Researcher"].includes(user.role) && <Link to="/upload">Upload</Link>}
//           {["Admin", "Researcher", "Viewer"].includes(user.role) && <Link to="/analytics">Analytics</Link>}
//           {user.role === "Admin" && <Link to="/admin">Admin Panel</Link>}

//           <button onClick={() => { localStorage.removeItem("user"); window.location.reload(); }}>Logout</button>
//         </>
//       ) : (
//         <>
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/admin-login">Admin</Link>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const userRole = localStorage.getItem("role"); // Directly fetch role from localStorage

//   return (
//     <nav className="navbar">
//       {userRole ? (
//         <>
//           {/* Links available to all logged-in users */}
//           <Link to="/">Home</Link>
//           <Link to="/about">About</Link>
//           <Link to="/team">Team</Link>

//           {/* Links for researcher and admin only */}
//           {["admin", "researcher"].includes(userRole) && (
//             <>
//               <Link to="/upload">Upload</Link>
//               <Link to="/analytics">Analytics</Link>
//             </>
//           )}

//           {/* Admin-specific link */}
//           {userRole === "admin" && <Link to="/admin">Admin Panel</Link>}

//           <button
//             onClick={() => {
//               localStorage.removeItem("token");
//               localStorage.removeItem("role");
//               window.location.reload();
//             }}
//           >
//             Logout
//           </button>
//         </>
//       ) : (
//         <>
//           <Link to="/login">Login</Link>
//           <Link to="/signup">Sign Up</Link>
//           <Link to="/admin-login">Admin</Link>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


// import React from "react";
// import { Link } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = ({ userRole, setUserRole }) => {
//   return (
//     <nav className="navbar">
//       <div className="logo">Wildlife Research Datasheets</div>
//       {userRole ? (
//         <ul className="nav-links">
//           <li>
//             <Link to="/" className="nav-link">Home</Link>
//           </li>
//           <li>
//             <Link to="/about" className="nav-link">About</Link>
//           </li>
//           <li>
//             <Link to="/team" className="nav-link">Team</Link>
//           </li>
          
//           {["admin", "researcher"].includes(userRole) && (
//             <>
//               <li>
//                 <Link to="/upload" className="nav-link">Upload</Link>
//               </li>
//               <li>
//                 <Link to="/analytics" className="nav-link">Analytics</Link>
//               </li>
//             </>
//           )}
          
//           {userRole === "admin" && (
//             <li>
//               <Link to="/admin" className="nav-link">Admin Panel</Link>
//             </li>
//           )}
          
//           <li>
//             <button
//               className="login-btn" // Reuse login-btn class for styling
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 localStorage.removeItem("role");
//                 setUserRole(null);
//                 window.location.reload();
//               }}
//             >
//               Logout
//             </button>
//           </li>
//         </ul>
//       ) : (
//         <div className="auth-links">
//           <Link to="/login" className="login-btn">Login/Sign Up</Link>
//           {/* <Link to="/signup" className="login-btn">Sign Up</Link> */}
//           <Link to="/admin-login" className="login-btn">Admin</Link>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



// frontend/src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ userRole, setUserRole }) => {
  return (
    <nav className="navbar">
      <div className="logo">Wildlife Research Datasheets</div>
      {userRole ? (
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/about" className="nav-link">About</Link></li>
          <li><Link to="/team" className="nav-link">Team</Link></li>
          
          {["admin", "researcher"].includes(userRole) && (
            <>
              <li><Link to="/upload" className="nav-link">Upload</Link></li>
              <li><Link to="/analytics" className="nav-link">Analytics</Link></li>
            </>
          )}
          
          <li><Link to="/files" className="nav-link">Files</Link></li> {/* Added for all roles */}
          
          {userRole === "admin" && (
            <li><Link to="/admin" className="nav-link">Admin Panel</Link></li>
          )}
          
          <li>
            <button
              className="login-btn"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("role");
                setUserRole(null);
                window.location.reload();
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      ) : (
        <div className="auth-links">
          <Link to="/login" className="login-btn">Login/Sign Up</Link>
          <Link to="/admin-login" className="login-btn">Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;