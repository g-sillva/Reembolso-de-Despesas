import React, { useState } from 'react'
import FormCadastro from '../../components/formulario_cadastro/FormCadastro'
import FormLogin from '../../components/formulario_login/FormLogin'
import './LoginCadastro.css'
  
function LoginCadastro() {
  const [isCadastroAberto, setCadastroAberto] = useState(false)
  const [isLoginAberto, setLoginAberto] = useState(false)

  return (
    <section className='login-cadastro-container'>
      <img className='cadastro-login-logo' src='/img/user_profile1.png' alt=''/>

      <img className='cadastro-login-img' src='/img/login_cadastro.png' alt='' width='100%'/>

      <h1 className='cadastro-login-TxtMain'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</h1>

      <button className='cadastroB' onClick={() => setCadastroAberto(!isCadastroAberto)}>CADASTRAR</button>
      
      <button className='loginB' onClick={() => setLoginAberto(!isLoginAberto)}>ENTRAR</button>

      {isCadastroAberto && <FormCadastro aoClicarLinkCadastro={() => {
        setCadastroAberto(false);
        setLoginAberto(true);
      }}/>}

      {isLoginAberto && <FormLogin aoClicarLinkLogin={() => {
        setLoginAberto(false);
        setCadastroAberto(true);
      }}/>}
    </section>
  )
}

export default LoginCadastro