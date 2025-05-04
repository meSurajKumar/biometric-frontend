// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useKeycloak } from '@react-keycloak/web';
import { getDashboard } from '../services/auth.services';

const Dashboard = () => {
  const { keycloak } = useKeycloak();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  console.log('here in dashbord1')



  useEffect(() => {
    const getUserData = async () => {
        console.log('keycloak?.authenticated > ',keycloak?.authenticated)
      if (keycloak?.authenticated) {
        try {
            console.log('here in dashbord')
          const data = await getDashboard(keycloak.token).then(setUserData).catch(console.error);
        //   setUserData(data);

        } catch (err) {
          setError('Failed to fetch user data');
        }
      }else{
        console.log('here in else')
      }
    };

    getUserData();
  }, [keycloak]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="text-center mt-30">
      <p className="text-4xl underline underline-offset-2">Dashboard</p>
      {userData ? (
        <div>
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
