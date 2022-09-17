import React, {Component} from 'react';
import Signin from './components/Signin';

import Signup from './components/Signup';
import Account from './components/Account';

import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Timeline from "./pages/Timeline"
import Service from "./pages/Service"
import Cars from "./pages/Cars"
import { Container } from "react-bootstrap"
import Dashboard from './components/Dashboard';
import './App.css';
class App extends Component {
  render() {
    return (
      <div>
        <AuthContextProvider>
          <Routes>
                <Route path="/" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute>}>
                  <Route index element={<Timeline/>} />
                  <Route path="service" element={<Service />} />
                  <Route path="cars" element={<Cars />} />
                </Route>

                <Route path="/login" element={<Signin/>} />
                
          </Routes>
        </AuthContextProvider>
      </div>
      
  );
}
}


export default App;
