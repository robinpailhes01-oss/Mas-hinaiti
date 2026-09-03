import { options } from '../content/site'

export default function Options() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <h2 className="font-display text-4xl leading-[1.05] text-encre md:text-5xl">
            Dites-nous l’occasion. Le reste s’arrange.
          </h2>
        </div>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-10 md:col-span-8 md:grid-cols-2">
          {options.map((o) => (
            <div key={o.titre} className="border-t border-encre/20 pt-5">
              <dt className="font-display-text text-2xl text-encre">{o.titre}</dt>
              <dd className="mt-3 max-w-[26rem] text-base leading-relaxed text-encre/80">{o.texte}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
