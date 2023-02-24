import React, { useState } from 'react';

import "./ItemNotificacao.css";

function ItemNotificacao({ titulo, descricao, data, visto, aberto, onBtnClick}) {
  return (
    <div className='item-notificacao-container' onClick={() => onBtnClick()}>
        <i className="fa-solid fa-file-invoice-dollar"></i>
        <div className='item-notificacao-content'>
            <h5>{titulo}</h5>
            <p className={`item-notificacao-descricao ${aberto && "item-notificacao-aberto"}`}>
              {descricao.length > 80 ? aberto ? descricao : descricao.substr(0, 80) + "..." : descricao}
            </p>
            <div className='item-notificacao-footer'>
                {!visto && <span></span>}
                <p>2 horas atrás</p>
            </div>
        </div>
    </div>
  )
}

export default ItemNotificacao