import React, { useEffect, useState } from 'react';

import "./CardFiltro.css";

const filtros_status = [
  {"nome": "Em rascunho", "valor": "em_rascunho"},
  {"nome": "Enviado", "valor": "enviado"},
  {"nome": "Análise", "valor": "analise"},
  {"nome": "Negado", "valor": "negado"},
  {"nome": "Creditado", "valor": "creditado"},
];

const filtros_categorias = [
  {"nome": "Alimentação", "valor": "alimentacao"},
  {"nome": "Transporte/Gasolina", "valor": "transporte_gasolina"},
  {"nome": "Hospedagem", "valor": "hospedagem"},
  {"nome": "software", "valor": "software"},
  {"nome": "treinamento", "valor": "treinamento"},
  {"nome": "outro", "valor": "outro"},
];

function CardFiltro({ onCloseClick, 
                      enviarFiltrosPorStatus, 
                      enviarFiltrosPorCategoria,
                      enviarFiltrosPorPrecoMin,
                      enviarFiltrosPorPrecoMax,
                      filtrosPorStatusSelecionaods, 
                      filtrosPorCategoriaSelecionaods,
                      filtroPrecoMinSelecionado = "0",
                      filtroPrecoMaxSelecionado = "0"}) {
  const [statusSelecionados, setStatusSelecionados] = useState(filtrosPorStatusSelecionaods);
  const [categoriasSelecionados, setCategoriasSelecionados] = useState(filtrosPorCategoriaSelecionaods);
  const [precoMinSelecionado, setPrecoMinSelecionado] = useState(filtroPrecoMinSelecionado);
  const [precoMaxSelecionado, setPrecoMaxSelecionado] = useState(filtroPrecoMaxSelecionado);
  const [precoMinFormatado, setPrecoMinFormatado] = useState("0");
  const [precoMaxFormatado, setPrecoMaxFormatado] = useState("0");

  const handleSelecionarStatus = (i) => {
    if (statusSelecionados.includes(filtros_status[i].valor)) {
      setStatusSelecionados(statusSelecionados.filter(x => x !== filtros_status[i].valor));
    } else {
      setStatusSelecionados([...statusSelecionados, filtros_status[i].valor]);
    }
  }

  const handleSelecionarCategorias = (i) => {
    if (categoriasSelecionados.includes(filtros_categorias[i].valor)) {
      setCategoriasSelecionados(categoriasSelecionados.filter(x => x !== filtros_categorias[i].valor));
    } else {
      setCategoriasSelecionados([...categoriasSelecionados, filtros_categorias[i].valor]);
    }
  }

  const handleEdicaoValorMin = (number) => {
    if (number.toString().includes("R$")) {
      //eslint-disable-next-line
      setPrecoMinSelecionado(number.toString().substring(2).replace(/\.|\,/g, "").trim());
    } else {
      //eslint-disable-next-line
      setPrecoMinSelecionado(number.toString().replace(/\.|\,/g, "").trim());
    }
    let x = number;
    x = x + '';
    x = parseInt(x.replace(/[\D]+/g, ''));
    x = x + '';
    x = x.replace(/([0-9]{2})$/g, ",$1");

    if (x.length > 6) {
      x = x.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    setPrecoMinFormatado(x);
    if(x === 'NaN') setPrecoMinFormatado('0,00');
  }

  const handleEdicaoValorMax = (number) => {
    if (number.toString().includes("R$")) {
      //eslint-disable-next-line
      setPrecoMaxSelecionado(number.toString().substring(2).replace(/\.|\,/g, "").trim());
    } else {
      //eslint-disable-next-line
      setPrecoMaxSelecionado(number.toString().replace(/\.|\,/g, "").trim());
    }
    let x = number;
    x = x + '';
    x = parseInt(x.replace(/[\D]+/g, ''));
    x = x + '';
    x = x.replace(/([0-9]{2})$/g, ",$1");

    if (x.length > 6) {
      x = x.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    setPrecoMaxFormatado(x);
    if(x === 'NaN') setPrecoMaxFormatado('0,00');
  }

  const handleClicarFiltrar = () => {
    enviarFiltrosPorStatus(statusSelecionados);
    enviarFiltrosPorCategoria(categoriasSelecionados);
    enviarFiltrosPorPrecoMin(precoMinSelecionado);
    enviarFiltrosPorPrecoMax(precoMaxSelecionado);
    onCloseClick();
  }

  useEffect(() => {
    handleEdicaoValorMin(filtroPrecoMinSelecionado);
    handleEdicaoValorMax(filtroPrecoMaxSelecionado);
  }, []);

  return (
    <div className='card-filtro-container'>
      <div className='card-filtro-dark-bg'></div>
      <div className='card-filtro-content'>
        <i className="fa-solid fa-xmark" onClick={onCloseClick}></i>
        <div className='card-filtro-header'>
          <h2>Filtros</h2>
          <p>Insira os filtros desejados</p>
        </div>
        <form onSubmit={(event) => event.preventDefault()}>

          <h3>Status</h3>
          <div className='card-filtro-form-container'>
            {filtros_status.map((x, i) => (
              <div key={i} className={`card-filtrocheckbox-item-container ${statusSelecionados.includes(filtros_status[i].valor) && "card-filtrocheckbox-item-active"}`}>
                <i className={`fa-solid fa-check ${statusSelecionados.includes(filtros_status[i].valor) && "card-filtrocheckbox-item-icon-show"}`}></i>
                <p onClick={() => handleSelecionarStatus(i)}>{x.nome}</p>
              </div>
            ))}
          </div>

          <h3>Preço</h3>
          <div className='card-filtro-form-price-container'>
            <input type="text" placeholder='Preço Min.' disabled value={"R$ " + precoMinFormatado} onChange={(e) => handleEdicaoValorMin(e.target.value)}/>
            <input type="text" placeholder='Preço Max.' disabled value={"R$ " + precoMaxFormatado} onChange={(e) => handleEdicaoValorMax(e.target.value)}/>
          </div>

          <h3>Categoria</h3>
          <div className='card-filtro-form-container'>
            {filtros_categorias.map((x, i) => (
              <div key={i} className={`card-filtrocheckbox-item-container ${categoriasSelecionados.includes(filtros_categorias[i].valor) && "card-filtrocheckbox-item-active"}`}>
                <i className={`fa-solid fa-check ${categoriasSelecionados.includes(filtros_categorias[i].valor) && "card-filtrocheckbox-item-icon-show"}`}></i>
                <p onClick={() => handleSelecionarCategorias(i)}>{x.nome}</p>
              </div>
            ))}
          </div>

          <input type="submit" value="FILTRAR" onClick={() => handleClicarFiltrar()}/>
        </form>
      </div>
    </div>
  )
}

export default CardFiltro