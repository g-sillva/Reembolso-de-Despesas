import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginCadastro from './components/LoginCadastro/LoginCadastro';
import CardCadastro from './components/CardCadastro/CardCadastro';
import CardLogin from './components/CardLogin/CardLogin';
import CardConfirmacaoCadastro from './components/CardConfirmacaoCadastro/CardConfirmacaoCadastro';
import TelaAdm from './components/TelaAdm/TelaAdm';

function App() {
  return (
    <div className='app'>
      <div>
        <Routes>
            <Route path='/Login' element={<LoginCadastro />}/>
            <Route path='/CardCadastro' element={<CardCadastro />}/>
            <Route path='/CardLogin' element={<CardLogin />}/>
            <Route path='/CardConfirmacaoCadastro' element={<CardConfirmacaoCadastro />}/>
            <Route path='/TelaAdm' element={<TelaAdm />}/>
        </Routes>
      </div>
    </div>

  );
}

export default App;
