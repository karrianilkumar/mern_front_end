// import React, { useState, useEffect } from "react";
// import Book from "./Book"; // For Admin
// import Book_user from "./Book_user"; // For Regular User
// import { useNavigate } from "react-router-dom";

// // Main Component to handle Admin or User access
// const BookComponent = (props) => {
//   const history = useNavigate();
//   const [isUserAdmin, setIsUserAdmin] = useState(false);
//   const [userCredentials, setUserCredentials] = useState({
//     email: "",
//     password: "",
//   });

//   // Check user role on component mount or when login details change
//   useEffect(() => {
//     const { email, password } = userCredentials;
//     if (email && password) {
//       setIsUserAdmin(isAdmin(email, password));
//     }
//   }, [userCredentials]);

//   // Example login function to set credentials
//   const login = (email, password) => {
//     setUserCredentials({ email, password });
//     if (isAdmin(email, password)) {
//       alert("Welcome, Admin");
//     } else {
//       alert("Welcome, User");
//     }
//   };

//   return (
//     <div>
//       {/* Conditional rendering based on user type */}
//       {isUserAdmin ? (
//         <Book book={props.book} /> // If admin, render the Book component
//       ) : (
//         <Book_user book={props.book} /> // If user, render the Book_user component
//       )}
//     </div>
//   );
// };

// // Helper function to check if the user is an admin
// const isAdmin = (email, password) => {
//   return email === "karrianilkumar101@gmail.com" && password === "anilkumar123";
// };

// export default BookComponent;

