import React from 'react';

import "./ItemNotificacao.css";

function ItemNotificacao() {
  return (
    <div className='item-notificacao-container'>
        <i className="fa-solid fa-file-invoice-dollar"></i>
        <div className='item-notificacao-content'>
            <h5>Mudança de Status</h5>
            <p className='item-notificacao-descricao'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
            <div className='item-notificacao-footer'>
                <span></span>
                <p>2 horas atrás</p>
            </div>
        </div>
    </div>
  )
}

export default ItemNotificacao