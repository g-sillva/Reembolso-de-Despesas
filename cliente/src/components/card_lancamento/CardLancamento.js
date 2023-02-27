import React, { useState } from 'react';
import CardEditarLancamento from "../card_cadastro_lancamento/CardEditarLancamento";


import "./CardLancamento.css";

function CardLancamento({ valor = "0", 
                          status = "EM RASCUNHO", 
                          data, 
                          titulo = "-", 
                          descricao = "-", 
                          categoria, 
                          comprovativo, 
                          aoAbrirEdicao }) {

  valor /= 100;
  return (
    <div className='card-lancamento'>
      <div className='card-lancamento-container'>
        <div className='card-lancamento-esquerda'>
          <span className={`card-lancamento-esquerda-status-cor card-lancamento-cor-${status.toLowerCase()}`}></span>
          <div className='card-lancamento-esquerda-conteudo'>
            <h4>R${valor.toLocaleString('pt-br', {minimumFractionDigits: 2})}</h4>
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
            {<i className="fa-solid fa-pencil" onClick={aoAbrirEdicao}></i>}
          </div>
          <p className='card-lancamento-direita-descricao'>{descricao}</p>
          <div className='card-lancamento-direita-footer'>
            <i className="fa-solid fa-image"></i>
            {/* <p className='card-lancamento-warning'>!</p> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardLancamento