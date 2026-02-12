const termsContent = {
  heading: "TERMS OF SERVICE",
  version: "1.0",
  lastUpdated: "2026-02-10",

  intro:
    "These Terms of Service (“Terms”) govern your use of DadJokes (“the Service”). By creating an account or using the Service, you agree to these Terms.",

  // NEW: central place to define the “related policies” you reference from Terms
  incorporatedPolicies: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Cookie Policy", path: "/cookies" },
    { label: "Community Rules", path: "/rules" },
  ],

  sections: [
    {
      title: "1. Who we are",
      paragraphs: [
        "DadJokes is operated by Andresen Solutions (andresensolutions.no).",
        "Contact: dadjokes@andresensolutions.no",
      ],
    },

    // NEW: the “incorporation” section that links your policies into the Terms
    {
      title: "2. Related policies (incorporated by reference)",
      paragraphs: [
        "These Terms incorporate by reference our Privacy Policy, Cookie Policy, and Community Rules.",
        "By using the Service, you agree to comply with the Community Rules and acknowledge our Privacy and Cookie Policies.",
      ],
    },

    // Renumber the rest (optional but recommended for clarity)
    {
      title: "3. Eligibility and accounts",
      paragraphs: [
        "You must provide accurate information when creating an account.",
        "You are responsible for keeping your login credentials secure. If you suspect unauthorized access, contact us.",
        "We may suspend or remove accounts that break these Terms or the Community Rules.",
      ],
    },
    {
      title: "4. Your content",
      paragraphs: [
        "You may post jokes and other text content (“User Content”). You retain ownership of your User Content.",
        "By posting User Content, you grant DadJokes a non-exclusive license to host, store, reproduce, and display it for the purpose of operating the Service.",
        "Do not post content you do not have the right to share.",
      ],
    },
    {
      title: "5. Prohibited behavior",
      paragraphs: [
        "You must not: harass others, post hateful or illegal content, spam, attempt to hack or disrupt the Service, or abuse the like system.",
        "We may remove content or restrict accounts at our discretion to protect the Service and users.",
      ],
    },
    {
      title: "6. Likes, rankings, and leaderboards",
      paragraphs: [
        "Likes and rankings are provided for fun. We may change how rankings work at any time.",
        "We may apply anti-abuse measures (for example: rate limiting, fraud detection, or account restrictions).",
      ],
    },
    {
      title: "7. Beta / availability",
      paragraphs: [
        "The Service may be in beta. Features may change or break, and we may temporarily disable parts of the Service.",
      ],
    },
    {
      title: "8. Termination",
      paragraphs: [
        "You can stop using the Service at any time.",
        "We can suspend or terminate your access if you violate these Terms or if required for security or legal reasons.",
      ],
    },
    {
      title: "9. Disclaimers",
      paragraphs: [
        "The Service is provided “as is” without warranties of any kind.",
        "We do our best to keep the Service available and secure, but we cannot guarantee uninterrupted access.",
      ],
    },
    {
      title: "10. Liability",
      paragraphs: [
        "To the extent permitted by law, we are not liable for indirect damages or loss of data, profits, or goodwill.",
      ],
    },
    {
      title: "11. Changes to these Terms",
      paragraphs: [
        "We may update these Terms from time to time. We’ll update the “Last updated” date and version when we do.",
        "If changes are material, we may ask you to accept the updated Terms again.",
      ],
    },
  ],
};

export default termsContent;
