import { site } from '../content/site'
import Vague from './Vague'

export default function Footer() {
  const { legal } = site
  const aDesMentions = legal.owner || legal.siret || legal.host

  return (
    <footer className="on-dark bg-nuit text-tiare">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-display text-3xl">Mas Hinaiti</p>
            <address className="mt-4 text-base not-italic leading-relaxed text-tiare/70">
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
            </address>
            {site.contact.phone && (
              <a href={`tel:${site.contact.phone.replace(/\s/g, '')}`} className="lien mt-3 inline-block text-base">
                {site.contact.phone}
              </a>
            )}
            {site.contact.email && (
              <a href={`mailto:${site.contact.email}`} className="lien mt-1 block w-fit text-base">
                {site.contact.email}
              </a>
            )}
          </div>

          <div className="md:col-span-3">
            <p className="text-sm text-tiare/50">Nous suivre</p>
            <ul className="mt-3 space-y-2 text-base">
              <li>
                <a href={site.links.instagram} target="_blank" rel="noreferrer" className="lien">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.links.facebook} target="_blank" rel="noreferrer" className="lien">
                  Facebook
                </a>
              </li>
              <li>
                <a href={site.links.booking} target="_blank" rel="noreferrer" className="lien">
                  Booking.com
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-sm text-tiare/50">Le mas accueille aussi</p>
            <p className="mt-3 max-w-[22rem] text-base leading-relaxed text-tiare/80">
              Mariages, anniversaires, baby showers et brunchs du lendemain, jusqu’à 150 personnes en
              saison, en privatisation totale. Écrivez-nous sur Instagram pour la brochure.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-tiare/15 pt-8">
          <Vague className="text-tiare/50" />
          <div className="text-sm text-tiare/50">
            {aDesMentions ? (
              <details>
                <summary className="cursor-pointer">Mentions légales</summary>
                <div className="mt-3 max-w-[32rem] space-y-1">
                  {legal.owner && <p>Éditeur : {legal.owner}</p>}
                  {legal.siret && <p>SIRET : {legal.siret}</p>}
                  {legal.host && <p>Hébergement : {legal.host}</p>}
                </div>
              </details>
            ) : (
              <span>© {new Date().getFullYear()} Mas Hinaiti</span>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
