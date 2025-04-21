import axios from 'axios';
import { useMutation } from 'react-query';

export const useMutationDelUsers = () => {
  return useMutation(
    async () => {
      try {
        await axios.post('http://localhost:3001/users');
      } catch (error) {
        console.error('Ошибка при удалении:', error);
        throw error;
      }
    }
  );
};