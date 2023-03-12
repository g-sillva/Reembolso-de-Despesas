import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context';
import ItemNotificacao from './item_notificacao/ItemNotificacao';

import "./Notificacao.css";

function Notificacao({ conteudo }) {
  const [notificacaoAberta, setNotificacaoAberta] = useState(-1);
  const [notificacoes, setNotificacoes] = useState([]);
  const [context] = useContext(Context);

  useEffect(() => {
    if (conteudo !== null || conteudo !== undefined) {
      setNotificacoes(conteudo);
    }
  }, []);

  const handleNotificacaoClick = (i) => {
    setNotificacaoAberta(notificacaoAberta === i ? -1 : i);
    notificacoes[i].visto = true;


    if (!notificacoes[i].visto) {
      axios({
        url: `https://reembolso-de-despesas-production.up.railway.app/api/notificacoes/view/${conteudo[i].id}`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${context.token}`
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <div className='notificacoes-container'>
        <h4>Notificações</h4>
        <div className='notificacoes-content'>
            {notificacoes.length === 0 && <p className='nenhuma-notificacao-aviso'>Nenhuma notificação</p>}
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