import React from 'react';
import axios from 'axios';

export const getUserData = () => {
  return new Promise((resolve, reject) => {
    axios.get('/api/users/current').then(
      res => resolve(res.data.userData),
      error => reject(error),
    );
  });
};

export const UserContext = React.createContext({});

