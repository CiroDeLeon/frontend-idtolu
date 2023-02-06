import './App.css';
import React, { useState } from 'react';
import api from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formType, setFormType] = useState('login');
  const [credentials, setCredentials] = useState({ username: '', password: '',role:'' });
  
  const handleResetPassword = async (event) => {
    event.preventDefault();
    const responseRol=await api.getRoleByUsername(credentials.username);
    console.log(responseRol.data);
    credentials.role=responseRol.data;
    console.log(credentials);
    try {
      const response = await api.resetPassword(credentials,localStorage.getItem('token'));
      if(response.status==200){
         alert("Password reseteado con exito");
      }
      console.log(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
    credentials.role='';
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const responseRol=await api.getRoleByUsername(credentials.username);
    console.log(responseRol);
    if(responseRol.data!=null && responseRol.data!=''){
      credentials.role=responseRol.data;
    

    try {
      const response = await api.login(credentials);
      
      localStorage.setItem('token', response.data.token);
      console.log(response);
      credentials.password='';
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      if(error.response.status==401){
        alert('credenciales invalidas');
      }else{
        alert(error.response.data);
      }
    }
    credentials.role='';
  }else{
    alert('este usuario no existe');
  }
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    credentials.role='USER'
    try {
      const response = await api.signup(credentials);
      
      if(response.status==200){
         alert("registrado con exito");
      }
      console.log(response);
      setIsLoggedIn(false);
    } catch (error) {
      console.error(error); 
      alert(error.response.data);     
    }
    credentials.role='';
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setCredentials({ ...credentials, password: '' });
  };

  const handleOnlyForUser = async (event) => {
    event.preventDefault();
    const responseRol=await api.getRoleByUsername(credentials.username);
    console.log(responseRol.data);
    credentials.role=responseRol.data;
    console.log(credentials);
    try {
      const response = await api.onlyForUser(credentials,localStorage.getItem('token'));
      credentials.role='';
      if(response.status==200){
         alert("Se obtuvo con exito el mensaje que solo puede ver role USER \n "+response.data);
      }
      console.log(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  const handleOnlyForAdmin = async (event) => {
    event.preventDefault();
    const responseRol=await api.getRoleByUsername(credentials.username);
    console.log(responseRol.data);
    credentials.role=responseRol.data;
    console.log(credentials);
    try {
      const response = await api.onlyForAdmin(credentials,localStorage.getItem('token'));
      
      if(response.status==200){
         alert("Se obtuvo con exito el mensaje que solo puede ver role ADMIN \n"+response.data);
      }
      console.log(response);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
    credentials.role='';
  };

  return (
    <div className="App">
      <Header />
      <br /><br /><br /><br /><br /><br />
      {isLoggedIn ? (
        <>
          <h2>Bienvenido a la aplicación</h2>
          <h5>estos botones funcionaran dependiendo tu role</h5>
          <button onClick={handleOnlyForUser}>USER</button>
          <button onClick={handleOnlyForAdmin}>ADMIN</button>
          <br /><br /><br />
          <form onSubmit={handleResetPassword}>
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
              />
              <label htmlFor="password">Contraseña Nueva</label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
              />
              <button type="submit">Resetiar Password</button>
          </form>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          {formType === 'login' ? (
            <form onSubmit={handleLogin}>
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
              />
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
              />
              <button type="submit">Iniciar sesión</button>
              <p>
                ¿No tienes una cuenta? <button onClick={() => setFormType('signup')}>Regístrate aquí</button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignup}>
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                value={credentials.username}
                onChange={(event) => setCredentials({ ...credentials, username: event.target.value })}
              />
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={credentials.password}
                onChange={(event) => setCredentials({ ...credentials, password: event.target.value })}
                />
                <button type="submit">Registrarse</button>
                <p>
                ¿Ya tienes una cuenta? <button onClick={() => setFormType('login')}>Inicia sesión aquí</button>
                </p>
                </form>
                )}
                </>
                )}
                <Footer />
                </div>
                );
                }
                
                export default App;
