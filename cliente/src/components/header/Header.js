import React, { useState } from 'react';
import Notificacao from '../notificacao/Notificacao';

import "./Header.css";

function Header({ usuario }) {
  const [notificacoes, setNotificacoes] = useState([]);
  const [isNotificacaoAberta, setIsNotificacaoAberta] = useState(false);

  return (
    <div className='header'>
      <img className='header-textura' src='/img/header_texture.png' alt='textura'/>
      <div className='header-container'>
        <div className='header-user-container'>
          <i className="fa-solid fa-user"></i>
          <div className='header-user-container-content'>
            <p>Olá,</p>
            <p className='header-content-username'>{usuario.nome}</p>
          </div>
        </div>
        <i className="fa-regular fa-bell" onClick={() => setIsNotificacaoAberta(!isNotificacaoAberta)}></i>
      </div>
      {isNotificacaoAberta && <Notificacao />}
    </div>
  )
}

export default Header
