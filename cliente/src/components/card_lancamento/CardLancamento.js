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
      <div className='card-lancamento-top-container'>
        <div className='card-lancamento-textos-container'>
          <h4 className='card-lancamento-texto-titulo'>{titulo}</h4>
          <p className='card-lancamento-texto-descricao'>{descricao}</p>
          <p className='card-lancamento-texto-categoria'>{categoria.replace("_", " ")}</p>
        </div>
        <div className='card-lancamento-icones-container'>
          <i className="fa-solid fa-pen"></i>
          <i className="fa-regular fa-image"></i>
        </div>
      </div>
      <div className='card-lancamento-bottom-container'>
        <div className='card-lancamento-bottom-status-container'>
          <div className='card-lancamento-bottom-status-bar'>
            <div className='card-lancamento-bottom-status-bar-full'></div>
            <div className='card-lancamento-bottom-status-bar-current'></div>
            <p>%</p>
          </div>
          <p className='card-lancamento-bottom-status-text'>{status.replace("_", " ")}</p>
        </div>
        <div className='card-lancamento-bottom-text-container'>
          <p className='card-lancamento-bottom-text-date'><span>JAV</span> 2023</p>
          <h5>R${valor}</h5>
        </div>
      </div>
    </div>
  )
}

export default CardLancamento