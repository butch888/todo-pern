import React, { useState } from 'react'
import { Form } from "./FormStyled";
import { useForm } from 'react-hook-form';
import { useMutationSignUp } from '../hookUsers/useMutationSignUp';

export default function SignUp() {

  const { 
    register, 
    handleSubmit, 
    formState: {errors, isValid}, 
    reset
  } = useForm({mode: 'onChange'});

  const {mutateAsync: signUpMutateAsync} = useMutationSignUp();
  const [message, setMessage] = useState('');

  const onSubmit = async (formData) => {
    
    if (formData) {
      try {
      const res =  await signUpMutateAsync({user_id: new Date().getTime(), user_name: formData.userName, pass: formData.userPass});
      setMessage(res.data.message)
      } catch (error) {
        console.log(error);
      }
    }
    setTimeout(() => {
      setMessage('')
    }, 5000)
    reset();
  }

  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <div style={{position: 'relative', top: '-50px'}}>
        {message && (
          <p style={{
            color: message.includes('Error') || message.includes('уже') ? 'red' : 'green',
            marginTop: '10px',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            textAlign: 'center'
          }}>
            {message}
          </p>
        )}
      </div>

        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', position: 'relative'}}>
          <div>
            <input {...register('userName', 
              {required: 'Поле не должно быть пустым',
                pattern: {value: /^[A-Za-z0-9]+$/i, message: 'В имени не должно быть символов'
            }})} 
              type="text" 
              placeholder="User name"/>
            {errors?.userName && (<div style={{color: 'red', fontSize: '12px', position: 'absolute'}}>{errors.userName.message}</div>)}
          </div>

          <div>
            <input {...register('userPass', {required: 'Поле не должно быть пустым', pattern: {value: /^(?=.*[a-zA-Z0-9].*[a-zA-Z0-9]).{4,10}$/i, message: 'от 4 до 10 символов'}})} 
              type="text" 
              placeholder='Password'/>
            {errors?.userPass && (<div style={{color: 'red', fontSize: '12px', position: 'absolute'}}>{errors.userPass.message}</div>)}
          </div>
        </div>

        <div>
          <button style={{margin: '25px 0 0 0 '}} disabled={!isValid}>
           Зарегистрироваться
          </button>
        </div>
      </Form>
    </div>
  )
}
