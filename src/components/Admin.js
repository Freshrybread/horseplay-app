import React, { useEffect, useState } from 'react';
import './Admin.css';

export const Admin = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const BASE = 'https://horseplay-api.onrender.com/api'

  useEffect(() => {
    const getUsers = async token => {
      try {
        const response = await fetch(`${BASE}/users`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsers(data);
        return data;
      } catch (err) {
        console.error(err);
      }
    };

    getUsers(token);
  }, []);
  return (
    <div id="admin-page">
      <h1 id="admin-title">Welcome Admin!</h1>
      <h2 id="dashboard-title">Dashboard</h2>
      <div id="users-container">
        {users.map((user, id) => {
          return (
            <div id="users" key={id}>
              <h3 id="user-username">username: {user.username}</h3>
              <h3 id="user-isAdmin">Admin: {String(user.isAdmin)}</h3>
              <h3 id="user-firstname">firstname: {user.firstName}</h3>
              <h3 id="user-lastname">lastname: {user.lastName}</h3>
              <h3 id="user-email">email: {user.email}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};
