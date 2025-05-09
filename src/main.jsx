import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { GlobalRoutes } from './routes/GlobalRoutes.jsx'
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Toaster
      position="top-right"
      reverseOrder={false} />
    <Provider store={store}>
      <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <GlobalRoutes />
      </HashRouter>
    </Provider>
  </>

)
