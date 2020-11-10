import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (payload, user) => {
  const config = {
    headers: {
      authorization: `Bearer ${user.token}`
    }
  }
  const response = await axios.post(baseUrl, payload, config);
  return response.data;
};

export default { getAll, create }