import axiosClient from './axios';

const tokenAuth = (token: string) => {
  axiosClient.defaults.headers.common['Content-Type'] = 'application/json';
//   'Content-Type': 'multipart/form-data',
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bear ${token}`;
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
  }
};

export default tokenAuth;
