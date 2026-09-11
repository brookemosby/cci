import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { FormSubmitButton } from "@/components/form-submit-button";

export default async function CciWayPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const sent = resolved.sent === "1";
  const error = resolved.error === "1";

  return (
    <div className="site">
      <SiteHeader active="cci-way" light />

      <main>
        <section className="light reveal">
          <div className="container two-col">
            <div className="reveal">
              <p className="eyebrow eyebrow-dark">Experience Matters</p>
              <h3>Your Trusted Tech Advisors for Over Two Decades</h3>
              <p>
                We&apos;re different. We&apos;ve been in your shoes. CCI was built by people
                who understand how business buy, manage, and implement technology, and
                who believe the process is too complicated, too time consuming, and too
                expensive.
              </p>
              <p>So we created something different. A better way. The CCI Way.</p>
            </div>
            <div className="stack-cards">
              <article className="feature-card reveal">
                <h4>Truly Provider Agnostic</h4>
                <p>
                  200+ provider relationships and allegiance to none. We evaluate every
                  option without carrier bias or vendor favoritism.
                </p>
              </article>
              <article className="feature-card reveal reveal-delay-1">
                <h4>Dedicated Concierge Support</h4>
                <p>
                  Every engagement gets a dedicated project manager from kickoff through
                  go-live, and beyond.
                </p>
              </article>
              <article className="feature-card reveal reveal-delay-2">
                <h4>No Cost to You</h4>
                <p>
                  Our compensation comes from providers after you&apos;re live and
                  satisfied. Zero fees to engage us.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="process" className="process dark reveal">
          <div className="container two-col">
            <div>
              <p className="eyebrow">The CCI Way | Six Steps | Every Engagement</p>
              <h3>A Disciplined Process. Every Time.</h3>
              <div className="steps-grid reveal-seq">
                {[
                  {
                    title: "Discovery & Framing",
                    body: "We start with your business goals, not a product catalog. Contracts, gas, and cost exposure all get mapped first.",
                  },
                  {
                    title: "Provider Evaluation",
                    body: "We evaluate 200+ providers without bias and present only the top fit options with full pricing transparency.",
                  },
                  {
                    title: "Solution Engineering",
                    body: "We design in detail before you sign, so you see exactly what’s being built. No surprises.",
                  },
                  {
                    title: "Concierge Implementation",
                    body: "A dedicated project manager coordinates every provider and tracks every milestone through go-live.",
                  },
                  {
                    title: "Validation & Go-Live",
                    body: "We stay through cutover and validate performance. We don’t hand off and walk away.",
                  },
                  {
                    title: "Ongoing Partnership",
                    body: "Contract management, monitoring, and strategic planning as your business evolves. Long-term.",
                  },
                ].map((step, idx) => (
                  <article
                    key={step.title}
                    className="step-card reveal"
                  >
                    <span>{String(idx + 1).padStart(2, "0")}</span>
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </article>
                ))}
              </div>
            </div>
            <p className="process-copy reveal reveal-delay-1">
              CCI was founded in 2004 after 13 years of direct sales experience in the
              fast-paced 1990&apos;s telecommunications industry as it started to explode.
              We were there before new cloud technology and the convergence of IT,
              voice, and connectivity became ubiquitous. We have been a trusted advisor
              for all of the top providers for more than 22 years. We are your solutions
              provider. We are with you every step of the way as your partner to provide
              seamless solutions and exceptional customer experience.
            </p>
          </div>
        </section>

        <section className="founder dark founder-slim reveal">
          <div className="container two-col">
            <div>
              <h3>Kandace Dato.</h3>
              <p className="eyebrow founder-role">
                President & Founder | Carrier Consulting International
              </p>
              <p>
                Kandace Dato leads CCI with over two decades of experience in the
                technology advisory space. Her vision was simple: Create a firm that
                truly advocates for the client. Not the carrier, not the vendor.
              </p>
              <p>
                Under her leadership, CCI has built 200+ provider relationships while
                maintaining absolute independence. That&apos;s the CCI difference.
              </p>
              <blockquote>
                &quot;We believe the way businesses buy technology is broken. We built CCI
                to fix it. With no allegiance to anyone but our clients.&quot;
                <cite>— Kandace Dato, President</cite>
              </blockquote>
            </div>
            <Image
              src="/assets/kandace-dato.png"
              alt="Kandace Dato portrait"
              width={309}
              height={402}
              className="founder-photo"
            />
          </div>
        </section>

        <section id="contact" className="light cci-contact reveal">
          <div className="container two-col cci-contact-grid">
            <div>
              <h3>Ready to Experience the CCI Way?</h3>
              <p className="eyebrow eyebrow-dark founder-role">Moving Business Forward</p>
              <p className="contact-copy">
                No cost. No obligation. No carrier allegiance. Just honest conversation
                about what&apos;s possible for your business technology.
              </p>
            </div>
            <form className="contact-form cci-form reveal reveal-delay-1" method="POST" action="/api/contact">
              <input type="hidden" name="redirectTo" value="/cci-way#contact" />
              {sent ? (
                <p className="full sent-notice sent-light">
                  Thanks. Your message was received and will be reviewed shortly.
                </p>
              ) : null}
              {error ? (
                <p className="full error-notice">
                  Message failed to send. Please try again in a moment.
                </p>
              ) : null}
              <label>
                First Name
                <input name="firstName" required />
              </label>
              <label>
                Last Name
                <input name="lastName" required />
              </label>
              <label className="full">
                Email
                <input type="email" name="email" required />
              </label>
              <label className="full checkbox">
                <input type="checkbox" name="subscribe" />
                Sign up for news and updates
              </label>
              <label className="full">
                Message
                <textarea name="message" rows={4} required />
              </label>
              <FormSubmitButton
                idleLabel="Submit"
                pendingLabel="Sending..."
                pendingMessage="Sending your message..."
              />
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Image
          src="/assets/cci-logo-mark.png"
          alt="CCI logo"
          width={190}
          height={120}
        />
        <div className="footer-badges">
          <Image src="/assets/wbenc.png" alt="WBENC certified badge" width={130} height={57} />
          <Image src="/assets/women-owned.png" alt="Women owned badge" width={130} height={57} />
        </div>
      </footer>
    </div>
  );
}
