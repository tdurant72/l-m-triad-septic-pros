import { LocalBusiness, FAQPage, WithContext } from 'schema-dts';

export const SITE_CONFIG = {
    name: "L&M Septic",
    logoAlt: "L&M",
    url: "https://landmseptictriad.com", // Placeholder - adjust if your domain is different
    description: "The Triad's trusted choice for worry-free septic systems. From precision installations to proactive maintenance, we ensure your home's most critical infrastructure is invisible, functional, and fully compliant.",
    phone: "(336) 578-6972",
    location: {
        city: "Greensboro",
        region: "NC",
        country: "US",
    },
    owner: {
        "@type": "Person",
        "name": "L&M Septic Team",
        "email": "info@landmseptictriad.com", // Placeholder
        "telephone": "(336) 578-6972",
    },
};

export const localBusinessSchema: WithContext<LocalBusiness> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.description,
    "url": SITE_CONFIG.url,
    "telephone": SITE_CONFIG.phone,
    "address": {
        "@type": "PostalAddress",
        "addressLocality": SITE_CONFIG.location.city,
        "addressRegion": SITE_CONFIG.location.region,
        "addressCountry": SITE_CONFIG.location.country,
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 36.0726,
        "longitude": -79.7920
    },
    "knowsAbout": [
        "Septic Tank Pumping",
        "Septic System Installation",
        "Septic Inspections",
        "Septic Repair",
        "Drain Line Repair",
        "Septic Maintenance",
        "Grease Trap Cleaning"
    ],
    "areaServed": [
        {
            "@type": "City",
            "name": "Greensboro",
            "sameAs": "https://en.wikipedia.org/wiki/Greensboro,_North_Carolina"
        },
        {
            "@type": "City",
            "name": "Winston-Salem",
            "sameAs": "https://en.wikipedia.org/wiki/Winston-Salem,_North_Carolina"
        },
        {
            "@type": "City",
            "name": "High Point",
            "sameAs": "https://en.wikipedia.org/wiki/High_Point,_North_Carolina"
        },
        {
            "@type": "City",
            "name": "Burlington",
            "sameAs": "https://en.wikipedia.org/wiki/Burlington,_North_Carolina"
        },
        {
            "@type": "AdministrativeArea",
            "name": "North Carolina Triad"
        }
    ],
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            "opens": "08:00",
            "closes": "18:00"
        }
    ]
};

export const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How often should I have my septic tank pumped?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For most households, we recommend pumping every 3 to 5 years. Regular pumping prevents solids from escaping into the drain field, which is the most common cause of system failure."
            }
        },
        {
            "@type": "Question",
            "name": "What are the signs that my septic system is failing?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Common warning signs include slow-draining toilets or sinks, pooling water or exceptionally lush grass in your yard (specifically over the drain field), sewage odors, or gurgling sounds in your plumbing."
            }
        }
    ]
};

export const homepageFaqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How soon can you respond to a septic emergency?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We prioritize urgent issues. Once you call, we strive to have a technician on-site within 24 hours to diagnose and resolve your septic emergency, ensuring your home remains safe and functional."
            }
        },
        {
            "@type": "Question",
            "name": "What areas in North Carolina do you serve?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We proudly serve the entire Triad area, including Greensboro, Winston-Salem, High Point, Burlington, and the surrounding communities. We're a local staple with deep roots in these neighborhoods."
            }
        },
        {
            "@type": "Question",
            "name": "Do you handle both new installations and repairs?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we are full-service. Whether you need a brand-new, custom-engineered system for a new build or a fast, reliable fix for an existing pump or line, our specialized crews have you covered."
            }
        },
        {
            "@type": "Question",
            "name": "Is L&M Septic licensed and insured?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. We operate with full licensing and comprehensive insurance for your protection. This ensures all work is performed to the highest professional and safety standards."
            }
        },
        {
            "@type": "Question",
            "name": "What can I do to extend the life of my septic system?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The best maintenance is simple: pump regularly, conserve water to avoid overloading the system, and never flush non-biodegradable items like wipes, grease, or harsh chemicals down your drains."
            }
        },
        {
            "@type": "Question",
            "name": "How do I know if I need an inspection?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We recommend annual 'health checks' to catch minor issues before they become expensive failures. An inspection is also essential if you're buying or selling a home with a septic system."
            }
        },
        {
            "@type": "Question",
            "name": "Do you provide grease trap cleaning for businesses?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, we offer professional grease trap cleaning and maintenance for commercial kitchens and restaurants throughout the Triad, helping you stay compliant with local regulations."
            }
        }
    ]
};
