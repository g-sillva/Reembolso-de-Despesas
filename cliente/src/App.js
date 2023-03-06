import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CreateUser from './components/create-user.component';
import Users from './components/users.component';
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

    <Router>
      <div className="App">
        <Context.Provider value={[context, setContext]}>
          <Route path='/LoginCadastro' element={<LoginCadastro />} />
           {/* TO DO: Mostrar confirmação no componente de cadastro */}
           {/* <Route path='/ConfirmacaoCadastro' element={<CardConfirmacaoCadastro />}/> */}
          <Route path='' element={<TelaInicial />} />
          <Route path='/TelaAdm' element={<TelaAdm />} />
        </Context.Provider>
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand">React Axios Tutorial</a>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to={'/create-user'}>
                    Create User
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/users'}>
                    Users List
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Routes>
                <Route exact path="/" element={<CreateUser />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/users" element={<Users />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;