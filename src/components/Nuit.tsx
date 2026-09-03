import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { moments } from '../content/site'

/**
 * Section signature : la nuit au mas, heure par heure.
 *
 * Épinglée pendant tout le défilement. Le ciel est un dégradé continu qui suit
 * la lumière réelle d'une soirée d'été à Montpellier : fin d'après-midi dorée,
 * coucher de soleil, crépuscule violet, nuit de lagon avec ses étoiles, aube
 * pâle, matin clair. Une lueur (le soleil, puis la lune) se déplace avec les
 * heures. La progression passe par un ressort pour lisser la roue de la souris.
 */

const n = moments.length
const GAP = 0.04 // largeur d'un fondu de moment (en progression 0..1)

function fenetre(i: number) {
  return { debut: i / n, fin: (i + 1) / n }
}

/* ---------- Le ciel : couleurs clés sur toute la progression ---------- */

// [progression, couleur du haut, couleur du bas]
const CIEL: [number, string, string][] = [
  [0.0, '#e9dfc9', '#e3d5b8'], // 16 h — sable, plein soleil
  [0.12, '#ead1a9', '#e2c08f'], // fin d'après-midi dorée
  [0.167, '#c47a45', '#9e5533'], // coucher de soleil
  [0.21, '#5e3122', '#452833'], // 19 h — crépuscule
  [0.31, '#3b2a3e', '#22243b'], // violet qui tombe
  [0.333, '#26303f', '#152a37'],
  [0.37, '#1a2f36', '#0f2a33'], // 21 h — bleu de nuit
  [0.48, '#0e2830', '#0a2229'],
  [0.52, '#08222a', '#05171e'], // 23 h — lagon de nuit
  [0.64, '#061a22', '#04141a'], // le plus profond
  [0.667, '#5f8683', '#7a9a92'], // aube
  [0.71, '#cfdcd6', '#dbe2d8'], // 9 h — matin pâle
  [0.81, '#dfe4dc', '#e6e7dd'],
  [0.833, '#ede8da', '#f1ebdd'],
  [0.87, '#f8f3e8', '#f2ead9'], // 11 h — tiaré, lumière chaude
  [1.0, '#f8f3e8', '#f1e8d6'],
]

// La lueur : soleil qui descend, lune, soleil qui remonte.
// [progression, x %, y %, rayon px, couleur rgba]
const LUEUR: [number, number, number, number, string][] = [
  [0.0, 78, 14, 520, 'rgba(255,246,222,0.95)'],
  [0.12, 74, 40, 520, 'rgba(255,224,170,0.85)'],
  [0.167, 68, 74, 560, 'rgba(255,170,90,0.75)'],
  [0.23, 62, 100, 480, 'rgba(230,120,80,0.35)'],
  [0.33, 55, 118, 400, 'rgba(120,80,110,0.15)'],
  [0.45, 84, 14, 120, 'rgba(220,235,236,0.0)'],
  [0.55, 84, 14, 140, 'rgba(220,235,236,0.28)'], // lune
  [0.64, 84, 12, 140, 'rgba(220,235,236,0.22)'],
  [0.667, 22, 96, 420, 'rgba(255,236,200,0.35)'], // aube
  [0.74, 26, 58, 520, 'rgba(255,244,214,0.7)'],
  [0.85, 36, 22, 560, 'rgba(255,246,222,0.75)'],
  [1.0, 44, 8, 600, 'rgba(255,246,222,0.7)'],
]

// Étoiles : positions fixes, déterministes.
const ETOILES = Array.from({ length: 46 }, (_, i) => {
  const a = Math.sin(i * 12.9898) * 43758.5453
  const b = Math.sin(i * 78.233) * 43758.5453
  return {
    x: ((a - Math.floor(a)) * 100).toFixed(2),
    y: ((b - Math.floor(b)) * 58 + 4).toFixed(2),
    r: i % 5 === 0 ? 1.4 : 0.9,
  }
})

function Ciel({ progress }: { progress: MotionValue<number> }) {
  const haut = useTransform(progress, CIEL.map((c) => c[0]), CIEL.map((c) => c[1]))
  const bas = useTransform(progress, CIEL.map((c) => c[0]), CIEL.map((c) => c[2]))
  const lx = useTransform(progress, LUEUR.map((l) => l[0]), LUEUR.map((l) => l[1]))
  const ly = useTransform(progress, LUEUR.map((l) => l[0]), LUEUR.map((l) => l[2]))
  const lr = useTransform(progress, LUEUR.map((l) => l[0]), LUEUR.map((l) => l[3]))
  const lc = useTransform(progress, LUEUR.map((l) => l[0]), LUEUR.map((l) => l[4]))
  const fond = useMotionTemplate`radial-gradient(${lr}px circle at ${lx}% ${ly}%, ${lc}, transparent 70%), linear-gradient(180deg, ${haut} 0%, ${bas} 100%)`
  const etoiles = useTransform(progress, [0.38, 0.5, 0.63, 0.68], [0, 1, 1, 0])

  return (
    <>
      <motion.div style={{ backgroundImage: fond }} className="absolute inset-0" aria-hidden="true" />
      <motion.svg
        style={{ opacity: etoiles }}
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {ETOILES.map((e, i) => (
          <circle key={i} cx={e.x} cy={e.y} r={e.r * 0.12} fill="#f8f3e8" opacity={i % 3 === 0 ? 0.9 : 0.55} />
        ))}
      </motion.svg>
    </>
  )
}

/* ---------- Un moment : heure, titre, texte, photo ---------- */

function Moment({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const m = moments[index]
  const { debut, fin } = fenetre(index)
  const premier = index === 0
  const dernier = index === n - 1

  // Entrée sur [debut, debut + GAP], sortie sur [fin - GAP, fin]. Les plages couvrent [0, 1].
  const plage = premier
    ? [0, fin - GAP, fin, 1]
    : dernier
      ? [0, debut, debut + GAP, 1]
      : [0, debut, debut + GAP, fin - GAP, fin, 1]
  const cle = <T,>(entree: T, plein: T, sortie: T) =>
    premier ? [plein, plein, sortie, sortie] : dernier ? [entree, entree, plein, plein] : [entree, entree, plein, plein, sortie, sortie]

  const opacity = useTransform(progress, plage, cle(0, 1, 0))
  // L'heure défile comme une horloge : elle arrive d'en bas, repart par le haut.
  const heureY = useTransform(progress, plage, cle('100%', '0%', '-100%'))
  const texteY = useTransform(progress, plage, cle(28, 0, -28))
  const photoY = useTransform(progress, plage, cle(56, 0, -40))
  const photoScale = useTransform(progress, [0, debut, fin, 1], [1.08, 1.08, 1, 1])
  const photoOpacity = useTransform(progress, plage, cle(0, 1, 0))

  return (
    <div
      style={{ color: m.texteCouleur }}
      className="absolute inset-0 flex flex-col justify-center gap-5 px-5 pb-16 md:grid md:grid-cols-12 md:items-center md:gap-8 md:px-10 md:pb-0"
    >
      <div className="order-2 md:order-1 md:col-span-6 lg:col-span-5">
        <div className="overflow-hidden">
          <motion.p style={{ y: heureY }} className="font-display text-[72px] leading-[0.95] md:text-[140px]">
            {m.heure}
          </motion.p>
        </div>
        <motion.div style={{ opacity, y: texteY }}>
          <h3 className="font-display-text mt-4 text-2xl leading-tight md:text-4xl">{m.titre}</h3>
          <p className="mt-4 max-w-[30rem] text-base leading-relaxed opacity-85 md:text-lg">{m.texte}</p>
        </motion.div>
      </div>
      <motion.div
        style={{ opacity: photoOpacity, y: photoY }}
        className="order-1 md:order-2 md:col-span-6 md:col-start-7 lg:col-span-5 lg:col-start-8"
      >
        <div className="h-[34vh] w-full overflow-hidden md:aspect-[4/5] md:h-auto md:max-h-[70vh]">
          <motion.img
            style={{ scale: photoScale }}
            src={m.image}
            alt={m.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  )
}

/* ---------- Le rail : ligne, repère mobile, heures ---------- */

function Etiquette({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const { debut, fin } = fenetre(index)
  const opacity = useTransform(progress, [debut - 0.02, debut + 0.02, fin - 0.02, fin + 0.02], [0.45, 1, 1, 0.45])
  return (
    <motion.span style={{ opacity }} className="font-medium">
      {moments[index].heure}
    </motion.span>
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
      <div className="relative h-px w-full bg-white/30">
        <motion.div style={{ width: largeur }} className="absolute inset-y-0 left-0 bg-white/80" />
        <motion.div
          style={{ left: largeur }}
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        />
      </div>
      <div className="mt-3 flex justify-between text-[11px] tracking-wide md:text-xs">
        {moments.map((_, i) => (
          <Etiquette key={i} index={i} progress={progress} />
        ))}
      </div>
    </div>
  )
}

/* ---------- La section épinglée ---------- */

function Epingle() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  // Ressort : la roue de la souris avance par crans, le ciel doit glisser sans à-coups.
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.6, restDelta: 0.0002 })

  return (
    <div ref={ref} className="relative h-[340vh] md:h-[480vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-sable">
        <Ciel progress={progress} />
        <div className="relative mx-auto h-full max-w-[1400px]">
          {moments.map((_, i) => (
            <Moment key={i} index={i} progress={progress} />
          ))}
          <Rail progress={progress} />
        </div>
      </div>
    </div>
  )
}

/* ---------- Version statique (mouvement réduit) ---------- */

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
