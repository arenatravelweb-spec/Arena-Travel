import { useEffect } from 'react'
import Home from './pages/Home'

export default function App() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const observe = () => {
      document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el))
    }

    observe()

    const mutObs = new MutationObserver(observe)
    mutObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      obs.disconnect()
      mutObs.disconnect()
    }
  }, [])

  return <Home />
}
