import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './styles/index.css'

// Global runtime error handlers to aid debugging in the browser
if (typeof window !== 'undefined'){
  window.addEventListener('error', (e)=>{
    console.error('Global error captured:', e.error || e.message)
    if(window.__cv_setError) window.__cv_setError(e.error || e.message)
  })
  window.addEventListener('unhandledrejection', (e)=>{
    console.error('Unhandled promise rejection:', e.reason)
    if(window.__cv_setError) window.__cv_setError(e.reason)
  })
}

// Runtime overlay remover + lightweight debug panel to surface errors
function removeFullscreenOverlays(){
  try{
    const root = document.getElementById('root');
    if(root){
      root.style.position = 'relative';
      root.style.zIndex = '2147483647';
      root.style.pointerEvents = 'auto';
      root.style.background = '';
    }
    Array.from(document.body.children).forEach(el=>{
      try{
        if(!el) return;
        if(el.id === 'root' || el.id === '__cv_debug_panel') return;
        const s = getComputedStyle(el);
        const isFixed = s.position === 'fixed' || s.position === 'absolute' || s.position === 'sticky';
        const isFull = el.clientWidth >= window.innerWidth - 2 && el.clientHeight >= window.innerHeight - 2;
        const bg = s.backgroundColor || s.background || '';
        const darkBg = /(rgb\(0,\s*0,\s*0\)|rgba\(0,\s*0,\s*0,\s*1\)|#000\b)/i.test(bg);
        if(isFixed && isFull && darkBg){
          try{ el.style.display = 'none'; }catch(e){}
        }
        const z = parseInt(s.zIndex) || 0;
        if(isFixed && z > 10000){
          try{ el.style.zIndex = '0'; }catch(e){}
        }
      }catch(e){}
    })
  }catch(e){ console.error('overlay removal failed', e) }
}

if(typeof window !== 'undefined'){
  removeFullscreenOverlays();
  window.addEventListener('load', removeFullscreenOverlays);
  window.addEventListener('resize', removeFullscreenOverlays);
  window.addEventListener('click', removeFullscreenOverlays, true);
  const overlayInterval = setInterval(removeFullscreenOverlays, 1500);
  setTimeout(()=>clearInterval(overlayInterval), 10000);

  // Debug panel removed to avoid injecting UI controls into the page
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
