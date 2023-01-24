import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks"
import Swal from 'sweetalert2';

export const LoginPage = () => {

  const { login } = useAuth()
  
  const [form,setForm] = useState({
    email : '',
    password : '',
    rememberme: false
  })


  const onChangeInput = (evt:ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault()
    const { name,value } = evt.target
    setForm(f=>({
      ...f,
      [name] : value
    }))
  }

  const onSubmitLogin = async (evt:FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    (form.rememberme) 
            ? localStorage.setItem('email', form.email )
            : localStorage.removeItem('email');
    const { email, password } = form;
    const ok = await login( email, password );
    if ( !ok ) {
      Swal.fire('Error', 'Verifique el usuario y contraseña', 'error');
    }
  }

  const toggleCheck = () => {
    setForm(f=>({
      ...f,
      rememberme: !f.rememberme
    }))
  }

  const ok = () => form.email.trim().length > 0 && form.password.trim().length > 0 
  useEffect(()=>{
    const email = localStorage.getItem('email');
    if ( email ) {
      setForm( (form) => ({
          ...form,
          email,
          rememberme: true,
      }));
    }
  },[])

  return (
    <div className="auth">
        <h1 className="auth__title">CHAT - INGRESO</h1>
        <form className='auth__form' autoComplete='off' onSubmit={onSubmitLogin} >
          <div className='auth__field field'>
            <input 
              className="auth__input" 
              autoComplete='off'
              type={'email'} 
              placeholder='Email'
              name="email"
              value={form.email}
              onChange={onChangeInput} 
            />
            <span className='field--focus' />
          </div>
          <div className='auth__field field'>
            <input 
              className="auth__input" 
              autoComplete='off' 
              placeholder='Password'
              type={'password'}
              name="password"
              value={form.password}
              onChange={onChangeInput}
            />
            <span className='field--focus' />
          </div>
          <div className="auth__options">
            <div className='checkbox-container'
              onClick={()=>toggleCheck()}
            >
              <input 
                type="checkbox" 
                id='toggle' 
                name="rememberme"
                checked={form.rememberme}
                readOnly 
              />
              <label htmlFor="toggle" style={{ userSelect:'none' }} onClick={()=>toggleCheck()} >Recuerdame</label>
            </div>
            <div className='right'>
              <Link to={'/auth/register'} className='link' >¿Nueva cuenta?</Link>
            </div>
          </div>
          <button className='auth__action'
          disabled={!ok()}
          >INGRESAR</button>
        </form>
      </div>
  )
}
