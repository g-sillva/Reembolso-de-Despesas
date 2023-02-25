import React, { useState } from 'react';

import "./CardFiltro.css";

const filtros_status = [
  {"nome": "Em rascunho", "valor": "em_rascunho"},
  {"nome": "Enviado", "valor": "enviado"},
  {"nome": "Aguardando reembolso", "valor": "aguardando_reembolso"},
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

function CardFiltro({ onCloseClick, enviarFiltrosPorStatus, enviarFiltrosPorCategoria }) {
  const [statusSelecionados, setStatusSelecionados] = useState([]);
  const [categoriasSelecionados, setCategoriasSelecionados] = useState([]);

  const handleSelecionarStatus = (i) => {
    if (statusSelecionados.includes(filtros_status[i].valor)) {
      setStatusSelecionados(statusSelecionados.filter(x => x != filtros_status[i].valor));
    } else {
      setStatusSelecionados([...statusSelecionados, filtros_status[i].valor]);
    }
  }

  const handleSelecionarCategorias = (i) => {
    if (categoriasSelecionados.includes(filtros_categorias[i].valor)) {
      setCategoriasSelecionados(categoriasSelecionados.filter(x => x != filtros_categorias[i].valor));
    } else {
      setCategoriasSelecionados([...categoriasSelecionados, filtros_categorias[i].valor]);
    }
  }

  const handleClicarFiltrar = () => {
    enviarFiltrosPorStatus(statusSelecionados);
    enviarFiltrosPorCategoria(categoriasSelecionados);
    onCloseClick();
  }

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
            <input type="number" placeholder='Preço Min.'/>
            <input type="number" placeholder='Preço Max.'/>
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