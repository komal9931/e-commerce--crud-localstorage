// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AuthPage from "./auth/Signup"; // Import your AuthPage component
// import Home from "./components/Home"; // Import your Home component
// import Header from "./common/Header";
// import "./App.css";

// const App = () => {
//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route path="/" element={<AuthPage />} />
//         <Route path="/home" element={<Home />} />
//         {/* Other routes */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import AuthPage from "./auth/Signup"; // Import your AuthPage component
// import Home from "./components/Home"; // Import your Home component
// import Header from "./common/Header";
// import "./App.css";

// const App = () => {
//   // Assuming the user is authenticated if there's a token or session
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Simulating authentication check (e.g., from localStorage or API)
//   useEffect(() => {
//     const userToken = localStorage.getItem("userToken"); // Replace with your actual check
//     if (userToken) {
//       setIsAuthenticated(true);
//     }
//   }, []);

//   return (
//     <Router>
//       <Header />
//       <Routes>
//         <Route
//           path="/"
//           element={isAuthenticated ? <Navigate to="/home" /> : <AuthPage />}
//         />
//         <Route
//           path="/home"
//           element={isAuthenticated ? <Home /> : <Navigate to="/" />}
//         />
//         {/* Other routes */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthPage from "./auth/Signup";
import Home from "./components/Home";
import Header from "./common/Header";
import "./App.css";
import AddProduct from "./Admin/AddProduct";
import Service from "./components/Service";
import Details from "./components/Details";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on page load and listen for token changes
  useEffect(() => {
    const checkAuth = () => {
      const userToken = localStorage.getItem("userToken");
      console.log(userToken);
      setIsAuthenticated(!!userToken); // Convert token existence to boolean
    };

    checkAuth(); // Initial check

    window.addEventListener("storage", checkAuth); // Sync auth status across tabs

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <Router>
      {isAuthenticated && <Header setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <AuthPage setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" replace />}
        />
        <Route path="/admin" element={<AddProduct />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/detail" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
