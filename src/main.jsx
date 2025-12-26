import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./css/variables.css"
import "./css/util.css"
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
    <App />  
)
