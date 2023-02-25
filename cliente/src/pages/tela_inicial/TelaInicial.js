import React, { useState } from 'react';
import CardLancamento from '../../components/card_lancamento/CardLancamento';
import CardTelaInicial from '../../components/card_tela_inicial/CardTelaInicial';
import Header from '../../components/header/Header';
import ModalFiltro from '../../components/card_filtro/CardFiltro';
import { Lancamentos, Usuarios } from '../../data/data';

import "./TelaInicial.css";

function TelaInicial() {
  const [lancamentos, setLancamentos] = useState(Lancamentos);
  const [filtrosPorStatus, setFiltrosPorStatus] = useState([]);
  const [filtrosPorCategoria, setFiltrosPorCategoria] = useState([]);
  const [isFiltroModalAberto, setIsFiltroModalAberto] = useState(false);

  console.log(filtrosPorStatus);
  console.log(filtrosPorCategoria);

  const lancamentosOriginal = Lancamentos;

  const buscarLancamentoPorTitulo = (titulo) => {
    setLancamentos(lancamentosOriginal.filter(x => x.titulo.toLowerCase().includes(titulo.toLowerCase())));
  }

  const handleSomarValores = () => {
    var atual = lancamentos.reduce((total, x) => total + Number(x.valor), 0) / 100;
    return atual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  const handleDataUltimo = () => {
    let x = lancamentos;
    if (x.length === 0) return "-"
    x = x.sort((a,b) => {
      let aSplit = a.data.split("-");
      let bSplit = b.data.split("-");
      
      let aDate = new Date(aSplit[2], aSplit[1], aSplit[0]);
      let bDate = new Date(bSplit[2], bSplit[1], bSplit[0]);
      return bDate.getTime() - aDate.getTime();
    });

    return x[0].data.substring(8, 10) + "/" + x[0].data.substring(5, 7);
  }

  const handleCreditados = () => {
    return lancamentos.filter(x => x.status === "CREDITADO").length;
  }

  return (
    <section className='container-tela-inicial'>
        <Header usuario={Usuarios[0]}/> 

        <div className='tela-inicial-cards-container'>
          <CardTelaInicial titulo="$ Total" dado={handleSomarValores()} img_url="/img/card-tela-inicial/card_total.png" />
          <CardTelaInicial titulo="Lancamento" dado={lancamentos.length} img_url="/img/card-tela-inicial/card_qnt_lancamentos.png" />
          <CardTelaInicial titulo="Data Último" dado={handleDataUltimo()} img_url="/img/card-tela-inicial/card_data.png" />
          <CardTelaInicial titulo="Creditados" dado={handleCreditados()} img_url="/img/card-tela-inicial/card_creditados.png" />
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

                <div className='filter-container' onClick={() => setIsFiltroModalAberto(!isFiltroModalAberto)}>
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

        {isFiltroModalAberto && <ModalFiltro onCloseClick={() => setIsFiltroModalAberto(false)}
                                             enviarFiltrosPorStatus={(x) => setFiltrosPorStatus(x)}
                                             enviarFiltrosPorCategoria={(x) => setFiltrosPorCategoria(x)} />}
    </section>
  )
}

export default TelaInicial