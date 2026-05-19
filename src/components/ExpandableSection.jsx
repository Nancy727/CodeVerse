import React, {useState} from 'react'

export default function ExpandableSection({title, children, defaultOpen=false}){
  const [open,setOpen] = useState(defaultOpen)
  return (
    <div className="mb-4">
      <button onClick={()=>setOpen(o=>!o)} className="w-full text-left flex items-center justify-between p-3 bg-gradient-to-r from-white/2 to-white/1 rounded-lg border border-white/5">
        <span className="font-semibold text-slate-100">{title}</span>
        <span className="text-slate-400">{open ? '−' : '+'}</span>
      </button>
      <div className={`${open ? 'block' : 'hidden'} mt-3`}>{children}</div>
    </div>
  )
}
