import React from 'react';

import "./CardEditarLancamento.css";

function CardEditarLancamento({ onCloseClick }) {
  return (
    <div className='card-editar-lancamento-container'>
    <div className='card-editar-lancamento-dark-bg'></div>
    <div className='card-editar-lancamento-content'>
      <i className="fa-solid fa-xmark" onClick={onCloseClick}></i>
      <div className='card-editar-lancamento-header'>
        <h2>Adicionar um Lançamento</h2>
        <p>Por favor, preencha as informações abaixo</p>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>

        <div className='card-editar-lancamento-input'>
          <input type="text" name='titulo' placeholder='Título *' maxLength="50" required/>
          <p>0/50</p>
        </div>

        <div className='card-editar-lancamento-input-flex'>
          <input type="number" name='valor' placeholder='Valor *' required/>
          <select id='categoria' name='categoria' required>
            <option value="categoria" disabled selected>Categoria</option>
            <option value="ALIEMENTACAO">Alimentação</option>
            <option value="TRANSPORTE_GASOLINA">Transporte/Gasolina</option>
            <option value="HOSPEDAGEM">Hospedagem</option>
            <option value="SOFTWARE">Software</option>
            <option value="TREINAMENTO">Treinamento</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div className='card-editar-lancamento-textarea'>
          <textarea rows="10" placeholder='Descrição' maxLength="500" name='descricao'></textarea> 
          <p>0/500</p>
        </div>

        <div className='card-editar-lancamento-upload'>
          <label for='upload-img'>
            <p>Comprovativo *</p>
            <i className="fa-solid fa-cloud-arrow-up"></i>
          </label>
          <input id='upload-img' type="file" name='comprovativo'/>
        </div>
        <p className='card-editar-lancamento-upload-msg'>Apenas arquivos menores que 5Mb no formato PNG ou JPEG</p>

        <input type="submit" value="ADICIONAR"/>
      </form>
    </div>
  </div>
  )
}

export default CardEditarLancamento