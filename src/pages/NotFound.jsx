import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 text-center">
      <p className="text-6xl font-bold text-emerald-600 dark:text-emerald-400">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        The page you are looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700"
      >
        Back to home
      </Link>
    </section>
  )
}
