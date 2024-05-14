import axios from 'axios';

/**
 * http://localhost:4000/graphql
 * http://localhost:4000/post-image
 */

const axiosClient = axios.create({
  baseURL: 'https://intranetconexion.valtx.pe:9021/api/v1',
});

export default axiosClient;
