import { motion, useReducedMotion } from 'motion/react'
import { avis } from '../content/site'
import Vague from './Vague'

export default function Avis() {
  const reduced = useReducedMotion()
  return (
    <section className="on-dark bg-nuit text-tiare">
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <Vague className="text-tiare/70" />
        <div className="mt-10 grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12">
          {avis.map((a, i) => (
            <motion.blockquote
              key={a.texte}
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display-text text-2xl leading-snug md:text-[32px] md:leading-[1.3]">
                « {a.texte} »
              </p>
              <footer className="mt-6 text-sm text-tiare/60">{a.source}</footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
