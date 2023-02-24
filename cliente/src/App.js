import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cadastro from './pages/cadastro';
import Login from './pages/login';
import TelaInicial from './pages/tela_inicial/TelaInicial';

function App() {
  return (
    <div className='app'>
      <div className='main-container'>
          <Routes>
              <Route path='/' element={<TelaInicial />}/>
              <Route path='/login' element={<Login />}/>
              <Route path='/cadastro' element={<Cadastro />}/>
          </Routes>
        </div>
    </div>
  );
}

export default App;
