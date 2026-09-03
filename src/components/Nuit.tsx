import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { moments } from '../content/site'

/**
 * Section signature : la nuit au mas, heure par heure.
 * Épinglée ; le fond passe du sable de l'après-midi au lagon nocturne, puis au matin.
 * Chaque moment porte sa propre couleur de texte, et le fond ne change que
 * pendant les fondus entre deux moments, pour que le contraste tienne à tout instant.
 */

const n = moments.length
const GAP = 0.03 // largeur d'un fondu (sortie puis entrée, jamais superposés)

function fenetre(i: number) {
  const debut = i / n
  const fin = (i + 1) / n
  return { debut, fin }
}

function Moment({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const m = moments[index]
  const { debut, fin } = fenetre(index)
  const premier = index === 0
  const dernier = index === n - 1

  // Sortie sur [fin - GAP, fin], entrée du suivant sur [debut, debut + GAP] : jamais deux moments visibles.
  // Chaque plage couvre tout [0, 1] : Motion relie ces valeurs à une ScrollTimeline native qui l'exige.
  const plage = premier
    ? [0, fin - GAP, fin, 1]
    : dernier
      ? [0, debut, debut + GAP, 1]
      : [0, debut, debut + GAP, fin - GAP, fin, 1]
  const opacity = useTransform(progress, plage, premier ? [1, 1, 0, 0] : dernier ? [0, 0, 1, 1] : [0, 0, 1, 1, 0, 0])
  const y = useTransform(progress, plage, premier ? [0, 0, -20, -20] : dernier ? [20, 20, 0, 0] : [20, 20, 0, 0, -20, -20])
  const scale = useTransform(progress, [0, debut, fin, 1], [1.05, 1.05, 1, 1])

  return (
    <motion.div
      style={{ opacity, color: m.texteCouleur }}
      className="absolute inset-0 flex flex-col justify-center gap-5 px-5 pb-16 md:grid md:grid-cols-12 md:items-center md:gap-8 md:px-10 md:pb-0"
    >
      <motion.div style={{ y }} className="order-2 md:order-1 md:col-span-6 lg:col-span-5">
        <p className="font-display text-[72px] leading-none md:text-[140px]">{m.heure}</p>
        <h3 className="font-display-text mt-4 text-2xl leading-tight md:text-4xl">{m.titre}</h3>
        <p className="mt-4 max-w-[30rem] text-base leading-relaxed opacity-85 md:text-lg">{m.texte}</p>
      </motion.div>
      <div className="order-1 md:order-2 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8">
        <div className="h-[34vh] w-full overflow-hidden md:aspect-[4/5] md:h-auto md:max-h-[70vh]">
          <motion.img
            style={{ scale }}
            src={m.image}
            alt={m.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  )
}

function Rail({ progress }: { progress: MotionValue<number> }) {
  const largeur = useTransform(progress, [0, 1], ['0%', '100%'])
  return (
    <div
      className="pointer-events-none absolute inset-x-5 bottom-6 mix-blend-difference md:inset-x-10 md:bottom-8"
      style={{ color: '#ffffff' }}
      aria-hidden="true"
    >
      <div className="relative h-px w-full bg-white/35">
        <motion.div style={{ width: largeur }} className="absolute inset-y-0 left-0 bg-white" />
      </div>
      <div className="mt-2 flex justify-between text-[11px] tracking-wide md:text-xs">
        {moments.map((m) => (
          <span key={m.heure}>{m.heure}</span>
        ))}
      </div>
    </div>
  )
}

function Epingle() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  // Le fond change autour de la frontière entre deux moments, quand le texte est presque éteint.
  const stops: number[] = []
  const couleurs: string[] = []
  moments.forEach((m, i) => {
    const { debut, fin } = fenetre(i)
    stops.push(i === 0 ? 0 : debut + GAP * 0.35, i === n - 1 ? 1 : fin - GAP * 0.35)
    couleurs.push(m.surface, m.surface)
  })
  const surface = useTransform(scrollYProgress, stops, couleurs)

  return (
    <div ref={ref} className="relative h-[300vh] md:h-[420vh]">
      <motion.div style={{ backgroundColor: surface }} className="sticky top-0 h-[100dvh] overflow-hidden">
        <div className="relative mx-auto h-full max-w-[1400px]">
          {moments.map((_, i) => (
            <Moment key={i} index={i} progress={scrollYProgress} />
          ))}
          <Rail progress={scrollYProgress} />
        </div>
      </motion.div>
    </div>
  )
}

function Statique() {
  return (
    <ol className="divide-y divide-encre/15 border-y border-encre/15">
      {moments.map((m) => (
        <li key={m.heure} className="grid grid-cols-1 gap-6 py-10 md:grid-cols-12 md:gap-8">
          <p className="font-display text-6xl leading-none md:col-span-2">{m.heure}</p>
          <div className="md:col-span-6">
            <h3 className="font-display-text text-2xl md:text-3xl">{m.titre}</h3>
            <p className="mt-3 max-w-[30rem] text-lg leading-relaxed text-encre/85">{m.texte}</p>
          </div>
          <img src={m.image} alt={m.alt} loading="lazy" className="aspect-[4/3] w-full object-cover md:col-span-4" />
        </li>
      ))}
    </ol>
  )
}

export default function Nuit() {
  const reduced = useReducedMotion()
  return (
    <section id="nuit" className="scroll-mt-20">
      <div className="mx-auto max-w-[1400px] px-5 pb-12 pt-6 md:px-10 md:pb-16">
        <h2 className="font-display text-4xl leading-[1.05] text-encre md:text-6xl">
          Une nuit au mas, heure par heure.
        </h2>
        <p className="mt-6 max-w-[34rem] text-lg text-encre/85">
          De {moments[0].heure} à {moments[n - 1].heure}, rien n’est à organiser. Voici ce qui se passe.
        </p>
      </div>
      {reduced ? (
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <Statique />
        </div>
      ) : (
        <Epingle />
      )}
    </section>
  )
}
