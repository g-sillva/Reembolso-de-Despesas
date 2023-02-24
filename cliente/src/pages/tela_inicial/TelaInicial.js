import React, { useState } from 'react';
import CardLancamento from '../../components/card_lancamento/CardLancamento';
import CardTelaInicial from '../../components/card_tela_inicial/CardTelaInicial';
import Header from '../../components/header/Header';
import { Lancamentos, Usuarios } from '../../data/data';

import "./TelaInicial.css";

function TelaInicial() {
  const [lancamentos, setLancamentos] = useState(Lancamentos);

  const lancamentosOriginal = Lancamentos;

  const buscarLancamentoPorTitulo = (titulo) => {
    setLancamentos(lancamentosOriginal.filter(x => x.titulo.toLowerCase().includes(titulo.toLowerCase())));
  }

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
            <div className='lancamentos-content-header'>
              <button className='lancamento-adicionar-btn'>ADICIONAR LANÇAMENTO</button>

              <div className='lancamento-content-header-search-container'>

                <div className='input-container'>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type="text"
                         placeholder='Pesquise pelo título de um lançamento' 
                         onChange={(e) => buscarLancamentoPorTitulo(e.target.value)}/>
                </div>

                <div className='filter-container'>
                  <i className="fa-solid fa-filter"></i>
                  <p>2</p>
                </div>
              </div>
            </div>

            <div className='lancamentos-container'>
              {lancamentos.map((x, i) => (
                <CardLancamento key={i} valor={x.valor} status={x.status} titulo={x.titulo} descricao={x.descricao}/>
              ))}
            </div>
          </div>

        </div>
    </section>
  )
}

export default TelaInicial