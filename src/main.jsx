// import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from 'react-dom/client'
import "./css/variables.css"
import "./css/util.css"
import App from './App.jsx'
import { googleClientId } from "./data/env.js";
createRoot(document.getElementById('root')).render(
    // <GoogleOAuthProvider clientId={googleClientId}>
        <App />
    // </GoogleOAuthProvider>
)
