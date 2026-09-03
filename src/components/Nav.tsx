import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { site } from '../content/site'

const liens = [
  { href: '#immersion', label: 'Le mas' },
  { href: '#nuit', label: 'Une nuit' },
  { href: '#suite', label: 'La suite' },
  { href: '#tarif', label: 'Tarif' },
  { href: '#acces', label: 'Accès' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [cache, setCache] = useState(false)
  const [ouvert, setOuvert] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    let dernier = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // Se range en descendant, revient dès qu'on remonte : la barre ne reste pas plaquée sur les sections sombres.
      setCache(y > 160 && y > dernier)
      dernier = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: cache && !ouvert ? '-100%' : 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || ouvert ? 'bg-sable/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-20 md:px-10">
        <a href="#" className="font-display text-[22px] leading-none text-encre md:text-2xl" aria-label="Retour en haut">
          Mas Hinaiti
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Sections du site">
          {liens.map((l) => (
            <a key={l.href} href={l.href} className="lien text-[15px] text-encre/80 hover:text-encre">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#reservation"
            className="inline-flex h-11 items-center bg-lagon px-5 text-[15px] font-medium text-tiare transition-transform duration-200 hover:-translate-y-px"
          >
            <span className="md:hidden">Réserver</span>
            <span className="hidden md:inline">Demander une date</span>
          </a>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center text-encre md:hidden"
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            aria-label={ouvert ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOuvert((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {ouvert ? (
                <path d="M4 4l14 14M18 4L4 18" />
              ) : (
                <path d="M2 6h18M2 11h18M2 16h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {ouvert && (
        <nav id="menu-mobile" className="border-t border-encre/10 px-5 pb-6 pt-2 md:hidden" aria-label="Sections du site">
          {liens.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOuvert(false)}
              className="block border-b border-encre/10 py-4 font-display-text text-xl text-encre"
            >
              {l.label}
            </a>
          ))}
          <p className="mt-4 text-sm text-encre/60">
            {site.address.street}, {site.address.city}
          </p>
        </nav>
      )}
    </motion.header>
  )
}
