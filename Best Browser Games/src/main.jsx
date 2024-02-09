import React from 'react'
import ReactDOM from 'react-dom/client'
import AppHome from "./routers/Home/AppHome";
import AppHeader from './routers/Header/AppHeader';
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppHeader />
    <AppHome />
  </React.StrictMode>
)
