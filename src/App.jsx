import React from 'react';
import Home from "./screens/Home";
import {BrowserRouter as Router, Routes , Route} from "react-router-dom"
import { Button } from 'react-bootstrap';
import { Login } from './screens/Login';
import "bootstrap/dist/js/bootstrap.bundle";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-dark-5/dist/css/bootstrap-dark.min.css"
import SignUp from './screens/signUp';
import { CartProvider } from './components/contextReducer';
export default function App() {
  return(
    <CartProvider>
      <Router>
      <div>
      <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/login' element={<Login/>} />
          <Route exact path='/creatuser' element={< SignUp />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>  
        
  );
}