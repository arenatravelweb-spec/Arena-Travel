import { useState } from 'react'
import { toast } from 'sonner'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import {
  HiDocumentText, HiCreditCard, HiBanknotes, HiBuildingLibrary,
  HiEnvelope, HiShieldCheck, HiCheckCircle,
} from 'react-icons/hi2'
import { supabase } from '../../lib/supabase'
import { useReserva } from '../../context/ReservaContext'

initMercadoPago(import.meta.env.VITE_MP_PUBLIC_KEY, { locale: 'es-AR' })

const TIPOS_DOC = ['DNI', 'Pasaporte', 'LC', 'LE', 'CI']
const SEXOS     = ['Femenino', 'Masculino', 'No binario', 'Prefiero no decir']
const PAISES    = ['Argentina', 'Brasil', 'Chile', 'Uruguay', 'Bolivia', 'Paraguay', 'Perú', 'Colombia', 'Otro']

const METODOS_PAGO = [
  {
    id: 'transferencia',
    nombre: 'Transferencia',
    desc: 'Recibirás los datos en pantalla y por email.',
    Icon: HiBuildingLibrary,
    recomendado: true,
  },
  {
    id: 'efectivo',
    nombre: 'Efectivo',
    desc: 'Pagá en efectivo en la agencia.',
    Icon: HiBanknotes,
  },
  {
    id: 'tarjeta',
    nombre: 'Tarjeta (Crédito / Débito)',
    desc: 'Hasta 6 cuotas sin interés.',
    Icon: HiCreditCard,
  },
]

function fmt(n) {
  return Number(n).toLocaleString('es-AR', { minimumFractionDigits: 0 })
}

export default function StepCheckout() {
  const {
    paquete, fecha,
    pasajeros, transportes, habitaciones,
    checkout, setCheckout,
    precioBase, calcTotal,
    opcionesTransporte,
    prevStep,
  } = useReserva()

  const [submitting, setSubmitting]   = useState(false)
  const [done, setDone]               = useState(false)
  const [errors, setErrors]           = useState({})
  const [preferenceId, setPreferenceId] = useState(null)

  const total = calcTotal()

  const initDatos = pasajeros.map((p, i) => ({
    nombre:       p.nombre || '',
    apellido:     '',
    edad:         p.edad  || '',
    tipoDoc:      '',
    numDoc:       '',
    sexo:         '',
    nacionalidad: 'Argentina',
    ...(checkout.datos?.[i] || {}),
  }))

  const updateDato = (i, field, value) => {
    const datos = [...initDatos]
    datos[i] = { ...datos[i], [field]: value }
    setCheckout(prev => ({ ...prev, datos }))
  }

  const updateField = (field, value) => setCheckout(prev => ({ ...prev, [field]: value }))

  const validate = () => {
    const errs = {}
    initDatos.forEach((d, i) => {
      if (!d.nombre)   errs[`nombre_${i}`]   = 'Requerido'
      if (!d.apellido) errs[`apellido_${i}`] = 'Requerido'
      if (!d.tipoDoc)  errs[`tipoDoc_${i}`]  = 'Requerido'
      if (!d.numDoc)   errs[`numDoc_${i}`]   = 'Requerido'
      if (d.edad === '' || isNaN(parseInt(d.edad))) errs[`edad_${i}`] = 'Requerido'
    })
    if (!checkout.medioPago) errs.medioPago = 'Seleccioná un método de pago'
    if (!checkout.email)     errs.email     = 'Requerido'
    if (!checkout.telefono)  errs.telefono  = 'Requerido'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error('Completá todos los campos obligatorios.')
      return
    }
    setSubmitting(true)
    try {
      const transportesArr = pasajeros
        .filter(p => { const e=parseInt(p.edad); return !isNaN(e)&&e>=2 })
        .map((_, i) => ({ pasajero: i, transporte: transportes[i] || opcionesTransporte[0]?.nombre }))

      const habitacionesArr = habitaciones.map(h => ({
        tipo:     h.tipo,
        subTipo:  h.subTipo,
        pasajeros: h.pasajeros,
      }))

      const { error } = await supabase.from('reservas').insert({
        paquete_id:    paquete?.id,
        paquete_nombre: paquete?.nombre,
        fecha_salida:  fecha,
        pasajeros:     checkout.datos || initDatos,
        transportes:   transportesArr,
        habitaciones:  habitacionesArr,
        checkout: {
          medioPago: checkout.medioPago,
          email:     checkout.email,
          telefono:  checkout.telefono,
          notas:     checkout.notas,
        },
        precio_base:  precioBase,
        precio_total: total,
        estado:       'pendiente',
      })

      if (error) throw error

      // Si eligió tarjeta, crear preferencia en MercadoPago
      if (checkout.medioPago === 'tarjeta') {
        const mpRes = await fetch('/api/crear-preferencia', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre:      paquete?.nombre,
            precio:      total,
            descripcion: `Reserva ${paquete?.nombre}`,
            comprador: {
              nombre:   (checkout.datos?.[0]?.nombre || '') + ' ' + (checkout.datos?.[0]?.apellido || ''),
              email:    checkout.email,
              telefono: checkout.telefono,
            },
          }),
        })
        const mpData = await mpRes.json()
        if (mpData.preference_id) {
          setPreferenceId(mpData.preference_id)
          setSubmitting(false)
          return
        }
      }

      setDone(true)
    } catch (err) {
      console.error('Error al guardar reserva:', err)
      toast.error('Ocurrió un error. Intentá de nuevo o contactanos por WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="paso paso--success">
        <HiCheckCircle className="paso__success-icon" />
        <h2 className="paso__title">¡Ya estás dentro!</h2>
        <p className="paso__subtitle">
          Tu lugar está apartado. Te escribimos pronto con los datos para cerrar el pago.<br />
          Revisá tu email: <strong>{checkout.email}</strong>
        </p>
        {checkout.medioPago === 'transferencia' && (
          <div className="paso__transfer-info">
            <p>Te enviamos los datos de transferencia por email y al WhatsApp que indicaste.</p>
          </div>
        )}
        <a href="/" className="btn btn--primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
          Volver al inicio
        </a>
      </div>
    )
  }

  return (
    <div className="paso">
      <h2 className="paso__title">Último paso, ¡ya casi!</h2>
      <p className="paso__subtitle">
        Completá tus datos de contacto y elegí cómo querés pagar — en segundos cerramos todo.
      </p>

      <div className="checkout__layout">

        {/* COL IZQUIERDA: Datos documentales */}
        <div className="checkout__col-left">
          <div className="checkout__section">
            <h3 className="checkout__section-title">
              <HiDocumentText /> Datos documentales
            </h3>
            {pasajeros.map((pax, i) => {
              const dato = checkout.datos?.[i] || initDatos[i]
              return (
                <div key={i} className="checkout__passenger">
                  <div className="checkout__passenger-header">
                    <strong>Pasajero {i + 1}</strong>
                    <span>{pax.edad} años · {parseInt(pax.edad) >= 12 ? 'Adulto' : 'Menor'}</span>
                  </div>
                  {/* Nombre + Apellido + Edad: 2fr 2fr 1fr */}
                  <div className="form__grid-2-2-1">
                    <div className="form__group">
                      <label>Nombre/s *</label>
                      <input
                        type="text"
                        value={dato.nombre}
                        placeholder="Como figura en el DNI"
                        className={errors[`nombre_${i}`] ? 'error' : ''}
                        onChange={e => updateDato(i, 'nombre', e.target.value)}
                      />
                      {errors[`nombre_${i}`] && <span className="form__error">{errors[`nombre_${i}`]}</span>}
                    </div>
                    <div className="form__group">
                      <label>Apellido/s *</label>
                      <input
                        type="text"
                        value={dato.apellido}
                        placeholder="Como figura en el DNI"
                        className={errors[`apellido_${i}`] ? 'error' : ''}
                        onChange={e => updateDato(i, 'apellido', e.target.value)}
                      />
                      {errors[`apellido_${i}`] && <span className="form__error">{errors[`apellido_${i}`]}</span>}
                    </div>
                    <div className="form__group">
                      <label>Edad *</label>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        placeholder="Ej: 30"
                        value={dato.edad}
                        className={errors[`edad_${i}`] ? 'error' : ''}
                        onChange={e => updateDato(i, 'edad', e.target.value)}
                      />
                      {errors[`edad_${i}`] && <span className="form__error">{errors[`edad_${i}`]}</span>}
                    </div>
                  </div>
                  {/* TipoDoc + NumDoc + Sexo: 3 cols */}
                  <div className="form__grid-1-2-1">
                    <div className="form__group">
                      <label>Tipo doc *</label>
                      <select
                        value={dato.tipoDoc}
                        className={errors[`tipoDoc_${i}`] ? 'error' : ''}
                        onChange={e => updateDato(i, 'tipoDoc', e.target.value)}
                      >
                        <option value="">Tipo</option>
                        {TIPOS_DOC.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                      {errors[`tipoDoc_${i}`] && <span className="form__error">{errors[`tipoDoc_${i}`]}</span>}
                    </div>
                    <div className="form__group">
                      <label>Número de documento *</label>
                      <input
                        type="text"
                        value={dato.numDoc}
                        placeholder="12345678"
                        className={errors[`numDoc_${i}`] ? 'error' : ''}
                        onChange={e => updateDato(i, 'numDoc', e.target.value)}
                      />
                      {errors[`numDoc_${i}`] && <span className="form__error">{errors[`numDoc_${i}`]}</span>}
                    </div>
                    <div className="form__group">
                      <label>Sexo</label>
                      <select value={dato.sexo} onChange={e => updateDato(i, 'sexo', e.target.value)}>
                        <option value="">—</option>
                        {SEXOS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  {/* Nacionalidad full width */}
                  <div className="form__group">
                    <label>Nacionalidad</label>
                    <select value={dato.nacionalidad} onChange={e => updateDato(i, 'nacionalidad', e.target.value)}>
                      {PAISES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* COL DERECHA: pasos secuenciales numerados */}
        <div className="checkout__col-right">
          <div className="checkout__steps">

            {/* Paso 1: Medio de pago */}
            <div className={`checkout__step${checkout.medioPago ? ' checkout__step--done' : ''}`}>
              <div className="checkout__step-head">
                <span className="checkout__step-num">1</span>
                <div>
                  <strong className="checkout__step-title">Medio de pago</strong>
                  {checkout.medioPago && (
                    <span className="checkout__step-preview">
                      {METODOS_PAGO.find(m => m.id === checkout.medioPago)?.nombre}
                    </span>
                  )}
                </div>
                <HiCreditCard className="checkout__step-icon" />
              </div>
              <div className="checkout__step-body">
                {errors.medioPago && <span className="form__error" style={{ marginBottom: '.5rem', display: 'block' }}>{errors.medioPago}</span>}
                <div className="checkout__pago-grid">
                  {METODOS_PAGO.map(m => (
                    <button
                      key={m.id}
                      className={`checkout__pago-card${checkout.medioPago === m.id ? ' checkout__pago-card--selected' : ''}`}
                      onClick={() => updateField('medioPago', m.id)}
                    >
                      {m.recomendado && <span className="checkout__pago-rec">Recomendado</span>}
                      <m.Icon className="checkout__pago-icon" />
                      <strong className="checkout__pago-name">{m.nombre}</strong>
                    </button>
                  ))}
                </div>
              </div>
              <div className="checkout__step-connector" />
            </div>

            {/* Paso 2: Datos de contacto */}
            <div className={`checkout__step${(checkout.email && checkout.telefono) ? ' checkout__step--done' : ''}`}>
              <div className="checkout__step-head">
                <span className="checkout__step-num">2</span>
                <div>
                  <strong className="checkout__step-title">Datos de contacto</strong>
                  {checkout.email && (
                    <span className="checkout__step-preview">{checkout.email}</span>
                  )}
                </div>
                <HiEnvelope className="checkout__step-icon" />
              </div>
              <div className="checkout__step-body">
                <div className="form__grid-2-1">
                  <div className="form__group">
                    <label>Email *</label>
                    <input
                      type="email"
                      placeholder="tu@email.com"
                      value={checkout.email}
                      className={errors.email ? 'error' : ''}
                      onChange={e => updateField('email', e.target.value)}
                    />
                    {errors.email && <span className="form__error">{errors.email}</span>}
                  </div>
                  <div className="form__group">
                    <label>Teléfono *</label>
                    <div className="checkout__phone-group">
                      <span className="checkout__phone-prefix">+54</span>
                      <input
                        type="tel"
                        placeholder="3815 123456"
                        value={checkout.telefono}
                        className={errors.telefono ? 'error' : ''}
                        onChange={e => updateField('telefono', e.target.value)}
                      />
                    </div>
                    {errors.telefono && <span className="form__error">{errors.telefono}</span>}
                  </div>
                </div>
              </div>
              <div className="checkout__step-connector" />
            </div>

            {/* Paso 3: Notas */}
            <div className="checkout__step checkout__step--last">
              <div className="checkout__step-head">
                <span className="checkout__step-num">3</span>
                <strong className="checkout__step-title">Dudas o requisitos especiales</strong>
                <HiShieldCheck className="checkout__step-icon" />
              </div>
              <div className="checkout__step-body">
                <div className="form__group">
                  <textarea
                    rows={3}
                    maxLength={500}
                    placeholder="Alergias, necesidades adicionales, solicitudes…"
                    value={checkout.notas}
                    onChange={e => updateField('notas', e.target.value)}
                  />
                  <span className="checkout__char-count">{(checkout.notas || '').length}/500</span>
                </div>
                <div className="checkout__privacy">
                  <HiShieldCheck />
                  Datos protegidos. No compartimos tu información.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>{/* fin checkout__layout */}

      {preferenceId ? (
        <div className="checkout__wallet">
          <p className="checkout__wallet-note">Tu reserva está guardada. Completá el pago con MercadoPago:</p>
          <Wallet
            initialization={{ preferenceId }}
            customization={{ texts: { valueProp: 'smart_option' } }}
          />
        </div>
      ) : (
        <div className="paso__actions">
          <button className="btn btn--outline" onClick={prevStep} disabled={submitting}>Volver</button>
          <button className="btn btn--primary" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Confirmando…' : 'Confirmar reserva'}
          </button>
        </div>
      )}

      <p className="checkout__terms">
        Al confirmar, aceptás los{' '}
        <a href="#contacto" className="checkout__terms-link">términos y condiciones</a>.
      </p>
    </div>
  )
}

