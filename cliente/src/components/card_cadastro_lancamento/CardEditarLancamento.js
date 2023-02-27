import React, { useState } from 'react';

import "./CardEditarLancamento.css";

function CardEditarLancamento({ tituloCard = "", tituloLanc = "", valorCard = "", categoriaCard = 'Categoria', descricaoCard = "", comprovativoCard = "", onCloseClick}) {
  const [titulo, setTitulo] = useState(tituloLanc);
  const [valor, setValor] = useState(valorCard);
  const [categoria, setCategoria] = useState(categoriaCard);
  const [descricao, setDescricao] = useState(descricaoCard);
  const [comprovativo, setComprovativo] = useState(comprovativoCard);

  return (
    <div className='card-editar-lancamento-container'>
    <div className='card-editar-lancamento-dark-bg'></div>
    <div className='card-editar-lancamento-content'>
      <i className="fa-solid fa-xmark" onClick={onCloseClick}></i>
      <div className='card-editar-lancamento-header'>
        <h2>{tituloCard}</h2>
        <p>Por favor, preencha as informações abaixo</p>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>

        <div className='card-editar-lancamento-input'>
          <input type="text" name='titulo' placeholder='Título *' maxLength="50" value={titulo} required onChange={(e) => setTitulo(e.target.value)}/>
          <p>{titulo.length}/50</p>
        </div>

        <div className='card-editar-lancamento-input-flex'>
          <input type="number" name='valor' placeholder='Valor *' value={valor} required onChange={(e) => setValor(e.target.value)}/>
          <select id='categoria' name='categoria' value={categoria} required onChange={(e) => setCategoria(e.target.value)}>
            <option value="categoria" disabled>Categoria</option>
            <option value="ALIEMENTACAO">Alimentação</option>
            <option value="TRANSPORTE_GASOLINA">Transporte/Gasolina</option>
            <option value="HOSPEDAGEM">Hospedagem</option>
            <option value="SOFTWARE">Software</option>
            <option value="TREINAMENTO">Treinamento</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div className='card-editar-lancamento-textarea'>
          <textarea rows="10" placeholder='Descrição' maxLength="500" value={descricao} name='descricao' onChange={(e) => setDescricao(e.target.value)}></textarea> 
          <p>{descricao.length}/500</p>
        </div>

        <div className='card-editar-lancamento-upload'>
          <label htmlFor='upload-img'>
            <p className='titulo-lancamento-upload'>Comprovativo *</p>
            <i className="fa-solid fa-cloud-arrow-up"></i>
            <p className='nome-arquivo-lancamento-upload'>{comprovativo}</p>
          </label>
          <input id='upload-img' type="file" name='comprovativo' value={comprovativo} onChange={(e) => setComprovativo(e.target.value)}/>
        </div>
        <p className='card-editar-lancamento-upload-msg'>Apenas arquivos menores que 5Mb no formato PNG ou JPEG</p>

        <input type="submit" value="ADICIONAR"/>
      </form>
    </div>
  </div>
  )
}

export default CardEditarLancamento