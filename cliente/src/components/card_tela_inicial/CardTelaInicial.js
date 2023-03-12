import React from 'react';

import "./CardTelaInicial.css";

function CardTelaInicial({ titulo, img_url, dado }) {
  return (
    <div className='card-tela-inicial'>
      <img src={img_url} alt={titulo}/>
      <div className='card-tela-inicial-conteudo'>
        <p>{titulo}</p>
        <h2>{dado}</h2>
      </div>
    </div>
  )
}

export default CardTelaInicial