import { createContext, useContext, useState, useCallback } from 'react'

const ReservaCtx = createContext(null)

export function ReservaProvider({ paquete, fechaInicial, origenInicial, children }) {
  const [step, setStep] = useState(1)
  const [pasajeros, setPasajeros] = useState([{ edad: '', nombre: '' }])
  // { '0': 'SEMICAMA', '1': 'COCHE CAMA', ... } - índice en pasajerosConAsiento
  const [transportes, setTransportes] = useState({})
  // índices en pasajeros[] que piden habitación single
  const [singleRooms, setSingleRooms] = useState([])
  const [checkout, setCheckout] = useState({
    datos: [],          // [{ nombre, apellido, tipoDoc, numDoc, sexo, nacionalidad }]
    medioPago: '',
    email: '',
    telefono: '',
    notas: '',
  })

  const nextStep = () => setStep(s => Math.min(s + 1, 5))
  const prevStep = () => setStep(s => Math.max(s - 1, 1))

  const precioBase        = Number(paquete?.precio ?? 0)
  const recargoSingle     = Number(paquete?.precio_single_recargo ?? 50)
  const opcionesTransporte = paquete?.opciones_transporte ?? []

  // Pasajeros que necesitan asiento (≥2 años)
  const pasajerosConAsiento = pasajeros.filter(p => {
    const age = parseInt(p.edad)
    return !isNaN(age) && age >= 2
  })

  const calcTransporteCost = useCallback(() => {
    let cost = 0
    pasajerosConAsiento.forEach((_, i) => {
      const nombre = transportes[i]
      if (!nombre) return
      const op = opcionesTransporte.find(o => o.nombre === nombre)
      if (op && op.precio > 0) cost += Number(op.precio)
    })
    return cost
  }, [transportes, opcionesTransporte, pasajerosConAsiento])

  const calcRecargo = useCallback(() => {
    return singleRooms.length * (precioBase * recargoSingle) / 100
  }, [singleRooms, precioBase, recargoSingle])

  const calcTotal = useCallback(() => {
    if (!precioBase || pasajeros.length === 0) return 0
    return precioBase * pasajeros.length + calcTransporteCost() + calcRecargo()
  }, [precioBase, pasajeros, calcTransporteCost, calcRecargo])

  return (
    <ReservaCtx.Provider value={{
      paquete,
      fecha: fechaInicial,
      origen: origenInicial,
      step, nextStep, prevStep, setStep,
      pasajeros, setPasajeros,
      transportes, setTransportes,
      singleRooms, setSingleRooms,
      checkout, setCheckout,
      pasajerosConAsiento,
      precioBase,
      recargoSingle,
      opcionesTransporte,
      calcTotal,
      calcTransporteCost,
      calcRecargo,
    }}>
      {children}
    </ReservaCtx.Provider>
  )
}

export function useReserva() {
  const ctx = useContext(ReservaCtx)
  if (!ctx) throw new Error('useReserva debe usarse dentro de ReservaProvider')
  return ctx
}
