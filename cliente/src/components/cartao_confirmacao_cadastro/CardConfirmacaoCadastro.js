import React from 'react';
import './CardConfirmacaoCadastro.css'

function CardConfirmacaoCadastro({ email, aoClicarSair }) {
  return (
    <section className='card-confirmacao-cadastro-container'>
      <i className="fa-solid fa-xmark" onClick={aoClicarSair}></i>
      <h1 className='card-confirmacao-cadastro-titulo'>Cadastrar</h1>
      <div className='card-confirmacao-cadastro-bottom'>
        <img src='/img/img-confirmacao-cadastro.png' alt='' className='card-confirmacao-cadastro-img'></img>
        <h2 className='card-confirmacao-cadastro-status'>QUASE PRONTO!</h2>
        <h3 className='card-confirmacao-cadastro-subtitulo'>Clique no link que foi enviado para o e-mail <span className='card-confirmacao-cadastro-subtitulo-L'>{email}</span> para ativar a sua conta!</h3>
      </div>
    </section>
  )
}

export default CardConfirmacaoCadastro