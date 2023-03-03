import React, { useState } from 'react'
import './FormCadastro.css'
import CardConfirmacaoCadastro from '../cartao_confirmacao_cadastro/CardConfirmacaoCadastro'

function FormCadastro({ aoClicarLinkCadastro }) {
  const [isCardConfirmacaoCadastro, setCardConfirmacaoCadastro] = useState(false);
  const [formCadastro, setFormCadastro] = useState({"nome": "", "email": "", "confirmacao_email": "", "telefone": "", "senha": "", "confirmacao_senha": "", "erro": ""});

  const handleSubmit = () => {
    console.log("clicou submit");
  }
  console.log(formCadastro);

  return (
    <section className='card-cadastro-container'>
      <h1 className='card-cadastro-titulo'>Cadastrar</h1>
      <h2 className='card-cadastro-descricao'>Por favor, preencha as informações abaixo.</h2>

      <form onSubmit={e => e.preventDefault()} action='#' method='post' className='card-cadastro-form'>
        <label htmlFor='name' className='card-cadastro-label'>Nome *</label>
        <input type='text' 
               id='nome-cadastro' 
               className='card-cadastro-input' 
               value={formCadastro.nome}
               onChange={(e) => setFormCadastro({...formCadastro, nome: e.target.value})}></input>

        <label htmlFor='email' className='card-cadastro-label'>E-mail *</label>
        <input type='email' 
               id='email-cadastro' 
               className='card-cadastro-input' 
               value={formCadastro.email}
               onChange={(e) => setFormCadastro({...formCadastro, email: e.target.value})}></input>

        <label htmlFor='email-confirm' className='card-cadastro-label'>Confirmar e-mail *</label>
        <input type='email' 
               id='email-cadastro-b' 
               className='card-cadastro-input'
               value={formCadastro.confirmacao_email}
               onChange={(e) => setFormCadastro({...formCadastro, confirmacao_email: e.target.value})}></input>

        <label htmlFor='tel' className='card-cadastro-label'>Telefone *</label>
        <input type='tel' 
              id='card-cadastro-input-T' 
              className='card-cadastro-input'
              value={formCadastro.telefone}
              onChange={(e) => setFormCadastro({...formCadastro, telefone: e.target.telefone})}></input>

        <label htmlFor='password' className='card-cadastro-label'>Senha *</label>
        <input type='password' 
               id='senha-cadastro' 
               className='card-cadastro-input' 
               value={formCadastro.senha}
               onChange={(e) => setFormCadastro({...formCadastro, senha: e.target.value})}></input>

        <label htmlFor='password-confirm' className='card-cadastro-label'>Confirmar senha *</label>
        <input type='password' 
               id='senha-cadastro-b' 
               className='card-cadastro-input' 
               value={formCadastro.confirmacao_senha}
               onChange={(e) => setFormCadastro({...formCadastro, confirmacao_senha: e.target.value})}></input>

        <div className='card-cadastro-container-C'>
          <input type='checkbox' id='card-cadastro-input-C'></input>
          <label htmlFor='checkbox-confim' id='card-cadastro-label-C'>
            Eu concordo com os <a className='card-cadastro-label-L' href='https://www.google.com.br/'>Temos e condições de uso</a>.
          </label>
        </div>  

        <input onClick={() => setCardConfirmacaoCadastro(!isCardConfirmacaoCadastro)} 
               type='submit' value='CADASTRAR' id='card-cadastro-B-cadastrar'></input>

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