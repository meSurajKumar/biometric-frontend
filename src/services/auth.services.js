import axios from 'axios';
const baseUrl = import.meta.env.VITE_LOCAL_BASEURL;

console.log('baseUrl ',baseUrl)


const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${baseUrl}/api/v1/auth/login`, { username, password });
      return response.data;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  };

 const submitScoreData = async (data, token) => {
    const res = await axios.post(`${baseUrl}/api/v1/auth/submit`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
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

  
  const getUserData = async (userId, token) => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/auth/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('response ',response.data)
      return response.data;
    } catch (error) {
      console.error('User data fetch error:', error);
      throw error;
    }
  };

 const logoutUser = async (token) => {
    return axios.post(`${baseUrl}/api/v1/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };


  const updateScoreData = async (data, token) => {
    const res = await axios.put(`${baseUrl}/api/v1/auth/update`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };
  
  
  export { loginUser, postUserData, getUserData , logoutUser , submitScoreData,updateScoreData };
  

  
