import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GlobalContextProvider } from './Context/GlobalContext.jsx'
import './index.css'
import { AuthContextProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </GlobalContextProvider>
  </BrowserRouter>
)
