export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero__bg">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80&auto=format&fit=crop"
          alt="Paisaje de viaje"
          className="hero__img"
        />
        <div className="hero__overlay"></div>
      </div>

      <div className="hero__content container">
        <p className="hero__label">Agencia de viajes boutique</p>
        <h1 className="hero__title">
          Viajes que<br />
          <em>te transforman</em>
        </h1>
        <p className="hero__desc">
          Diseñamos experiencias únicas y personalizadas para viajeros que buscan algo más que un destino.
        </p>
        <div className="hero__actions">
          <a href="#destinos" className="btn btn--primary">Explorar destinos</a>
          <a href="#paquetes" className="btn btn--ghost">Ver paquetes</a>
        </div>
      </div>

      <div className="hero__search container">
        <div className="search-bar">
          <div className="search-bar__field">
            <label>Destino</label>
            <input type="text" placeholder="¿A dónde quieres ir?" />
          </div>
          <div className="search-bar__divider"></div>
          <div className="search-bar__field">
            <label>Fecha</label>
            <input type="date" />
          </div>
          <div className="search-bar__divider"></div>
          <div className="search-bar__field">
            <label>Viajeros</label>
            <select>
              <option>1 persona</option>
              <option>2 personas</option>
              <option>3-5 personas</option>
              <option>Grupo +6</option>
            </select>
          </div>
          <button className="btn btn--primary search-bar__btn">Buscar</button>
        </div>
      </div>

      <div className="hero__scroll">
        <span>Descubre más</span>
        <div className="hero__scroll-line"></div>
      </div>
    </section>
  )
}
