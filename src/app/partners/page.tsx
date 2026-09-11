"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/site-header";

type CategoryKey =
  | "cloud"
  | "cx-ux"
  | "connectivity"
  | "cybersecurity"
  | "ai-llm-secure-gateway"
  | "pots-replacement"
  | "network"
  | "caller-id"
  | "colo";

type PartnerCategory = {
  key: CategoryKey;
  label: string;
  icon: string;
  partners: string[];
};

const partnerDomains: Record<string, string> = {
  AWS: "amazonaws.com",
  Azure: "azure.microsoft.com",
  "Google Cloud Platform": "cloud.google.com",
  RACKSPACE: "rackspace.com",
  Nutanix: "nutanix.com",
  Flexential: "flexential.com",
  Expedient: "expedient.com",
  "Scale Computing": "scalecomputing.com",
  "Sky Data Vault": "skydatavault.com",
  "11:11": "1111systems.com",
  "8x8": "8x8.com",
  NICE: "nice.com",
  GENESIS: "genesys.com",
  DIALPAD: "dialpad.com",
  FIVE9: "five9.com",
  Vonage: "vonage.com",
  "Ring Centra": "ringcentral.com",
  GOTO: "goto.com",
  "MICROSOFT TEAMS": "microsoft.com",
  WEBEX: "webex.com",
  ZOOM: "zoom.us",
  "AT&T": "att.com",
  COMCAST: "comcast.com",
  COX: "cox.com",
  FIRSTDIGITAL: "firstdigital.com",
  LUMEN: "lumen.com",
  VERIZON: "verizon.com",
  "CATO Networks": "catonetworks.com",
  Airespring: "airespring.com",
  Arelion: "arelion.com",
  Zayo: "zayo.com",
  GTT: "gtt.net",
  Mosaic: "mosaicnetworks.com",
  CommandLink: "commandlink.com",
  "Abnormal Security": "abnormal.ai",
  Armis: "armis.com",
  Avanan: "avanan.com",
  CrowdStrike: "crowdstrike.com",
  Delinea: "delinea.com",
  Drata: "drata.com",
  eSentire: "esentire.com",
  Fortinet: "fortinet.com",
  Infoblox: "infoblox.com",
  Keeper: "keepersecurity.com",
  KnowBe4: "knowbe4.com",
  Netskope: "netskope.com",
  "Palo Alto Networks": "paloaltonetworks.com",
  "Security Scorecard": "securityscorecard.com",
  TANIUM: "tanium.com",
  Tenable: "tenable.com",
  ThreatDown: "threatdown.com",
  Tufin: "tufin.com",
  Vanta: "vanta.com",
  VARONIS: "varonis.com",
  Verkada: "verkada.com",
  Netcyberops: "netcyberops.com",
  "Kore.AI": "kore.ai",
  "Liminal AI": "liminal.ai",
  OOMA: "ooma.com",
  IoT: "iot.com",
  EpiciO: "epicio.com",
  Meter: "meter.com",
  Hiya: "hiya.com",
  "Rack space": "rackspace.com",
  Equinix: "equinix.com",
  Switch: "switch.com",
};

const partnerCategories: PartnerCategory[] = [
  {
    key: "cloud",
    label: "Cloud",
    icon: "C",
    partners: [
      "AWS",
      "Azure",
      "Google Cloud Platform",
      "RACKSPACE",
      "Nutanix",
      "Flexential",
      "Expedient",
      "Scale Computing",
      "Sky Data Vault",
      "11:11",
    ],
  },
  {
    key: "cx-ux",
    label: "CX/UX",
    icon: "X",
    partners: [
      "ZOOM",
      "DIALPAD",
      "NICE",
      "GENESIS",
      "Vonage",
      "Ring Centra",
      "GOTO",
      "8x8",
      "FIVE9",
      "MICROSOFT TEAMS",
      "WEBEX",
    ],
  },
  {
    key: "connectivity",
    label: "Connectivity",
    icon: "N",
    partners: [
      "AT&T",
      "COMCAST",
      "COX",
      "FIRSTDIGITAL",
      "LUMEN",
      "VERIZON",
      "CATO Networks",
      "Airespring",
      "Arelion",
      "Zayo",
      "GTT",
      "Mosaic",
      "CommandLink",
    ],
  },
  {
    key: "cybersecurity",
    label: "Cybersecurity",
    icon: "S",
    partners: [
      "Abnormal Security",
      "Armis",
      "Avanan",
      "CrowdStrike",
      "Delinea",
      "Drata",
      "eSentire",
      "Fortinet",
      "Infoblox",
      "Keeper",
      "KnowBe4",
      "Netskope",
      "Palo Alto Networks",
      "Security Scorecard",
      "TANIUM",
      "Tenable",
      "ThreatDown",
      "Tufin",
      "Vanta",
      "VARONIS",
      "Verkada",
      "Netcyberops",
      "Kore.AI",
    ],
  },
  {
    key: "ai-llm-secure-gateway",
    label: "AI LLM Secure Gateway",
    icon: "A",
    partners: [
      "Liminal AI",
    ],
  },
  {
    key: "pots-replacement",
    label: "POTS Replacement",
    icon: "P",
    partners: ["OOMA", "IoT", "EpiciO"],
  },
  {
    key: "network",
    label: "Network",
    icon: "N",
    partners: ["Meter"],
  },
  {
    key: "caller-id",
    label: "Caller ID",
    icon: "I",
    partners: ["Hiya"],
  },
  {
    key: "colo",
    label: "Colo",
    icon: "C",
    partners: ["Rack space", "Equinix", "Switch", "And more"],
  },
];

function PartnerLogoCard({ partner }: { partner: string }) {
  const [imageFailed, setImageFailed] = useState(false);
  const domain = partnerDomains[partner];
  const logoUrl = domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;

  return (
    <article className="partner-logo-card">
      {logoUrl && !imageFailed ? (
        <>
          <img
            src={logoUrl}
            alt={`${partner} logo mark`}
            className="partner-logo-img"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
          <span className="partner-logo-caption">{partner}</span>
        </>
      ) : (
        <span className="partner-logo-fallback">{partner}</span>
      )}
    </article>
  );
}

export default function PartnersPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("cloud");

  const currentCategory = useMemo(
    () => partnerCategories.find((category) => category.key === activeCategory) ?? partnerCategories[0],
    [activeCategory],
  );

  return (
    <div className="site">
      <SiteHeader active="partners" />

      <main>
        <section className="partners-hero-section dark reveal">
          <Image
            src="/assets/partners-hero.png"
            alt="Server infrastructure visual"
            fill
            className="partners-hero-image"
            priority
          />
          <div className="partners-hero-overlay" />
          <div className="container partners-hero-content reveal reveal-delay-1">
            <div className="partners-hero-card">
              <p className="eyebrow">OUR PARTNERS</p>
              <h3>Our Partners</h3>
              <p>Explore our best in class technology partners.</p>
            </div>
          </div>
        </section>

        <section className="partners-directory light reveal">
          <div className="container">
            <div className="partners-tabs" role="tablist" aria-label="Partner categories">
              {partnerCategories.map((category) => (
                <button
                  key={category.key}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === category.key}
                  className={`partners-tab ${activeCategory === category.key ? "is-active" : ""}`}
                  onClick={() => setActiveCategory(category.key)}
                >
                  <span className="partners-tab-icon" aria-hidden>
                    {category.icon}
                  </span>
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            <div className="partners-grid-wrap reveal reveal-delay-1">
              <p className="partners-count">{currentCategory.partners.length} Partners</p>
              <div className="partners-grid">
                {currentCategory.partners.map((partner) => (
                  <PartnerLogoCard key={partner} partner={partner} />
                ))}
              </div>
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
