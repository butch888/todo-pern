import axios from 'axios';
import { useMutation } from 'react-query';

export const useMutationAddUser = () => {
    return useMutation(
      async (data) => await axios.post(`http://localhost:3001/addUser/${data.user_id}/${data.user_name}/${data.pass}`)
    );
  }