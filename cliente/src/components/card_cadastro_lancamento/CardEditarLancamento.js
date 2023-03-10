import React, { useEffect, useState } from 'react';

import "./CardEditarLancamento.css";

function CardEditarLancamento({ tituloCard = "", 
                                tituloLanc = "", 
                                valorCard = "000", 
                                categoriaCard = 'Categoria', 
                                descricaoCard = "", 
                                comprovativoCard = "", 
                                onCloseClick,
                                onActionClick}) {
  const [titulo, setTitulo] = useState(tituloLanc === "-" ? "" : tituloLanc);
  const [valor, setValor] = useState(valorCard);
  const [valorFormatado, setValorFormatado] = useState(valor);
  const [categoria, setCategoria] = useState(categoriaCard);
  const [descricao, setDescricao] = useState(descricaoCard);
  const [comprovativo, setComprovativo] = useState(comprovativoCard);
  
  const [imagemSelecionada, setImagemSelecionada] = useState();
  const [imagemPreview, setImagemPreview] = useState();

  const handleEdicaoValor = (number) => {
    if (number.toString().includes("R$")) {
      //eslint-disable-next-line
      setValor(number.toString().substring(2).replace(/\.|\,/g, "").trim());
    } else {
      //eslint-disable-next-line
      setValor(number.toString().replace(/\.|\,/g, "").trim());
    }
    let x = number;
    x = x + '';
    x = parseInt(x.replace(/[\D]+/g, ''));
    x = x + '';
    x = x.replace(/([0-9]{2})$/g, ",$1");

    if (x.length > 6) {
      x = x.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    setValorFormatado(x);
    if(x === 'NaN') setValorFormatado('0,00');
  }

  useEffect(() => {
    setValorFormatado(valor);
    handleEdicaoValor(valorCard);
  }, []);

  useEffect(() => {
    if (!imagemSelecionada) {
      setImagemPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(imagemSelecionada);

    setComprovativo(imagemSelecionada);
    setImagemPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl)
 }, [imagemSelecionada]);

  return (
    <div className='card-editar-lancamento-container'>
    <div className='card-editar-lancamento-dark-bg'></div>
    <div className='card-editar-lancamento-content'>
      <i className="fa-solid fa-xmark" onClick={onCloseClick}></i>
      <div className='card-editar-lancamento-header'>
        <h2>{tituloCard}</h2>
        <p>Por favor, preencha as informa????es abaixo</p>
      </div>
      <form onSubmit={(event) => event.preventDefault()}>

        <div className='card-editar-lancamento-input'>
          <input type="text" name='titulo' placeholder='T??tulo *' maxLength="50" value={titulo} onChange={(e) => setTitulo(e.target.value)}/>
          <p>{titulo.length}/50</p>
        </div>

        <div className='card-editar-lancamento-input-flex'>

          <input type="text" name='valor' placeholder='Valor *' minLength={4} value={"R$ " + valorFormatado} onChange={(e) => handleEdicaoValor(e.target.value)}/>

          <select id='categoria' name='categoria' value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="CATEGORIA">Categoria</option>
            <option value="ALIEMENTACAO">Alimenta????o</option>
            <option value="TRANSPORTE_GASOLINA">Transporte/Gasolina</option>
            <option value="HOSPEDAGEM">Hospedagem</option>
            <option value="SOFTWARE">Software</option>
            <option value="TREINAMENTO">Treinamento</option>
            <option value="OUTRO">Outro</option>
          </select>
        </div>

        <div className='card-editar-lancamento-textarea'>
          <textarea rows="10" placeholder='Descri????o' maxLength="500" value={descricao} name='descricao' onChange={(e) => setDescricao(e.target.value)}></textarea> 
          <p>{descricao.length}/500</p>
        </div>

        <div className='card-editar-lancamento-upload'>
          {imagemSelecionada && (
                <>
                <label htmlFor='upload-img'>
                  <p className='titulo-lancamento-upload'>Comprovativo *</p>
                  <img src={imagemPreview} alt="comprovativo"/>
                </label>
                <input id='upload-img' 
                       type="file" 
                       name='comprovativo' 
                       accept="image/*"
                       onChange={(e) => setImagemSelecionada(e.target.files[0])}/>
              </>
          )}
          {comprovativo !== "" && comprovativo !== null && imagemSelecionada === undefined && (
              <>
                <label htmlFor='upload-img'>
                  <p className='titulo-lancamento-upload'>Comprovativo *</p>
                  <img src={`data:image/jpeg;base64,${comprovativo.data}`} alt="comprovativo"/>
                </label>
                <input id='upload-img' 
                       type="file" 
                       name='comprovativo'
                       accept="image/*"
                       onChange={(e) => setImagemSelecionada(e.target.files[0])}/>
              </>
          )}
          {(comprovativo === "" || comprovativo === null) && !imagemSelecionada &&
          (
            <>
              <label htmlFor='upload-img'>
                <p className='titulo-lancamento-upload'>Comprovativo *</p>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <p className='nome-arquivo-lancamento-upload'>{comprovativo}</p>
              </label>
              <input id='upload-img' 
                    type="file"
                    name='comprovativo' 
                    accept="image/*"
                    value={comprovativo}
                    onChange={(e) => setImagemSelecionada(e.target.files[0])}/>
            </>
          )
            }
        </div>
        <p className='card-editar-lancamento-upload-msg'>Apenas arquivos menores que 5Mb no formato PNG ou JPEG</p>

        <input type="submit" value={tituloCard === "Editar Lan??amento" ? "EDITAR" : "CADASTRAR"} onClick={() => onActionClick(titulo, valor, categoria, descricao, comprovativo)}/>
      </form>
    </div>
  </div>
  )
}

export default CardEditarLancamento