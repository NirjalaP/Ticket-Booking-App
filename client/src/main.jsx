import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BroweserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
 <BroweserRouter>
    <App />
 </BroweserRouter>
)
