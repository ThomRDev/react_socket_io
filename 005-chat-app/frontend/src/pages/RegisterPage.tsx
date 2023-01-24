import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom"
import Swal from 'sweetalert2';
import { useAuth } from "../hooks";

export const RegisterPage = () => {

  const { register } = useAuth()
  const [ form, setForm ] = useState({
    email: '',
    password: '',
    name: ''
  });

  const onChange = (evt:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm({
        ...form,
        [name]: value
    });
  }

  const onSubmit = async(evt:FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      const { email, password, name } = form;
      const msg = await register( name, email, password );

      if ( msg !== true ) {
          Swal.fire('Error', msg, 'error');
      }
  }

  const todoOk = () => {
      return ( 
          form.email.length > 0 && 
          form.password.length > 0 &&
          form.name.length > 0
      ) ? true : false;
  }

  return (
    <div className="auth">
        <h1 className="auth__title">CHAT - REGISTRO</h1>
        <form className='auth__form' autoComplete='off' onSubmit={ onSubmit }>
          <div className='auth__field field'>
            <input className="auth__input" autoComplete='off' placeholder='Nombre' type="text" name="name" value={ form.name } onChange={ onChange } />
            <span className='field--focus' />
          </div>
          <div className='auth__field field'>
            <input className="auth__input" autoComplete='off' placeholder='Email' type="email" name="email" value={ form.email } onChange={ onChange } />
            <span className='field--focus' />
          </div>
          <div className='auth__field field'>
            <input className="auth__input" autoComplete='off' placeholder='Password' type="password" name="password" value={ form.password } onChange={ onChange } />
            <span className='field--focus' />
          </div>
          <div className="auth__options">
            <div className='right'>
              <Link to={'/auth/login'} className='link' >Ya tienes cuenta?</Link>
            </div>
          </div>
          <button className='auth__action' disabled={ !todoOk() }>CREAR CUENTA</button>
        </form>
      </div>
  )
}
