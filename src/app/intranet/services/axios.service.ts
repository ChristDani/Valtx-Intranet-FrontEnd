import axios from 'axios';

/**
 * http://localhost:4000/graphql
 * http://localhost:4000/post-image
 */

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/api/v1',
});

export default axiosClient;
