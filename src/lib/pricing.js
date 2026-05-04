const USD_DESTINATIONS = ['punta cana', 'cartagena', 'san andrés', 'san andres', 'río de janeiro', 'rio de janeiro']

export function getMoneda(nombre) {
  const lower = (nombre || '').toLowerCase()
  return USD_DESTINATIONS.some(d => lower.includes(d)) ? 'USD' : null
}

export function formatPrecioDesde(nombre, precioDesde) {
  if (!precioDesde) return null
  if (getMoneda(nombre) === 'USD') {
    const clean = String(precioDesde).replace(/^USD\s*/i, '').trim()
    return `USD ${clean}`
  }
  const clean = String(precioDesde).replace(/^\$\s*/, '').trim()
  return `$ ${clean}`
}
