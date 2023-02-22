import { Route, Routes } from 'react-router-dom';
import './App.css';
import Cadastro from './pages/cadastro';
import Login from './pages/login';

function App() {
  return (
    <div className='app'>
        <Routes>
            <Route path='/login' element={<Login />}/>
            <Route path='/cadastro' element={<Cadastro />}/>
        </Routes>
    </div>
  );
}

export default App;
