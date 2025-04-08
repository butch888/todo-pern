import { Form } from "./FormStyled";
import { useForm } from 'react-hook-form';

const SignIn = () => {

  const { register, handleSubmit, formState: {errors}, reset} = useForm({mode: "onChange",});
  
  const onSubmit = (formData) => {
    console.log(formData)
    reset()
  };
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <button style={{margin: '25px 0 0 0'}}>
           Войти
          </button>
        </div>      
      </Form>
    </div>
  )
}

export default SignIn
