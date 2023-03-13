import React, { useContext, useEffect, useState } from 'react';
import './FormAdmLogin.css';
import Loading from '../layout/Loading'
import axios from 'axios';
import Context from '../../Context';
import { useNavigate } from 'react-router';

function FormAdmLogin({ aoClicarLinkLogin }) {
  const [context, setContext] = useContext(Context);

  const [removeLoading, setRemoveLoading] = useState(false)

  const [FormAdmLogin, setFormAdmLogin] = useState({email: "", senha: "", confirmacao_senha: "", erro: ""});
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarioObj = {
      email: FormAdmLogin.email,
      senha: FormAdmLogin.senha
    }

    setRemoveLoading(true)
    axios.post('https://reembolso-de-despesas-production.up.railway.app/api/clientes/login', usuarioObj)
      .then((res) => {
        axios.get(`https://reembolso-de-despesas-production.up.railway.app/api/clientes?email=${usuarioObj.email}`, {
          headers: {
            'Authorization': `Bearer ${res.data.token}`
          }
        })

          .then((userRes) => {
            setContext({ "usuario": userRes.data[0], "token": res.data.token });
            setRemoveLoading(false);
            navigate("/");
          })

      }).catch((error) => {
        console.log(error);
        setRemoveLoading(false);
      });
  }

  return (
    <section className='card-adm-login-container'>
      <h1 className='card-adm-login-titulo'>Entrar</h1>

      <h2 className='card-adm-login-descricao'>Por favor, preencha as informações abaixo.</h2>

      <form onSubmit={e => handleSubmit(e)} action='#' method='post' className='card-adm-login-form'>
        <label htmlFor='email' className='card-adm-login-label'>E-mail *</label>
        <input onChange={(e) => setFormAdmLogin({ ...FormAdmLogin, email: e.target.value })} type='email' id='email' className='card-adm-login-input-email' required></input>

        <label htmlFor='password' className='card-adm-login-label'>Senha *</label>
        <input onChange={(e) => setFormAdmLogin({ ...FormAdmLogin, senha: e.target.value })} type='password' id='password' className='card-adm-login-input-senha' required></input>

        <input type='submit' value='ENTRAR' id='card-adm-login-B-logar'></input>

        <div className='card-adm-login-criar-conta-container'>
          <h2 className='card-adm-login-criar-conta'>Ainda não tem cadastro? <p onClick={aoClicarLinkLogin} className='card-adm-login-criar-conta-L'>Crie sua conta</p></h2>
        </div>
      </form>

      {removeLoading && <Loading />}
    </section>
  )
}

export default FormAdmLogin