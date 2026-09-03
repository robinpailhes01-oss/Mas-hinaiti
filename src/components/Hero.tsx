import { motion, useReducedMotion } from 'motion/react'
import { preuves, site } from '../content/site'
import Vague from './Vague'

const lignes = ['La Polynésie,', 'à dix minutes', 'de la Comédie.']
const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-24 md:pt-32">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-5 md:grid-cols-12 md:gap-8 md:px-10">
        {/* Texte */}
        <div className="md:col-span-7 md:self-center md:pb-16">
          <p className="mb-6 text-sm text-encre/70 md:text-[15px]">
            {site.suite}, {site.address.city} {site.address.area.replace('Quartier ', '')}
          </p>

          <h1
            className="font-display text-[15vw] leading-[0.98] text-encre sm:text-[64px] lg:text-[88px]"
            aria-label={lignes.join(' ')}
          >
            {lignes.map((l, i) => (
              <span key={l} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  aria-hidden="true"
                  initial={reduced ? false : { y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
          >
            <p className="mt-8 max-w-[34rem] text-lg leading-relaxed text-encre/85 md:text-xl">
              Une suite, un patio privé, un parc de 2 000 m² et une piscine, pour deux.
              Petit-déjeuner et champagne compris. Vous arrivez à {site.checkIn}, on ne vous
              dérange plus.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#reservation"
                className="inline-flex h-12 items-center bg-lagon px-6 text-base font-medium text-tiare transition-transform duration-200 hover:-translate-y-px"
              >
                Demander une date
              </a>
              <a href="#nuit" className="lien text-base text-encre">
                Voir la nuit, heure par heure
              </a>
            </div>
          </motion.div>
        </div>

        {/* Photos : une grande, une petite qui déborde */}
        <div className="relative md:col-span-5">
          <motion.figure
            className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[3/4]"
            initial={reduced ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
          >
            <img
              src="/img/piscine-pin.webp"
              alt="La piscine du Mas Hinaiti sous le grand pin, par une journée de ciel bleu"
              width={605}
              height={807}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </motion.figure>
          <motion.figure
            className="absolute -bottom-8 -left-4 w-[42%] overflow-hidden border-[6px] border-sable md:-left-16 md:bottom-10 md:w-[46%]"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease }}
          >
            <img
              src="/img/patio-vue-parc.webp"
              alt="Vue depuis la porte-fenêtre du patio sur les toits et le parc"
              width={768}
              height={1024}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </motion.figure>
        </div>
      </div>

      {/* Ligne de preuves : des chiffres, pas des adjectifs */}
      <motion.div
        className="mx-auto mt-20 max-w-[1400px] px-5 md:mt-28 md:px-10"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Vague className="text-lagon" />
        <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-encre/15 pt-8 md:grid-cols-4">
          {preuves.map((p) => (
            <div key={p.unite}>
              <dt className="font-display text-4xl leading-none text-encre md:text-5xl">{p.valeur}</dt>
              <dd className="mt-2 text-[15px] leading-snug text-encre/80">
                {p.unite}
                <span className="block text-encre/55">{p.detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  )
}
