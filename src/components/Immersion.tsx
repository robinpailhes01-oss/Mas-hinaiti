import { motion, useReducedMotion } from 'motion/react'

const ease = [0.16, 1, 0.3, 1] as const

function Photo({
  src,
  alt,
  w,
  h,
  className,
  delay = 0,
}: {
  src: string
  alt: string
  w: number
  h: number
  className: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.figure
      className={className}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay, ease }}
    >
      <img src={src} alt={alt} width={w} height={h} loading="lazy" className="h-full w-full object-cover" />
    </motion.figure>
  )
}

export default function Immersion() {
  return (
    <section id="immersion" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 md:px-10 md:py-40">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 md:pr-8">
          <h2 className="font-display text-4xl leading-[1.05] text-encre md:text-6xl">
            Pousser le portail, et changer d’île.
          </h2>
          <p className="mt-8 max-w-[30rem] text-lg leading-relaxed text-encre/85">
            Un mas provençal aux notes polynésiennes, caché au milieu des vignes, à cinq minutes à
            pied du GGL Stadium. Le rotin, le bois, le tiki, le grand pin au-dessus de la piscine :
            le dépaysement tient au lieu, pas à la décoration.
          </p>
          <p className="mt-5 max-w-[30rem] text-lg leading-relaxed text-encre/85">
            La Suite Vaima est la seule chambre du mas. Quand vous y êtes, il n’y a personne
            d’autre.
          </p>
        </div>

        <div className="grid grid-cols-6 gap-4 md:col-span-7 md:gap-6">
          <Photo
            src="/img/enseigne-fauteuil.webp"
            alt="L’enseigne Mas Hinaiti sur un mur de bois, fauteuil en rotin et bougie"
            w={756}
            h={1008}
            className="col-span-4 aspect-[3/4] overflow-hidden"
          />
          <Photo
            src="/img/couloir-rotin.webp"
            alt="Le couloir de la suite, parquet clair et fauteuils en rotin face au jardin"
            w={562}
            h={1000}
            className="col-span-2 mt-16 aspect-[9/16] overflow-hidden md:mt-24"
            delay={0.12}
          />
          <Photo
            src="/img/pergola-ciel.webp"
            alt="La pergola du mas et le grand pin sur ciel bleu"
            w={800}
            h={600}
            className="col-span-6 -mt-2 aspect-[16/10] overflow-hidden md:col-span-4 md:col-start-3"
            delay={0.08}
          />
        </div>
      </div>
    </section>
  )
}
