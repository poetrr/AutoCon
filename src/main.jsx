import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
<<<<<<< HEAD

=======
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Components/style.module.css"
>>>>>>> d2ae973 (Pushed the repository which has the dashboard)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
