import React from 'react'
import './TelaAdm.css'

function TelaAdm() {
  return (
    <section className='tela-adm-container'>


      <header className='header-adm'>
        <div className='header-adm-left'>
          <img src='/img/user_profile2.png' alt='' className='header-usuario-adm'></img>
          <p className='header-boas-vindas-adm'>Olá,
          <br></br>
          <p className='header-boas-vindas-adm-link'>Gabriel Lima</p></p>
        </div>

        <div className='header-adm-center'>
          <img src='' alt='' className='header-adm-foto-logo'></img>
          <h1 className='header-adm-titulo-logo'>Logomarca</h1>
        </div>

        <div className='header-adm-right'>
          <button className='header-adm-sair'>Sair</button>
        </div>
      </header>

      <div className='filtragem-adm-container'>
        <img src='/img/filtro-adm.png' alt='' className='filtragem-adm'></img>
      </div>

      <div className='tabela-adm-container'>
        <table className='tabela-adm'>
          <thead>
            <tr className='tabela-adm-coluna'>
              <th className='tabela-adm-titulo'>Título</th>
              <th className='tabela-adm-titulo'>Descrição</th>
              <th className='tabela-adm-titulo'>E-mail</th>
              <th className='tabela-adm-titulo'>Categoria</th>
              <th className='tabela-adm-titulo'>Comprovante</th>
              <th className='tabela-adm-titulo'>Status</th>
              <th className='tabela-adm-titulo'>Data</th>
              <th className='tabela-adm-titulo'>Ações</th>
            </tr>
            <tr className='tabela-adm-coluna'>
                <td className='tabela-adm-dados'>Hospedagem durante visita na filial de SP</td>
                <td className='tabela-adm-dados'>Lorem ipsum consectetur adipiscing elit...</td>
                <td className='tabela-adm-dados'>barbosa.bruno12@gmail.com</td>
                <td className='tabela-adm-dados'>Hospedagem</td>
                <td className='tabela-adm-dados'><img src='/img/tabela-adm.png' alt='' className='foto-adm-comprovante'></img></td>
                <td className='tabela-adm-dados'><p className='tabela-adm-dados-status'>Recebido</p></td>
                <td className='tabela-adm-dados'>12/12/2022</td>
                <td className='tabela-adm-dados'><button className='tabela-adm-dados-acoes'>EDITAR</button></td>
            </tr>
            <tr className='tabela-adm-coluna'>
                <td className='tabela-adm-dados'>Hospedagem durante visita na filial de SP</td>
                <td className='tabela-adm-dados' max>Lorem ipsum consectetur adipiscing elit...</td>
                <td className='tabela-adm-dados'>barbosa.bruno12@gmail.com</td>
                <td className='tabela-adm-dados'>Hospedagem</td>
                <td className='tabela-adm-dados'><img src='/img/tabela-adm.png' alt='' className='foto-adm-comprovante'></img></td>
                <td className='tabela-adm-dados'><p className='tabela-adm-dados-status'>Recebido</p></td>
                <td className='tabela-adm-dados'>12/12/2022</td>
                <td className='tabela-adm-dados'><button className='tabela-adm-dados-acoes'>EDITAR</button></td>
            </tr>
          </thead>
          
        </table>
      </div>


    </section>
  )
}

export default TelaAdm