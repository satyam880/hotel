import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css"
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { myApi } from './rtk/services.js'
import { Provider } from 'react-redux'
import store from "./store/store.js"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

<Provider store={store}>
 <ApiProvider api={myapi}>
    <App />
</ApiProvider>

    </Provider>
  </React.StrictMode>,
)
