import React from 'react';
import './FormLogin.css';

function FormLogin({ aoClicarLinkLogin }) {
  return (
    <section className='card-login-container'>
    <h1 className='card-login-titulo'>Entrar</h1>

    <h2 className='card-login-descricao'>Por favor, preencha as informações abaixo.</h2>

    <form action='#' method='post' className='card-login-form'>
      <label for='email' className='card-login-label'>E-mail *</label>
      <input type='email' id='email' className='card-login-input' required></input>

      <label for='password' className='card-login-label'>Senha *</label>
      <input type='password' id='password' className='card-login-input' required></input>

      <input type='submit' value='ENTRAR' id='card-login-B-logar'></input>

      <div className='card-login-criar-conta-container'>
        <h2 className='card-login-criar-conta'>Ainda não tem cadastro? <p onClick={aoClicarLinkLogin} className='card-login-criar-conta-L'>Crie sua conta</p></h2>
      </div>
    </form>
  </section>
  )
}

export default FormLogin