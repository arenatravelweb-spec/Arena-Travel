import { useEffect } from 'react'
import AnimatedButton from './AnimatedButton'

const WA = 'https://wa.me/5493815477147'

const DEST_INFO = {
  /* ── Destinos del catálogo ── */
  'canasvieiras':       'Canasvieiras es una de las playas más queridas de la isla de Florianópolis, en Santa Catarina. Con aguas tranquilas ideales para el baño, una animada costanera repleta de restaurantes y bares, y un ambiente vibrante y cosmopolita, es el destino favorito de los argentinos en Brasil.',
  'ferrugem':           'Ferrugem es una pequeña y encantadora playa de Garopaba, en Santa Catarina. Rodeada de vegetación nativa y con su característica laguna de aguas calmas, olas ideales para el surf y un ambiente bohemio y relajado, es un refugio auténtico lejos del turismo masivo.',
  'camboriú':           'Balneário Camboriú es la joya del litoral sur de Brasil. Conocida como la "Riviera Brasileña", deslumbra con playas de arena fina, un moderno skyline, el teleférico Unipraias con vistas panorámicas al mar y una vibrante vida nocturna sin igual.',
  'garopaba':           'Garopaba es un pintoresco pueblo de pescadores convertido en el paraíso del surf en Santa Catarina. Sus playas salvajes, dunas de arena, cascadas y el avistaje de ballenas francas australes entre junio y noviembre la convierten en un destino único y auténtico.',
  'jureré':             'Jurerê Internacional es la playa más exclusiva y sofisticada de Florianópolis. Famosa por sus beach clubs de lujo, arena blanca impecable y un ambiente refinado, es uno de los destinos más glamorosos de Brasil y un clásico para quienes buscan lo mejor.',
  'jurere':             'Jurerê Internacional es la playa más exclusiva y sofisticada de Florianópolis. Famosa por sus beach clubs de lujo, arena blanca impecable y un ambiente refinado, es uno de los destinos más glamorosos de Brasil y un clásico para quienes buscan lo mejor.',
  'merlo y carlos paz': 'Merlo (San Luis) y Carlos Paz (Córdoba) son dos joyas del interior argentino. Merlo seduce con su microclima único declarado entre los mejores del mundo, senderos serranos y aguas cristalinas. Carlos Paz cautiva con el lago San Roque, sus teatros y la animada vida turística de las sierras cordobesas.',
  'cartagena y san andres': 'Cartagena de Indias, con su imponente ciudad amurallada y calles de flores, se combina con San Andrés, la isla caribeña de aguas multicolores conocida como el "Mar de los Siete Colores". Un viaje doble que reúne historia colonial, playa paradisíaca y cultura colombiana en su máxima expresión.',
  'santa cruz de la sierra': 'Santa Cruz de la Sierra es la ciudad más dinámica de Bolivia, con clima tropical, gastronomía criolla y una vibrante vida nocturna. Es la puerta de entrada a las Misiones Jesuíticas Patrimonio de la Humanidad y el Parque Nacional Amboró.',
  'sur argentino':  'El Sur Argentino cautiva con lagos cristalinos, montañas nevadas y glaciares eternos. Del Perito Moreno en El Calafate a los pingüinos de Puerto Madryn y el Fin del Mundo en Ushuaia, una región que deja sin palabras.',

  /* ── Caribe ── */
  'punta cana':    'Joya del Caribe dominicano, Punta Cana deslumbra con playas de arena blanca, aguas cristalinas y palmeras infinitas. Un paraíso tropical donde el sol y la brisa caribeña crean el escenario perfecto para descansar.',
  'cancún':        'El destino de playa más famoso de México. Sus aguas turquesas del Mar Caribe, sus resorts de lujo y la cercanía a ruinas mayas hacen de Cancún una experiencia única e inolvidable.',
  'riviera maya':  'Un collar de playas y cenotes escondidos en la costa caribeña de México. La Riviera Maya combina naturaleza, cultura maya y resorts de primer nivel en un entorno de belleza incomparable.',
  'caribe':        'El Caribe es sinónimo de paraíso. Aguas cálidas, arrecifes de coral, culturas vibrantes y atardeceres únicos te esperan en este mosaico de islas y costas tropicales.',
  'cuba':          'La isla grande del Caribe cautiva con su música, su arquitectura colonial colorida, sus playas de ensueño y la calidez incomparable de su gente. Un destino auténtico y diferente a todo.',
  'jamaica':       'Jamaica vibra con su reggae, sus cascadas y sus playas de arena dorada. Una isla llena de color, sabor y una energía que te envuelve desde el primer momento.',
  'aruba':         'La isla feliz del Caribe. Aruba combina playas de arena blanca, aguas turquesas, vientos constantes y una infraestructura turística de primer nivel para una estadía perfecta.',

  /* ── Estados Unidos ── */
  'miami':         'Miami es una ciudad de contrastes vibrantes: playas de ensueño en South Beach, arte urbano en Wynwood, gastronomía internacional y una vida nocturna sin igual. La ciudad del sol y el estilo.',
  'nueva york':    'La ciudad que nunca duerme. Times Square, Central Park, Broadway y el skyline más icónico del mundo hacen de Nueva York una experiencia que marca para siempre.',
  'new york':      'La ciudad que nunca duerme. Times Square, Central Park, Broadway y el skyline más icónico del mundo hacen de Nueva York una experiencia que marca para siempre.',
  'orlando':       'La capital mundial del entretenimiento. Parques temáticos de clase mundial, shopping premium y una energía única que convierte a Orlando en el destino soñado para toda la familia.',
  'disney':        'El reino mágico de Disney es donde los sueños se hacen realidad. Parques temáticos, personajes entrañables y aventuras sin límite para grandes y chicos.',
  'las vegas':     'La ciudad del entretenimiento y los espectáculos. Las Vegas deslumbra con sus casinos, shows de primer nivel, gastronomía de lujo y una energía que no se apaga nunca.',
  'los ángeles':   'La ciudad de los sueños. Los Ángeles ofrece desde las playas de Santa Mónica y Venice Beach hasta Hollywood, museos de arte y una escena gastronómica de vanguardia.',
  'chicago':       'La ciudad del viento sorprende con su arquitectura espectacular, sus museos de clase mundial, el lago Michigan y una gastronomía que la pone en el mapa internacional.',

  /* ── Suramérica ── */
  'brasil':        'Brasil combina playas paradisíacas, selva amazónica y una energía cultural única. Un país que te sorprende en cada rincón con su diversidad, calidez y naturaleza exuberante.',
  'río':           'Río de Janeiro enamora con el Cristo Redentor, el Corcovado, las playas de Copacabana e Ipanema y una energía única que mezcla naturaleza urbana y alegría carioca.',
  'rio de janeiro':'Río de Janeiro enamora con el Cristo Redentor, el Corcovado, las playas de Copacabana e Ipanema y una energía única que mezcla naturaleza urbana y alegría carioca.',
  'florianópolis': 'Florianópolis, la Isla de la Magia, ofrece más de 40 playas de aguas cristalinas, lagunas, dunas y una naturaleza privilegiada que la convierten en un paraíso en el sur de Brasil.',
  'colombia':      'Colombia sorprende con su diversidad: la vibrante Cartagena colonial, el café de la región andina, el Caribe y la Amazonía. Un país que enamora con su naturaleza y su gente.',
  'cartagena':     'Cartagena de Indias es la perla del Caribe colombiano. Su casco amurallado colonial, sus calles de flores, playas cercanas e historia hacen de esta ciudad algo único en el mundo.',
  'perú':          'Perú es una joya de Sudamérica. De Machu Picchu a las líneas de Nazca, del lago Titicaca a Lima gourmet, cada rincón ofrece historia, naturaleza y una gastronomía mundialmente reconocida.',
  'machu picchu':  'Una de las siete maravillas del mundo moderno. Machu Picchu se alza entre las nubes de los Andes peruanos con una majestuosidad que trasciende cualquier descripción. Una experiencia que transforma.',
  'chile':         'Chile es el país más largo del mundo y también uno de los más diversos. De los desiertos del norte a los glaciares del sur, pasando por los volcanes y los viñedos del centro.',
  'uruguay':       'Uruguay combina las playas sofisticadas de Punta del Este, el encanto colonial de Colonia del Sacramento y la calidez de Montevideo en un destino tranquilo y refinado.',
  'punta del este':'El balneario más glamoroso de Sudamérica. Punta del Este ofrece playas paradisíacas, gastronomía de lujo, vida nocturna exclusiva y paisajes atlánticos de una belleza única.',
  'paraguay':      'Paraguay esconde tesoros naturales y culturales únicos. Sus ruinas jesuíticas, el Pantanal y la calidez de su gente hacen de este destino una experiencia auténtica y diferente.',

  /* ── Europa ── */
  'europa':        'Europa es el continente de la historia, el arte y la gastronomía. Desde la Torre Eiffel hasta el Coliseo Romano, cada ciudad es un museo viviente lleno de cultura y belleza.',
  'españa':        'España seduce con su arquitectura modernista, sus playas mediterráneas, la gastronomía de tapas y una cultura festiva que se vive en cada pueblo y ciudad del país.',
  'madrid':        'La capital española vibra con sus museos de talla mundial (Prado, Reina Sofía), su gastronomía, el Parque del Retiro y una vida nocturna que no tiene comparación en Europa.',
  'barcelona':     'Barcelona combina la arquitectura imposible de Gaudí, las playas mediterráneas, el barrio gótico medieval y una gastronomía de vanguardia en una ciudad única y fascinante.',
  'italia':        'Italia es un sueño hecho realidad. Roma, Florencia, Venecia y la Costa Amalfitana ofrecen arte, historia, gastronomía y paisajes que han inspirado a la humanidad durante siglos.',
  'roma':          'La Ciudad Eterna. Roma combina el Coliseo, el Vaticano, la Fontana di Trevi y una cultura gastronómica insuperable en una ciudad donde cada calle cuenta miles de años de historia.',
  'venecia':       'Venecia es única en el mundo. Su laberinto de canales, góndolas, palacios renacentistas y la magia de una ciudad construida sobre el agua crean una experiencia irrepetible.',
  'florencia':     'La cuna del Renacimiento. Florencia alberga el David de Miguel Ángel, los Uffizi, el Duomo y una gastronomía toscana que convierte cada comida en un evento cultural.',
  'francia':       'Francia es sinónimo de elegancia, cultura y gastronomía. De la Torre Eiffel a los viñedos de Burdeos, pasando por la Riviera francesa y los castillos del Loira.',
  'parís':         'La Ciudad de la Luz. París enamora con la Torre Eiffel, el Louvre, Montmartre, la moda, la gastronomía y un romanticismo en el aire que lo hace el destino más visitado del mundo.',
  'portugal':      'Portugal sorprende con su autenticidad. Lisboa y su fado melancólico, el Algarve con sus playas doradas, Oporto y sus vinos: un país con alma propia y una calidez única.',
  'grecia':        'Grecia combina playas de aguas azul Egeo, ruinas clásicas milenarias y la magia de islas como Santorini y Mykonos. Un destino que une historia, belleza natural y gastronomía mediterránea.',
  'turquía':       'Turquía es donde se encuentran Europa y Asia. Estambul, Capadocia y las playas de Antalya ofrecen una mezcla irresistible de historia milenaria, cultura islámica y naturaleza espectacular.',
  'croacia':       'Croacia deslumbra con sus costas cristalinas del Adriático, Dubrovnik amurallada, los parques nacionales de Plitvice y una gastronomía mediterránea fresca y deliciosa.',

  /* ── Medio Oriente ── */
  'dubai':         'Dubai es la ciudad del futuro. Rascacielos imposibles, el Burj Khalifa, islas artificiales, shopping de lujo y desierto dorado se combinan en una experiencia que desafía la imaginación.',
  'abu dhabi':     'La capital de los Emiratos Árabes sorprende con su mezquita Sheikh Zayed, el Grand Prix de Fórmula 1, parques temáticos de clase mundial y una sofisticación única en el Golfo Pérsico.',
  'egipto':        'Egipto es la tierra de los faraones. Las pirámides de Giza, la Esfinge, el Valle de los Reyes y el Nilo ofrecen una conexión directa con una de las civilizaciones más grandes de la historia.',

  /* ── Asia ── */
  'tailandia':     'Tailandia cautiva con sus templos dorados, sus playas de película en Phuket y Koh Samui, su gastronomía explosiva y la sonrisa de su gente. Un destino que combina espiritual y sensorial.',
  'japón':         'Japón es un universo propio: la tradición de Kioto, la modernidad de Tokio, el monte Fuji, los cerezos en flor y una cultura de detalle y armonía que lo hace único en el mundo.',
  'bali':          'La isla de los dioses. Bali combina arrozales en terrazas, templos hinduistas entre la selva, playas de surf y una espiritualidad única que hace de este destino un lugar transformador.',

  /* ── Argentina ── */
  'buenos aires':  'La capital argentina es una ciudad de pasiones. Sus barrios porteños, el tango, la gastronomía, la arquitectura europea y su vida cultural intensa la convierten en una de las mejores ciudades de América.',
  'bariloche':     'La Patagonia en su máximo esplendor. Lagos cristalinos, montañas nevadas, chocolate artesanal y aventuras al aire libre hacen de Bariloche un destino que enamora en cualquier época del año.',
  'mendoza':       'Capital del vino argentino. Mendoza combina viñedos bajo la imponente Cordillera de los Andes, gastronomía de primer nivel, rafting en el Mendoza y aventura en la montaña.',
  'salta':         'La Linda del Norte Argentino. Salta sorprende con su arquitectura colonial, los colores de la Quebrada de Humahuaca, la Puna y una cultura ancestral que se respira en cada rincón.',
  'jujuy':         'Jujuy es el norte más auténtico de Argentina. La Quebrada de Humahuaca —Patrimonio de la Humanidad—, el Cerro de los Siete Colores y los pueblos andinos crean un paisaje único.',
  'tucumán':       'La cuna de la Independencia argentina. Tucumán combina historia, naturaleza subtropical en Las Yungas, el sabor de sus empanadas y una calidez hospitalaria inigualable.',
  'córdoba':       'Córdoba es la segunda ciudad de Argentina, vibrante y universitaria. Las sierras cordobesas, los ríos, los balnearios y una vida cultural activa la hacen destino todo el año.',
  'cataratas':     'Las Cataratas del Iguazú son una de las siete maravillas naturales del mundo. Sus 275 saltos de agua, el rugido ensordecedor y los arco iris permanentes crean un espectáculo sobrenatural.',
  'iguazú':        'Las Cataratas del Iguazú son una de las siete maravillas naturales del mundo. Sus 275 saltos de agua, el rugido ensordecedor y los arco iris permanentes crean un espectáculo sobrenatural.',
  'mar del plata': '"La Feliz" es la ciudad costera más icónica de Argentina. Combina hermosas playas atlánticas, gastronomía de mar, cultura activa y una vibrante vida nocturna que la convierten en el destino veraniego por excelencia.',
  'el calafate':   'Puerta de entrada al Parque Nacional Los Glaciares, El Calafate ofrece la maravilla del Perito Moreno: un glaciar activo de 5 km de frente que avanza, truena y se quiebra ante tus ojos.',
  'ushuaia':       'El Fin del Mundo. Ushuaia es la ciudad más austral del planeta, rodeada del Canal de Beagle, los Andes patagónicos, el Parque Nacional Tierra del Fuego y una naturaleza salvaje única.',
  'puerto madryn': 'La capital de la naturaleza patagónica. Ballenas jorobadas, pingüinos de Magallanes, lobos marinos y orcas hacen de Puerto Madryn y la Península Valdés un destino de vida silvestre único.',
  'neuquén':       'La capital del petróleo y el vino patagónico. Neuquén es puerta de entrada a los Lagos Meliquina, Aluminé y Lolog, los yacimientos de dinosaurios más importantes del mundo.',
}

const FALLBACK = {
  nacional:      'Argentina es un país de contrastes únicos: desde las playas atlánticas y las sierras hasta la Patagonia glaciar y el norte andino. Un destino que sorprende con su diversidad natural, su gastronomía y la calidez de su gente.',
  internacional: 'Un destino extraordinario que combina paisajes únicos, cultura fascinante y experiencias que quedarán grabadas en tu memoria para siempre. Una oportunidad de descubrir el mundo con el respaldo y la calidez de Arena Travel.',
}

function getDestInfo(nombre, categoria) {
  const lower = nombre.toLowerCase()
  const sorted = Object.keys(DEST_INFO).sort((a, b) => b.length - a.length)
  for (const key of sorted) {
    if (lower.includes(key)) return DEST_INFO[key]
  }
  return FALLBACK[categoria] ?? FALLBACK.internacional
}

function getYouTubeEmbed(url) {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  return m ? `https://www.youtube.com/embed/${m[1]}?autoplay=1&mute=1` : null
}

export default function ProductModal({ producto, onClose, onComprar }) {
  const youtubeEmbed = getYouTubeEmbed(producto.video_url)
  const destInfo = getDestInfo(producto.nombre, producto.categoria)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="pmodal-overlay" onClick={onClose}>
      <div className="pmodal" onClick={e => e.stopPropagation()}>
        <button className="pmodal__close" onClick={onClose} aria-label="Cerrar">✕</button>

        <div className={`pmodal__media${producto.video_url ? ' pmodal__media--video' : ''}`}>
          {producto.video_url ? (
            youtubeEmbed ? (
              <iframe
                src={youtubeEmbed}
                allow="autoplay; encrypted-media"
                allowFullScreen
                title={producto.nombre}
              />
            ) : (
              <video
                src={producto.video_url}
                controls
                muted
                playsInline
                preload="metadata"
                aria-label={producto.nombre}
              />
            )
          ) : producto.imagen_url ? (
            <img src={producto.imagen_url} alt={producto.nombre} />
          ) : (
            <div className="pmodal__media-placeholder">🌍</div>
          )}
        </div>

        <div className="pmodal__body">
          <span className="pmodal__badge">
            {producto.categoria === 'nacional' ? 'Nacional' : 'Internacional'}
          </span>
          <h2 className="pmodal__title">{producto.nombre}</h2>

          <div className="pmodal__section">
            <p className="pmodal__section-label">Sobre el destino</p>
            <p className="pmodal__desc">{destInfo}</p>
          </div>

          {producto.descripcion && (
            <div className="pmodal__section">
              <p className="pmodal__section-label">Qué incluye</p>
              <p className="pmodal__desc">
                {producto.descripcion.split('\n').map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>
            </div>
          )}

          {producto.categoria === 'nacional' && producto.precio && (
            <p className="pmodal__price">
              $ {Number(producto.precio).toLocaleString('es-AR', { minimumFractionDigits: 2 })}
              <span> / persona</span>
            </p>
          )}

          {producto.categoria === 'internacional' && producto.precio_desde && (
            <p className="pmodal__price">
              Precio: desde {producto.precio_desde}
            </p>
          )}

          <div className="pmodal__actions">
            {producto.categoria === 'nacional'
              ? <AnimatedButton text="Comprar ahora" onClick={onComprar} color="var(--color-accent)" />
              : <AnimatedButton text="Consultar" href={WA} color="var(--color-accent)" />
            }
          </div>
        </div>
      </div>
    </div>
  )
}
