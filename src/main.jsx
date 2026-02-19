// import { GoogleOAuthProvider } from "@react-oauth/google";
import { createRoot } from 'react-dom/client'
import "../src/CSS/utils/main.css";
import App from './App.jsx'
// import { googleClientId } from "./data/env.js";
import { ThemeProvider } from "./context/ThemeContext";
createRoot(document.getElementById('root')).render(
    // <GoogleOAuthProvider clientId={googleClientId}>
    <ThemeProvider>
        <App />
    </ThemeProvider>
    // </GoogleOAuthProvider>
)
