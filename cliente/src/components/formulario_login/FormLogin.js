import React, { useContext, useState } from 'react';
import './FormLogin.css';
import Loading from '../layout/Loading'
import axios from 'axios';
import Context from './../../Context';
import { useNavigate } from 'react-router';

function FormLogin({ aoClicarLinkLogin }) {
  const [context, setContext] = useContext(Context);

  const [removeLoading, setRemoveLoading] = useState(false)

  const [formLogin, setFormLogin] = useState({email: "", senha: "", confirmacao_senha: "", erro: ""});
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioObj = {
      email: formLogin.email,
      senha: formLogin.senha
    }

    setRemoveLoading(true)
    axios.post('https://reembolso-de-despesas-production.up.railway.app/api/clientes/login', usuarioObj)
      .then((res) => {
        setContext({ "usuario": res.data.usuario, "token": res.data.token });
        setRemoveLoading(false);
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setRemoveLoading(false);

      });
  }

  return (
    <section className='card-login-container'>
      <h1 className='card-login-titulo'>Entrar</h1>

      <h2 className='card-login-descricao'>Por favor, preencha as informações abaixo.</h2>

      <form onSubmit={e => handleSubmit(e)} action='#' method='post' className='card-login-form'>
        <label htmlFor='email' className='card-login-label'>E-mail *</label>
        <input onChange={(e) => setFormLogin({ ...formLogin, email: e.target.value })} type='email' id='email' className='card-login-input' required></input>

        <label htmlFor='password' className='card-login-label'>Senha *</label>
        <input onChange={(e) => setFormLogin({ ...formLogin, senha: e.target.value })} type='password' id='password' className='card-login-input' required></input>

        <input type='submit' value='ENTRAR' id='card-login-B-logar'></input>

        <div className='card-login-criar-conta-container'>
          <h2 className='card-login-criar-conta'>Ainda não tem cadastro? <p onClick={aoClicarLinkLogin} className='card-login-criar-conta-L'>Crie sua conta</p></h2>
        </div>
      </form>
      {removeLoading && <Loading />}
    </section>
  )
}

export default FormLogin