import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks'
import { BUSINESS, CONTACTS } from '../data/config'

export default function Policies() {
  usePageMeta({
    title: 'Shipping, Payment & Privacy',
    description:
      'How ordering, payment, shipping, care and privacy work at Aman Resin Art And Decore. Every order is confirmed on WhatsApp.',
  })

  return (
    <>
      <section className="rr-page-hero" data-no-reveal>
        <div className="container">
          <div className="rr-page-hero__inner text-center">
            <span className="eyebrow">Good to know</span>
            <h1>Shipping, Payment &amp; Privacy</h1>
            <p>Plain answers on how an order works, from first message to delivery.</p>
          </div>
        </div>
      </section>

      <section className="container py-4">
        <div className="rr-policy">
          <h2>How orders work</h2>
          <p>
            There is no online checkout. Every order and custom design is confirmed with us on WhatsApp, where we agree
            the design, price and delivery date before anything is poured.
          </p>

          <h2>Payment</h2>
          <p>
            We take a 50% advance by UPI to start your piece. The balance is paid after you approve the photo preview of
            your finished piece and before it is dispatched.
          </p>

          <h2>Making time</h2>
          <p>
            Standard pieces usually take 3 to 5 days to pour and cure. Bridal varmala and fresh-flower preservation
            pieces usually take 7 to 10 days. We confirm the date with you on WhatsApp.
          </p>

          <h2>Shipping &amp; pickup</h2>
          <p>
            We ship across India by courier. Delivery charges depend on weight and destination and are confirmed before
            you finalise your order. You can also collect from our studio in {BUSINESS.city}, {BUSINESS.state}.
          </p>

          <h2>Issues with your order</h2>
          <p>
            If something arrives damaged or not as agreed, message us on WhatsApp with photos as soon as you can and we
            will sort it out with you.
          </p>

          <h2>Caring for your piece</h2>
          <p>
            Wipe with a soft microfiber cloth. Keep it away from high heat, harsh direct sun and harsh chemicals.
          </p>

          <h2>Privacy</h2>
          <p>
            This website has no accounts, no payments and no tracking cookies. Your saved wishlist and chosen contact are
            stored only in your own browser. When you message us on WhatsApp, the conversation is handled by WhatsApp and
            we use your details only to make and deliver your order.
          </p>

          <h2>Contact</h2>
          <p>
            {CONTACTS.map((c) => `${c.label} ${c.display}`).join(' · ')} · {BUSINESS.email}. More on the{' '}
            <Link to="/contact">contact page</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
