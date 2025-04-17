import axios from 'axios';
import { useMutation } from 'react-query';

export const useMutationLogIn = () => {
    return useMutation(
      async (data) => await axios.post(`http://localhost:3001/logIn/${data.user_name}/${data.pass}`)
    );
  }