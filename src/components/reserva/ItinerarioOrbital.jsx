import { useState, useEffect, useRef } from 'react'
import {
  HiCalendarDays, HiMapPin, HiSun, HiBuildingOffice2,
  HiGlobeAlt, HiHeart, HiCamera, HiTruck,
  HiCheck, HiArrowRight,
} from 'react-icons/hi2'

const DAY_ICONS = [
  HiCalendarDays, HiMapPin, HiSun, HiBuildingOffice2,
  HiGlobeAlt, HiHeart, HiCamera, HiTruck,
]

function mapItinerario(itinerario) {
  return itinerario.map((dia, i) => ({
    id:          i + 1,
    title:       dia.titulo || `Día ${dia.dia || i + 1}`,
    date:        `DÍA ${String(dia.dia || i + 1).padStart(2, '0')}`,
    content:     dia.descripcion || '',
    actividades: dia.actividades || [],
    icon:        DAY_ICONS[i % DAY_ICONS.length],
    energy:      60 + (i * 11) % 35,
    relatedIds:  [],
  }))
}

/* ─── Inline styles ─── */
const s = {
  wrap: (onClick) => ({
    width: '100%',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0d0d0d',
    borderRadius: 'var(--radius-md)',
    overflow: 'visible',
    position: 'relative',
    cursor: 'default',
  }),
  orbitArea: {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerOrb: {
    position: 'absolute',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #F7931E, #2EC4B6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    boxShadow: '0 0 28px rgba(247,147,30,.45), 0 0 56px rgba(46,196,182,.2)',
  },
  pingRing1: {
    position: 'absolute',
    width: '74px', height: '74px',
    borderRadius: '50%',
    border: '1px solid rgba(247,147,30,.35)',
    animation: 'ping 2s ease-in-out infinite',
  },
  pingRing2: {
    position: 'absolute',
    width: '96px', height: '96px',
    borderRadius: '50%',
    border: '1px solid rgba(46,196,182,.2)',
    animation: 'ping 2s ease-in-out infinite',
    animationDelay: '.6s',
  },
  centerCore: {
    width: '26px', height: '26px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,.88)',
    backdropFilter: 'blur(4px)',
  },
  orbitRing: {
    position: 'absolute',
    width: '300px', height: '300px',
    borderRadius: '50%',
    border: '1px solid rgba(255,255,255,.07)',
  },
  card: (expanded) => ({
    position: 'absolute',
    top: '66px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '230px',
    background: 'rgba(13,13,13,.97)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(247,147,30,.35)',
    borderRadius: '12px',
    padding: '1rem',
    boxShadow: '0 24px 48px rgba(0,0,0,.7), 0 0 0 1px rgba(247,147,30,.1)',
    zIndex: 500,
    animation: 'fadeUp .25s ease',
  }),
}

export default function ItinerarioOrbital({ itinerario = [] }) {
  const data = mapItinerario(itinerario)

  const [expanded, setExpanded]     = useState({})
  const [rotation, setRotation]     = useState(0)
  const [autoRotate, setAutoRotate] = useState(true)
  const [pulse, setPulse]           = useState({})
  const [activeId, setActiveId]     = useState(null)
  const containerRef = useRef(null)
  const orbitRef     = useRef(null)

  /* Auto-rotation */
  useEffect(() => {
    if (!autoRotate) return
    const t = setInterval(() => {
      setRotation(prev => Number(((prev + 0.3) % 360).toFixed(3)))
    }, 50)
    return () => clearInterval(t)
  }, [autoRotate])

  const handleBg = (e) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpanded({})
      setActiveId(null)
      setPulse({})
      setAutoRotate(true)
    }
  }

  const toggleItem = (id) => {
    setExpanded(prev => {
      const next = {}
      Object.keys(prev).forEach(k => { next[parseInt(k)] = false })
      next[id] = !prev[id]
      if (!prev[id]) {
        setActiveId(id)
        setAutoRotate(false)
      } else {
        setActiveId(null)
        setAutoRotate(true)
        setPulse({})
      }
      return next
    })
  }

  const nodePos = (index, total) => {
    const angle  = ((index / total) * 360 + rotation) % 360
    const radius = 150
    const rad    = (angle * Math.PI) / 180
    return {
      x:       radius * Math.cos(rad),
      y:       radius * Math.sin(rad),
      zIndex:  Math.round(100 + 50 * Math.cos(rad)),
      opacity: Math.max(.4, Math.min(1, .4 + .6 * ((1 + Math.sin(rad)) / 2))),
    }
  }

  if (data.length === 0) return null

  return (
    <div ref={containerRef} style={s.wrap()} onClick={handleBg}>
      <div ref={orbitRef} style={s.orbitArea}>

        {/* Center orb */}
        <div style={s.centerOrb}>
          <div style={s.pingRing1} />
          <div style={s.pingRing2} />
          <div style={s.centerCore} />
        </div>

        {/* Orbit ring */}
        <div style={s.orbitRing} />

        {/* Nodes */}
        {data.map((item, index) => {
          const pos        = nodePos(index, data.length)
          const isExpanded = !!expanded[item.id]
          const isPulsing  = !!pulse[item.id]
          const Icon       = item.icon

          return (
            <div
              key={item.id}
              onClick={e => { e.stopPropagation(); toggleItem(item.id) }}
              style={{
                position:   'absolute',
                transform:  `translate(${pos.x}px, ${pos.y}px)`,
                zIndex:     isExpanded ? 300 : pos.zIndex,
                opacity:    isExpanded ? 1 : pos.opacity,
                transition: 'all .7s ease',
                cursor:     'pointer',
              }}
            >
              {/* Glow ring */}
              <div style={{
                position:   'absolute',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(247,147,30,.25) 0%, transparent 70%)',
                width:  `${item.energy * 0.4 + 38}px`,
                height: `${item.energy * 0.4 + 38}px`,
                left:   `-${(item.energy * 0.4 + 38 - 40) / 2}px`,
                top:    `-${(item.energy * 0.4 + 38 - 40) / 2}px`,
                animation: isPulsing ? 'orbPulse 1s ease-in-out infinite' : 'none',
              }} />

              {/* Dot */}
              <div style={{
                width:          '40px',
                height:         '40px',
                borderRadius:   '50%',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                background:     isExpanded
                  ? 'linear-gradient(135deg, #F7931E, #2EC4B6)'
                  : 'rgba(10,10,10,.8)',
                border:         `2px solid ${isExpanded ? '#F7931E' : 'rgba(255,255,255,.3)'}`,
                boxShadow:      isExpanded ? '0 0 20px rgba(247,147,30,.5)' : 'none',
                transform:      isExpanded ? 'scale(1.45)' : 'scale(1)',
                transition:     'all .3s ease',
                color:          'white',
              }}>
                <Icon size={15} />
              </div>

              {/* Day label */}
              <div style={{
                position:  'absolute',
                top:       '46px',
                left:      '50%',
                transform: 'translateX(-50%)',
                whiteSpace: 'nowrap',
                fontSize:  '.65rem',
                fontWeight: '800',
                letterSpacing: '.1em',
                color:     isExpanded ? '#F7931E' : 'rgba(255,255,255,.55)',
                transition: 'color .3s',
                fontFamily: 'Inter, sans-serif',
              }}>
                {item.date}
              </div>

              {/* Expanded popup */}
              {isExpanded && (
                <div style={s.card(true)} onClick={e => e.stopPropagation()}>
                  {/* Connector */}
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%',
                    transform: 'translateX(-50%)',
                    width: '1px', height: '12px',
                    background: 'rgba(247,147,30,.5)',
                  }} />

                  {/* Badge + date */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.55rem' }}>
                    <span style={{
                      fontSize: '.58rem', fontWeight: '800',
                      letterSpacing: '.16em', textTransform: 'uppercase',
                      color: '#F7931E',
                      background: 'rgba(247,147,30,.15)',
                      padding: '.2rem .65rem', borderRadius: '100px',
                    }}>
                      {item.date}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '.95rem', fontWeight: '700',
                    color: 'white', marginBottom: '.45rem', lineHeight: '1.3',
                  }}>
                    {item.title}
                  </h4>

                  {/* Description */}
                  {item.content && (
                    <p style={{
                      fontSize: '.77rem', color: 'rgba(255,255,255,.6)',
                      lineHeight: '1.55', marginBottom: item.actividades.length ? '.65rem' : '0',
                    }}>
                      {item.content}
                    </p>
                  )}

                  {/* Energy bar */}
                  <div style={{ marginBottom: item.actividades.length ? '.65rem' : '0', marginTop: '.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.25rem' }}>
                      <span style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.45)', display: 'flex', alignItems: 'center', gap: '.2rem' }}>
                        intensidad
                      </span>
                      <span style={{ fontSize: '.62rem', color: 'rgba(255,255,255,.45)', fontVariantNumeric: 'tabular-nums' }}>
                        {item.energy}%
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,.1)', borderRadius: '100px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${item.energy}%`,
                        background: 'linear-gradient(to right, #F7931E, #2EC4B6)',
                        borderRadius: '100px',
                      }} />
                    </div>
                  </div>

                  {/* Activities as chips */}
                  {item.actividades.length > 0 && (
                    <div style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: '.6rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.3rem' }}>
                        {item.actividades.map((act, j) => (
                          <span key={j} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '.25rem',
                            fontSize: '.67rem', color: 'rgba(255,255,255,.65)',
                            background: 'rgba(255,255,255,.06)',
                            border: '1px solid rgba(255,255,255,.1)',
                            padding: '.18rem .55rem', borderRadius: '100px',
                          }}>
                            <HiCheck size={9} color="#2EC4B6" />
                            {act}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
