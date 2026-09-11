import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { FormSubmitButton } from "@/components/form-submit-button";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const sent = resolved.sent === "1";
  const error = resolved.error === "1";

  return (
    <div className="site">
      <SiteHeader active="contact" />

      <main>
        <section id="contact-form" className="contact-page dark reveal">
          <div className="container contact-layout">
            <div className="contact-intro reveal">
              <h3>Ready to Experience the CCI Way?</h3>
              <p className="eyebrow founder-role">Moving Business Forward</p>
            </div>

            <div className="contact-form-wrap reveal reveal-delay-1">
              <form className="contact-form contact-dark-form" method="POST" action="/api/contact">
                <input type="hidden" name="redirectTo" value="/contact#contact-form" />
                {sent ? (
                  <p className="full sent-notice">
                    Thanks. Your message was received and will be reviewed shortly.
                  </p>
                ) : null}
                {error ? (
                  <p className="full error-notice">
                    Message failed to send. Please try again in a moment.
                  </p>
                ) : null}
                <label>
                  Name
                  <input name="firstName" placeholder="First Name (required)" required />
                </label>
                <label className="blank-label">
                  &nbsp;
                  <input name="lastName" placeholder="Last Name (required)" required />
                </label>
                <label className="full">
                  Email (required)
                  <input type="email" name="email" required />
                </label>
                <label className="full">
                  Message (required)
                  <textarea name="message" rows={4} required />
                </label>
                <FormSubmitButton
                  idleLabel="SEND"
                  pendingLabel="SENDING..."
                  pendingMessage="Sending your message..."
                />
              </form>
            </div>

            <div className="contact-image-wrap reveal reveal-delay-2">
              <Image
                src="/assets/contact-side-photo.png"
                alt="AI technology interface visual"
                width={480}
                height={300}
                className="contact-image contact-side-photo"
              />
            </div>
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
