import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { StoreProvider } from './store/contextStore.tsx'
// import { StoreProvider } from './store/contextStore.ts' <React.StrictMode>  </React.StrictMode>

ReactDOM.createRoot(document.getElementById('root')!).render(
      <StoreProvider>
      <BrowserRouter> <App /></BrowserRouter>
      </StoreProvider>
 ,
)
