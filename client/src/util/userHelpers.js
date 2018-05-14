import axios from 'axios';
import cookie from 'js-cookie';

export function authWithServer(googleToken) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: '/api/users/auth',
      data: {
        idtoken: googleToken,
      },
    }).then((response) => {
      const { user, token } = response.data;
      cookie.set('token', token);
      resolve(user);
    });
  });
}

export function uselessFunction() {
  console.log('I suck');
}
