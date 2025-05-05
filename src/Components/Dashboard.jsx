import React, { useEffect, useState } from 'react';
import { getUserData, submitScoreData, updateScoreData, logoutUser } from '../services/auth.services';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState({
    shoulderErr: '',
    kneeErr: '',
    backErr: '',
    totalErr: '',
    greenPercentage: '',
    redPercentage: '',
  });
  const [hasScoreData, setHasScoreData] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('id_token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded.sub;
        const response = await getUserData(userId, token);

        if (response?.data) {
          setUser(response.data);

          if (response.data.scoreData) {
            setScores({
              shoulderError: response.data.scoreData.shoulderError || '',
              kneeError: response.data.scoreData.kneeError || '',
              backError: response.data.scoreData.backError || '',
              totalError: response.data.scoreData.totalError || '',
              greenPercentage: response.data.scoreData.greenPercentage || '',
              redPercentage: response.data.scoreData.redPercentage || '',
            });
            setHasScoreData(true);
          }
        }
      } catch (err) {
        console.error('Error loading dashboard:', err);
      }
    };

    fetchDashboardData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScores(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('id_token');
      await submitScoreData(scores, token);
     
      setHasScoreData(true);
    } catch (err) {
      console.error('Submission failed:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('id_token');
      await updateScoreData(scores, token);
      
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('id_token');
      await logoutUser(token);
      localStorage.clear();
      window.location.href = '/';
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      {user && (
        <div className="mb-6">
          <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {['shoulderError', 'kneeError', 'backError', 'totalError', 'greenPercentage', 'redPercentage'].map((field) => (
          <div key={field}>
            <label className="block capitalize mb-1">{field.replace(/([A-Z])/g, ' $1')}:</label>
            <input
              type="number"
              name={field}
              value={scores[field]}
              onChange={handleChange}
              className="border px-2 py-1 rounded w-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-6">
        {hasScoreData ? (
          <button onClick={handleUpdate} className="bg-yellow-500 px-6 py-2 text-white rounded">
            Update
          </button>
        ) : (
          <button onClick={handleSubmit} className="bg-blue-600 px-6 py-2 text-white rounded">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
