import React, { useState } from 'react'
import './FormCadastro.css'
import CardConfirmacaoCadastro from '../cartao_confirmacao_cadastro/CardConfirmacaoCadastro'

function FormCadastro({ aoClicarBotaoCadastro, aoClicarLinkCadastro }) {
  const [isCardConfirmacaoCadastro, setCardConfirmacaoCadastro] = useState(false);
  const [formCadastro, setFormCadastro] = useState({nome: '', email: '', confirmacao_email: '', telefone: '', senha: '', confirmacao_senha: ''});
  const [isSenhaErrada, setIsSenhaErrada] = useState(false);
  const [isFormPreenchido, setIsFormPreenchido] = useState(false);

useEffect(() => {
  setIsSenhaErrada(formCadastro.senha !== formCadastro.confirmacao_senha && formCadastro.confirmacao_senha !== "" && formCadastro.senha)
  setIsEmailErrado(formCadastro.email !== formCadastro.confirmacao_email && formCadastro.confirmacao_email !== "" && formCadastro.email)
  setIsFormPreenchido(formCadastro.nome !== '' && 
                      formCadastro.confirmacao_email !== '' && 
                      formCadastro.email !== '' &&
                      formCadastro.email === formCadastro.confirmacao_email &&
                      formCadastro.senha === formCadastro.confirmacao_senha &&
                      formCadastro.confirmacao_senha !== '' &&
                      formCadastro.senha !== '' &&
                      formCadastro.telefone !== '' &&
                      formCadastro.telefone.length === 11 &&
                      formCadastro.termos_aceitos);
}, [formCadastro]);

const handleSubmit = (e) => {
  e.preventDefault();
  if (isSenhaErrada || setIsEmailErrado) return;

  const usuarioObj = {
    nome: formCadastro.nome,
    email: formCadastro.email,
    telefone: formCadastro.telefone,
    senha: formCadastro.senha
  }

  axios.post('', usuarioObj)
  .then((res) => {
    if (res.data.message === 'Usuário cadastrado com sucesso!') {
      setCardConfirmacaoCadastro(true);
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

      <form onSubmit={e => handleSubmit(e)} action='#' method='post' className='card-cadastro-form'>
      </form>

     {isCardConfirmacaoCadastro && <CardConfirmacaoCadastro email={formCadastro.email}
                                                            aoClicarSair={() => setCardConfirmacaoCadastro(false)}/>}
                                                            
    </section>
  )
}

export default FormCadastro;