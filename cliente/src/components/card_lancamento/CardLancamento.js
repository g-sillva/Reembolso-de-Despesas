import React from 'react';

import "./CardLancamento.css";

function CardLancamento({ valor = "R$0,00", status = "EM RASCUNHO", data, titulo = "-", descricao = "-" }) {
  return (
    <div className='card-lancamento'>
      <div className='card-lancamento-esquerda'>
        <span className='card-lancamento-esquerda-status-cor'></span>
        <div className='card-lancamento-esquerda-conteudo'>
          <h4>R${valor}</h4>
          <h3>{status.replace("_", " ")}</h3>
          <p><span>JAN</span>2023</p>
        </div>
      </div>
      <div className='card-lancamento-direita'>
        <div className='card-lancamento-direita-header'>
          <div>
            <h3>{titulo}</h3>
            {/* <p className='card-lancamento-warning'>!</p> */}
          </div>
          <i class="fa-solid fa-pencil"></i>
        </div>
        <p className='card-lancamento-direita-descricao'>{descricao}</p>
        <div className='card-lancamento-direita-footer'>
          <i class="fa-solid fa-image"></i>
          {/* <p className='card-lancamento-warning'>!</p> */}
        </div>
      </div>
    </div>
  )
}

export default CardLancamento