import axios from 'axios';
const baseUrl = import.meta.env.VITE_LOCAL_BASEURL;

console.log('baseUrl ',baseUrl)


const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  };



const postUserData = async (data) => {
    try {
        console.log('data < ', data)
      const response = await axios.post(`${baseUrl}/submit`, data, {
        headers: {
          Authorization: `Bearer ${data.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error posting user data:', error);
      throw error;
    }
  };


  // New method to fetch user data for the dashboard

  
  const getDashboard = async (token) => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Dashboard API error:', error);
      throw error;
    }
  };
  
  export { loginUser, postUserData, getDashboard };
  
