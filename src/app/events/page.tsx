import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { FormSubmitButton } from "@/components/form-submit-button";
import { currentEvents, previousEvents, type EventItem } from "@/data/events";

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

function EventCard({ event, showRsvp }: { event: EventItem; showRsvp: boolean }) {
  return (
    <article className="resource-card event-card">
      <p className="event-card-date">{event.date}</p>
      <h4>{event.title}</h4>
      {event.location ? <p className="event-card-location">{event.location}</p> : null}
      <p>{event.description}</p>
      {showRsvp && event.rsvpUrl ? (
        <Link href={event.rsvpUrl} className="pill-btn" target="_blank" rel="noopener noreferrer">
          RSVP on RSVPify
        </Link>
      ) : null}
    </article>
  );
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const resolved = await searchParams;
  const sent = resolved.sent === "1";
  const error = resolved.error === "1";

  const sortedCurrent = [...currentEvents].sort(
    (a, b) => a.dateSort.localeCompare(b.dateSort),
  );
  const sortedPrevious = [...previousEvents].sort(
    (a, b) => b.dateSort.localeCompare(a.dateSort),
  );

  return (
    <div className="site">
      <SiteHeader active="events" />

      <main>
        <section className="events-hero dark reveal">
          <div className="container">
            <p className="eyebrow">EVENTS</p>
            <h3>Current &amp; Upcoming Events</h3>
            <p className="resources-lead">
              Join CCI for curated sessions aligned to your business goals and technology
              priorities. Reserve your spot through our RSVPify event pages.
            </p>
          </div>
        </section>

        <section className="light events-list reveal">
          <div className="container">
            <p className="eyebrow eyebrow-dark">Current Events</p>
            <div className="resources-grid events-grid">
              {sortedCurrent.map((event) => (
                <EventCard key={event.id} event={event} showRsvp />
              ))}
            </div>
          </div>
        </section>

        {sortedPrevious.length > 0 ? (
          <section className="light events-list events-list-previous reveal">
            <div className="container">
              <p className="eyebrow eyebrow-dark">Previous Events</p>
              <div className="resources-grid events-grid">
                {sortedPrevious.map((event) => (
                  <EventCard key={event.id} event={event} showRsvp={false} />
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="light events-signup reveal">
          <div className="container events-layout">
            <div className="reveal">
              <p className="eyebrow eyebrow-dark">General Interest</p>
              <h3 className="events-form-title">Sign Up for Free IT Events</h3>
              <p className="resources-lead">
                Not seeing the right session yet? Join our list to hear about new events as
                they are announced.
              </p>
              <form className="events-form reveal reveal-delay-1" method="POST" action="/api/events-signup">
                <input type="hidden" name="redirectTo" value="/events" />
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
