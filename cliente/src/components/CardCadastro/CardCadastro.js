import React from 'react'
import './CardCadastro.css'

function CardCadastro({ aoClicarLinkCadastro }) {
  return (
    <section className='card-cadastro-container'>
      <h1 className='card-cadastro-titulo'>Cadastrar</h1>

      <h2 className='card-cadastro-descricao'>Por favor, preencha as informações abaixo.</h2>

      <form action='#' method='post' className='card-cadastro-form'>
        <label for='name' className='card-cadastro-label'>Nome *</label>
        <input type='text' id='name' className='card-cadastro-input' required></input>

        <label for='email' className='card-cadastro-label'>E-mail *</label>
        <input type='email' id='email' className='card-cadastro-input' required></input>

        <label for='email-confirm' className='card-cadastro-label'>Confirmar e-mail *</label>
        <input type='email' id='email-confirm' className='card-cadastro-input' required></input>

        <label for='tel' className='card-cadastro-label'>Telefone *</label>
        <input type='tel' id='card-cadastro-input-T' className='card-cadastro-input' required></input>

        <label for='password' className='card-cadastro-label'>Senha *</label>
        <input type='password' id='password' className='card-cadastro-input' required></input>

        <label for='password-confirm' className='card-cadastro-label'>Confirmar senha *</label>
        <input type='password' id='password' className='card-cadastro-input' required></input>

        <div className='card-cadastro-container-C'>
          <input type='checkbox' id='card-cadastro-input-C' required></input><label for='checkbox-confim' id='card-cadastro-label-C'>Eu concordo com os <a className='card-cadastro-label-L' href='https://www.google.com.br/'>Temos e condições de uso</a>.</label>
        </div>  

        <input type='submit' value='CADASTRAR' id='card-cadastro-B-cadastrar'></input>

        <div className='card-cadastro-logar-conta-container'>
          <h2 className='card-cadastro-logar-conta'>Já possui cadastro? <p onClick={aoClicarLinkCadastro} className='card-cadastro-logar-conta-L'>Acesse sua conta</p></h2>
        </div>
      </form>
    </section>
  )
}

export default CardCadastro;