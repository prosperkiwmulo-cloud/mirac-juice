import './App.css'

const products = [
  'Mango Juice',
  'Passion Juice',
  'Milk Meld',
  'Soursop Juice',
  'Mango Passion Mix',
  'Mango Tangerine Passion',
  'Mango Beetroot',
  'Coconut Mango Mix',
  'Pineapple Mint',
  'Guava Lemon',
  'Orange Tangerine Ginger',
  'Avocado Coconut',
  'Hibiscus Juice',
  'Beetroot Plain',
  'Detox Juice',
]

const gallery = [
  {
    image: '/images/Juice%20bottles%201.jpeg',
    title: 'Our juice collection',
  },
  {
    image: '/images/Juice%20in%20glasses%20and%20jugs.jpeg',
    title: 'Fresh moments',
  },
  {
    image: '/images/Events%20and%20customer%20displays.jpeg',
    title: 'Made for sharing',
  },
]

function App() {
  return (
    <main>
      <div className="announcement">
        FRESHNESS IN EVERY BOTTLE · SIMPLE. ORGANIC. HEALTHY.
      </div>

      <header className="navbar">
        <a className="brand" href="#home">
          <img
            className="brand-logo"
            src="/images/Official%20logo.jpeg"
            alt="Mirac Juice official logo"
          />
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#juices">Our Juices</a>
          <a href="#packages">Packages</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </nav>

        <a className="nav-order" href="#contact">Order Now ↗</a>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow">A LITTLE NATURE. A LOT OF GOODNESS.</span>
          <h1>Refresh your world with <span>Mirac Juice.</span></h1>
          <p>
            Discover our collection of refreshing juices, thoughtfully
            presented for everyday enjoyment, gatherings and special moments.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#juices">Explore Our Juices ↗</a>
            <a className="text-button" href="#about">Discover Mirac Juice</a>
          </div>
          <div className="hero-note">
            <span>✳</span> SIMPLE. ORGANIC. HEALTHY.
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="/images/Juice%20bottles%201.jpeg"
            alt="Mirac Juice bottled drinks"
          />
          <div className="hero-sticker">FRESH<br />MOMENTS<br />✳</div>
        </div>
      </section>

      <section className="promise">
        <div><span>✳</span><strong>Discover our collection</strong></div>
        <div><span>✳</span><strong>Made for sharing</strong></div>
        <div><span>✳</span><strong>Moments worth savouring</strong></div>
      </section>

      <section className="products-section" id="juices">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE MIRAC COLLECTION</span>
            <h2>A flavour for <span>every mood.</span></h2>
            <p>Explore our juice collection and find your next favourite.</p>
          </div>
          <a className="text-button" href="#contact">Enquire about our juices ↗</a>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article className="product-card" key={product}>
              <div className="product-number">0{index + 1}</div>
              <h3>{product}</h3>
              <a href="#contact">Enquire to order ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="gallery-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A TASTE OF MIRAC</span>
            <h2>Freshness in <span>every moment.</span></h2>
            <p>Explore real Mirac Juice moments and presentations.</p>
          </div>
        </div>
        <div className="gallery-grid">
          {gallery.map((item) => (
            <article className="gallery-card" key={item.title}>
              <img src={item.image} alt={item.title} loading="lazy" />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="packages-section" id="packages">
        <span className="eyebrow">MADE FOR YOUR MOMENTS</span>
        <h2>Goodness worth <span>sharing.</span></h2>
        <p>Planning a gathering or special occasion? Ask us about our packages.</p>
        <div className="package-list">
          <div><strong>01</strong><span>Bronze Package</span></div>
          <div><strong>02</strong><span>Silver Package</span></div>
          <div><strong>03</strong><span>Exclusive Package</span></div>
        </div>
        <a className="primary-button" href="#contact">Enquire About Packages ↗</a>
      </section>

      <section className="about-section" id="about">
        <img
          className="about-photo"
          src="/images/Juice%20in%20glasses%20and%20jugs%201.jpeg"
          alt="Mirac Juice served in glasses and jugs"
          loading="lazy"
        />
        <div>
          <span className="eyebrow">WELCOME TO MIRAC JUICE</span>
          <h2>Simple. Organic. <span>Healthy.</span></h2>
          <p>
            We believe good moments deserve refreshing experiences.
            Discover the Mirac Juice collection and let us be part of
            your everyday moments and special celebrations.
          </p>
          <a className="text-button" href="#contact">Get in touch ↗</a>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <span className="eyebrow">LET'S MAKE IT REFRESHING</span>
        <h2>Your next favourite juice is <span>a message away.</span></h2>
        <p>Contact our team to enquire about juices, packages and orders.</p>
        <a className="primary-button" href="mailto:">
          Contact Mirac Juice ↗
        </a>
        <small>We'll add your official phone number and WhatsApp ordering link here.</small>
      </section>

      <footer>
        <img
          className="footer-logo"
          src="/images/Official%20logo.jpeg"
          alt="Mirac Juice"
        />
        <p>Fresh moments. Beautifully shared.</p>
        <span>© {new Date().getFullYear()} Mirac Juice. All rights reserved.</span>
      </footer>
    </main>
  )
}

export default App
