import { acces, site } from '../content/site'

export default function Acces() {
  return (
    <section id="acces" className="mx-auto max-w-[1400px] scroll-mt-20 px-5 py-28 md:px-10 md:py-40">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <h2 className="font-display text-4xl leading-[1.05] text-encre md:text-6xl">
            Ailleurs, sans partir.
          </h2>
          <address className="mt-8 text-lg not-italic leading-relaxed text-encre/85">
            {site.name}
            <br />
            {site.address.street}
            <br />
            {site.address.zip} {site.address.city}, {site.address.area.replace('Quartier', 'quartier')}
          </address>
          <a
            href={site.links.maps}
            target="_blank"
            rel="noreferrer"
            className="lien mt-4 inline-block text-base text-encre"
          >
            Ouvrir dans Google Maps
          </a>

          <dl className="mt-12 divide-y divide-encre/15 border-y border-encre/15">
            {acces.map((a) => (
              <div key={a.lieu} className="flex items-baseline gap-4 py-4">
                <dt className="font-display w-24 shrink-0 text-3xl leading-none text-encre">{a.duree}</dt>
                <dd className="text-base text-encre/80">
                  {a.mode} {a.lieu}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-7 md:pl-8">
          <div className="aspect-[4/3] w-full overflow-hidden bg-encre/5 md:aspect-auto md:h-full md:min-h-[520px]">
            <iframe
              title="Plan d’accès au Mas Hinaiti"
              src={site.links.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 grayscale-[0.4]"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
