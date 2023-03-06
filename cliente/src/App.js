import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginCadastro from './pages/tela_login_cadastro/LoginCadastro';
import TelaInicial from './pages/tela_inicial/TelaInicial';
import TelaAdm from './pages/tela_adm/TelaAdm';
import Context from './Context';
import { useState } from 'react';

function App() {
  const [context, setContext] = useState(null);

  return (
    <div className='app'>
      <Context.Provider value={[context, setContext]}>
        <div>
            <Routes>
              <Route path='/LoginCadastro' element={<LoginCadastro />}/>
              <Route path= '' element={<TelaInicial />}/>
              <Route path='/TelaAdm' element={<TelaAdm />}/>
            </Routes>
          </div>
        </Context.Provider>
    </div>  
   );
 }

export default App;

