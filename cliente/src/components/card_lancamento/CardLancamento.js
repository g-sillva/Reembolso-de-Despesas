import React, { useEffect, useState } from 'react';

import "./CardLancamento.css";

function CardLancamento({ valor = "0", 
                          status = "EM RASCUNHO", 
                          data, 
                          titulo = "-", 
                          descricao = "-", 
                          categoria = "Categoria", 
                          comprovativo, 
                          aoAbrirEdicao }) {

  const [isImagemOpen, setIsImagemOpen] = useState(false);
  const [progressoBar, setProgressoBar] = useState(0);

  const handleImgPreviewClick = () => {
    if (comprovativo !== undefined) {
        setIsImagemOpen(true);
    }
  }

  useEffect(() => {
    if (status === "EM_RASCUNHO") setProgressoBar(0);
    if (status === "ENVIADO") setProgressoBar(20);
    if (status === "ANALISE") setProgressoBar(50);
    if (status === "CREDITADO") setProgressoBar(100);
    if (status === "NEGADO") setProgressoBar(100);
  }, [status])

  valor /= 100;
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
          <h4 className='card-lancamento-texto-titulo' style={{color: titulo === "-" && "red"}}>{titulo}</h4>
          <p className='card-lancamento-texto-descricao'>{descricao}</p>
          <p className='card-lancamento-texto-categoria' style={{backgroundColor: categoria === "Categoria" && "#FF4747"}} >{categoria.replace("_", " ")}</p>
        </div>
        <div className='card-lancamento-icones-container'>
          <i className="fa-solid fa-pen" onClick={aoAbrirEdicao}></i>
          <i className="fa-regular fa-image" style={{color: comprovativo === undefined && "#FF4747"}} onClick={() => handleImgPreviewClick()}></i>
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
          <h5 style={{color: valor === 0 && "#FF4747"}}>R${valor}</h5>
        </div>
      </div>
    </div>
  )
}

export default CardLancamento