import axios from 'axios';
import { useQuery } from 'react-query';

export const useQueryUsers = () => {
    return useQuery(
      'users',
      async () => {
        const response = await axios.get('http://localhost:3001/users');
        return response.data
    });
  }