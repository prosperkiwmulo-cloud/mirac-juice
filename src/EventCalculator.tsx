import { useState } from 'react'
import './EventCalculator.css'

type PackageTier = 'Bronze' | 'Silver' | 'Exclusive'

const packagePricing = {
  Bronze:    { setup: 250000,   service: 150000,  smoky: 0 },
  Silver:    { setup: 450000,   service: 250000,  smoky: 300000 },
  Exclusive: { setup: 1000000,  service: 500000,  smoky: 600000 },
}

const teaPricing = [
  { label: '50 guests',        price: 550000  },
  { label: '100 guests',       price: 1000000 },
  { label: '150 guests',       price: 1200000 },
  { label: '200 guests',       price: 1600000 },
  { label: '250–300 guests',   price: 2200000 },
  { label: '350–400 guests',   price: 2800000 },
  { label: '450–500 guests',   price: 3400000 },
  { label: '550–600 guests',   price: 4000000 },
  { label: '650–700 guests',   price: 4500000 },
  { label: '750–800 guests',   price: 5200000 },
  { label: '850–900 guests',   price: 5600000 },
  { label: '950–1,000 guests', price: 6500000 },
]

const FLAVOURS = [
  'Mango Juice', 'Passion Juice', 'Milk Meld', 'Soursop Juice',
  'Mango Passion Mix', 'Mango Tangerine Passion', 'Mango Beetroot',
  'Coconut Mango Mix', 'Pineapple Mint', 'Guava Lemon',
  'Orange Tangerine Ginger', 'Avocado Coconut', 'Hibiscus Juice',
  'Beetroot Plain', 'Detox Juice', 'Dragon Fruit Juice',
]

const formatUGX = (amount: number) =>
  `UGX ${new Intl.NumberFormat('en-UG').format(Math.round(amount))}`

export default function EventCalculator() {
  const [guests, setGuests] = useState(100)
  const [tier, setTier] = useState<PackageTier | null>(null)
  const [includeSmoky, setIncludeSmoky] = useState(false)
  const [manualJerrycans, setManualJerrycans] = useState<number | null>(null)
  const [includeFruitSetup, setIncludeFruitSetup] = useState(false)
  const [includeTea, setIncludeTea] = useState(false)
  const [teaTierIndex, setTeaTierIndex] = useState(0)
  const [mocktailGlasses, setMocktailGlasses] = useState(0)
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [eventDate, setEventDate] = useState('')
  const [venue, setVenue] = useState('')
  const [notes, setNotes] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const safeGuests = Math.max(1, guests || 1)
  const autoJerrycans = Math.ceil(safeGuests * 0.08)
  const effectiveJerrycans = manualJerrycans ?? autoJerrycans
  const juiceCost = effectiveJerrycans * 200000
  const pricing = tier ? packagePricing[tier] : null
  const smokyCost = includeSmoky && pricing ? pricing.smoky : 0
  const fruitCost = includeFruitSetup ? (safeGuests / 100) * 1000000 : 0
  const mocktailCost = mocktailGlasses * 15000
  const teaCost = includeTea ? teaPricing[teaTierIndex].price : 0

  const total =
    juiceCost +
    (pricing?.setup ?? 0) +
    (pricing?.service ?? 0) +
    smokyCost +
    fruitCost +
    mocktailCost +
    teaCost

  const toggleFlavour = (f: string) =>
    setSelectedFlavours(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]
    )

  const validate = () => {
    const errors: Record<string, string> = {}
    if (!name.trim()) errors.name = 'Your name is required.'
    if (!phone.trim()) errors.phone = 'A contact phone number is required.'
    if (!eventDate) errors.eventDate = 'Please select your event date.'
    if (!venue.trim()) errors.venue = 'Venue or location is required.'
    return errors
  }

  const buildMessage = () => {
    const lines: string[] = [
      'Hello Mirac Juice! I would like an event catering estimate.',
      '',
      '── EVENT DETAILS ──',
      `Guests: ${safeGuests}`,
      `Package: ${tier ?? 'No package selected'}`,
      `Juice jerrycans: ${effectiveJerrycans}${manualJerrycans !== null ? ` (adjusted from auto-estimate of ${autoJerrycans})` : ' (auto-estimated)'}`,
      `Juice cost: ${formatUGX(juiceCost)}`,
    ]

    if (pricing) {
      lines.push(`Setup fee: ${formatUGX(pricing.setup)}`)
      lines.push(`Service fee: ${formatUGX(pricing.service)}`)
    }
    if (smokyCost > 0) lines.push(`Smoky Juice: ${formatUGX(smokyCost)}`)
    if (fruitCost > 0) lines.push(`Fruit Setup & Display: ${formatUGX(fruitCost)} (${safeGuests} guests × UGX 1,000,000 / 100)`)
    if (mocktailGlasses > 0) lines.push(`Nojito mocktails: ${mocktailGlasses} glasses × UGX 15,000 = ${formatUGX(mocktailCost)}`)
    if (includeTea) lines.push(`Mirac Tea: ${teaPricing[teaTierIndex].label} – ${formatUGX(teaCost)}`)
    if (selectedFlavours.length > 0) lines.push(`Preferred flavours: ${selectedFlavours.join(', ')}`)

    lines.push('')
    lines.push(`ESTIMATED TOTAL: ${formatUGX(total)}`)
    lines.push('Transport: Awaiting confirmation (depends on venue location)')
    lines.push('')
    lines.push('── CUSTOMER DETAILS ──')
    lines.push(`Name: ${name}`)
    lines.push(`Phone: ${phone}`)
    lines.push(`Event date: ${eventDate}`)
    lines.push(`Venue: ${venue}`)
    lines.push(`Additional notes: ${notes.trim() || 'None'}`)
    lines.push('')
    lines.push('This is an estimate. Final pricing subject to Mirac Juice confirmation.')

    return lines.join('\n')
  }

  const handleSendEnquiry = () => {
    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      // Scroll to first error
      const firstKey = Object.keys(errors)[0]
      document.getElementById(`calc-field-${firstKey}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setFormErrors({})
    const url = `https://wa.me/256781838030?text=${encodeURIComponent(buildMessage())}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section className="event-calculator" id="event-calculator">
      <div className="event-calculator-inner">
        <div className="event-calculator-heading">
          <span className="eyebrow">PLAN YOUR EXPERIENCE</span>
          <h2>Estimate your <span>event cost.</span></h2>
          <p>
            Tell us about your gathering and get an instant estimate
            for your Mirac Juice experience.
          </p>
        </div>

        <div className="event-calculator-layout">
          {/* ── LEFT: Controls ── */}
          <div className="event-calculator-controls">

            {/* Guest count */}
            <div className="calculator-field">
              <label htmlFor="event-guests">How many guests are you expecting?</label>
              <input
                id="event-guests"
                type="number"
                min="1"
                max="10000"
                value={guests}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setGuests(Math.min(10000, Math.max(1, v || 1)))
                  setManualJerrycans(null) // reset manual override when guests change
                }}
              />
              <small>We estimate 8 juice jerrycans for every 100 guests.</small>
            </div>

            {/* Jerrycan adjuster */}
            <div className="calculator-field calc-jerrycan-field">
              <label>Juice jerrycans</label>
              <div className="calc-jerrycan-row">
                <span className="calc-jerrycan-auto">
                  Auto-estimate: <strong>{autoJerrycans}</strong>
                </span>
                <div className="calc-stepper">
                  <button
                    type="button"
                    className="calc-stepper-btn"
                    aria-label="Decrease jerrycans"
                    onClick={() =>
                      setManualJerrycans(Math.max(1, effectiveJerrycans - 1))
                    }
                  >−</button>
                  <span className="calc-stepper-value">{effectiveJerrycans}</span>
                  <button
                    type="button"
                    className="calc-stepper-btn"
                    aria-label="Increase jerrycans"
                    onClick={() =>
                      setManualJerrycans(effectiveJerrycans + 1)
                    }
                  >+</button>
                </div>
                {manualJerrycans !== null && (
                  <button
                    type="button"
                    className="calc-reset-link"
                    onClick={() => setManualJerrycans(null)}
                  >
                    Reset to auto
                  </button>
                )}
              </div>
              <small>UGX 200,000 per jerrycan. Adjust if needed.</small>
            </div>

            {/* Package selector */}
            <div className="calculator-field">
              <label>Choose your package <span className="calc-optional">(optional)</span></label>
              <div className="calculator-tier-options">
                {(['Bronze', 'Silver', 'Exclusive'] as PackageTier[]).map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={`calculator-tier ${tier === option ? 'selected' : ''}`}
                    onClick={() => {
                      if (tier === option) {
                        setTier(null)
                        setIncludeSmoky(false)
                      } else {
                        setTier(option)
                        if (option === 'Bronze') setIncludeSmoky(false)
                      }
                    }}
                    aria-pressed={tier === option}
                  >
                    {option}
                    <span>
                      {option === 'Exclusive'
                        ? 'Premium experience'
                        : option === 'Silver'
                        ? 'Enhanced experience'
                        : 'Essential experience'}
                    </span>
                  </button>
                ))}
              </div>
              <small>Tap again to deselect. Juice is always priced per jerrycan regardless of package.</small>
            </div>

            {/* Smoky Juice */}
            {pricing && pricing.smoky > 0 && (
              <div className="calculator-field smoky-option">
                <label className="smoky-checkbox">
                  <input
                    type="checkbox"
                    checked={includeSmoky}
                    onChange={(e) => setIncludeSmoky(e.target.checked)}
                  />
                  <span>Add optional Smoky Juice — {formatUGX(pricing.smoky)}</span>
                </label>
              </div>
            )}

            {/* Fruit Setup add-on */}
            <div className="calculator-field calc-addon-block">
              <label className="calc-addon-label">
                <input
                  type="checkbox"
                  checked={includeFruitSetup}
                  onChange={(e) => setIncludeFruitSetup(e.target.checked)}
                />
                <span>
                  Add Fruit Setup &amp; Display
                  <em className="calc-addon-formula">
                    {safeGuests} guests × UGX 1,000,000 / 100 = {formatUGX(fruitCost)}
                  </em>
                </span>
              </label>
            </div>

            {/* Mirac Tea add-on */}
            <div className="calculator-field calc-addon-block">
              <label className="calc-addon-label">
                <input
                  type="checkbox"
                  checked={includeTea}
                  onChange={(e) => setIncludeTea(e.target.checked)}
                />
                <span>Add Mirac Tea &amp; Coffee Catering</span>
              </label>
              {includeTea && (
                <div className="calc-tea-select-wrapper">
                  <select
                    className="calc-tea-select"
                    value={teaTierIndex}
                    onChange={(e) => setTeaTierIndex(Number(e.target.value))}
                  >
                    {teaPricing.map((t, i) => (
                      <option key={i} value={i}>
                        {t.label} — {formatUGX(t.price)}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Nojito Mocktails */}
            <div className="calculator-field">
              <label htmlFor="mocktail-glasses">Optional Nojito mocktails</label>
              <input
                id="mocktail-glasses"
                type="number"
                min="0"
                max="10000"
                value={mocktailGlasses}
                onChange={(e) =>
                  setMocktailGlasses(Math.min(10000, Math.max(0, Number(e.target.value) || 0)))
                }
              />
              <small>UGX 15,000 per glass. Enter 0 if not required.</small>
            </div>

            {/* Flavour chips */}
            <div className="calculator-field">
              <label>Preferred juice flavours <span className="calc-optional">(optional)</span></label>
              <div className="calc-flavour-grid">
                {FLAVOURS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`calc-flavour-chip ${selectedFlavours.includes(f) ? 'selected' : ''}`}
                    onClick={() => toggleFlavour(f)}
                    aria-pressed={selectedFlavours.includes(f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <small>Select all that apply. This does not affect pricing.</small>
            </div>

            {/* Customer details */}
            <div className="calc-form-section">
              <h3 className="calc-form-heading">Your Details</h3>
              <p className="calc-form-subheading">We'll use these to follow up on your enquiry.</p>

              <div className="calc-form-row">
                <div className="calc-form-field" id="calc-field-name">
                  <label htmlFor="calc-name">Your name *</label>
                  <input
                    id="calc-name"
                    type="text"
                    placeholder="e.g. Sarah Nakato"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={formErrors.name ? 'field-error-input' : ''}
                  />
                  {formErrors.name && <span className="calc-field-error">{formErrors.name}</span>}
                </div>
                <div className="calc-form-field" id="calc-field-phone">
                  <label htmlFor="calc-phone">Phone number *</label>
                  <input
                    id="calc-phone"
                    type="tel"
                    placeholder="e.g. 0781 838 030"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={formErrors.phone ? 'field-error-input' : ''}
                  />
                  {formErrors.phone && <span className="calc-field-error">{formErrors.phone}</span>}
                </div>
              </div>

              <div className="calc-form-row">
                <div className="calc-form-field" id="calc-field-eventDate">
                  <label htmlFor="calc-date">Event date *</label>
                  <input
                    id="calc-date"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className={formErrors.eventDate ? 'field-error-input' : ''}
                  />
                  {formErrors.eventDate && <span className="calc-field-error">{formErrors.eventDate}</span>}
                </div>
                <div className="calc-form-field" id="calc-field-venue">
                  <label htmlFor="calc-venue">Venue / location *</label>
                  <input
                    id="calc-venue"
                    type="text"
                    placeholder="e.g. Kololo, Kampala"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className={formErrors.venue ? 'field-error-input' : ''}
                  />
                  {formErrors.venue && <span className="calc-field-error">{formErrors.venue}</span>}
                </div>
              </div>

              <div className="calc-form-field calc-form-field-full">
                <label htmlFor="calc-notes">Additional notes</label>
                <textarea
                  id="calc-notes"
                  rows={3}
                  placeholder="Any special requirements, theme, timing details…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Estimate Panel ── */}
          <div className="event-estimate">
            <span className="estimate-kicker">YOUR ESTIMATED TOTAL</span>
            <div className="estimate-total">{formatUGX(total)}</div>
            <p className="estimate-subtitle">Based on your selected options and event size</p>

            <div className="estimate-breakdown">
              <div><span>Package</span><strong>{tier ?? '—'}</strong></div>
              <div><span>Guests</span><strong>{safeGuests}</strong></div>
              <div>
                <span>Jerrycans{manualJerrycans !== null ? ' (adjusted)' : ''}</span>
                <strong>{effectiveJerrycans}</strong>
              </div>
              <div><span>Juice</span><strong>{formatUGX(juiceCost)}</strong></div>
              {pricing && (
                <>
                  <div><span>Setup</span><strong>{formatUGX(pricing.setup)}</strong></div>
                  <div><span>Service fee</span><strong>{formatUGX(pricing.service)}</strong></div>
                </>
              )}
              {smokyCost > 0 && (
                <div><span>Smoky Juice</span><strong>{formatUGX(smokyCost)}</strong></div>
              )}
              {fruitCost > 0 && (
                <div><span>Fruit Setup</span><strong>{formatUGX(fruitCost)}</strong></div>
              )}
              {mocktailCost > 0 && (
                <div><span>Mocktails ({mocktailGlasses} gl.)</span><strong>{formatUGX(mocktailCost)}</strong></div>
              )}
              {teaCost > 0 && (
                <div><span>Mirac Tea</span><strong>{formatUGX(teaCost)}</strong></div>
              )}
              {selectedFlavours.length > 0 && (
                <div className="estimate-flavours">
                  <span>Flavours</span>
                  <strong>{selectedFlavours.length} selected</strong>
                </div>
              )}
            </div>

            <button
              type="button"
              className="calculator-whatsapp"
              onClick={handleSendEnquiry}
            >
              SEND ENQUIRY ON WHATSAPP ↗
            </button>
            <p className="estimate-disclaimer">
              This is an estimate, not a final quotation. Transport is
              excluded and will be confirmed according to your venue.
              Final quantities and arrangements are subject to confirmation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
