// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth.services'; // Assuming you have this service

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(username, password);
      // Store tokens as needed, e.g., in localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);
      localStorage.setItem('id_token', data.id_token);
      localStorage.setItem('expires_in', data.expires_in);
      localStorage.setItem('id', data.id);
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <>
      <div className='text-center mt-30'>
        <p className='text-4xl underline underline-offset-2'>Login Page</p>
      </div>
      <div className='text-center mt-10'>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder='Enter your email Id here'
            className='h-15 w-65 rounded-full border-2 hover:border-r-5 hover:bg-pink-200 border-black text-center'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br />
          <input
            type="password"
            placeholder='Enter your password here'
            className='h-15 w-65 mt-3 rounded-full border-2 hover:border-r-5 hover:bg-pink-200 border-black text-center'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          <button type="submit" className='mt-3 h-14 w-25 rounded-full border-2 hover:bg-pink-200 hover:border-r-5'>Login</button>
        </form>
      </div>
    </>
  );
}

export default Login;
