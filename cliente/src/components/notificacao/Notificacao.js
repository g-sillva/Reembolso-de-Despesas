import React, { useEffect, useState } from 'react';
import { Notificacoes } from '../../data/data';
import ItemNotificacao from './item_notificacao/ItemNotificacao';

import "./Notificacao.css";

function Notificacao({ conteudo }) {
  const [notificacaoAberta, setNotificacaoAberta] = useState(-1);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    setNotificacoes(conteudo);
  }, []);

  const handleNotificacaoClick = (i) => {
    setNotificacaoAberta(notificacaoAberta === i ? -1 : i);
    notificacoes[i].visto = true;
  }

  return (
    <div className='notificacoes-container'>
        <h4>Notificações</h4>
        <div className='notificacoes-content'>
            {/* {conteudo.length == 0 && <p className='nenhuma-notificacao-aviso'>Nenhuma notificação</p>} */}
            <div className='itens-notificacao-container'>
              {notificacoes.map((x, i) => (
                <ItemNotificacao onBtnClick={() => handleNotificacaoClick(i)}
                                 key={i} 
                                 titulo={x.titulo} 
                                 descricao={x.msg} 
                                 data={x.data} 
                                 visto={x.visto} 
                                 aberto={i === notificacaoAberta}/>
              ))}
            </div>
        </div>
    </div>
  )
}

export default Notificacao