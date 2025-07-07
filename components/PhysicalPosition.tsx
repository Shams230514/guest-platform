"use client";

import { useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface PhysicalPositionProps {
  language?: "en" | "fr";
}

const PhysicalPosition = ({ language = "en" }: PhysicalPositionProps) => {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: string;
    x: number;
    y: number;
  }>({ visible: false, content: "", x: 0, y: 0 });

  const sectionRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersectionObserver(sectionRef, { threshold: 0.3 });

  const translations = {
    en: {
      title: "African Data Sovereignty",
      subtitle:
        "Your data stays in Africa, under African governance, with world-class security standards. Experience the power of local infrastructure with global capabilities.",
      datacenters: "Datacenters",
      populationCovered: "Population Covered",
      averageLatency: "Average Latency",
      uptimeSLA: "Uptime SLA",
      dataSovereignty: "Data Sovereignty",
      dataSovereigntyDesc:
        "Your data never leaves African soil, ensuring full compliance with local regulations",
      ultraLowLatency: "Ultra-Low Latency",
      ultraLowLatencyDesc: "Sub-20ms response times across our African network",
      localGovernance: "Local Governance",
      localGovernanceDesc: "African-owned infrastructure with local support teams",
      costEfficient: "Cost Efficient",
      costEfficientDesc: "No international data transfer fees or currency fluctuations",
      africanOwned: "African Owned",
      africanOwnedDesc: "100% African infrastructure",
      dataSovereigntyBadge: "Data Sovereignty",
      dataSovereigntyBadgeDesc: "Your data, your continent"
    },
    fr: {
      title: "Souveraineté des Données Africaines",
      subtitle:
        "Vos données restent en Afrique, sous gouvernance africaine, avec des standards de sécurité de classe mondiale. Découvrez la puissance d'une infrastructure locale avec des capacités mondiales.",
      datacenters: "Centres de Données",
      populationCovered: "Population Couverte",
      averageLatency: "Latence Moyenne",
      uptimeSLA: "SLA Disponibilité",
      dataSovereignty: "Souveraineté des Données",
      dataSovereigntyDesc:
        "Vos données ne quittent jamais le sol africain, garantissant une conformité totale avec les réglementations locales",
      ultraLowLatency: "Latence Ultra-Faible",
      ultraLowLatencyDesc: "Temps de réponse inférieurs à 20ms sur notre réseau africain",
      localGovernance: "Gouvernance Locale",
      localGovernanceDesc:
        "Infrastructure appartenant à l'Afrique avec équipes de support locales",
      costEfficient: "Économique",
      costEfficientDesc:
        "Aucuns frais de transfert de données internationaux ou fluctuations de devises",
      africanOwned: "Propriété Africaine",
      africanOwnedDesc: "Infrastructure 100% africaine",
      dataSovereigntyBadge: "Souveraineté des Données",
      dataSovereigntyBadgeDesc: "Vos données, votre continent"
    }
  };

  const t = translations[language];

  const countries = [
    {
      id: "senegal",
      name: "Sénégal",
      city: "Dakar",
      latency: "< 15ms",
      population: "16M",
      x: 225,
      y: 287
    },
    {
      id: "cote-divoire",
      name: "Côte d'Ivoire",
      city: "Abidjan",
      latency: "< 20ms",
      population: "26M",
      x: 305,
      y: 357
    },
    {
      id: "cameroon",
      name: "Cameroun",
      city: "Douala",
      latency: "< 18ms",
      population: "27M",
      x: 445,
      y: 387
    },
    {
      id: "congo",
      name: "Congo",
      city: "Brazzaville",
      latency: "< 25ms",
      population: "5.5M",
      x: 465,
      y: 427
    }
  ];

  type Country = (typeof countries)[0];

  const handleCountryHover = (country: Country, event: React.MouseEvent) => {
    setHoveredCountry(country.id);
    setTooltip({
      visible: true,
      content: `${country.city}, ${country.name}<br/>Latence: ${country.latency}<br/>Population: ${country.population}`,
      x: event.clientX + 10,
      y: event.clientY - 10
    });
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-20 bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-blue-400 to-green-400 bg-clip-text text-transparent">
            {t.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Interactive Map */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-3xl p-8 border border-white/10 backdrop-blur-sm">
              <svg viewBox="0 0 800 800" className="w-full h-auto max-w-md mx-auto">
                {/* Africa continent outline */}
                <path
                  d="M400 100 L450 120 L500 140 L550 160 L580 200 L600 250 L620 300 L640 350 L650 400 L640 450 L620 500 L580 550 L540 580 L480 600 L420 610 L360 600 L300 580 L260 550 L220 500 L200 450 L190 400 L200 350 L220 300 L240 250 L260 200 L290 160 L340 120 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="2"
                />

                {/* Country regions */}
                {countries.map((country) => (
                  <g key={country.id}>
                    <circle
                      cx={country.x}
                      cy={country.y}
                      r="20"
                      fill={hoveredCountry === country.id ? "#10b981" : "#0ea5e9"}
                      stroke="#fff"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300 hover:r-6"
                      onMouseEnter={(e) => handleCountryHover(country, e)}
                      onMouseLeave={handleMouseLeave}
                    />
                    <text
                      x={country.x}
                      y={country.y + 35}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      className="font-medium">
                      {country.city}
                    </text>
                  </g>
                ))}

                {/* Connection lines */}
                <g stroke="rgba(16,185,129,0.3)" strokeWidth="2">
                  <line x1="225" y1="287" x2="305" y2="357" />
                  <line x1="305" y1="357" x2="445" y2="387" />
                  <line x1="445" y1="387" x2="465" y2="427" />
                  <line x1="225" y1="287" x2="445" y2="387" />
                </g>
              </svg>
            </div>
          </div>

          {/* Info Panel */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "4", label: t.datacenters },
                { number: "74M+", label: t.populationCovered },
                { number: "< 20ms", label: t.averageLatency },
                { number: "99.9%", label: t.uptimeSLA }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {isIntersecting ? stat.number : "0"}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Advantages List */}
            <div className="space-y-6">
              {[
                { icon: "🛡️", title: t.dataSovereignty, desc: t.dataSovereigntyDesc },
                { icon: "⚡", title: t.ultraLowLatency, desc: t.ultraLowLatencyDesc },
                { icon: "🔒", title: t.localGovernance, desc: t.localGovernanceDesc },
                { icon: "💰", title: t.costEfficient, desc: t.costEfficientDesc }
              ].map((advantage, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    {advantage.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">{advantage.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {advantage.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certification Badges - Simplifié */}
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { icon: "🌍", title: t.africanOwned, desc: t.africanOwnedDesc },
            {
              icon: "🛡️",
              title: t.dataSovereigntyBadge,
              desc: t.dataSovereigntyBadgeDesc
            }
          ].map((badge, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center min-w-[160px] hover:bg-white/10 hover:-translate-y-2 transition-all duration-300">
              <div className="text-3xl mb-3">{badge.icon}</div>
              <div className="font-semibold mb-2">{badge.title}</div>
              <div className="text-sm text-gray-400">{badge.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed bg-black/90 text-white px-4 py-2 rounded-lg border border-white/20 text-sm z-50 pointer-events-none"
          style={{ left: tooltip.x, top: tooltip.y }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </section>
  );
};

export default PhysicalPosition;
