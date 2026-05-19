import React, { useState } from 'react'

export default function CopyButton({text, className = ''}){
  const [copied, setCopied] = useState(false)
  const copy = async ()=>{
    try{
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(()=>setCopied(false), 1400)
    }catch(e){
      // ignore failures silently
    }
  }

  return (
    <button
      onClick={copy}
      aria-live="polite"
      className={`ml-2 px-3 py-1 rounded bg-white text-slate-900 font-semibold hover:bg-slate-100 transition-transform inline-flex items-center justify-center ${copied ? 'scale-95 ring-2 ring-cyan-300' : ''} ${className}`}>
      <span className="sr-only">Copy command</span>
      {copied ? (
        <>
          <svg className="w-4 h-4 mr-2 text-cyan-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17l-5-5" stroke="#0ea5a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 1H4a2 2 0 0 0-2 2v14" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="8" y="5" width="13" height="13" rx="2" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Copy
        </>
      )}
    </button>
  )
}
