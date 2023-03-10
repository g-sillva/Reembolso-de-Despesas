import React, { useContext, useEffect, useState } from 'react';
import CardLancamento from '../../components/card_lancamento/CardLancamento';
import CardTelaInicial from '../../components/card_tela_inicial/CardTelaInicial';
import Header from '../../components/header/Header';
import ModalFiltro from '../../components/card_filtro/CardFiltro';
import axios from 'axios';

import "./TelaInicial.css";
import CardEditarLancamento from '../../components/card_cadastro_lancamento/CardEditarLancamento';
import Context from '../../Context';
import { useNavigate } from 'react-router';
import CardLancamentoCarregando from '../../components/card_lancamento/card_lancamento_carregando/CardLancamentoCarregando';

function TelaInicial() {
  const [lancamentos, setLancamentos] = useState([]);
  const [context] = useContext(Context);

  const [filtrosPorStatus, setFiltrosPorStatus] = useState([]);
  const [filtrosPorCategoria, setFiltrosPorCategoria] = useState([]);
  const [filtroPorPrecoMin, setFiltroPorPrecoMin] = useState("");
  const [filtroPorPrecoMax, setFiltroPorPrecoMax] = useState("");
  const [quantidadeFiltros, setQuantidadeFiltros] = useState(0);

  const [paginaLancamentos, setPaginaLancamentos] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [isPaginacaoCarregando, setIsPaginacaoCarregando] = useState(false);
  const [isLancamentosCarregando, setIsLancamentosCarregando] = useState(true);

  const [isFiltroModalAberto, setIsFiltroModalAberto] = useState(false);
  const [isEditarModalAberto, setIsEditarModalAberto] = useState(false);
  const [isAdicionarModalAberto, setIsAdicionarModalAberto] = useState(false);

  const [currentModalData, setCurrentModalData] = useState(lancamentos[0]);

  const [lancamentosOriginal, setLancamentosOriginal] = useState([]);

  const navigate = useNavigate();

  const handleCarregarMaisLancamentos = () => {
    setIsPaginacaoCarregando(true);
    axios({
      url: `https://reembolso-de-despesas-production.up.railway.app/api/lancamentos/user?id=${context.usuario.id}&page=${paginaLancamentos}&size=10`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${context.token}`
      }
    }).then((res) => {

      setLancamentos(l => [...l, ...res.data.content]);
      setLancamentosOriginal(lancamentos);
      setIsPaginacaoCarregando(false);
      setPaginaLancamentos(paginaLancamentos + 1);
    }).catch((err) => {
      console.log(err);
      setIsPaginacaoCarregando(false);
    });
  }

  useEffect(() => {
    if (lancamentosOriginal.length < lancamentos.length) {
      setLancamentosOriginal(lancamentos);
    }
  }, [lancamentos])

  let chamouRequisicao = false;

  useEffect(() => {
    if (context === null) {
      navigate("/logincadastro");
      return;
    };

    if (!chamouRequisicao) {
      axios({
        url: `https://reembolso-de-despesas-production.up.railway.app/api/lancamentos/user?id=${context.usuario.id}&page=0&size=10`,
        method: 'get',
        headers: {
          Authorization: `Bearer ${context.token}`
        }
      }).then((res) => {
        setLancamentos(res.data.content);
        setLancamentosOriginal(res.data.content);
        setIsLancamentosCarregando(false);
        setTotalPaginas(res.data.totalPages);
      }).catch((err) => {
        console.log(err);
        setIsLancamentosCarregando(false);
      });
      chamouRequisicao = true;
    }

  }, [context])

  useEffect(() => {
    if (isFiltroModalAberto || isAdicionarModalAberto || isEditarModalAberto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFiltroModalAberto, isEditarModalAberto, isAdicionarModalAberto]);

  useEffect(() => {
    let x = lancamentosOriginal;

    if (filtrosPorStatus.length !== 0) {
      x = x.filter(y => filtrosPorStatus.includes(y.status.toLowerCase()));
    }
    if (filtrosPorCategoria.length !== 0) {
      x = x.filter(y => filtrosPorCategoria.includes(y.categoria.toLowerCase()));
    }

    setLancamentos(x);
    setQuantidadeFiltros(filtrosPorStatus.length + filtrosPorCategoria.length);

  }, [filtrosPorStatus, filtrosPorCategoria, filtroPorPrecoMin, filtroPorPrecoMax]);

  const buscarLancamentoPorTitulo = (titulo) => {
    if (filtrosPorStatus.length !== 0 || filtrosPorCategoria.length !== 0) {
      setLancamentos(lancamentosOriginal.filter(x => 
        x.titulo.toLowerCase().includes(titulo.toLowerCase()) &&
        filtrosPorStatus.includes(x.status.toLowerCase()) &&
        filtrosPorCategoria.includes(x.categoria.toLowerCase())));
    } else {
      setLancamentos(lancamentosOriginal.filter(x => x.titulo.toLowerCase().includes(titulo.toLowerCase())));
    }
  }

  const handleAbrirEdicaoLancamento = (lancamento) => {
    setCurrentModalData(lancamento);
    setIsEditarModalAberto(true);
  }

  const handleSomarValores = () => {
    var atual = lancamentosOriginal.reduce((total, x) => total + Number(x.valor), 0) / 100;
    return atual.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
  }

  const handleDataUltimo = () => {
    let x = lancamentosOriginal;
    if (x.length === 0) return "-";

    x = x.sort((a,b) => {
      let aSplit = a.data.split("-");
      let bSplit = b.data.split("-");
      
      let aDate = new Date(aSplit[2], aSplit[1], aSplit[0]);
      let bDate = new Date(bSplit[2], bSplit[1], bSplit[0]);
      return bDate.getTime() - aDate.getTime();
    });

    return x[0].data.substring(8, 10) + "/" + x[0].data.substring(5, 7) + "/" + x[0].data.substring(0, 4);
  }

  const handleCreditados = () => {
    return lancamentosOriginal.filter(x => x.status === "CREDITADO").length;
  }

  const handleAddLancamento = (titulo, valor, categoria, descricao, comprovativo) => {
    setIsAdicionarModalAberto(false);
    let estaEmRascunho = titulo === "" || valor === 0 || categoria === "CATEGORIA" || comprovativo === "";

    let lancamentoObj = {
      "titulo": titulo === "" ? "-" : titulo,
      "descricao": descricao,
      "categoria": categoria.toUpperCase(),
      "valor": valor === "" ? "0" : valor,
      "status": estaEmRascunho ? "EM_RASCUNHO" : "ENVIADO",
      "usuarioId": context.usuario.id,
    };

    const lancaJSON = JSON.stringify(lancamentoObj);
    const lancaBlob = new Blob([lancaJSON], {
      type: 'application/json',
    });

    var formData = new FormData();

    formData.append('lancamento', lancaBlob);
    formData.append('img', comprovativo);

    axios({
      url: `https://reembolso-de-despesas-production.up.railway.app/api/lancamentos`,
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${context.token}`
      }
    }).then((res) => {
      setLancamentos([res.data, ...lancamentos]);
    }).catch((err) => {
      console.log(err);
    })
  }

  const handleEdicaoLancamento = (titulo, valor, categoria, descricao, comprovativo) => {
    setIsEditarModalAberto(false);
    let estaEmRascunho = titulo === "" || valor === 0 || categoria === "CATEGORIA" || comprovativo === "";

    let lancamentoObj = {
      "titulo": titulo === "" ? "-" : titulo,
      "descricao": descricao,
      "valor": valor === "" ? "0" : valor,
      "categoria": categoria.toUpperCase(),
      "status": estaEmRascunho ? "EM_RASCUNHO" : "ENVIADO",
    };

    const lancaJSON = JSON.stringify(lancamentoObj);
    const lancaBlob = new Blob([lancaJSON], {
      type: 'application/json',
    });

    var formData = new FormData();

    formData.append('fields', lancaBlob);
    formData.append('img', comprovativo);

    axios({
      url: `https://reembolso-de-despesas-production.up.railway.app/api/lancamentos/${currentModalData.id}`,
      method: 'patch',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${context.token}`
      }
    }).then((res) => {
      const newLancamentos = lancamentos.map((l) => {
        if (l.id === currentModalData.id) {
          return res.data;
        }
        return l;
      });
      setLancamentos(newLancamentos);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <section className='container-tela-inicial'>
        <Header usuario={context !== null ? context.usuario.nome : "-"}/> 

        <div className='tela-inicial-cards-container'>
          <CardTelaInicial titulo="$ Total" dado={handleSomarValores()} img_url="/img/card-tela-inicial/card_total.png" />
          <CardTelaInicial titulo="Lancamento" dado={lancamentosOriginal.length} img_url="/img/card-tela-inicial/card_qnt_lancamentos.png" />
          <CardTelaInicial titulo="Data ??ltimo" dado={handleDataUltimo()} img_url="/img/card-tela-inicial/card_data.png" />
          <CardTelaInicial titulo="Creditados" dado={handleCreditados()} img_url="/img/card-tela-inicial/card_creditados.png" />
        </div>

        <div className='tela-inicial-lancamentos-container'>

          <div className='lancamentos-container-header'>
            <span className='linha'></span>
            <p>SEUS LAN??AMENTOS</p>
            <span className='linha'></span>
          </div>

          
          <div className='lancamentos-content'>
            <div className='lancamentos-content-header'>
              {!isLancamentosCarregando && 
              <>
                <button className='lancamento-adicionar-btn' onClick={() => setIsAdicionarModalAberto(true)}>ADICIONAR LAN??AMENTO</button>

                <div className='lancamento-content-header-search-container'>
                  <div className='input-container'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text"
                          placeholder='Pesquise pelo t??tulo de um lan??amento' 
                          onChange={(e) => buscarLancamentoPorTitulo(e.target.value)}/>
                  </div>

                  <div className='filter-container' onClick={() => setIsFiltroModalAberto(!isFiltroModalAberto)}>
                    <i className="fa-solid fa-filter"></i>
                    {quantidadeFiltros !== 0 && <p>{quantidadeFiltros}</p>}
                  </div>
                </div>
              </>
              }
            </div>

            {(!isEditarModalAberto && !isAdicionarModalAberto && !isFiltroModalAberto) && <div className="lancamentos-container">
              {lancamentos.map((x, i) => (
                <CardLancamento key={i} 
                                valor={x.valor} 
                                status={x.status}
                                data={x.data}
                                titulo={x.titulo} 
                                descricao={x.descricao} 
                                categoria={x.categoria} 
                                comprovativo={(x.img === null || x.img === undefined) ? "" : x.img.data}
                                aoAbrirEdicao={() => handleAbrirEdicaoLancamento(x)}/>
              ))}
            </div>}


            {lancamentos.length === 0 &&
              <div className='lancamento-content-nenhum-container'>
                {isLancamentosCarregando && (!isEditarModalAberto && !isAdicionarModalAberto && !isFiltroModalAberto) ? 
                <>
                  <p className='carregando-msg' style={{color: "#2BD477"}}>Carregando seus lan??amentos!</p>
                  <CardLancamentoCarregando />
                  <CardLancamentoCarregando />
                  <CardLancamentoCarregando />
                </>
                : 
                <>
                  <p>Nenhum lan??amento encontrado!</p>
                  <i className="fa-regular fa-face-frown"></i>
                </>}

              </div>}

              {totalPaginas >= paginaLancamentos && lancamentos.length > 0 &&
              <div className='lancamento-content-mostrar-mais-container'>
                {isPaginacaoCarregando ? 
                <>
                  <CardLancamentoCarregando />
                </> : <button onClick={() => handleCarregarMaisLancamentos()}>MAIS</button>}
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
                                                         onActionClick={(titulo, valor, categoria, descricao, comprovativo) => handleAddLancamento(titulo, valor, categoria, descricao, comprovativo)}
                                                         tituloCard="Adicionar Lan??amento"/>}

        {isEditarModalAberto && <CardEditarLancamento onCloseClick={() => setIsEditarModalAberto(false)}
                                               tituloCard="Editar Lan??amento"
                                               tituloLanc={currentModalData.titulo}
                                               valorCard={currentModalData.valor}
                                               categoriaCard={currentModalData.categoria}
                                               descricaoCard={currentModalData.descricao}
                                               comprovativoCard={currentModalData.img}
                                               onActionClick={(titulo, valor, categoria, descricao, comprovativo) => handleEdicaoLancamento(titulo, valor, categoria, descricao, comprovativo)}/>}
    </section>
  )
}

export default TelaInicial