// // // // import React, { useState } from "react";
// // // // import "./Auth.css";

// // // // const Auth = () => {
// // // //   const [isLogin, setIsLogin] = useState(true);

// // // //   const toggleForm = () => {
// // // //     setIsLogin(!isLogin);
// // // //   };

// // // //   return (
// // // //     <div className="auth-container">
// // // //       <div className="auth-box">
// // // //         <h2>{isLogin ? "Login" : "Sign Up"}</h2>
// // // //         <form>
// // // //           {!isLogin && (
// // // //             <input type="text" placeholder="Full Name" required />
// // // //           )}
// // // //           <input type="email" placeholder="Email" required />
// // // //           <input type="password" placeholder="Password" required />
// // // //           <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
// // // //         </form>
// // // //         <p onClick={toggleForm} className="toggle-text">
// // // //           {isLogin
// // // //             ? "Don't have an account? Sign Up"
// // // //             : "Already have an account? Login"}
// // // //         </p>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Auth;

// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";

// // // const Auth = ({ isAdmin }) => {
// // //   const [isSignup, setIsSignup] = useState(false);
// // //   const [email, setEmail] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [role, setRole] = useState("Viewer"); // Default role for normal users
// // //   const navigate = useNavigate();

// // //   const handleSubmit = (e) => {
// // //     e.preventDefault();
    
// // //     const user = { email, password, role };
// // //     localStorage.setItem("user", JSON.stringify(user)); // Store user data
// // //     navigate("/");
// // //   };

// // //   return (
// // //     <div className="auth-container">
// // //       <h2>{isSignup ? "Sign Up" : "Log In"} {isAdmin && "(Admin)"}</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
// // //         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

// // //         {/* Show role selection only for normal users and researchers */}
// // //         {!isAdmin && isSignup && (
// // //           <select value={role} onChange={(e) => setRole(e.target.value)}>
// // //             <option value="Viewer">Sign up as Viewer</option>
// // //             <option value="Researcher">Sign up as Researcher</option>
// // //           </select>
// // //         )}

// // //         <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
// // //       </form>

// // //       <button onClick={() => setIsSignup(!isSignup)}>
// // //         {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
// // //       </button>
// // //     </div>
// // //   );
// // // };

// // // export default Auth;

// // const express = require("express");
// // const bcrypt = require("bcryptjs"); // For password hashing
// // const jwt = require("jsonwebtoken");
// // const User = require("../models/User");
// // const router = express.Router();

// // // Signup
// // router.post("/signup", async (req, res) => {
// //   const { email, password, role } = req.body;
// //   try {
// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const user = await User.create({
// //       email,
// //       password: hashedPassword,
// //       role: role || "Viewer", // Default to Viewer if not provided
// //     });
// //     res.status(201).json({ message: "User created", userId: user.id });
// //   } catch (error) {
// //     res.status(500).json({ error: "Signup failed", details: error.message });
// //   }
// // });

// // // Login
// // router.post("/login", async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     const user = await User.findOne({ where: { email } });
// //     if (!user) return res.status(404).json({ error: "User not found" });

// //     const isMatch = await bcrypt.compare(password, user.password);
// //     if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

// //     const token = jwt.sign(
// //       { id: user.id, email: user.email, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "1h" }
// //     );
// //     res.json({ token, role: user.role });
// //   } catch (error) {
// //     res.status(500).json({ error: "Login failed", details: error.message });
// //   }
// // });

// // module.exports = router;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Auth.css";

// const Auth = ({ isAdmin }) => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [name, setName] = useState(""); // Added for new name field
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("viewer"); // Updated default to match enum
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = isSignup
//       ? "http://<your-server>:5000/api/auth/signup"
//       : "http://<your-server>:5000/api/auth/login";
    
//     const body = isSignup ? { name, email, password, role } : { email, password };

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Something went wrong");
//       }

//       if (isSignup) {
//         alert("Signup successful! Please log in.");
//         setIsSignup(false);
//       } else {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.role);

//         if (isAdmin && data.role !== "admin") {
//           alert("Admins only!");
//           return;
//         }
//         navigate("/");
//       }
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isSignup ? "Sign Up" : "Log In"} {isAdmin && "(Admin)"}</h2>
//       <form onSubmit={handleSubmit}>
//         {isSignup && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         )}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {!isAdmin && isSignup && (
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="viewer">Sign up as Viewer</option>
//             <option value="researcher">Sign up as Researcher</option>
//           </select>
//         )}

//         <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
//       </form>

//       <button onClick={() => setIsSignup(!isSignup)}>
//         {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
//       </button>
//     </div>
//   );
// };

// export default Auth;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Auth.css";

// const Auth = ({ isAdmin }) => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("viewer");
//   const navigate = useNavigate();

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const url = isSignup
//   //     ? "http://localhost:5000/api/auth/register" // Updated to match new prefix
//   //     : "http://localhost:5000/api/auth/login";   // Updated to match new prefix
    
//   //   const body = isSignup ? { name, email, password, role } : { email, password };

//   //   try {
//   //     const response = await fetch(url, {
//   //       method: "POST",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify(body),
//   //     });

//   //     const data = await response.json();

//   //     if (!response.ok) {
//   //       throw new Error(data.error || "Something went wrong");
//   //     }

//   //     if (isSignup) {
//   //       alert("Signup successful! Please log in.");
//   //       setIsSignup(false);
//   //     } else {
//   //       localStorage.setItem("token", data.token);
//   //       localStorage.setItem("role", data.role);

//   //       if (isAdmin && data.role !== "admin") {
//   //         alert("Admins only!");
//   //         return;
//   //       }
//   //       navigate("/");
//   //     }
//   //   } catch (error) {
//   //     alert(error.message);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const url = isSignup
//       ? "http://localhost:5000/api/auth/register"
//       : "http://localhost:5000/api/auth/login";
    
//     const body = isSignup ? { name, email, password, role } : { email, password };
//     console.log("Sending request to:", url);
//     console.log("Request body:", body);
  
//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });
  
//       const data = await response.json();
//       console.log("Response:", data);
  
//       if (!response.ok) {
//         throw new Error(data.error || `HTTP error! Status: ${response.status}`);
//       }
  
//       if (isSignup) {
//         alert("Signup successful! Please log in.");
//         setIsSignup(false);
//       } else {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.role);
  
//         if (isAdmin && data.role !== "admin") {
//           alert("Admins only!");
//           return;
//         }
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert(`Failed to ${isSignup ? "sign up" : "log in"}: ${error.message}`);
//     }
//   };
  
//   return (
//     <div className="auth-container">
//       <h2>{isSignup ? "Sign Up" : "Log In"} {isAdmin && "(Admin)"}</h2>
//       <form onSubmit={handleSubmit}>
//         {isSignup && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         )}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {!isAdmin && isSignup && (
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="viewer">Sign up as Viewer</option>
//             <option value="researcher">Sign up as Researcher</option>
//           </select>
//         )}

//         <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
//       </form>

//       <button onClick={() => setIsSignup(!isSignup)}>
//         {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
//       </button>
//     </div>
//   );
// };

// export default Auth;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Auth.css";

// const Auth = ({ isAdmin, setUserRole }) => {
//   const [isSignup, setIsSignup] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("viewer");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const url = isSignup
//       ? "http://localhost:5000/api/auth/register"
//       : "http://localhost:5000/api/auth/login";
    
//     const body = isSignup ? { name, email, password, role } : { email, password };
//     console.log("Sending request to:", url);
//     console.log("Request body:", body);

//     try {
//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await response.json();
//       console.log("Response:", data);

//       if (!response.ok) {
//         throw new Error(data.error || `HTTP error! Status: ${response.status}`);
//       }

//       if (isSignup) {
//         alert("Signup successful! Please log in.");
//         setIsSignup(false);
//       } else {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("role", data.role);
//         setUserRole(data.role); // Update App.js state
//         if (isAdmin && data.role !== "admin") {
//           alert("Admins only!");
//           return;
//         }
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Fetch error:", error);
//       alert(`Failed to ${isSignup ? "sign up" : "log in"}: ${error.message}`);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>{isSignup ? "Sign Up" : "Log In"} {isAdmin && "(Admin)"}</h2>
//       <form onSubmit={handleSubmit}>
//         {isSignup && (
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         )}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         {!isAdmin && isSignup && (
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="viewer">Sign up as Viewer</option>
//             <option value="researcher">Sign up as Researcher</option>
//           </select>
//         )}

//         <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
//       </form>

//       <button onClick={() => setIsSignup(!isSignup)}>
//         {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
//       </button>
//     </div>
//   );
// };

// export default Auth;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = ({ isAdmin, setUserRole }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("viewer");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";
    
    const body = isSignup ? { name, email, password, role } : { email, password };
    console.log("Sending request to:", url);
    console.log("Request body:", body);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Response:", data);

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! Status: ${response.status}`);
      }

      if (isSignup) {
        alert("Signup successful! Please log in.");
        setIsSignup(false);
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        setUserRole(data.role);
        if (isAdmin && data.role !== "admin") {
          alert("Admins only!");
          return;
        }
        navigate("/");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert(`Failed to ${isSignup ? "sign up" : "log in"}: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box"> {/* Added auth-box class */}
        <h2>{isSignup ? "Sign Up" : "Log In"} {isAdmin && "(Admin)"}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          {!isAdmin && isSignup && (
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="viewer">Sign up as Viewer</option>
              <option value="researcher">Sign up as Researcher</option>
            </select>
          )}

          <button type="submit">{isSignup ? "Sign Up" : "Log In"}</button>
        </form>

        <button className="toggle-text" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Auth;