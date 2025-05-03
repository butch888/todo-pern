import axios from 'axios';
import { useQuery } from 'react-query';

export const useQueryTasks = () => {
  const user_id = localStorage.getItem('user_id')
    return useQuery(
      'tasks',
      async () => {
        const response = await axios.get(`http://localhost:3001/${user_id}`);
        return response.data
    });
  }