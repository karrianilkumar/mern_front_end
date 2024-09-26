import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';  // Import the CSS file for styling

function LoginForm({ onLoginSuccess }) {  // onLoginSuccess  prop  function send from parent  Books1.js file 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, password });

      if (response.status === 200) {
        // Check if the credentials match admin credentials
        if (email === 'karrianilkumar101@gmail.com' && password === 'anilkumar123') {
          navigate('/books'); // Redirect admin to /books
        } else {
          navigate('/user_books'); // Redirect regular users to /user_books
        }
        // Optionally call onLoginSuccess if needed
        onLoginSuccess(email, password); // agin these paramters will go to the Book1.js file's <LoginForm onLoginSuccess={handleLoginSuccess} />  handleLoginSuccess  function 
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        setError(error.response.data.message || "Login failed. Please try again.");
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required
        />
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
