import React from 'react';
import ItemNotificacao from './item_notificacao/ItemNotificacao';

import "./Notificacao.css";

function Notificacao({ conteudo = [] }) {

  return (
    <div className='notificacoes-container'>
        <h4>Notificações</h4>
        <div className='notificacoes-content'>
            {/* {conteudo.length == 0 && <p className='nenhuma-notificacao-aviso'>Nenhuma notificação</p>} */}
            <div className='itens-notificacao-container'>
              <ItemNotificacao />
              <ItemNotificacao />
            </div>
        </div>
    </div>
  )
}

export default Notificacao