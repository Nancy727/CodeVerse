import React, {useState} from 'react'

export default function Accordion({title, children}){
  const [open,setOpen] = useState(false)
  return (
    <div className="border border-white/6 rounded-md overflow-hidden">
      <button onClick={()=>setOpen(o=>!o)} className="w-full flex justify-between items-center p-3 bg-white/2">
        <span className="font-medium">{title}</span>
        <span className="text-slate-400">{open? '−' : '+'}</span>
      </button>
      {open && <div className="p-3 bg-white/1 text-slate-300">{children}</div>}
    </div>
  )
}
