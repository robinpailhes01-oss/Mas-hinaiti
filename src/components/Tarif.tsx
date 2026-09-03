import { inclus, site } from '../content/site'

export default function Tarif() {
  return (
    <section id="tarif" className="scroll-mt-20 bg-tiare">
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <h2 className="font-display text-4xl leading-[1.05] text-encre md:text-6xl">
              Une nuit pour deux, tout compris.
            </h2>
            <p className="mt-10 font-display text-[64px] leading-none text-encre md:text-[96px]">
              {site.priceFrom} €
            </p>
            <p className="mt-3 text-base text-encre/70">
              à partir de, la nuit, pour deux. Le tarif varie selon la date et la saison.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#reservation"
                className="inline-flex h-12 items-center bg-lagon px-6 text-base font-medium text-tiare transition-transform duration-200 hover:-translate-y-px"
              >
                Demander une date
              </a>
              <a
                href={site.links.booking}
                target="_blank"
                rel="noreferrer"
                className="lien text-base text-encre"
              >
                Réserver sur Booking.com
              </a>
            </div>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <h3 className="text-sm text-encre/60">Compris dans la nuit</h3>
            <ul className="mt-4 divide-y divide-encre/15 border-y border-encre/15">
              {inclus.map((l) => (
                <li key={l} className="py-4 text-lg text-encre">
                  {l}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[15px] leading-relaxed text-encre/70">
              Le dîner par un chef privé, la privatisation de la piscine et la décoration sur
              mesure sont sur devis, précisés dans votre demande.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
