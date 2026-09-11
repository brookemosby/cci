import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { AnimatedNumber } from "@/components/animated-number";

export default function Home() {
  return (
    <div className="site">
      <SiteHeader active="home" />

      <main>
        <section id="home" className="hero">
          <div className="hero-overlay" />
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/hero-tech.png"
            aria-hidden="true"
          >
            <source src="/assets/chip-loop.mp4" type="video/mp4" />
          </video>
          <div className="hero-content reveal">
            <p className="eyebrow">The Better Way to Buy and Manage Technology</p>
            <h1>Your Trusted Tech Advisors.</h1>
            <h2>No Carrier Allegiance.</h2>
          </div>
        </section>

        <section id="overview" className="stats-section dark reveal">
          <div className="container two-col">
            <div className="stats-panel reveal">
              <div>
                <strong>
                  <AnimatedNumber value={200} suffix="+" />
                </strong>
                <span className="stats-label">Provider Relationships</span>
              </div>
              <div>
                <strong>
                  <AnimatedNumber value={35} suffix="+" />
                </strong>
                <span className="stats-label">Years of Experience</span>
              </div>
              <div>
                <strong>
                  <AnimatedNumber value={7} />
                </strong>
                <span className="stats-label">Technology Practice Areas</span>
              </div>
              <div>
                <strong>
                  <AnimatedNumber value={0} prefix="$" />
                </strong>
                <span className="stats-label">Cost to You</span>
              </div>
            </div>
            <div className="stats-copy reveal reveal-delay-1">
              <p>
                As an independent technology advisory firm, CCI is disrupting the way
                businesses evaluate, acquire, and manage their technology investments,
                with no cost to you and no obligation to any carrier or vendor.
              </p>
              <Link href="/cci-way" className="pill-btn">
                Learn More
              </Link>
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
