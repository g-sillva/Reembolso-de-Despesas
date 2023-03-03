import React, { useState } from 'react'
import './FormCadastro.css'
import CardConfirmacaoCadastro from '../cartao_confirmacao_cadastro/CardConfirmacaoCadastro'

function FormCadastro({ aoClicarBotaoCadastro, aoClicarLinkCadastro }) {
  const [isCardConfirmacaoCadastro, setCardConfirmacaoCadastro] = useState(false)

  return (
    <section className='card-cadastro-container'>
      <h1 className='card-cadastro-titulo'>Cadastrar</h1>

      <h2 className='card-cadastro-descricao'>Por favor, preencha as informações abaixo.</h2>

      {/* Remover depois o preventDefault do form */}

      <form onSubmit={e => e.preventDefault()} action='#' method='post' className='card-cadastro-form'>
        <label for='name' className='card-cadastro-label'>Nome *</label>
        <input type='text' id='nome-cadastro' className='card-cadastro-input'></input>

        <label for='email' className='card-cadastro-label'>E-mail *</label>
        <input type='email' id='email-cadastro' className='card-cadastro-input'></input>

        <label for='email-confirm' className='card-cadastro-label'>Confirmar e-mail *</label>
        <input type='email' id='email-cadastro-b' className='card-cadastro-input'></input>

        <label for='tel' className='card-cadastro-label'>Telefone *</label>
        <input type='tel' id='card-cadastro-input-T' className='card-cadastro-input'></input>

        <label for='password' className='card-cadastro-label'>Senha *</label>
        <input type='password' id='senha-cadastro' className='card-cadastro-input' onChange='confereSenha();'></input>

        <label for='password-confirm' className='card-cadastro-label'>Confirmar senha *</label>
        <input type='password' id='senha-cadastro-b' className='card-cadastro-input' onChange='confereSenha();'></input>

        <div className='card-cadastro-container-C'>
          <input type='checkbox' id='card-cadastro-input-C'></input><label for='checkbox-confim' id='card-cadastro-label-C'>Eu concordo com os <a className='card-cadastro-label-L' href='https://www.google.com.br/'>Temos e condições de uso</a>.</label>
        </div>  

        <input onClick={() => setCardConfirmacaoCadastro(!isCardConfirmacaoCadastro)} type='submit' value='CADASTRAR' id='card-cadastro-B-cadastrar'></input>

        <div className='card-cadastro-logar-conta-container'>
          <h2 className='card-cadastro-logar-conta'>Já possui cadastro? <p onClick={aoClicarLinkCadastro} className='card-cadastro-logar-conta-L'>Acesse sua conta</p></h2>
        </div>
      </form>

      {isCardConfirmacaoCadastro && <CardConfirmacaoCadastro aoClicarBotaoCadastro={() => {
        setCardConfirmacaoCadastro(true);
      }}/>}
    </section>
  )
}

export default FormCadastro;