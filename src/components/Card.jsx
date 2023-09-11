import Link from 'next/link'

export default function Card({ title, description, emoji, slug }) {
  return (
    <Link href="/components/[slug]" as={`/components/${slug}`}>
      <div className="flex items-end h-full p-8 pt-12 min-h-[250px] transition border-2 border-teal-400 rounded-xl bg-slate-900 hover:relative hover:bg-teal-400/5">
        <div>
          <span role="img" aria-hidden="true" className="text-4xl">
            {emoji}
          </span>

          <h2 className="mt-4 text-2xl font-bold text-white">
            {title}

            <span className="hidden">with Alpine JS</span>
          </h2>

          <p className="mt-1 text-lg font-medium leading-relaxed text-slate-300 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Link>
  )
}
