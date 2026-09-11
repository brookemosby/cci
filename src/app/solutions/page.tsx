import Image from "next/image";
import { SiteHeader } from "@/components/site-header";
import { AnimatedNumber } from "@/components/animated-number";

const solutions = [
  {
    title: "Connectivity",
    body: "The foundation of everything your business runs on. Full network analysis included.",
  },
  {
    title: "Communication & Collaboration",
    body: "UCaaS and CCaaS platforms that replace legacy PBX with scalable cloud communications.",
  },
  {
    title: "Telecom Expense Management",
    body: "Optimize, manage, and single-pay your entire technology portfolio with full visibility.",
  },
  {
    title: "AI Readiness",
    body: "Practical AI implementation built on governance, security, and measurable outcomes.",
  },
  {
    title: "Cybersecurity",
    body: "NIST-aligned security framework that protects your business before threats become costly.",
  },
  {
    title: "Clouds & Colocation",
    body: "IaaS, DRaaS, and colocation across 1,600+ data centers worldwide.",
  },
  {
    title: "Data Center",
    body: "Safeguard your data with the highest levels of security and operational reliability.",
  },
  {
    title: "Lifecycle Management",
    body: "Strategic sourcing, TEM, and ongoing management across your entire technology estate.",
  },
];

const practices = [
  {
    eyebrow: "Practice Area | Network Connectivity",
    title: "The Foundation of Everything Your Business Runs On",
    body: "Your network dictates the performance of every core technology you use. Outdated or inefficient infrastructure creates hidden costs, reduces productivity, and stifles growth. CCI provides a full network analysis: examining partners, costs, and technology, to ensure you're connected effectively.",
    bullets: [
      "Benchmark your current spend against 200+ provider alternatives simultaneously.",
      "Fiber, broadband, SD-WAN, MPLS, and fixed wireless.",
      "Dedicated project manager from contract execution through go-live.",
    ],
    panelTitle: "By The Numbers",
    panelBig: "200+",
    panelMid: "Provider alternatives evaluated",
    panelBottom: "No markup. No Bias. Just the right solution for your business",
    tags: [],
  },
  {
    eyebrow: "Practice Area | Communication & Collaboration",
    title: "Replace Legacy PBX with modern Cloud Communications",
    body: "Enterprises are replacing PBX at an incredible pace. UCaaS is feature-rich and easier to manage. UCaaS extends customer experience beyond voice into digital channels. CCI matches the right platform to your workforce without vendor bias.",
    bullets: [
      "Voice, collaboration, and AI-assisted contact center advisory",
      "Evaluate platforms from Dialpad, Zoom, NICE, Call Tower, Ooma, and more.",
      "Reduce infrastructure costs and eliminate costly maintenance.",
    ],
    panelTitle: "Platform Partners",
    panelBig: "",
    panelMid: "",
    panelBottom: "Bias-free evaluation of every platform option",
    tags: ["Dialpad", "Zoom", "Ooma", "NICE", "Call Tower", "& More"],
  },
  {
    eyebrow: "Practice Area | Cloud Contact Center",
    title: "Elevate Customer Experience with Cloud Contact Center",
    body: "Contact centers are shifting from on-premise systems to flexible, AI-powered CCaaS platforms. CCaaS delivers omnichannel engagement, real-time analytics, and intelligent routing - without the overhead of legacy infrastructure. CCI aligns the right solution to your customer experience goals with no vendor allegiance.",
    bullets: [
      "Omnichannel, AI, and workforce engagement advisory",
      "Evaluate platforms from Genesys, Five9, Vonage, Talkdesk, 8x8, GoTo, Glia, and more.",
      "Lower total cost of ownership and eliminate hardware dependency.",
    ],
    panelTitle: "Platform Partners",
    panelBig: "",
    panelMid: "",
    panelBottom: "We help customer-focused organizations deliver exceptional CX.",
    tags: ["Genesys", "Five9", "Vonage", "Talkdesk", "8x8", "GoTo", "Glia", "& More"],
  },
  {
    eyebrow: "Practice Area | Cyber Security & Compliance",
    title: "Build Your Security Framework Before a Breach Becomes Costly",
    body: "Security is more critical now than ever. Businesses should build a framework that guides processes and risk management across an ever-changing threat landscape. Develop a plan now. Not after a critical and costly incident.",
    bullets: [
      "NIST framework: Identify, Protect, Detect, Respond, Recover.",
      "Comprehensive vulnerability assessments across your entire environment.",
      "Endpoint, network, cloud, and email security coverage.",
    ],
    panelTitle: "NIST Framework",
    panelBig: "",
    panelMid: "",
    panelBottom: "Identify\nProtect\nDetect\nRespond\nRecover",
    tags: [],
  },
  {
    eyebrow: "Practice Area | Cloud & Colocation",
    title: "Infrastructure That Adapts as Your Business Transforms",
    body: "React fast to market opportunities with physical and virtual infrastructure that scales with you. CCI partners with leading data centers providing unrivaled colocation services and access to more than 1,600 facilities worldwide.",
    bullets: [
      "IaaS, DRaaS, backup, and hybrid cloud and procurement",
      "Access to 1,600+ data centers across every major market with the",
      "highest levels of physical and operational security.",
    ],
    panelTitle: "Global Reach",
    panelBig: "1,600+",
    panelMid: "Data Centers Worldwide",
    panelBottom: "IaaS, DRaaS, and hybrid cloud advisory across every major market",
    tags: [],
  },
];

export default function SolutionsPage() {
  return (
    <div className="site">
      <SiteHeader active="solutions" />

      <main>
        <section className="solutions dark solutions-top reveal">
          <div className="container reveal">
            <p className="eyebrow">What We Do</p>
            <h3>Technology Solutions</h3>
            <div className="solution-grid reveal-seq">
              {solutions.map((item) => (
                <article
                  key={item.title}
                  className="solution-card reveal"
                >
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="practice-wrap reveal">
          <div className="container reveal">
            <p className="eyebrow eyebrow-dark">Practice Areas</p>
            <h3 className="practice-main">Deep Expertise Across Every Practice Area.</h3>
          </div>

          <div className="practice-seq">
            {practices.map((item) => (
              <div key={item.title} className="practice-row reveal">
                <div className="container two-col">
                  <div className="reveal">
                    <p className="eyebrow eyebrow-dark">{item.eyebrow}</p>
                    <h3 className="practice-title">{item.title}</h3>
                    <p>{item.body}</p>
                    <ul className="practice-bullets">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                  <aside className="practice-panel reveal reveal-delay-1">
                    <p className="eyebrow">{item.panelTitle}</p>
                    {item.panelBig ? (
                      <strong>
                        {item.panelBig === "200+" ? (
                          <AnimatedNumber value={200} suffix="+" />
                        ) : item.panelBig === "1,600+" ? (
                          <AnimatedNumber value={1600} suffix="+" />
                        ) : (
                          item.panelBig
                        )}
                      </strong>
                    ) : null}
                    {item.panelMid ? <p className="panel-mid">{item.panelMid}</p> : null}
                    {item.tags.length ? (
                      <div className="tag-grid">
                        {item.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    ) : null}
                    <p className="panel-bottom">{item.panelBottom}</p>
                  </aside>
                </div>
              </div>
            ))}
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
