// import React, { useState } from "react";

// const AuthPage = () => {
//   const [isSignup, setIsSignup] = useState(true);
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     dob: "",
//     photo: null,
//     age: "",
//     gender: "",
//     about: "",
//   });
//   const [loginError, setLoginError] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "file" ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isSignup) {
//       // Fetch the existing users from localStorage
//       const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

//       // Check if the email already exists
//       const emailExists = existingUsers.some(
//         (user) => user.email === formData.email
//       );

//       if (emailExists) {
//         setLoginError("Email already exists. Please login.");
//         return;
//       }

//       // Save the new user to the users array in localStorage
//       existingUsers.push(formData);
//       localStorage.setItem("users", JSON.stringify(existingUsers));

//       console.log("Signup Form Data Saved to Local Storage:", formData);
//       setLoginError(""); // Reset error after successful signup
//     } else {
//       // Login Process
//       const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//       const user = existingUsers.find(
//         (user) =>
//           user.email === formData.email && user.password === formData.password
//       );

//       if (user) {
//         console.log("Login Successful");
//         setLoginError(""); // Reset error after successful login
//       } else {
//         setLoginError("Invalid email or password.");
//       }
//     }
//   };

//   const switchToSignup = () => {
//     setIsSignup(true);
//     setFormData({
//       firstname: "",
//       lastname: "",
//       email: "",
//       password: "",
//       dob: "",
//       photo: null,
//       age: "",
//       gender: "",
//       about: "",
//     });
//     setLoginError(""); // Reset error on switching to signup
//   };

//   const switchToLogin = () => {
//     setIsSignup(false);
//     setFormData({
//       email: "",
//       password: "",
//     });
//     setLoginError(""); // Reset error on switching to login
//   };

//   return (
//     <div>
//       <h2>{isSignup ? "Signup" : "Login"}</h2>
//       <form onSubmit={handleSubmit}>
//         {isSignup && (
//           <>
//             <input
//               type="text"
//               name="firstname"
//               placeholder="First Name"
//               onChange={handleChange}
//               required
//             />
//             <br />
//             <input
//               type="text"
//               name="lastname"
//               placeholder="Last Name"
//               onChange={handleChange}
//               required
//             />
//             <br />
//           </>
//         )}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />
//         <br />
//         {isSignup && (
//           <>
//             <input type="date" name="dob" onChange={handleChange} required />
//             <br />
//             <input
//               type="file"
//               name="photo"
//               accept="image/*"
//               onChange={handleChange}
//             />
//             <br />
//             <input
//               type="number"
//               name="age"
//               placeholder="Age"
//               onChange={handleChange}
//               required
//             />
//             <br />
//             <select name="gender" onChange={handleChange} required>
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <br />
//             <textarea
//               name="about"
//               placeholder="About"
//               onChange={handleChange}
//               required
//             ></textarea>
//             <br />
//           </>
//         )}
//         <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
//       </form>

//       {loginError && <p style={{ color: "red" }}>{loginError}</p>}

//       <br />
//       <p>
//         {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
//         <button onClick={isSignup ? switchToLogin : switchToSignup}>
//           {isSignup ? "Login" : "Signup"}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default AuthPage;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthPage = ({ setIsAuthenticated }) => {
//   const [isSignup, setIsSignup] = useState(true);
//   const [formData, setFormData] = useState({
//     firstname: "",
//     lastname: "",
//     email: "",
//     password: "",
//     dob: "",
//     photo: null,
//     age: "",
//     gender: "",
//     about: "",
//   });
//   const [loginError, setLoginError] = useState("");
//   const navigate = useNavigate(); // Hook to navigate

//   const handleChange = (e) => {
//     const { name, value, type, files } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: type === "file" ? files[0] : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (isSignup) {
//       // Signup Process
//       const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//       const emailExists = existingUsers.some(
//         (user) => user.email === formData.email
//       );

//       if (emailExists) {
//         setLoginError("Email already exists. Please login.");
//         return;
//       }

//       const userToken = `token_${Math.random().toString(36).substr(2, 16)}`; // Generate token

//       const newUser = { ...formData, userToken };
//       existingUsers.push(newUser);
//       localStorage.setItem("users", JSON.stringify(existingUsers));
//       localStorage.setItem("userToken", userToken); // Store token in localStorage

//       console.log("Signup successful, token saved:", userToken);
//       setLoginError("");
//       // navigate("/home"); // Navigate to Home page
//     } else {
//       // Login Process
//       const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//       const user = existingUsers.find(
//         (user) =>
//           user.email === formData.email && user.password === formData.password
//       );

//       if (user) {
//         console.log("Login Successful");
//         localStorage.setItem("userToken", user.userToken); // Store user's token
//         setLoginError("");
//         navigate("/home");
//       } else {
//         setLoginError("Invalid email or password.");
//       }
//     }
//   };

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   if (isSignup) {
//   //     // Signup Process
//   //     const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//   //     const emailExists = existingUsers.some(
//   //       (user) => user.email === formData.email
//   //     );

//   //     if (emailExists) {
//   //       setLoginError("Email already exists. Please login.");
//   //       return;
//   //     }

//   //     existingUsers.push(formData);
//   //     localStorage.setItem("users", JSON.stringify(existingUsers));
//   //     console.log("Signup Form Data Saved to Local Storage:", formData);
//   //     setLoginError(""); // Reset error after successful signup
//   //   } else {
//   //     // Login Process
//   //     const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
//   //     const user = existingUsers.find(
//   //       (user) =>
//   //         user.email === formData.email && user.password === formData.password
//   //     );

//   //     if (user) {
//   //       console.log("Login Successful");
//   //       setLoginError(""); // Reset error after successful login
//   //       navigate("/home"); // Navigate to Home component after login
//   //     } else {
//   //       setLoginError("Invalid email or password.");
//   //     }
//   //   }
//   // };

//   const switchToSignup = () => {
//     setIsSignup(true);
//     setFormData({
//       firstname: "",
//       lastname: "",
//       email: "",
//       password: "",
//       dob: "",
//       photo: null,
//       age: "",
//       gender: "",
//       about: "",
//     });
//     setLoginError(""); // Reset error on switching to signup
//   };

//   const switchToLogin = () => {
//     setIsSignup(false);
//     setFormData({
//       email: "",
//       password: "",
//     });
//     setLoginError(""); // Reset error on switching to login
//   };

//   return (
//     <div className="container demo mt-3">
//       <h2>{isSignup ? "Signup" : "Login"}</h2>
//       <form onSubmit={handleSubmit} className="he">
//         {isSignup && (
//           <>
//             <input
//               type="text"
//               name="firstname"
//               placeholder="First Name"
//               onChange={handleChange}
//               required
//             />
//             <br />
//             <input
//               type="text"
//               name="lastname"
//               placeholder="Last Name"
//               onChange={handleChange}
//               required
//             />
//             <br />
//           </>
//         )}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//           required
//         />
//         <br />
//         {isSignup && (
//           <>
//             <input type="date" name="dob" onChange={handleChange} required />
//             <br />
//             <input
//               type="file"
//               name="photo"
//               accept="image/*"
//               onChange={handleChange}
//             />
//             <br />
//             <input
//               type="number"
//               name="age"
//               placeholder="Age"
//               onChange={handleChange}
//               required
//             />
//             <br />
//             <select name="gender" onChange={handleChange} required>
//               <option value="">Select Gender</option>
//               <option value="Male">Male</option>
//               <option value="Female">Female</option>
//               <option value="Other">Other</option>
//             </select>
//             <br />
//             <textarea
//               name="about"
//               placeholder="About"
//               onChange={handleChange}
//               required
//             ></textarea>
//             <br />
//           </>
//         )}
//         <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
//       </form>

//       {loginError && <p style={{ color: "red" }}>{loginError}</p>}

//       <br />
//       <p>
//         {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
//         <button onClick={isSignup ? switchToLogin : switchToSignup}>
//           {isSignup ? "Login" : "Signup"}
//         </button>
//       </p>
//     </div>
//   );
// };

// export default AuthPage;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthPage = ({ setIsAuthenticated }) => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    dob: "",
    photo: null,
    age: "",
    gender: "",
    about: "",
  });
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate(); // Hook to navigate

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      // Signup Process
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const emailExists = existingUsers.some(
        (user) => user.email === formData.email
      );

      if (emailExists) {
        setLoginError("Email already exists. Please login.");
        return;
      }

      const userToken = `token_${Math.random().toString(36).substr(2, 16)}`; // Generate token

      const newUser = { ...formData, userToken };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      localStorage.setItem("userToken", userToken); // Store token in localStorage

      console.log("Signup successful, token saved:", userToken);
      setIsAuthenticated(true); // Update authentication state
      setLoginError("");
      // navigate("/home"); // Navigate to Home page
    } else {
      // Login Process
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const user = existingUsers.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      if (user) {
        console.log("Login Successful");
        localStorage.setItem("userToken", user.userToken); // Store user's token
        setIsAuthenticated(true); // Update authentication state
        setLoginError("");
        navigate("/home");
      } else {
        setLoginError("Invalid email or password.");
      }
    }
  };

  const switchToSignup = () => {
    setIsSignup(true);
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      dob: "",
      photo: null,
      age: "",
      gender: "",
      about: "",
    });
    setLoginError("");
  };

  const switchToLogin = () => {
    setIsSignup(false);
    setFormData({
      email: "",
      password: "",
    });
    setLoginError("");
  };

  return (
    <div className="container demo mt-3">
      <h2>{isSignup ? "Signup" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="he">
        {isSignup && (
          <>
            <input
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
            <br />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <br />
        {isSignup && (
          <>
            <input type="date" name="dob" onChange={handleChange} required />
            <br />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
            />
            <br />
            <input
              type="number"
              name="age"
              placeholder="Age"
              onChange={handleChange}
              required
            />
            <br />
            <select name="gender" onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <br />
            <textarea
              name="about"
              placeholder="About"
              onChange={handleChange}
              required
            ></textarea>
            <br />
          </>
        )}
        <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
      </form>

      {loginError && <p style={{ color: "red" }}>{loginError}</p>}

      <br />
      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={isSignup ? switchToLogin : switchToSignup}>
          {isSignup ? "Login" : "Signup"}
        </button>
      </p>
    </div>
  );
};

export default AuthPage;
