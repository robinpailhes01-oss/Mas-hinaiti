import { useState, type FormEvent } from 'react'
import { site } from '../content/site'

type Etat = 'repos' | 'envoi' | 'envoye' | 'copie' | 'erreur'

const occasions = ['Sans occasion particulière', 'Anniversaire', 'Demande en mariage', 'Anniversaire de mariage', 'Lendemain de mariage', 'Autre']
const optionsForm = [
  { id: 'chef', label: 'Dîner par un chef privé' },
  { id: 'piscine', label: 'Privatisation de la piscine' },
  { id: 'deco', label: 'Décoration sur mesure' },
]

function resume(data: FormData) {
  const opts = optionsForm.filter((o) => data.get(o.id)).map((o) => o.label)
  return [
    `Demande de date — ${site.suite}`,
    `Arrivée : ${data.get('arrivee') || '—'}`,
    `Départ : ${data.get('depart') || '—'}`,
    `Nom : ${data.get('nom') || '—'}`,
    `Email : ${data.get('email') || '—'}`,
    `Téléphone : ${data.get('telephone') || '—'}`,
    `Occasion : ${data.get('occasion') || '—'}`,
    `Options : ${opts.length ? opts.join(', ') : 'aucune'}`,
    `Message : ${data.get('message') || '—'}`,
  ].join('\n')
}

export default function Reservation() {
  const [etat, setEtat] = useState<Etat>('repos')
  const [texte, setTexte] = useState('')

  async function envoyer(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('site_web')) return // piège à robots
    const corps = resume(data)

    if (site.formEndpoint) {
      setEtat('envoi')
      try {
        const res = await fetch(site.formEndpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: data,
        })
        if (!res.ok) throw new Error(String(res.status))
        setEtat('envoye')
        form.reset()
      } catch {
        setEtat('erreur')
      }
      return
    }

    if (site.contact.email) {
      window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(
        `Demande de date — ${site.suite}`,
      )}&body=${encodeURIComponent(corps)}`
      setEtat('envoye')
      return
    }

    // Aucun canal configuré : on donne le récapitulatif à copier.
    setTexte(corps)
    try {
      await navigator.clipboard.writeText(corps)
    } catch {
      /* le texte reste affiché */
    }
    setEtat('copie')
  }

  return (
    <section id="reservation" className="on-dark scroll-mt-20 bg-lagon text-tiare">
      <div className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <h2 className="font-display text-4xl leading-[1.05] md:text-6xl">Demander une date.</h2>
            <p className="mt-8 max-w-[28rem] text-lg leading-relaxed text-tiare/85">
              Dites-nous quand, et pour quelle occasion. Nous revenons vers vous avec les
              disponibilités et, si vous avez coché une option, un devis.
            </p>
            <p className="mt-6 text-base text-tiare/70">
              Vous préférez réserver directement ?{' '}
              <a href={site.links.booking} target="_blank" rel="noreferrer" className="lien text-tiare">
                La suite est aussi sur Booking.com
              </a>
              .
            </p>
          </div>

          <form
            onSubmit={envoyer}
            className="md:col-span-6 md:col-start-7 [color-scheme:dark]"
            aria-describedby="form-aide"
            noValidate={false}
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm text-tiare/70">Arrivée</span>
                <input name="arrivee" type="date" required className="champ mt-1 border-tiare/40" />
              </label>
              <label className="block">
                <span className="text-sm text-tiare/70">Départ</span>
                <input name="depart" type="date" required className="champ mt-1 border-tiare/40" />
              </label>
              <label className="block">
                <span className="text-sm text-tiare/70">Nom</span>
                <input name="nom" type="text" required autoComplete="name" className="champ mt-1 border-tiare/40" />
              </label>
              <label className="block">
                <span className="text-sm text-tiare/70">Email</span>
                <input name="email" type="email" required autoComplete="email" className="champ mt-1 border-tiare/40" />
              </label>
              <label className="block">
                <span className="text-sm text-tiare/70">Téléphone</span>
                <input name="telephone" type="tel" autoComplete="tel" className="champ mt-1 border-tiare/40" />
              </label>
              <label className="block">
                <span className="text-sm text-tiare/70">Occasion</span>
                <select name="occasion" className="champ mt-1 border-tiare/40 bg-lagon">
                  {occasions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <fieldset className="mt-8">
              <legend className="text-sm text-tiare/70">Options, sur devis</legend>
              <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
                {optionsForm.map((o) => (
                  <label key={o.id} className="inline-flex min-h-11 cursor-pointer items-center gap-3 text-base">
                    <input type="checkbox" name={o.id} value="oui" className="h-5 w-5 accent-tiare" />
                    {o.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mt-8 block">
              <span className="text-sm text-tiare/70">Un mot sur votre séjour (facultatif)</span>
              <textarea name="message" rows={3} className="champ mt-1 resize-y border-tiare/40" />
            </label>

            <input type="text" name="site_web" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={etat === 'envoi'}
                className="inline-flex h-12 items-center bg-tiare px-6 text-base font-medium text-lagon transition-transform duration-200 hover:-translate-y-px disabled:opacity-60"
              >
                {etat === 'envoi' ? 'Envoi en cours' : 'Envoyer ma demande'}
              </button>
              <p id="form-aide" className="text-sm text-tiare/60">
                Aucune carte bancaire demandée à cette étape.
              </p>
            </div>

            <div aria-live="polite" className="mt-6 text-base">
              {etat === 'envoye' && (
                <p className="border-l-2 border-tiare pl-4">
                  Demande envoyée. Nous vous répondons par email avec les disponibilités.
                </p>
              )}
              {etat === 'erreur' && (
                <p className="border-l-2 border-tiare pl-4">
                  L’envoi n’a pas abouti. Réessayez dans un instant, ou écrivez-nous sur{' '}
                  <a href={site.links.instagram} target="_blank" rel="noreferrer" className="lien">
                    Instagram
                  </a>
                  .
                </p>
              )}
              {etat === 'copie' && (
                <div className="border-l-2 border-tiare pl-4">
                  <p>
                    Votre demande est copiée. Collez-la dans un message sur{' '}
                    <a href={site.links.instagram} target="_blank" rel="noreferrer" className="lien">
                      Instagram
                    </a>{' '}
                    ou{' '}
                    <a href={site.links.facebook} target="_blank" rel="noreferrer" className="lien">
                      Facebook
                    </a>
                    , nous vous répondons de là.
                  </p>
                  <pre className="mt-4 whitespace-pre-wrap font-body text-sm text-tiare/80">{texte}</pre>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
