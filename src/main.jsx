import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './views/VirtualList/Demo'
import App1 from './views/ReversoContext/Demo'
import Menu from './views/Menu/menu'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Menu />
  </StrictMode>,
)
