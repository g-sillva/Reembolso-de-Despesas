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
        <h2 class='filtragem-adm-filtrar-por'>Filtrar por:</h2> 

        <details className='filtragem-adm-categoria'>
          <summary className='filtragem-adm-categoria-titulo'>Colaborador</summary>
          <input class='filtragem-adm-categoria-input-texto' type='text'></input>
        </details>

        <details className='filtragem-adm-categoria'>
          <summary className='filtragem-adm-categoria-titulo'>Categoria</summary>

            <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-geral' name='geral'></input>
            <label className='filtragem-adm-categoria-opcao' for='geral'>Geral</label>

          <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-alimentacao' name='alimentacao'></input>
          <label className='filtragem-adm-categoria-opcao' for='alimentacao'>Alimentação</label>

          <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-transporte' name='transporte'></input>
          <label className='filtragem-adm-categoria-opcao' for='transporte'>Transporte</label>

          <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-hospedagem' name='hospedagem'></input>
          <label className='filtragem-adm-categoria-opcao' for='hospedagem'>Hospedagem</label>

          <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-treinamento' name='treinamento'></input>
          <label className='filtragem-adm-categoria-opcao' for='treinamento'>Treinamento</label>

          <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-software' name='software'></input>
          <label className='filtragem-adm-categoria-opcao' for='software'>Software</label>
        </details>  

        <details className='filtragem-adm-categoria'>
          <summary className='filtragem-adm-categoria-titulo'>Status</summary>
          <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-recebido' name='recebido'></input>
          <label className='filtragem-adm-categoria-opcao' for='recebido'>Recebido</label>

          <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-analise' name='analise'></input>
          <label className='filtragem-adm-categoria-opcao' for='analise'>Em análise</label>

          <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-creditado' name='creditado'></input>
          <label className='filtragem-adm-categoria-opcao' for='creditado'>Creditado</label>

          <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-aprovado' name='aprovado'></input>
          <label className='filtragem-adm-categoria-opcao' for='aprovado'>Aprovado</label>

          <input class='filtragem-adm-categoria-input-checkbox' type='checkbox' id='checkbox-adm-negado' name='negado'></input>
          <label className='filtragem-adm-categoria-opcao' for='negado'>Negado</label>
        </details>

        <details className='filtragem-adm-categoria'>
          <summary className='filtragem-adm-categoria-titulo'>Data</summary>
          <input class='filtragem-adm-categoria-input-data' type='date' id='checkbox-adm-data' name='data'></input>
        </details>

        {/* <img src='/img/filtro-adm.png' alt='' className='filtragem-adm'></img> */}
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