import React from 'react';

import "./CardLancamentoCarregando.css";
import Glow from './glow/Glow';

function CardLancamentoCarregando() {
  return (
    <div className='card-lancamento-carregando'>
        <div className='card-lancamento-carregando-top-container'>
            <div className='card-lancamento-carregando-textos-container'>
                <div className='card-carregando-linha card-carregando-linha-g'></div>
                <div className='card-carregando-linha card-carregando-linha-m'></div>
                <div className='card-carregando-linha card-carregando-linha-m'></div>
                <div className='card-carregando-linha card-carregando-linha-m card-carregando-linha-categoria'></div>
            </div>
            <div className='card-carregando-icones-container'>
                <div className='card-carregando-linha card-carregando-icone'></div>
                <div className='card-carregando-linha card-carregando-icone'></div>
            </div>
        </div>
        <div className='card-lancamento-carregando-bottom-container'>
            <div className='card-carregando-linha card-carregando-linha-p'></div>
            <div className='card-lancamento-carregando-bottom-text-container'>
                <div className='card-carregando-linha card-carregando-linha-m'></div>
                <div className='card-carregando-linha card-carregando-linha-m'></div>
            </div>
        </div>
        <Glow />
    </div>
  )
}

export default CardLancamentoCarregando