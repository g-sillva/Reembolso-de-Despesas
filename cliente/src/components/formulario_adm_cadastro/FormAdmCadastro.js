import React, { useState } from 'react'
import './FormAdmCadastro.css'
import Loading from '../layout/Loading'
import axios from 'axios';
import { useEffect } from 'react';

function FormAdmCadastro({ aoClicarLinkCadastro }) {
  const [FormAdmCadastro, setFormAdmCadastro] = useState({ nome: "", email: "", confirmacao_email: "", telefone: "", senha: "", confirmacao_senha: "", erro: "", termos_aceitos: false });
  const [isSenhaErrada, setIsSenhaErrada] = useState(false);
  const [isEmailErrado, setIsEmailErrado] = useState(false);
  const [isFormPreenchido, setIsFormPreenchido] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false)

  useEffect(() => {
    setIsSenhaErrada(FormAdmCadastro.senha !== FormAdmCadastro.confirmacao_senha && FormAdmCadastro.confirmacao_senha !== "" && FormAdmCadastro.senha !== "");
    setIsEmailErrado(FormAdmCadastro.email !== FormAdmCadastro.confirmacao_email && FormAdmCadastro.confirmacao_email !== "" && FormAdmCadastro.email !== "");
    setIsFormPreenchido(FormAdmCadastro.nome !== "" &&
    FormAdmCadastro.confirmacao_email !== "" &&
    FormAdmCadastro.email !== "" &&
    FormAdmCadastro.email === FormAdmCadastro.confirmacao_email &&
    FormAdmCadastro.senha === FormAdmCadastro.confirmacao_senha &&
    FormAdmCadastro.confirmacao_senha !== "" &&
    FormAdmCadastro.senha !== "" &&
    FormAdmCadastro.telefone !== "" &&
    FormAdmCadastro.telefone.length === 11 &&
    FormAdmCadastro.termos_aceitos);
  }, [FormAdmCadastro]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSenhaErrada || isEmailErrado) return;

    const usuarioObj = {
      nome: FormAdmCadastro.nome,
      email: FormAdmCadastro.email,
      telefone: FormAdmCadastro.telefone,
      senha: FormAdmCadastro.senha
    }

    setRemoveLoading(true)
    axios.post('https://reembolso-de-despesas-production.up.railway.app/api/clientes/register', usuarioObj)
      .then((res) => {
        if (res.data.message === "Usuario cadastrado com sucesso!") {
          setRemoveLoading(false);
        }
      }).catch((error) => {
        console.log(error);
        setRemoveLoading(false);
      });
  }

  const handleTelChange = (e) => {
    const re = /^[0-9\b]+$/;

    if (e.target.value === '' || re.test(e.target.value)) {
      setFormAdmCadastro({ ...FormAdmCadastro, telefone: e.target.value })
    }
  }

  return (
    <section className='card-cadastro-adm-container'>
      <h1 className='card-cadastro-adm-titulo'>Cadastrar</h1>
      <h2 className='card-cadastro-adm-descricao'>Por favor, preencha as informações abaixo.</h2>

      <form onSubmit={e => handleSubmit(e)} method='post' className='card-cadastro-adm-form'>
        <div className='card-cadastro-adm-form-input-container'>
          <label htmlFor='name'
            className="card-cadastro-adm-label"
            style={{ top: FormAdmCadastro.nome !== "" && "0px" }}>Nome *</label>
          <input type='text'
            id='nome-cadastro'
            className='card-cadastro-adm-input'
            value={FormAdmCadastro.nome}
            required
            onChange={(e) => setFormAdmCadastro({ ...FormAdmCadastro, nome: e.target.value })}  ></input>
        </div>

        <div className='card-cadastro-adm-form-input-container'>
          <label htmlFor='email'
            className='card-cadastro-adm-label'
            style={{ top: FormAdmCadastro.email !== "" && "0px" }}>E-mail *</label>
          <input type='email'
            id='email-cadastro'
            className='card-cadastro-adm-input'
            value={FormAdmCadastro.email}
            required
            onChange={(e) => setFormAdmCadastro({ ...FormAdmCadastro, email: e.target.value })}></input>
        </div>

        <div className='card-cadastro-adm-form-input-container'>
          <label htmlFor='email-confirm'
            className='card-cadastro-adm-label'
            style={{ top: FormAdmCadastro.confirmacao_email !== "" && "0px" }}>Confirmar e-mail *</label>
          <input type='email'
            id='email-cadastro-b'
            className='card-cadastro-adm-input'
            required
            style={{ borderColor: isEmailErrado && "red" }}
            value={FormAdmCadastro.confirmacao_email}
            onChange={(e) => setFormAdmCadastro({ ...FormAdmCadastro, confirmacao_email: e.target.value })}></input>
          {isEmailErrado && <p className='card-cadastro-adm-erro-msg'>ERRO: O e-mail precisa ser o mesmo</p>}
        </div>

        <div className='card-cadastro-adm-form-input-container'>
          <label htmlFor='tel'
            className='card-cadastro-adm-label'
            style={{ top: FormAdmCadastro.telefone !== "" && "0px" }}>Telefone *</label>
          <input type='tel'
            id='card-cadastro-input-T'
            className='card-cadastro-adm-input'
            value={FormAdmCadastro.telefone}
            required
            minLength="11"
            maxLength="11"
            onChange={(e) => handleTelChange(e)}></input>
          {FormAdmCadastro.telefone !== "" && FormAdmCadastro.telefone.length !== 11 && <p className='card-cadastro-adm-erro-msg'>ERRO: O telefone precisa ser válido</p>}

        </div>

        <div className='card-cadastro-adm-form-input-container'>
          <label htmlFor='password'
            className='card-cadastro-adm-label'
            style={{ top: FormAdmCadastro.senha !== "" && "0px" }}>Senha *</label>
          <input type='password'
            id='senha-cadastro'
            className='card-cadastro-adm-input'
            value={FormAdmCadastro.senha}
            required
            onChange={(e) => setFormAdmCadastro({ ...FormAdmCadastro, senha: e.target.value })}></input>
        </div>

        <div className='card-cadastro-adm-form-input-container'>
          <label htmlFor='password-confirm'
            className='card-cadastro-label'
            style={{ top: FormAdmCadastro.confirmacao_senha !== "" && "0px" }}>Confirmar senha *</label>
          <input type='password'
            id='senha-cadastro-b'
            className='card-cadastro-adm-input'
            value={FormAdmCadastro.confirmacao_senha}
            style={{ borderColor: isSenhaErrada && "red" }}
            required
            onChange={(e) => setFormAdmCadastro({ ...FormAdmCadastro, confirmacao_senha: e.target.value })}></input>
          {isSenhaErrada && <p className='card-cadastro-adm-erro-msg'>ERRO: A senha precisa ser a mesma</p>}
        </div>

        <div className='card-cadastro-adm-container-C'>
          <input type='checkbox' id='card-cadastro-input-C' required onClick={(e) => setFormAdmCadastro({ ...FormAdmCadastro, termos_aceitos: e.target.checked })}></input>
          <label htmlFor='checkbox-confim' id='card-cadastro-adm-label-C'>
            Eu concordo com os <a className='card-cadastro-adm-label-L' href='https://www.google.com.br/'>Temos e condições de uso</a>.
          </label>
        </div>

        <input type='submit' value='CADASTRAR' id='card-cadastro-B-cadastrar' className={`${isFormPreenchido && "card-cadastro-adm-btn-submit-enabled"}`}></input>

        <div className='card-cadastro-adm-logar-conta-container'>
          <h2 className='card-cadastro-adm-logar-conta'>Já possui cadastro? <p onClick={aoClicarLinkCadastro} className='card-cadastro-adm-logar-conta-L'>Acesse sua conta</p></h2>
        </div>
      </form>
      {removeLoading && <Loading />}
    </section>
  )
}

export default FormAdmCadastro;