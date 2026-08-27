import { useState, useEffect, useCallback } from 'react'

/**
 * Fading image carousel. `slides` is an array of { image, alt }.
 * Auto-advances; pauses nothing fancy — arrows and dots for manual control.
 */
export default function Carousel({ slides, interval = 4500 }) {
  const [index, setIndex] = useState(0)
  const count = slides.length

  const go = useCallback((i) => setIndex((i + count) % count), [count])

  useEffect(() => {
    if (count <= 1) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), interval)
    return () => clearInterval(timer)
  }, [count, interval])

  return (
    <div className="relative h-[320px] overflow-hidden bg-gray-200 sm:h-[440px] lg:h-[540px] dark:bg-gray-800">
      {slides.map((slide, i) => (
        <img
          key={slide.image}
          src={slide.image}
          alt={slide.alt ?? ''}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <button
        type="button"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-1 text-3xl leading-none text-white backdrop-blur transition hover:bg-black/60"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-1 text-3xl leading-none text-white backdrop-blur transition hover:bg-black/60"
      >
        ›
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((slide, i) => (
          <button
            key={slide.image}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? 'w-6 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
