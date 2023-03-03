import React from 'react';
import './CardConfirmacaoCadastro.css'
// import CardCadastro from '../CardCadastro/CardCadastro';

function CardConfirmacaoCadastro() {
  return (
    <section className='card-confirmacao-cadastro-container'>
      <h1 className='card-confirmacao-cadastro-titulo'>Cadastrar</h1>
      <div class='card-confirmacao-cadastro-bottom'>
        <img src='/img/img-confirmacao-cadastro.png' alt='' className='card-confirmacao-cadastro-img'></img>
        <h2 className='card-confirmacao-cadastro-status'>QUASE PRONTO!</h2>
        <h3 className='card-confirmacao-cadastro-subtitulo'>Clique no link que foi enviado para o e-mail <a href='https://www.google.com.br/' className='card-confirmacao-cadastro-subtitulo-L'>email@example.com</a> para ativar a sua conta!</h3>
      </div>
    </section>
  )
}

export default CardConfirmacaoCadastro