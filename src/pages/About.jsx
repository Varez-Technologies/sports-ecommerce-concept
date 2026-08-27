import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Accordion from '../components/Accordion.jsx'
import { faqCategories } from '../data/faqs.js'

const overview = [
  'The Wilson Sporting Goods Company is an American sports equipment manufacturer based in Chicago, Illinois. The company has been an independent subsidiary of multinational company Amer Sports since 1989. Wilson makes equipment for many sports, among them baseball, badminton, American football, basketball, fastpitch softball, golf, racquetball, soccer, cricket, squash, tennis, pickleball and volleyball.',
  'The company owns the brands Atec, DeMarini, EvoShield, Louisville Slugger, and Luxilon to provide sports equipment and protective gear for baseball, lacrosse, softball, and tennis.',
]

const history = [
  'Wilson Sporting Goods, often simply referred to as Wilson, is a renowned American sports equipment manufacturer with a rich history that spans over a century. The company has played a pivotal role in shaping the sports industry and has become synonymous with quality and innovation in various sports.',
  "Wilson Sporting Goods was founded in 1913 by Thomas E. Wilson in Chicago, Illinois. The company initially focused on producing tennis racket strings, aiming to provide high-quality strings for tennis enthusiasts. Wilson's dedication to quality quickly earned it a reputation in the tennis community, and by the 1920s they had expanded their product line to include tennis rackets.",
  "In the decades that followed, Wilson continued to innovate and expand into other sports. They introduced the first steel tennis racket in 1967, revolutionizing the game. Wilson's innovative approach to equipment design also extended to golf, as they developed popular golf clubs and balls.",
  "One of Wilson's most iconic products is the Wilson NFL football. Since 1941, Wilson has been the exclusive supplier of footballs to the National Football League. These footballs have been used in countless NFL games, including Super Bowls, solidifying Wilson's position as a trusted brand in American football.",
  'In addition to tennis and football, Wilson Sporting Goods has made significant contributions to sports like basketball, baseball, and golf. Their basketballs, used in various NBA championships, are a testament to their commitment to quality, and Wilson baseballs have been used in Major League Baseball for many years.',
  "Wilson's commitment to innovation has also led to collaborations with athletes, resulting in signature equipment lines. Famous athletes have endorsed Wilson products, further enhancing the company's reputation.",
  "Over the years, Wilson Sporting Goods has continued to evolve and adapt to changing sports trends and technologies, expanding its range to include a wide array of sports equipment, apparel, and accessories. The company's commitment to excellence and its enduring legacy make Wilson a respected and trusted brand.",
  'Today, Wilson Sporting Goods remains a global leader in sports equipment, catering to athletes and enthusiasts of all levels across numerous sports. With a history deeply rooted in innovation and quality, Wilson continues to shape the sports industry and empower athletes to perform at their best.',
]

export default function About() {
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id)
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])

  const category = faqCategories.find((c) => c.id === activeCategory)

  return (
    <>
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold">About Wilson Sporting Goods</h1>
        <p className="mx-auto mt-3 max-w-2xl px-4 text-gray-500 dark:text-gray-400">
          Over a century of equipping athletes with quality and innovation.
        </p>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-bold">What is Wilson Sporting Goods?</h2>
        {overview.map((p) => (
          <p key={p} className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
            {p}
          </p>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-bold">A Little History</h2>
        {history.map((p) => (
          <p key={p} className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
            {p}
          </p>
        ))}
      </section>

      <section id="faqs" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-14">
        <h2 className="text-center text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {faqCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveCategory(c.id)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                c.id === activeCategory
                  ? 'border-emerald-600 bg-emerald-600 text-white'
                  : 'border-gray-300 hover:border-emerald-500 dark:border-gray-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <Accordion key={activeCategory} items={category.faqs} />
        </div>
      </section>
    </>
  )
}
