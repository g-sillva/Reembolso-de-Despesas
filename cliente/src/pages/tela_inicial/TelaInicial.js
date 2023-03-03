import React, { useEffect, useState } from 'react';
import CardLancamento from '../../components/card_lancamento/CardLancamento';
import CardTelaInicial from '../../components/card_tela_inicial/CardTelaInicial';
import Header from '../../components/header/Header';
import ModalFiltro from '../../components/card_filtro/CardFiltro';
import { Lancamentos, Usuarios } from '../../data/data';

import "./TelaInicial.css";
import CardEditarLancamento from '../../components/card_cadastro_lancamento/CardEditarLancamento';

function TelaInicial() {
  const [lancamentos, setLancamentos] = useState(Lancamentos);

  const [filtrosPorStatus, setFiltrosPorStatus] = useState([]);
  const [filtrosPorCategoria, setFiltrosPorCategoria] = useState([]);
  const [filtroPorPrecoMin, setFiltroPorPrecoMin] = useState("");
  const [filtroPorPrecoMax, setFiltroPorPrecoMax] = useState("");
  const [quantidadeFiltros, setQuantidadeFiltros] = useState(0);

  const [isFiltroModalAberto, setIsFiltroModalAberto] = useState(false);
  const [isEditarModalAberto, setIsEditarModalAberto] = useState(false);
  const [isAdicionarModalAberto, setIsAdicionarModalAberto] = useState(false);

  const [currentModalData, setCurrentModalData] = useState(lancamentos[0]);

  const lancamentosOriginal = Lancamentos;

  useEffect(() => {
    if (isFiltroModalAberto || isAdicionarModalAberto || isEditarModalAberto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFiltroModalAberto, isEditarModalAberto, isAdicionarModalAberto]);

  useEffect(() => {
    setLancamentos(lancamentosOriginal);
    setQuantidadeFiltros(0);

    if (filtroPorPrecoMin !== "") {
      setLancamentos(lancamentos.filter(x => Number(x.valor) >= filtroPorPrecoMin));
      setQuantidadeFiltros(quantidadeFiltros + 1);
    }
    if (filtroPorPrecoMax !== "") {
      setLancamentos(lancamentos.filter(x => Number(x.valor) <= filtroPorPrecoMax));
      setQuantidadeFiltros(quantidadeFiltros + 1);
    }
    if (filtrosPorStatus.length !== 0) {
      setLancamentos(lancamentos.filter(x => filtrosPorStatus.includes(x.status.toLowerCase())));
    }
    if (filtrosPorCategoria.length !== 0) {
      setLancamentos(lancamentos.filter(x => filtrosPorCategoria.includes(x.categoria.toLowerCase())));
    }

    setQuantidadeFiltros(quantidadeFiltros + filtrosPorStatus.length + filtrosPorCategoria.length);

  }, [filtrosPorStatus, filtrosPorCategoria, filtroPorPrecoMin, filtroPorPrecoMax]);

  const buscarLancamentoPorTitulo = (titulo) => {
    setLancamentos(lancamentosOriginal.filter(x => x.titulo.toLowerCase().includes(titulo.toLowerCase())));
  }

  const handleAbrirEdicaoLancamento = (lancamento) => {
    setCurrentModalData(lancamento);
    setIsEditarModalAberto(true);
  }

  const handleSomarValores = () => {
    var atual = lancamentos.reduce((total, x) => total + Number(x.valor), 0) / 100;
    return atual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  const handleDataUltimo = () => {
    let x = lancamentos;
    if (x.length === 0) return "-";

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
            <div className='lancamentos-content-header'>
              <button className='lancamento-adicionar-btn' onClick={() => setIsAdicionarModalAberto(true)}>ADICIONAR LANÇAMENTO</button>

              <div className='lancamento-content-header-search-container'>
                <div className='input-container'>
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type="text"
                         placeholder='Pesquise pelo título de um lançamento' 
                         onChange={(e) => buscarLancamentoPorTitulo(e.target.value)}/>
                </div>

                <div className='filter-container' onClick={() => setIsFiltroModalAberto(!isFiltroModalAberto)}>
                  <i className="fa-solid fa-filter"></i>
                  {quantidadeFiltros !== 0 && <p>{quantidadeFiltros}</p>}
                </div>
              </div>
            </div>

            {(!isEditarModalAberto && !isAdicionarModalAberto && !isFiltroModalAberto) && <div className="lancamentos-container">
              {lancamentos.map((x, i) => (
                <CardLancamento key={i} 
                                valor={x.valor} 
                                status={x.status} 
                                titulo={x.titulo} 
                                descricao={x.descricao} 
                                categoria={x.categoria} 
                                comprovativo={x.comprovativo}
                                aoAbrirEdicao={() => handleAbrirEdicaoLancamento(x)}/>
              ))}
            </div>}


            {lancamentos.length === 0 &&
              <div className='lancamento-content-nenhum-container'>
                <p>Nenhum lançamento encontrado!</p>
                <i className="fa-regular fa-face-frown"></i>
              </div>}
          </div>
        </div>

        {isFiltroModalAberto && <ModalFiltro onCloseClick={() => setIsFiltroModalAberto(false)}
                                             enviarFiltrosPorStatus={(x) => setFiltrosPorStatus(x)}
                                             enviarFiltrosPorCategoria={(x) => setFiltrosPorCategoria(x)}
                                             enviarFiltrosPorPrecoMin={(x) => setFiltroPorPrecoMin(x)}
                                             enviarFiltrosPorPrecoMax={(x) => setFiltroPorPrecoMax(x)}
                                             filtrosPorStatusSelecionaods={filtrosPorStatus}
                                             filtrosPorCategoriaSelecionaods={filtrosPorCategoria}
                                             filtroPrecoMinSelecionado={filtroPorPrecoMin}
                                             filtroPrecoMaxSelecionado={filtroPorPrecoMax} />}

        {isAdicionarModalAberto && <CardEditarLancamento onCloseClick={() => setIsAdicionarModalAberto(false)}
                                                      tituloCard="Adicionar Lançamento"/>}

        {isEditarModalAberto && <CardEditarLancamento onCloseClick={() => setIsEditarModalAberto(false)}
                                               tituloCard="Editar Lançamento"
                                               tituloLanc={currentModalData.titulo}
                                               valorCard={currentModalData.valor}
                                               categoriaCard={currentModalData.categoria}
                                               descricaoCard={currentModalData.descricao}
                                               comprovativoCard={currentModalData.img}/>}
    </section>
  )
}

export default TelaInicial