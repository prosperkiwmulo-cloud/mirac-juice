import { useEffect, useRef, useState } from 'react'
import './App.css'
import './Experience.css'
import EventCalculator from './EventCalculator'

interface Product {
  name: string
  number: string
  image?: string
  alt?: string
  imagePosition?: string
  isAuthentic: boolean
  palette: {
    bg: string
    accent: string
    border: string
  }
}

const products: Product[] = [
  { name: 'Beetroot Juice', number: '01', image: '/PRODUCTS/beetroot-juice.png', alt: 'Mirac Beetroot Juice', isAuthentic: true, palette: { bg: '#f4c8d5', accent: '#7b193d', border: '#e7acc0' } },
  { name: 'Dragon Fruit Juice', number: '02', image: '/PRODUCTS/dragon-fruit-juice.png', alt: 'Mirac Dragon Fruit Juice', isAuthentic: true, palette: { bg: '#f9cde2', accent: '#b81f66', border: '#f0b4d2' } },
  { name: 'Green Detox Juice', number: '03', image: '/PRODUCTS/green-detox-juice.png', alt: 'Mirac Green Detox Juice', isAuthentic: true, palette: { bg: '#d5e6d6', accent: '#205c36', border: '#bed8c2' } },
  { name: 'Hibiscus Juice', number: '04', image: '/PRODUCTS/hibiscus-juice.png', alt: 'Mirac Hibiscus Juice', isAuthentic: true, palette: { bg: '#f8cbda', accent: '#942238', border: '#eab0bf' } },
  { name: 'Mango Coconut Juice', number: '05', image: '/PRODUCTS/mango-coconut-juice.png', alt: 'Mirac Mango Coconut Juice', isAuthentic: true, palette: { bg: '#fae2a5', accent: '#c97718', border: '#ebd399' } },
  { name: 'Mango Juice', number: '06', image: '/PRODUCTS/mango-juice.png', alt: 'Mirac Mango Juice', isAuthentic: true, palette: { bg: '#fae2a5', accent: '#c97718', border: '#ebd399' } },
  { name: 'Mulondo Juice', number: '07', image: '/PRODUCTS/mulondo-juice.jpg', alt: 'Mirac Mulondo Juice', isAuthentic: true, palette: { bg: '#f4e7d1', accent: '#99742e', border: '#e7d6b7' } },
  { name: 'Orange Juice', number: '08', image: '/PRODUCTS/orange-juice.png', alt: 'Mirac Orange Juice', isAuthentic: true, palette: { bg: '#fed4b4', accent: '#d85514', border: '#f9c298' } },
  { name: 'Passion Fruit Juice', number: '09', image: '/PRODUCTS/passion-fruit-juice.png', alt: 'Mirac Passion Fruit Juice', isAuthentic: true, palette: { bg: '#fadfb0', accent: '#b86b1f', border: '#eed19c' } },
  { name: 'Pineapple & Mint Juice', number: '10', image: '/PRODUCTS/pineapple-mint-juice.png', alt: 'Mirac Pineapple and Mint Juice', isAuthentic: true, palette: { bg: '#d8ebd0', accent: '#357147', border: '#c8e2bd' } },
  { name: 'Red Detox Juice', number: '11', image: '/PRODUCTS/red-detox-juice.png', alt: 'Mirac Red Detox Juice', isAuthentic: true, palette: { bg: '#f4c8d5', accent: '#7b193d', border: '#e7acc0' } },
  { name: 'Soursop Juice', number: '12', image: '/PRODUCTS/soursop-juice.png', alt: 'Mirac Soursop Juice', isAuthentic: true, palette: { bg: '#e6efe0', accent: '#3b6e47', border: '#d4e3cb' } },
  { name: 'Watermelon Juice', number: '13', image: '/PRODUCTS/watermelon-juice.png', alt: 'Mirac Watermelon Juice', isAuthentic: true, palette: { bg: '#fcd4d8', accent: '#bd495b', border: '#f6bcc3' } },
]

function BotanicalEmblem({ accent }: { accent: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="18" cy="18" r="16" stroke={accent} strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
      <circle cx="18" cy="18" r="13" stroke={accent} strokeWidth="1" opacity="0.35" />
      <path
        d="M18 7C18 7 13 13 13 18C13 20.7614 15.2386 23 18 23C20.7614 23 23 20.7614 23 18C23 13 18 7 18 7Z"
        fill={accent}
        fillOpacity="0.18"
        stroke={accent}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M18 11V21M15.5 15.5L18 18M20.5 15.5L18 18"
        stroke={accent}
        strokeWidth="1"
        strokeLinecap="round"
      />
      <circle cx="18" cy="27" r="1.5" fill={accent} />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.13 7.39C8.96 7.39 8.68 7.46 8.44 7.72C8.2 7.98 7.52 8.62 7.52 9.92C7.52 11.23 8.47 12.48 8.61 12.66C8.74 12.84 10.48 15.68 13.25 16.76C15.54 17.65 16.02 17.47 16.51 17.42C17 17.38 18.08 16.78 18.3 16.14C18.52 15.5 18.52 14.96 14.46 14.85C14.4 14.74 14.25 14.67 14.02 14.56C13.79 14.45 12.68 13.9 12.47 13.83C12.26 13.75 12.11 13.71 11.96 13.93C11.81 14.15 11.38 14.67 11.25 14.82C11.12 14.96 10.99 14.98 10.76 14.87C10.53 14.76 9.58 14.45 8.44 13.43C7.56 12.64 6.96 11.66 6.83 11.43C6.7 11.2 6.82 11.08 6.93 10.97C7.04 10.86 7.17 10.69 7.29 10.54C7.41 10.4 7.45 10.3 7.53 10.14C7.61 9.98 7.57 9.84 7.51 9.73C7.45 9.62 7.02 8.52 6.83 8.08C6.65 7.64 6.47 7.71 6.34 7.7C6.22 7.7 6.08 7.7 5.94 7.7L9.13 7.39Z" />
    </svg>
  )
}

const gallery = [
  { image: '/images/Juice%20bottles%201.jpeg', title: 'Our Juice Collection' },
  { image: '/images/Juice%20in%20glasses%20and%20jugs.jpeg', title: 'Fresh Juice Moments' },
  { image: '/images/Events%20and%20customer%20displays.jpeg', title: 'Our Juice Displays' },
  { image: '/images/Events%20and%20customer%20displays%201.jpeg', title: 'Made for Sharing' },
  { image: '/images/Events%20and%20customer%20displays%202.jpeg', title: 'Fresh Event Setups' },
  { image: '/images/Events%20and%20customer%20displays%203.jpeg', title: 'Serving Every Occasion' },
  { image: '/images/Events%20and%20customer%20displays%204.jpeg', title: 'Mirac at Your Events' },
]

interface ShowcaseSlide {
  id: string
  kicker: string
  titleLine1: string
  titleLine2: string
  name: string
  description: string
  provenance: string
  image: string
  alt: string
  whatsappMessage: string
}

const showcaseSlides: ShowcaseSlide[] = [
  {
    id: 'mango-juice',
    kicker: '01 · SIGNATURE SELECTION',
    titleLine1: 'Sun-Ripened',
    titleLine2: 'Mango Nectar.',
    name: 'Pure Mango Juice',
    description:
      'Chilled fresh mango juice prepared with tropical mangoes for a naturally sweet, velvet-smooth and revitalizing fruit experience.',
    provenance: 'Bottled fresh daily · Served chilled',
    image: '/images/Juice%20bottles%206.jpeg',
    alt: 'Chilled bottle of Mirac Mango Juice held fresh in hand with natural condensation',
    whatsappMessage: 'Hello Mirac Juice, I would like to order the Mango Juice.',
  },
  {
    id: 'milk-meld',
    kicker: '02 · HOUSE SPECIALTY',
    titleLine1: 'The Celebrated',
    titleLine2: 'Mirac Milk Meld.',
    name: 'Mirac Milk Meld',
    description:
      'Our beloved signature house creation, carefully blended for an exceptionally creamy, velvety texture and wholesome tropical sweetness.',
    provenance: 'Signature house recipe · Bottled fresh',
    image: '/images/Juice%20bottles%202.jpeg',
    alt: 'Three bottles of authentic Mirac Milk Meld on display',
    whatsappMessage: 'Hello Mirac Juice, I would like to order the Mirac Milk Meld.',
  },
  {
    id: 'mango-beetroot',
    kicker: '03 · ARTISANAL DUO',
    titleLine1: 'Artisanal Layered',
    titleLine2: 'Mango & Beetroot.',
    name: 'Layered Mango Beetroot',
    description:
      'A striking visual and flavour duo, layering fresh earthy beetroot beneath smooth, sweet mango smoothie for a vibrant fruit lift.',
    provenance: 'Hand-layered specialty · Prepared to order',
    image: '/images/Juice%20in%20glasses%20and%20jugs%201.jpeg',
    alt: 'Two-tone layered mango and beetroot drink in takeaway cup with pitcher',
    whatsappMessage: 'Hello Mirac Juice, I would like to order the Layered Mango Beetroot.',
  },
  {
    id: 'citrus-harvest',
    kicker: '04 · FARM FRESH',
    titleLine1: 'Sun-Drenched',
    titleLine2: 'Citrus Harvest.',
    name: 'Citrus Harvest',
    description:
      'Chilled citrus juice prepared from ripe oranges and citrus fruits, bringing bright, crisp zest and natural sunshine to every bottle.',
    provenance: 'Whole ripe citrus fruits · Refreshing zest',
    image: '/images/Juice%20in%20glasses%20and%20jugs.jpeg',
    alt: 'Chilled bottle of Mirac citrus juice resting on vibrant green grass surrounded by oranges',
    whatsappMessage: 'Hello Mirac Juice, I would like to order the Citrus Harvest.',
  },
  {
    id: 'bottle-collection',
    kicker: '05 · BOTTLE LINEUP',
    titleLine1: 'Freshly Bottled.',
    titleLine2: 'Made to Share.',
    name: 'The Mirac Collection',
    description:
      'From daily breakfast refreshment to catering setups, explore our range of freshly prepared juices bottled daily for any occasion.',
    provenance: '16 approved varieties · Dispensers & bottles',
    image: '/images/Juice%20bottles%201.jpeg',
    alt: 'Trio of authentic colourful Mirac Juice bottles on display',
    whatsappMessage: 'Hello Mirac Juice, I would like to enquire about ordering juice bottles.',
  },
]

function MiracExperience() {
  const videos = [
    { title: 'Mirac Introduction', file: 'INTRODUCTION SET UP.mp4' },
    { title: 'Smoky Juice Setup', file: 'MAIN SMOKY.mp4' },
    { title: 'Juice Serving Setup', file: 'SET UP.mp4' },
    { title: 'Large Event Setup', file: 'SET UP BIG.mp4' },
    { title: 'Event Setup Two', file: 'SET UP 2.mp4' },
    { title: 'Event Setup Three', file: 'SET UP 3.mp4' },
    { title: 'Small Event Setup', file: 'SMALL SETUP.mp4' },
    { title: 'Tea & Coffee Setup', file: 'TEA SETUP.mp4' },
  ]


  const [activeVideo, setActiveVideo] = useState(0)

  return (
    <section className="experience-section" id="experience">
      <div className="experience-heading">
        <span className="eyebrow">BEYOND THE BOTTLE</span>
        <h2>The Mirac <span>Experience.</span></h2>
        <p>From thoughtfully arranged juice stations to refreshing moments shared together, explore how Mirac brings every setup to life.</p>
      </div>

      <div className="experience-feature">
        <div className="experience-player">
          <video key={videos[activeVideo].file} controls playsInline preload="metadata">
            <source src={`/Videos/${encodeURIComponent(videos[activeVideo].file)}`} type="video/mp4" />
            Your browser does not support video playback.
          </video>
          <span className="experience-video-count">{String(activeVideo + 1).padStart(2, '0')} / 08</span>
        </div>
        <div className="experience-feature-copy">
          <span className="eyebrow">FEATURED EXPERIENCE</span>
          <h3>{videos[activeVideo].title}</h3>
          <p>Explore one of the ways Mirac brings refreshing setups and serving experiences together.</p>
          <span className="experience-watch-label">SELECT A VIDEO TO EXPLORE</span>
        </div>
      </div>

      <div className="experience-video-list">
        {videos.map((video, index) => (
          <button
            className={`experience-video-card ${activeVideo === index ? 'active' : ''}`}
            key={video.file}
            type="button"
            onClick={() => setActiveVideo(index)}
            aria-pressed={activeVideo === index}
          >
            <span className="experience-video-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="experience-video-name">{video.title}</span>
            <span className="experience-play-icon">▶</span>
          </button>
        ))}
      </div>


      <div className="experience-cta">
        <p>Planning a gathering or event?</p>
        <a href="#contact" className="text-button">LET'S PLAN YOUR SETUP <span>↗</span></a>
      </div>
    </section>
  )
}

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [heroVideoEnded, setHeroVideoEnded] = useState(false)
  const [heroSlide, setHeroSlide] = useState(0)
  const heroBottleImages = ['/images/Juice%20bottles%201.jpeg', '/images/Juice%20bottles%203.jpeg', '/images/Juice%20bottles%204.jpeg', '/images/Juice%20bottles%205.jpeg', '/images/Juice%20bottles%206.jpeg']
  const [currentSlide, setCurrentSlide] = useState(0)
  const [gallerySlide, setGallerySlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  useEffect(() => {
    if (!heroVideoEnded) return
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroBottleImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroVideoEnded])

  useEffect(() => {
    const timer = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % gallery.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback image remains active if browser autoplay policy restricts playback
        })
      }
    }
  }, [])

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % showcaseSlides.length)
    }, 6500)
    return () => clearInterval(timer)
  }, [isPaused])

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % showcaseSlides.length)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + showcaseSlides.length) % showcaseSlides.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    if (distance > 50) {
      goToNextSlide()
    } else if (distance < -50) {
      goToPrevSlide()
    }
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <main>
      <div className="announcement">
        SIMPLE. ORGANIC. HEALTHY. <span aria-hidden="true">&#8226;</span> FRESHNESS IN EVERY BOTTLE
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
          <a href="#about">Our Story</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="nav-order" href="#contact">ORDER NOW &#8594;</a>
      </header>

      <section className={`cinematic-hero ${heroVideoEnded ? 'video-ended' : ''} `} id="home">
        {/* Layer 1: Authentic Mirac Juice photograph fallback */}
        <div
          className={`hero-fallback-bg ${videoLoaded && !videoError ? 'video-active' : ''}`}
          style={{ backgroundImage: `url('/images/Juice%20bottles%201.jpeg')` }}
          aria-hidden="true"
        />

        {/* Layer 2: Authentic Genuine Mirac Juice Video */}
        {!videoError && (
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            playsInline
            preload="metadata"
            poster="/images/Juice%20bottles%201.jpeg"
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            onEnded={() => setHeroVideoEnded(true)}
            aria-hidden="true"
          >
            <source src="/Videos/MAIN%20SMOKY.mp4" type="video/mp4" />
            <source src="/Videos/INTRODUCTION%20SET%20UP.mp4" type="video/mp4" />
            <source src="/videos/INTRODUCTION%20SET%20UP.mp4" type="video/mp4" />
          </video>
        )}

        <div className={`hero-slideshow ${heroVideoEnded ? 'is-visible' : ''}`} aria-hidden="true">
          {heroBottleImages.map((image, index) => (
            <div
              key={image}
              className={`hero-slide ${heroSlide === index ? 'active' : ''}`}
              style={{ backgroundImage: `url('${image}')` }}
            />
          ))}
        </div>
{/* Layer 3: Balanced dark gradient overlay */}
        <div className="hero-shade" aria-hidden="true" />

        {/* Layer 4: Hero Content with strong visual hierarchy */}
        <div className="hero-content">
          <div className="hero-brand-pill">
            <span className="hero-brand-star">&#8226;</span>
            <span className="hero-eyebrow">SIMPLE. ORGANIC. HEALTHY.</span>
          </div>

          <h1>
            Taste the freshness.
            <span>Feel the difference.</span>
          </h1>

          <p>
            Discover a world of refreshing juice experiences,
            beautifully brought to you by Mirac Juice.
          </p>

          <div className="hero-actions">
            <a className="primary-button hero-primary-btn" href="#juices">
              EXPLORE OUR JUICES <span aria-hidden="true">&#8226;</span>
            </a>
            <a className="hero-secondary-btn" href="#packages">
              DISCOVER OUR PACKAGES <span aria-hidden="true">&#8226;</span>
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span className="hero-tagline">SIMPLE. ORGANIC. HEALTHY.</span>
          <span className="hero-promise-note">FRESH MOMENTS, BEAUTIFULLY SHARED</span>
          <a href="#juices" className="hero-scroll-link">SCROLL TO EXPLORE</a>
        </div>

        <div className="hero-side-note">MADE TO REFRESH · MADE TO SHARE</div>
      </section>

      <section className="promise">
        <div><span aria-hidden="true">&#8226;</span><strong>Discover our collection</strong></div>
        <div><span aria-hidden="true">&#8226;</span><strong>Made for sharing</strong></div>
        <div><span aria-hidden="true">&#8226;</span><strong>Moments worth savouring</strong></div>
      </section>

      <section
        className="showcase-section"
        id="showcase"
        aria-label="Featured Juice Showcase Slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="showcase-masthead">
          <div className="showcase-masthead-meta">
            <span className="eyebrow">EDITORIAL SHOWCASE · THE MIRAC ARCHIVE</span>
            <span className="masthead-divider">/</span>
            <span className="masthead-counter">
              CAMPAIGN {String(currentSlide + 1).padStart(2, '0')} OF {String(showcaseSlides.length).padStart(2, '0')}
            </span>
          </div>
          <div className="showcase-masthead-row">
            <h2 className="showcase-masthead-title">
              Freshness you can see, <span>flavour you remember.</span>
            </h2>
            <div className="showcase-nav-arrows">
              <button
                type="button"
                className="showcase-arrow-btn"
                onClick={goToPrevSlide}
                aria-label="Previous featured juice"
              >
                ?
              </button>
              <button
                type="button"
                className="showcase-arrow-btn"
                onClick={goToNextSlide}
                aria-label="Next featured juice"
              >
                ?
              </button>
            </div>
          </div>
        </div>

        <div className="showcase-stage">
          {/* Dominant Visual Hero Frame with Ken Burns Crossfade */}
          <div className="showcase-visual-frame">
            {showcaseSlides.map((slide, index) => {
              const isActive = index === currentSlide
              return (
                <div
                  key={slide.id}
                  className={`showcase-image-layer ${isActive ? 'active' : ''}`}
                  aria-hidden={!isActive}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="showcase-photo"
                    loading={index === 0 ? 'eager' : 'lazy'}
                  />
                  <div className="showcase-photo-shade" />
                </div>
              )
            })}

            {/* Restrained editorial watermark */}
            <div className="showcase-watermark">
              <span className="watermark-dot" />
              <span>AUTHENTIC BOTTLE PHOTOGRAPHY</span>
            </div>

            {/* Slide counter indicator for mobile */}
            <div className="showcase-photo-counter">
              <span>{String(currentSlide + 1).padStart(2, '0')}</span>
              <span className="sep">/</span>
              <span>{String(showcaseSlides.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Asymmetric Editorial Story Column */}
          <div className="showcase-story-frame">
            <div className="showcase-story-viewport">
              {showcaseSlides.map((slide, index) => {
                const isActive = index === currentSlide
                return (
                  <article
                    key={slide.id}
                    className={`showcase-story-slide ${isActive ? 'active' : ''}`}
                    aria-hidden={!isActive}
                  >
                    <div className="showcase-kicker">
                      <span className="kicker-glyph">&#8226;</span>
                      <span>{slide.kicker}</span>
                    </div>

                    <h3 className="showcase-headline">
                      <span className="headline-line1">{slide.titleLine1}</span>
                      <span className="headline-line2">{slide.titleLine2}</span>
                    </h3>

                    <p className="showcase-story-text">{slide.description}</p>

                    <div className="showcase-provenance-tag">
                      <span className="provenance-accent">&#8226;</span>
                      <span>{slide.provenance}</span>
                    </div>

                    <div className="showcase-actions">
                      <a
                        className="showcase-order-btn"
                        href="#contact"
                        aria-label={`Order or enquire about ${slide.name}`}
                      >
                        <span>ORDER / ENQUIRE</span>
                        <span className="btn-arrow">&#8594;</span>
                      </a>
                      <a
                        className="showcase-whatsapp-btn"
                        href={`https://wa.me/256781838030?text=${encodeURIComponent(slide.whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Order ${slide.name} on WhatsApp`}
                        aria-label={`Order ${slide.name} via WhatsApp`}
                      >
                        <WhatsAppIcon />
                        <span>WhatsApp Enquiry</span>
                      </a>
                    </div>
                  </article>
                )
              })}
            </div>

            {/* Editorial Timeline Bar Controls */}
            <div className="showcase-timeline-bar-cluster">
              <div className="showcase-timeline-bars">
                {showcaseSlides.map((slide, index) => (
                  <button
                    type="button"
                    key={slide.id}
                    className={`showcase-timeline-bar ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                    aria-label={`Go to slide ${index + 1}: ${slide.name}`}
                  >
                    <span className="timeline-fill" />
                  </button>
                ))}
              </div>
              <div className="showcase-timeline-label">
                <span className="timeline-slide-name">{showcaseSlides[currentSlide].name}</span>
                <span className="timeline-hint">Autoplay active · Hover to pause</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-section" id="juices">
        <div className="section-heading catalogue-heading">
          <div>
            <span className="eyebrow">THE MIRAC COLLECTION · 16 APPROVED VARIETIES</span>
            <h2>A flavour for <span>every mood.</span></h2>
            <p>
              Explore our complete collection of 16 fresh, cold-pressed fruit varieties.
              Available in individual bottles and tailored packages for gatherings.
            </p>
          </div>
          <div className="catalogue-top-actions">
            <a className="text-button" href="#contact">ENQUIRE ABOUT OUR JUICES ?</a>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-card-top">
                <span className="product-number">{product.number}</span>
                {product.isAuthentic ? (
                  <span className="product-badge authentic">
                    <span className="badge-dot" /> AUTHENTIC PHOTO
                  </span>
                ) : (
                  <span className="product-badge variety-badge">
                    MIRAC VARIETY
                  </span>
                )}
              </div>

              <div className="product-media">
                {product.isAuthentic && product.image ? (
                  <div className="product-image-wrapper">
                    <img
                      src={product.image}
                      alt={product.alt || product.name}
                      className="product-image"
                      style={product.imagePosition ? { objectPosition: product.imagePosition } : undefined}
                      loading="lazy"
                    />
                    <div className="product-image-overlay" />
                  </div>
                ) : (
                  <div
                    className="product-placeholder"
                    style={{
                      background: product.palette.bg,
                    }}
                  >
                    <div className="placeholder-emblem-seal">
                      <BotanicalEmblem accent={product.palette.accent} />
                    </div>
                    <span className="placeholder-brand">MIRAC JUICE</span>
                    <span className="placeholder-note">A MIRAC JUICE VARIETY</span>
                  </div>
                )}
              </div>

              <div className="product-info">
                <h3 className="product-card-title">{product.name}</h3>
                <div className="product-card-actions">
                  <a
                    className="product-enquire-link"
                    href="#contact"
                    aria-label={`Enquire about ${product.name}`}
                  >
                    <span>ENQUIRE TO ORDER</span>
                    <span className="action-arrow">&#8594;</span>
                  </a>
                  <a
                    className="product-wa-link"
                    href={`https://wa.me/256781838030?text=${encodeURIComponent(`Hello Mirac Juice, I would like to enquire about ordering ${product.name}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Order ${product.name} on WhatsApp`}
                    aria-label={`Order ${product.name} via WhatsApp`}
                  >
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="catalogue-footer-strip">
          <div className="catalogue-strip-item">
            <span className="strip-star">&#8226;</span>
            <span>All 16 varieties prepared fresh upon order</span>
          </div>
          <div className="catalogue-strip-item">
            <span className="strip-star">&#8226;</span>
            <span>Available in chilled bottles & catered event dispensers</span>
          </div>
          <div className="catalogue-strip-item">
            <span className="strip-star">&#8226;</span>
            <span>Custom selections for gatherings & corporate occasions</span>
          </div>
        </div>
      </section>

      <section className="gallery-section" id="gallery">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A TASTE OF MIRAC</span>
            <h2>Freshness in <span>every moment.</span></h2>
            <p>Explore our juices, displays and memorable moments.</p>
          </div>
        </div>

        <div className="unified-gallery">
          <div className="unified-gallery-stage">
            {gallery.map((item, index) => (
              <div
                className={`unified-gallery-slide ${gallerySlide === index ? 'active' : ''}`}
                key={item.title}
                aria-hidden={gallerySlide !== index}
              >
                <img src={item.image} alt={item.title} />
                <div className="unified-gallery-caption">
                  <span>{String(index + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}

            <button
              className="unified-gallery-arrow previous"
              type="button"
              aria-label="Previous photograph"
              onClick={() => setGallerySlide((prev) => (prev - 1 + gallery.length) % gallery.length)}
            >&#8592;</button>
            <button
              className="unified-gallery-arrow next"
              type="button"
              aria-label="Next photograph"
              onClick={() => setGallerySlide((prev) => (prev + 1) % gallery.length)}
            >&#8594;</button>
          </div>

          <div className="unified-gallery-dots" aria-label="Choose photograph">
            {gallery.map((item, index) => (
              <button
                key={item.title}
                type="button"
                className={gallerySlide === index ? 'active' : ''}
                aria-label={`Show photograph ${index + 1}: ${item.title}`}
                aria-pressed={gallerySlide === index}
                onClick={() => setGallerySlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          EVENT PACKAGES
          ================================================================ */}
      <section className="packages-section" id="packages">
        <div className="packages-header">
          <span className="eyebrow">MADE FOR YOUR MOMENTS</span>
          <h2>Goodness worth <span>sharing.</span></h2>
          <p>Planning a gathering or special occasion? Choose your package tier and enquire for a quote.</p>
        </div>

        <div className="package-list">

          {/* Bronze */}
          <div className="package-card package-bronze">
            <div className="pkg-top">
              <span className="package-tier-badge">BRONZE TIER</span>
              <span className="pkg-num">01</span>
            </div>
            <h3 className="pkg-name">Bronze Package</h3>
            <ul className="pkg-line-items">
              <li>
                <span className="pkg-label">Juice</span>
                <span className="pkg-value">UGX 200,000 <em>per jerrycan</em></span>
              </li>
              <li>
                <span className="pkg-label">Setup</span>
                <span className="pkg-value">UGX 250,000</span>
              </li>
              <li>
                <span className="pkg-label">Service Fee</span>
                <span className="pkg-value">UGX 150,000</span>
              </li>
              <li className="pkg-transport">
                <span className="pkg-label">Transport</span>
                <span className="pkg-value pkg-note">Varies by location</span>
              </li>
            </ul>
            <a
              className="pkg-cta-btn pkg-enquire-btn"
              href="#contact"
              aria-label="Enquire about the Bronze Package"
            >
              ENQUIRE &#8594;
            </a>
          </div>

          {/* Silver */}
          <div className="package-card package-silver">
            <div className="pkg-top">
              <span className="package-tier-badge">SILVER TIER</span>
              <span className="pkg-num">02</span>
            </div>
            <h3 className="pkg-name">Silver Package</h3>
            <ul className="pkg-line-items">
              <li>
                <span className="pkg-label">Juice</span>
                <span className="pkg-value">UGX 200,000 <em>per jerrycan</em></span>
              </li>
              <li>
                <span className="pkg-label">Setup</span>
                <span className="pkg-value">UGX 450,000</span>
              </li>
              <li>
                <span className="pkg-label">Service Fee</span>
                <span className="pkg-value">UGX 250,000</span>
              </li>
              <li>
                <span className="pkg-label">Smoky Juice</span>
                <span className="pkg-value">UGX 300,000</span>
              </li>
              <li className="pkg-transport">
                <span className="pkg-label">Transport</span>
                <span className="pkg-value pkg-note">Varies by location</span>
              </li>
            </ul>
            <a
              className="pkg-cta-btn pkg-enquire-btn"
              href="#contact"
              aria-label="Enquire about the Silver Package"
            >
              ENQUIRE &#8594;
            </a>
          </div>

          {/* Exclusive */}
          <div className="package-card package-exclusive">
            <div className="pkg-top">
              <span className="package-tier-badge exclusive-pill">EXCLUSIVE TIER</span>
              <span className="pkg-num">03</span>
            </div>
            <h3 className="pkg-name">Exclusive Package</h3>
            <ul className="pkg-line-items">
              <li>
                <span className="pkg-label">Juice</span>
                <span className="pkg-value">UGX 200,000 <em>per jerrycan</em></span>
              </li>
              <li>
                <span className="pkg-label">Setup</span>
                <span className="pkg-value">UGX 1,000,000</span>
              </li>
              <li>
                <span className="pkg-label">Service Fee</span>
                <span className="pkg-value">UGX 500,000</span>
              </li>
              <li>
                <span className="pkg-label">Smoky Juice</span>
                <span className="pkg-value">UGX 600,000</span>
              </li>
              <li className="pkg-transport">
                <span className="pkg-label">Transport</span>
                <span className="pkg-value pkg-note">Varies by location</span>
              </li>
            </ul>
            <a
              className="pkg-cta-btn pkg-exclusive-btn"
              href="#contact"
              aria-label="Enquire about the Exclusive Package"
            >
              ENQUIRE &#8594;
            </a>
          </div>
        </div>

        <p className="pkg-footnote">
          <span className="pkg-footnote-star">&#8226;</span>
          Juice is priced per jerrycan. Smoky Juice is an additional optional item. Transport cost depends on venue location.
        </p>
        <a className="primary-button package-cta" href="#contact">ENQUIRE ABOUT PACKAGES ?</a>
      </section>

      {/* ================================================================
          MIRAC TEA — TEA & COFFEE CATERING
          ================================================================ */}
      <EventCalculator />

      <section className="tea-section" id="tea">
        <div className="tea-inner">
          <div className="tea-header">
            <span className="eyebrow">TEA &amp; COFFEE CATERING</span>
            <h2>Mirac Tea — <span>served with style.</span></h2>
            <p>
              Professional tea and coffee catering for events of all sizes.
              Served by a smartly dressed team with full basic setup included.
            </p>
          </div>

          <div className="tea-body">
            {/* Pricing Table */}
            <div className="tea-pricing-block">
              <div className="tea-table-label">PRICING BY NUMBER OF GUESTS</div>
              <div className="tea-table-wrap">
                <table className="tea-table">
                  <thead>
                    <tr>
                      <th>Guests</th>
                      <th>Price (UGX)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { guests: '50', price: '550,000' },
                      { guests: '100', price: '1,000,000' },
                      { guests: '150', price: '1,200,000' },
                      { guests: '200', price: '1,600,000' },
                      { guests: '250–300', price: '2,200,000' },
                      { guests: '350–400', price: '2,800,000' },
                      { guests: '450–500', price: '3,400,000' },
                      { guests: '550–600', price: '4,000,000' },
                      { guests: '650–700', price: '4,500,000' },
                      { guests: '750–800', price: '5,200,000' },
                      { guests: '850–900', price: '5,600,000' },
                      { guests: '950–1,000', price: '6,500,000' },
                    ].map((row) => (
                      <tr key={row.guests}>
                        <td>{row.guests}</td>
                        <td><strong>UGX {row.price}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* What's Included */}
            <div className="tea-details-block">
              <div className="tea-table-label">WHAT'S INCLUDED</div>
              <ul className="tea-includes-list">
                {[
                  'Black tea',
                  'African milk tea',
                  'Spiced and non-spiced coffee',
                  'Requested flavours & sweeteners: honey, chocolate, Nescafé, sugar and tea herbs',
                  'Smartly dressed serving team',
                  'Basic setup of tables and linen',
                ].map((item) => (
                  <li key={item}>
                    <span className="tea-check">&#10003;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="tea-notes">
                <div className="tea-note-item">
                  <span className="tea-note-icon" aria-hidden="true">&#8226;</span>
                  <span>Transport costs are covered by the client and depend on venue location.</span>
                </div>
                <div className="tea-note-item tea-note-custom">
                  <span className="tea-note-icon" aria-hidden="true">&#8226;</span>
                  <span>
                    Customised setups matching your event theme and colours are available at an additional{' '}
                    <strong>UGX 300,000 – 1,000,000</strong>.
                  </span>
                </div>
              </div>

              <a
                className="primary-button tea-cta-btn"
                href="#contact"
              >
                ENQUIRE ABOUT TEA CATERING ?
              </a>
            </div>
          </div>
        </div>
      </section>

      <MiracExperience />

      <section className="contact-section" id="contact">
        <span className="eyebrow">LET'S MAKE IT REFRESHING</span>
        <h2>Your next favourite juice is <span>a message away.</span></h2>
        <p>Contact our team to enquire about juices, packages and orders.</p>

        <div className="contact-numbers">
          <div className="contact-number-card">
            <span className="contact-num-label">CALL OR WHATSAPP</span>
            <a className="contact-tel" href="tel:+256781838030">0781 838 030</a>
            <div className="contact-num-actions">
              <a
                className="contact-call-btn"
                href="tel:+256781838030"
                aria-label="Call 0781838030"
              >
                Call Now
              </a>
              <a
                className="contact-wa-btn"
                href="https://wa.me/256781838030?text=Hello%20Mirac%20Juice%2C%20I%20would%20like%20to%20enquire%20about%20your%20products%20and%20packages."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp 0781838030"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            </div>
          </div>

          <div className="contact-number-card">
            <span className="contact-num-label">CALL OR WHATSAPP</span>
            <a className="contact-tel" href="tel:+256759697018">0759 697 018</a>
            <div className="contact-num-actions">
              <a
                className="contact-call-btn"
                href="tel:+256759697018"
                aria-label="Call 0759697018"
              >
                Call Now
              </a>
              <a
                className="contact-wa-btn"
                href="https://wa.me/256759697018?text=Hello%20Mirac%20Juice%2C%20I%20would%20like%20to%20enquire%20about%20your%20products%20and%20packages."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp 0759697018"
              >
                <WhatsAppIcon /> WhatsApp
              </a>
            </div>
          </div>
        </div>

        <p className="contact-tagline">SIMPLE. ORGANIC. HEALTHY. — Mirac Juice Uganda</p>
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









