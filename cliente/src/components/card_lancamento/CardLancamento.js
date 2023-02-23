import React from 'react';

import "./CardLancamento.css";

function CardLancamento() {
  return (
    <div className='card-lancamento'>
      <div className='card-lancamento-esquerda'>
        <span className='card-lancamento-esquerda-status-cor'></span>
        <div className='card-lancamento-esquerda-conteudo'>
          <h4>R$88,20</h4>
          <h3>ENVIADO</h3>
          <p><span>JAN</span>2023</p>
        </div>
      </div>
      <div className='card-lancamento-direita'>
        <div className='card-lancamento-direita-header'>
          <div>
            <h3>Assinatura 1 mês Alura</h3>
            {/* <p className='card-lancamento-warning'>!</p> */}
          </div>
          <i class="fa-solid fa-pencil"></i>
        </div>
        <p className='card-lancamento-direita-descricao'>Lorem ipsum dolor sit amet, cons ectet ur adip iscing elit...</p>
        <div className='card-lancamento-direita-footer'>
          <i class="fa-solid fa-image"></i>
          {/* <p className='card-lancamento-warning'>!</p> */}
        </div>
      </div>
    </div>
  )
}

export default CardLancamento