import axios from 'axios';
import { useMutation } from 'react-query';

export const useMutationSignIn = () => {
    return useMutation(
      async (data) => await axios.post(`http://localhost:3001/signIn/${data.user_name}/${data.pass}`)
    );
  }