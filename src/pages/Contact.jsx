import { useState } from 'react'

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  zipCode: '',
  phone: '',
  email: '',
  message: '',
}

const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5939.317363453322!2d-87.62581900000002!3d41.900197!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd33a410f0f77%3A0x827e9b80025985ed!2sWilson%20Chicago!5e0!3m2!1sen!2sus!4v1696250201175!5m2!1sen!2sus'

const NAME_RE = /^[a-zA-Z][a-zA-Z\s'-]{1,29}$/
const ZIP_RE = /^\d{3,10}$/
const PHONE_RE = /^[+\d][\d\s-]{6,15}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(form) {
  const errors = {}
  if (!NAME_RE.test(form.firstName.trim())) errors.firstName = 'Enter a valid first name.'
  if (!NAME_RE.test(form.lastName.trim())) errors.lastName = 'Enter a valid last name.'
  if (!ZIP_RE.test(form.zipCode.trim())) errors.zipCode = 'Enter a 3–10 digit zip code.'
  if (!PHONE_RE.test(form.phone.trim())) errors.phone = 'Enter a valid phone number.'
  if (!EMAIL_RE.test(form.email.trim())) errors.email = 'Enter a valid email address.'
  if (form.message.trim().length < 5)
    errors.message = 'Message must be at least 5 characters.'
  return errors
}

function Field({ id, label, value, onChange, error, type = 'text', textarea = false }) {
  const base =
    'mt-1 w-full rounded-lg border bg-white px-3 py-2 outline-none transition focus:border-emerald-500 dark:bg-gray-900'
  const border = error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {textarea ? (
        <textarea id={id} value={value} onChange={onChange} rows={4} className={`${base} ${border}`} />
      ) : (
        <input id={id} type={type} value={value} onChange={onChange} className={`${base} ${border}`} />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }))
    setErrors((er) => ({ ...er, [field]: undefined }))
    setSent(false)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const found = validate(form)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }
    // No backend yet — a successful submit just confirms locally.
    setErrors({})
    setForm(EMPTY_FORM)
    setSent(true)
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-center text-3xl font-bold">Contact Us</h1>
      <p className="mt-2 text-center text-gray-500 dark:text-gray-400">
        Have a question? Send us a message.
      </p>

      {sent && (
        <div className="mt-6 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
          Thanks! Your message has been sent. We&apos;ll get back to you soon.
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field id="firstName" label="First name" value={form.firstName} onChange={update('firstName')} error={errors.firstName} />
          <Field id="lastName" label="Last name" value={form.lastName} onChange={update('lastName')} error={errors.lastName} />
          <Field id="zipCode" label="Zip code" value={form.zipCode} onChange={update('zipCode')} error={errors.zipCode} />
          <Field id="phone" label="Phone" type="tel" value={form.phone} onChange={update('phone')} error={errors.phone} />
        </div>
        <Field id="email" label="Email" type="email" value={form.email} onChange={update('email')} error={errors.email} />
        <Field id="message" label="Message" value={form.message} onChange={update('message')} error={errors.message} textarea />
        <button
          type="submit"
          className="w-full rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white transition hover:bg-emerald-700 sm:w-auto"
        >
          Send Message
        </button>
      </form>

      <div className="mt-12">
        <h2 className="text-center text-2xl font-bold">You can find us here</h2>
        <iframe
          src={MAP_SRC}
          title="Wilson Sporting Goods, Chicago"
          className="mt-4 h-80 w-full rounded-xl border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}
