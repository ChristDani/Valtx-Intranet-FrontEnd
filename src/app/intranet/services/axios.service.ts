import axios from 'axios';

/**
 * http://localhost:4000/graphql
 * http://localhost:4000/post-image
 * https://intranetconexion.valtx.pe:9021/api/v1
 * 'http://172.13.34.99:4000/api/v1'
 */

const axiosClient = axios.create({
  baseURL: 'https://intranetconexion.valtx.pe:9021/api/v1',
});

export default axiosClient;
