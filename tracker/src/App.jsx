
import './App.css'

import { useLocation } from 'react-router-dom';
import AppRoute from './routes/AppRoute';
import Navbar from './components/Navbar.jsx'

import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";

function App() {
  
  const location = useLocation();
  const { currentUser } = useContext(AuthContext);
  const role = currentUser?.role;
  return (
   <>
   {role && location.pathname !== "/login" && <Navbar />}
   <AppRoute/>
   </>
  )
}

export default App
