import axios from 'axios';

const BASE = 'https://horseplay-api.onrender.com/api'

export const userCheck = async token => {
  const response = await fetch(`${BASE}/users/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data) {
    return data;
  }
};

export const getUserContactInfo = async token => {
  const response = await fetch(`${BASE}/users/info`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (data) {
    return data;
  }
};

export const getUserProfileInfo = async userId => {
  const userProfileInfoObj = await axios.get(`${BASE}/users/${userId}/profile`);
  const userProfileInfoArr = userProfileInfoObj.data;
  return userProfileInfoArr;
};
