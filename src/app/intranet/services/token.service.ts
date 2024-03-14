import axiosClient from './axios.service';

const tokenAuth = (token: string, contentType?: string) => {
  axiosClient.defaults.headers.common['Content-Type'] = contentType || 'application/json';
//   'Content-Type': 'multipart/form-data',
  if (token) {
    axiosClient.defaults.headers.common['Authorization'] = `Bear ${token}`;
  } else {
    delete axiosClient.defaults.headers.common['Authorization'];
  }
};

export default tokenAuth;