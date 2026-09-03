import { suiteSpecs } from '../content/site'

export default function Suite() {
  return (
    <section id="suite" className="scroll-mt-20 bg-tiare">
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="font-display text-4xl leading-[1.05] text-encre md:text-6xl">
              La Suite Vaima : 30 m², un patio sur le parc.
            </h2>
            <p className="mt-8 max-w-[30rem] text-lg leading-relaxed text-encre/85">
              Deux personnes maximum. Arrivée à partir de 16 h, départ à 11 h. Tout ce qui suit
              est dans la suite, pas en supplément.
            </p>

            <dl className="mt-12 divide-y divide-encre/15 border-y border-encre/15">
              {suiteSpecs.map((s) => (
                <div key={s.titre} className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-3 sm:gap-6">
                  <dt className="font-display-text text-xl text-encre">{s.titre}</dt>
                  <dd className="sm:col-span-2">
                    <ul className="space-y-1.5 text-[15px] leading-snug text-encre/80 md:text-base">
                      {s.lignes.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid grid-cols-2 gap-4 md:col-span-7 md:gap-6 md:pl-8">
            <figure className="col-span-2 aspect-[4/3] overflow-hidden">
              <img
                src="/img/salle-de-bain.webp"
                alt="La salle de bain : double vasque, grand miroir et peignoir"
                width={768}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
            <figure className="aspect-[3/4] overflow-hidden">
              <img
                src="/img/bain-balneo-jour.webp"
                alt="La baignoire balnéo double, un fauteuil et le rideau vers le patio"
                width={444}
                height={666}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
            <figure className="aspect-[3/4] overflow-hidden">
              <img
                src="/img/entree-suite.webp"
                alt="L’entrée de la suite, fauteuil en rotin, escalier vers la mezzanine"
                width={768}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
