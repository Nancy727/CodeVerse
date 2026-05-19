import React from 'react'
import { motion } from 'framer-motion'

export default function Hero(){
  return (
    <section className="py-12">
      <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} className="glass-card p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold gradient-text">"CloudVerse" Learn Cloud & DevOps</h2>
        <p className="mt-3 text-slate-300">Interactive tutorials, commands and roadmaps focused on Cloud, DevOps and Microservices.</p>
      </motion.div>
    </section>
  )
}
