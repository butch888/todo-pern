import axios from 'axios';
import { useMutation } from 'react-query';

export const useMutationSignUp = () => {
    return useMutation(
      async (data) => await axios.post(`http://localhost:3001/signUp/${data.user_id}/${data.user_name}/${data.pass}`)
    );
  }