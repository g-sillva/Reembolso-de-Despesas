import React, { useContext, useEffect, useState } from 'react';

import "./CardLancamento.css";

function CardLancamento({ valor = "0", 
                          status = "EM RASCUNHO", 
                          data, 
                          titulo = "-", 
                          descricao = "-", 
                          categoria = "CATEGORIA", 
                          comprovativo, 
                          aoAbrirEdicao }) {

  const [isImagemOpen, setIsImagemOpen] = useState(false);
  const [progressoBar, setProgressoBar] = useState(0);
  const [valorExibido, setValorExibido] = useState(valor);

  const handleImgPreviewClick = () => {
    if (comprovativo !== "") {
        setIsImagemOpen(true);
    }
  }

  useEffect(() => {
    let x = valorExibido;
    x = x + '';
    x = parseInt(x.replace(/[\D]+/g, ''));
    x = x + '';
    x = x.replace(/([0-9]{2})$/g, ",$1");

    if (x.length > 6) {
      x = x.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }

    setValorExibido(x);
    if(x == 'NaN') setValorExibido('0,00');
  }, [])

  useEffect(() => {
    if (status === "EM_RASCUNHO") setProgressoBar(0);
    if (status === "ENVIADO") setProgressoBar(20);
    if (status === "ANALISE") setProgressoBar(50);
    if (status === "CREDITADO") setProgressoBar(100);
    if (status === "NEGADO") setProgressoBar(100);
  }, [status]);

  return (
    <div className='card-lancamento'>
      {isImagemOpen && (
        <>
          <div className='card-lancamento-preview-bg' onClick={() => setIsImagemOpen(false)}></div>
          <div className='card-lancamento-preview-img-container'>
          <img src={`data:image/jpeg;base64,${comprovativo}`} />
            <i className="fa-solid fa-xmark card-lancamento-preview-img-button" onClick={() => setIsImagemOpen(false)}></i>
          </div>
        </>
      )}
      <div className='card-lancamento-top-container'>
        <div className='card-lancamento-textos-container'>
          <h4 className='card-lancamento-texto-titulo' style={{color: titulo === "-" && "red"}}>
            {titulo.length > 24 ? titulo.substring(0, 24) + "..." : titulo}
          </h4>
          <p className='card-lancamento-texto-descricao'>{descricao.length > 110 ? descricao.substring(0, 110) + "..." : descricao}</p>
          <p className='card-lancamento-texto-categoria' style={{backgroundColor: categoria === "CATEGORIA" && "#FF4747"}} >{categoria.replace("_", " ")}</p>
        </div>
        <div className='card-lancamento-icones-container'>
          <i className="fa-solid fa-pen" onClick={aoAbrirEdicao}></i>
          <i className="fa-regular fa-image" style={{color: comprovativo === "" && "#FF4747"}} onClick={() => handleImgPreviewClick()}></i>
        </div>
      </div>
      <div className='card-lancamento-bottom-container'>
        <div className='card-lancamento-bottom-status-container'>
          <div className='card-lancamento-bottom-status-bar'>
            <div className='card-lancamento-bottom-status-bar-full' style={{width: progressoBar + "%"}}></div>
            <div className='card-lancamento-bottom-status-bar-current' style={{backgroundColor: progressoBar === 0 && "#f2b422"}}></div>
            <p>%</p>
          </div>
          <p className='card-lancamento-bottom-status-text'>{status.replace("_", " ")}</p>
        </div>
        <div className='card-lancamento-bottom-text-container'>
          <p className='card-lancamento-bottom-text-date'><span>JAV</span> 2023</p>
          {(status === "EM_RASCUNHO" || valor === 0 || titulo === "-" || categoria === "Categoria" || comprovativo === undefined) && <i className="fa-solid fa-triangle-exclamation" style={{color: progressoBar === 0 && "#f2b422"}}></i>}
          <h5 style={{color: valor === 0 && "#FF4747"}}>R${valorExibido}</h5>
        </div>
      </div>
    </div>
  )
}

export default CardLancamento