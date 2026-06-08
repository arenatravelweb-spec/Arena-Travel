import { useEffect, useState } from 'react'
import { HiTicket, HiCalendarDays, HiShieldCheck, HiUsers, HiTrophy } from 'react-icons/hi2'
import { supabase } from '../lib/supabase'
import RifaModal from './RifaModal'

const MESES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']

function parseFecha(str) {
  if (!str) return null
  const [y, m, d] = str.split('-')
  return `${parseInt(d)} ${MESES[parseInt(m) - 1]} ${y}`
}

function diasRestantes(fechaLimite) {
  if (!fechaLimite) return null
  return Math.max(0, Math.ceil((new Date(fechaLimite) - new Date()) / 86400000))
}

function RifaCard({ rifa, onComprar }) {
  const vendidos    = rifa.numeros_vendidos || 0
  const total       = rifa.total_numeros   || 300
  const pct         = Math.min(100, Math.round((vendidos / total) * 100))
  const disponibles = total - vendidos
  const dias        = diasRestantes(rifa.fecha_limite)
  const premios     = Array.isArray(rifa.premios)        ? rifa.premios        : []
  const caract      = Array.isArray(rifa.caracteristicas) ? rifa.caracteristicas : []
  const urgente     = disponibles <= 50 || (dias !== null && dias <= 10)

  return (
    <div className="rc">
      {/* Header image */}
      <div className="rc__head">
        {rifa.imagen_url
          ? <img src={rifa.imagen_url} alt={rifa.titulo} className="rc__img" />
          : <div className="rc__img-placeholder"><HiTicket /></div>
        }
        <div className="rc__grad" />

        {urgente && (
          <span className="rc__urgente">
            {disponibles <= 50 ? `¡Solo ${disponibles} números!` : `¡${dias} días!`}
          </span>
        )}

        <div className="rc__head-bottom">
          <span className="rc__badge">RIFA OFICIAL</span>
          <h3 className="rc__title">{rifa.titulo}</h3>
        </div>
      </div>

      {/* Premios */}
      {premios.length > 0 && (
        <div className="rc__premios">
          <p className="rc__sub"><HiTrophy /> PREMIOS</p>
          {premios.map((p, i) => (
            <div key={i} className="rc__premio">
              <span className={`rc__premio-n rc__premio-n--${p.orden || i + 1}`}>
                {p.orden === 1 ? '1°' : p.orden === 2 ? '2°' : `${p.orden}°`}
              </span>
              <span className="rc__premio-txt">{p.descripcion}</span>
            </div>
          ))}
        </div>
      )}

      {/* Progress */}
      <div className="rc__prog">
        <div className="rc__prog-top">
          <span><HiUsers /> {vendidos} / {total} vendidos</span>
          <span className="rc__prog-pct">{pct}%</span>
        </div>
        <div className="rc__bar"><div className="rc__bar-fill" style={{ width: `${pct}%` }} /></div>
        <p className="rc__disp">{disponibles > 0 ? `${disponibles} números disponibles` : '¡Agotado!'}</p>
      </div>

      {/* Precio + fecha */}
      <div className="rc__meta">
        <div>
          <p className="rc__meta-label">Por número</p>
          <p className="rc__precio">$ {Number(rifa.precio_numero).toLocaleString('es-AR')}</p>
        </div>
        {rifa.fecha_limite && (
          <div className="rc__fecha">
            <HiCalendarDays />
            <span>Hasta {parseFecha(rifa.fecha_limite)}</span>
          </div>
        )}
      </div>

      {/* Características */}
      {caract.length > 0 && (
        <ul className="rc__caract">
          {caract.map((c, i) => <li key={i}><HiShieldCheck />{c}</li>)}
        </ul>
      )}

      <button
        className="rc__cta btn btn--primary"
        onClick={() => onComprar(rifa)}
        disabled={disponibles === 0}
      >
        {disponibles > 0 ? '🎟 Quiero mi número' : 'Agotado'}
      </button>
    </div>
  )
}

export default function Rifas() {
  const [rifas, setRifas]       = useState([])
  const [loading, setLoading]   = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    supabase
      .from('rifas').select('*').eq('activa', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => { setRifas(data || []); setLoading(false) })
  }, [])

  if (loading || rifas.length === 0) return null

  return (
    <section id="rifas" className="rifas-sec">
      <div className="container">

        <div className="rifas-sec__hdr reveal">
          <span className="rifas-sec__tag">SORTEOS ACTIVOS</span>
          <h2 className="rifas-sec__title">
            Rifas <span>Arena Travel</span>
          </h2>
          <p className="rifas-sec__sub">
            Comprá tu número y podés ganar el viaje de tus sueños.
            Sorteo transparente al vender todos los números.
          </p>
        </div>

        <div className={`rifas-sec__grid rifas-sec__grid--${Math.min(rifas.length, 3)}`}>
          {rifas.map(r => (
            <div key={r.id} className="reveal">
              <RifaCard rifa={r} onComprar={setSelected} />
            </div>
          ))}
        </div>

      </div>

      {selected && <RifaModal rifa={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
