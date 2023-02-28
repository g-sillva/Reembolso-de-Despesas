import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginCadastro from './components/LoginCadastro/LoginCadastro';
import CardCadastro from './components/CardCadastro/CardCadastro';
import CardLogin from './components/CardLogin/CardLogin';
import CardConfirmacaoCadastro from './components/CardConfirmacaoCadastro/CardConfirmacaoCadastro';

function App() {
  return (
    <div className='app'>
      <div class="main-container">
        <Routes>
            <Route path='/Login' element={<LoginCadastro />}/>
            <Route path='/CardCadastro' element={<CardCadastro />}/>
            <Route path='/CardLogin' element={<CardLogin />}/>
            <Route path='/CardConfirmacaoCadastro' element={<CardConfirmacaoCadastro />}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
