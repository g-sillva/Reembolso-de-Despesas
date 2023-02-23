import React from 'react';
import CardLancamento from '../../components/card_lancamento/CardLancamento';
import CardTelaInicial from '../../components/card_tela_inicial/CardTelaInicial';
import Header from '../../components/header/Header';
import { Lancamentos, Usuarios } from '../../data/data';

import "./TelaInicial.css";

function TelaInicial() {

  console.log(Lancamentos);

  return (
    <section className='container-tela-inicial'>
        <Header usuario={Usuarios[0]}/>

        <div className='tela-inicial-cards-container'>
          <CardTelaInicial titulo="$ Total" dado="R$0,00" img_url="/img/card-tela-inicial/card_total.png" />
          <CardTelaInicial titulo="Lancamento" dado="0" img_url="/img/card-tela-inicial/card_qnt_lancamentos.png" />
          <CardTelaInicial titulo="Data Último" dado="-" img_url="/img/card-tela-inicial/card_data.png" />
          <CardTelaInicial titulo="Creditados" dado="0" img_url="/img/card-tela-inicial/card_creditados.png" />
        </div>

        <div className='tela-inicial-lancamentos-container'>

          <div className='lancamentos-container-header'>
            <span className='linha'></span>
            <p>SEUS LANÇAMENTOS</p>
            <span className='linha'></span>
          </div>
          
          <div className='lancamentos-content'>
            {/* <div>
              <p>Você ainda não possui nenhum lançamento</p>
              <i className="fa-regular fa-face-frown"></i>
            </div>
            <button className='lancamento-adicionar-btn'>ADICIONAR LANÇAMENTO</button> */}
            {Lancamentos.map((x, i) => (
              <CardLancamento key={i} valor={x.valor} status={x.status} titulo={x.titulo} descricao={x.descricao}/>
            ))}
          </div>

        </div>
    </section>
  )
}

export default TelaInicial