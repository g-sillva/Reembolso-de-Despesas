import React, { useEffect, useState, useContext } from 'react'
import './FormCadastro.css'
import CardConfirmacaoCadastro from '../cartao_confirmacao_cadastro/CardConfirmacaoCadastro';
import axios from 'axios';

function FormCadastro({ aoClicarLinkCadastro }) {
  const [isCardConfirmacaoCadastro, setIsCardConfirmacaoCadastro] = useState(false);
  const [formCadastro, setFormCadastro] = useState({nome: "", email: "", confirmacao_email: "", telefone: "", senha: "", confirmacao_senha: "", erro: "", termos_aceitos: false});
  const [isSenhaErrada, setIsSenhaErrada] = useState(false);
  const [isEmailErrado, setIsEmailErrado] = useState(false);
  const [isFormPreenchido, setIsFormPreenchido] = useState(false);

  useEffect(() => {
    setIsSenhaErrada(formCadastro.senha !== formCadastro.confirmacao_senha && formCadastro.confirmacao_senha !== "" && formCadastro.senha !== "");
    setIsEmailErrado(formCadastro.email !== formCadastro.confirmacao_email && formCadastro.confirmacao_email !== "" && formCadastro.email !== "");
    setIsFormPreenchido(formCadastro.nome !== "" && 
                        formCadastro.confirmacao_email !== "" && 
                        formCadastro.email !== "" && 
                        formCadastro.email === formCadastro.confirmacao_email &&
                        formCadastro.senha === formCadastro.confirmacao_senha &&
                        formCadastro.confirmacao_senha !== "" &&
                        formCadastro.senha !== "" &&
                        formCadastro.telefone !== "" &&
                        formCadastro.telefone.length === 11 &&
                        formCadastro.termos_aceitos);
  }, [formCadastro]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSenhaErrada || isEmailErrado) return;

    const usuarioObj = {
      nome: formCadastro.nome,
      email: formCadastro.email,
      telefone: formCadastro.telefone,
      senha: formCadastro.senha
  }


    axios.post('https://reembolso-de-despesas-production.up.railway.app/api/clientes/register', usuarioObj)
        .then((res) => {
            if (res.data.message === "Usuario cadastrado com sucesso!") {
              setIsCardConfirmacaoCadastro(true);
            }
        }).catch((error) => {
            console.log(error);
        });
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
                minLength="11"
                maxLength="11"
                onChange={(e) => handleTelChange(e)}></input>
          {formCadastro.telefone !== "" && formCadastro.telefone.length !== 11 && <p className='card-cadastro-erro-msg'>ERRO: O telefone precisa ser válido</p>}

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
          <input type='checkbox' id='card-cadastro-input-C' required onClick={(e) => setFormCadastro({...formCadastro, termos_aceitos: e.target.checked})}></input>
          <label htmlFor='checkbox-confim' id='card-cadastro-label-C'>
            Eu concordo com os <a className='card-cadastro-label-L' href='https://www.google.com.br/'>Temos e condições de uso *</a>.
          </label>
        </div>  

        <input type='submit' value='CADASTRAR' id='card-cadastro-B-cadastrar' className={`${isFormPreenchido && "card-cadastro-btn-submit-enabled"}`}></input>

        <div className='card-cadastro-logar-conta-container'>
          <h2 className='card-cadastro-logar-conta'>Já possui cadastro? <p onClick={aoClicarLinkCadastro} className='card-cadastro-logar-conta-L'>Acesse sua conta</p></h2>
        </div>
      </form>

      {isCardConfirmacaoCadastro && <CardConfirmacaoCadastro email={formCadastro.email}
                                                             aoClicarSair={() => setIsCardConfirmacaoCadastro(false)}/>}
    </section>
  )
}

export default FormCadastro;