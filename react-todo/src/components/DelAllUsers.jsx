import React from 'react'
import { useMutationDelUsers } from '../hookUsers/useMutationDelUsers';

export default function DelAllUsers() {

  const { mutateAsync: delUsersMutateAsync } = useMutationDelUsers();


  const delAllUsers = async () => {

    const isConfirmed = window.confirm('Вы уверены, что хотите удалить всех пользователей?');
    if (!isConfirmed) return;

    try {
      await delUsersMutateAsync();
    } catch (error) {
      console.error('Ошибка при удалении всех задач:', error);
    }
  };

  return (
    <div style={{width: '250px', margin: '0 auto'}}>
      <button onClick={delAllUsers}>
        Remove all users
      </button>
    </div>
  )
}
