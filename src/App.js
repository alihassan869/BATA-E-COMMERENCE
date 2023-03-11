import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Componets/pages/Home';
import Men from './Componets/pages/Men';
import Women from './Componets/pages/Women';
import Cartpage from './Componets/pages/Cartpage';
import Checkout from './Componets/pages/Chectout';
import Login from './Componets/pages/Login';
import Register from './Componets/pages/Register';
import Forget from './Componets/pages/Forget';
import Newpassword from './Componets/pages/Newpassword';
import Notfound from './Componets/pages/Notfound';
function App() {
  const [user, setuserlogin] = useState({});
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && user._id ? (
                <Home to="/" />
              ) : (
                <Login setuserlogin={setuserlogin} />
              )
            }
          />
          <Route
            exact
            path="/Men"
            element={
              user && user._id ? (
                <Men to="/Men" />
              ) : (
                <Login setuserlogin={setuserlogin} />
              )
            }
          />
          <Route
            exact
            path="/Women"
            element={
              user && user._id ? (
                <Women to="/Women" />
              ) : (
                <Login setuserlogin={setuserlogin} />
              )
            }
          />
          <Route
            exact
            path="/Login"
            element={<Login setuserlogin={setuserlogin} />}
          />
          <Route exact path="/Forget" element={<Forget />} />
          <Route exact path="/Newpassword/:token" element={<Newpassword />} />
          <Route exact path="/Register" element={<Register />} />
          <Route exact path="*" element={<Notfound />} />
          <Route exact path="/Cartpage/:id/:type" element={<Cartpage />} />
          <Route exact path="/Checkout/:Price" element={<Checkout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
