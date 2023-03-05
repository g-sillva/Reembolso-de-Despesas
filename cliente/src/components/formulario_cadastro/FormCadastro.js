import React, { useEffect, useState, useContext } from 'react'
import './FormCadastro.css'
import CardConfirmacaoCadastro from '../cartao_confirmacao_cadastro/CardConfirmacaoCadastro';
import Context from '../../Context';

function FormCadastro({ aoClicarLinkCadastro }) {
  const [isCardConfirmacaoCadastro, setCardConfirmacaoCadastro] = useState(false);
  const [formCadastro, setFormCadastro] = useState({"nome": "", "email": "", "confirmacao_email": "", "telefone": "", "senha": "", "confirmacao_senha": "", "erro": ""});
  const [isSenhaErrada, setIsSenhaErrada] = useState(false);
  const [isEmailErrado, setIsEmailErrado] = useState(false);
  const [contexto, setContexto] = useContext(Context);

  useEffect(() => {
    setIsSenhaErrada(formCadastro.senha !== formCadastro.confirmacao_senha && formCadastro.confirmacao_senha !== "" && formCadastro.senha !== "");
    setIsEmailErrado(formCadastro.email !== formCadastro.confirmacao_email && formCadastro.confirmacao_email !== "" && formCadastro.email !== "");
  }, [formCadastro]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleTelChange = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
        setFormCadastro({...formCadastro, telefone: e.target.value})
    }
  }

  return (
    <section className='card-cadastro-container'>
      <h1 className='card-cadastro-titulo'>Cadastrar</h1>
      <h2 className='card-cadastro-descricao'>Por favor, preencha as informações abaixo.</h2>

      <form onSubmit={e => handleSubmit(e)} method='post' className='card-cadastro-form'>
        <div className='card-cadastro-form-input-container'>
          <label htmlFor='name' 
                 className="card-cadastro-label" 
                 style={{top: formCadastro.nome !== "" && "0px"}}>Nome *</label>
          <input type='text' 
                id='nome-cadastro' 
                className='card-cadastro-input' 
                value={formCadastro.nome}
                required
                onChange={(e) => setFormCadastro({...formCadastro, nome: e.target.value})}></input>
        </div>

        <div className='card-cadastro-form-input-container'>
          <label htmlFor='email' 
                 className='card-cadastro-label' 
                 style={{top: formCadastro.email !== "" && "0px"}}>E-mail *</label>
          <input type='email' 
                id='email-cadastro' 
                className='card-cadastro-input' 
                value={formCadastro.email}
                required
                onChange={(e) => setFormCadastro({...formCadastro, email: e.target.value})}></input>
        </div>

        <div className='card-cadastro-form-input-container'>
          <label htmlFor='email-confirm' 
                 className='card-cadastro-label' 
                 style={{top: formCadastro.confirmacao_email !== "" && "0px"}}>Confirmar e-mail *</label>
          <input type='email' 
                id='email-cadastro-b' 
                className='card-cadastro-input'
                required
                style={{borderColor: isEmailErrado && "red"}}
                value={formCadastro.confirmacao_email}
                onChange={(e) => setFormCadastro({...formCadastro, confirmacao_email: e.target.value})}></input>
                {isEmailErrado && <p className='card-cadastro-erro-msg'>ERRO: O e-mail precisa ser o mesmo</p>}
        </div>

        <div className='card-cadastro-form-input-container'>
          <label htmlFor='tel' 
                 className='card-cadastro-label' 
                 style={{top: formCadastro.telefone !== "" && "0px"}}>Telefone *</label>
          <input type='tel' 
                id='card-cadastro-input-T' 
                className='card-cadastro-input'
                value={formCadastro.telefone}
                required
                onChange={(e) => handleTelChange(e)}></input>
        </div>

        <div className='card-cadastro-form-input-container'>
          <label htmlFor='password' 
                 className='card-cadastro-label' 
                 style={{top: formCadastro.senha !== "" && "0px"}}>Senha *</label>
          <input type='password' 
                id='senha-cadastro' 
                className='card-cadastro-input' 
                value={formCadastro.senha}
                required
                onChange={(e) => setFormCadastro({...formCadastro, senha: e.target.value})}></input>
        </div>

        <div className='card-cadastro-form-input-container'>
          <label htmlFor='password-confirm' 
                 className='card-cadastro-label' 
                 style={{top: formCadastro.confirmacao_senha !== "" && "0px"}}>Confirmar senha *</label>
          <input type='password' 
                id='senha-cadastro-b' 
                className='card-cadastro-input' 
                value={formCadastro.confirmacao_senha}
                style={{borderColor: isSenhaErrada && "red"}}
                required
                onChange={(e) => setFormCadastro({...formCadastro, confirmacao_senha: e.target.value})}></input>
                { isSenhaErrada && <p className='card-cadastro-erro-msg'>ERRO: A senha precisa ser a mesma</p> }
        </div>

        <div className='card-cadastro-container-C'>
          <input type='checkbox' id='card-cadastro-input-C'></input>
          <label htmlFor='checkbox-confim' id='card-cadastro-label-C'>
            Eu concordo com os <a className='card-cadastro-label-L' href='https://www.google.com.br/'>Temos e condições de uso</a>.
          </label>
        </div>  

        <input type='submit' value='CADASTRAR' id='card-cadastro-B-cadastrar'></input>

        <div className='card-cadastro-logar-conta-container'>
          <h2 className='card-cadastro-logar-conta'>Já possui cadastro? <p onClick={aoClicarLinkCadastro} className='card-cadastro-logar-conta-L'>Acesse sua conta</p></h2>
        </div>
      </form>

      {isCardConfirmacaoCadastro && <CardConfirmacaoCadastro aoClicarBotaoCadastro={() => {
        setCardConfirmacaoCadastro(true);
      }}/>}
    </section>
  )
}

export default FormCadastro;