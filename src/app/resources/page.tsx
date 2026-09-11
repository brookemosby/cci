import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { FormSubmitButton } from "@/components/form-submit-button";

const EVENT_TYPES = ["Lunch & Learns", "Seminars", "Webinars", "Other"];
const EVENT_CATEGORIES = [
  "Cloud Solutions",
  "Infrastructure",
  "Cybersecurity",
  "Collaboration",
  "Data Center",
  "Procurement Services",
  "Professional Services",
  "Managed Services",
  "Financial Services",
  "Project Management",
];

export default async function ResourcesPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const sent = resolved.sent === "1";
  const error = resolved.error === "1";

  return (
    <div className="site">
      <SiteHeader active="resources" />

      <main>
        <section className="events-hero dark reveal">
          <div className="container">
            <p className="eyebrow">RESOURCES | EVENTS</p>
            <h3>Sign Up for Free IT Events</h3>
            <p className="resources-lead">
              Register for curated sessions aligned to your business goals and technology priorities.
            </p>
          </div>
        </section>

        <section className="light events-signup reveal">
          <div className="container events-layout">
            <div className="reveal">
              <p className="eyebrow eyebrow-dark">Event Registration</p>
              <h3 className="events-form-title">Reserve Your Spot</h3>
              <form className="events-form reveal reveal-delay-1" method="POST" action="/api/events-signup">
                <input type="hidden" name="redirectTo" value="/resources" />
                {sent ? (
                  <p className="full sent-notice">
                    Submitted successfully. You are now on the free IT events signup list.
                  </p>
                ) : null}
                {error ? (
                  <p className="full error-notice">
                    Signup failed to send. Please try again in a moment.
                  </p>
                ) : null}

                <label>
                  Name (required)
                  <input name="name" required />
                </label>

                <label>
                  Email (required)
                  <input type="email" name="email" required />
                </label>

                <label>
                  Phone Number
                  <input name="phone" />
                </label>

                <label>
                  Event Type (required)
                  <select name="eventType" defaultValue="" required>
                    <option value="" disabled>
                      Select an Event Type
                    </option>
                    {EVENT_TYPES.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>

                <fieldset className="full">
                  <legend>Event Categories (select all that apply)</legend>
                  <div className="events-checkbox-grid">
                    {EVENT_CATEGORIES.map((category) => (
                      <label key={category} className="events-checkbox">
                        <input type="checkbox" name="eventCategories" value={category} />
                        <span>{category}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <FormSubmitButton
                  idleLabel="SIGN UP"
                  pendingLabel="SIGNING UP..."
                  pendingMessage="Submitting your event signup..."
                />
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <Image src="/assets/cci-logo-mark.png" alt="CCI logo" width={190} height={120} />
        <div className="footer-badges">
          <Image src="/assets/wbenc.png" alt="WBENC certified badge" width={130} height={57} />
          <Image src="/assets/women-owned.png" alt="Women owned badge" width={130} height={57} />
        </div>
      </footer>
    </div>
  );
}
