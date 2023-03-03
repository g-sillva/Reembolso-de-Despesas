import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginCadastro from './pages/tela_login_cadastro/LoginCadastro';
import TelaInicial from './pages/tela_inicial/TelaInicial';
import TelaAdm from './pages/tela_adm/TelaAdm';

function App() {
  return (
    <div className='app'>
      <div>
          <Routes>
            <Route path='/LoginCadastro' element={<LoginCadastro />}/>

            {/* TO DO: Mostrar confirmação no componente de cadastro */}
            {/* <Route path='/ConfirmacaoCadastro' element={<CardConfirmacaoCadastro />}/> */}
            <Route path= '' element={<TelaInicial />}/>
            <Route path='/TelaAdm' element={<TelaAdm />}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
