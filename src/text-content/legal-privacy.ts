const privacyContent = {
  heading: "PRIVACY POLICY",
  version: "1.0",
  lastUpdated: "2026-02-10",

  intro:
    "This Privacy Policy explains what personal data we collect, how we use it, and your rights under EU/EEA privacy rules (GDPR).",

  sections: [
    {
      title: "1. Data controller",
      paragraphs: [
        "Dadjokes is operated by Andresen Solutions (andresensolutions.no).",
        "Contact: dadjokes@andresensolutions.no",
      ],
    },
    {
      title: "2. What we collect",
      bullets: [
        "Account data: username, email, password hash (never your plain password).",
        "Profile data you choose to add: avatar image.",
        "Content you create: jokes, comments, likes.",
        "Security data: IP address and user-agent for fraud prevention, rate limiting, and token security.",
      ],
    },
    {
      title: "3. Why we process your data (legal bases)",
      bullets: [
        "To provide the Service (contract): creating accounts, logging in, posting jokes/comments, displaying likes.",
        "To keep the Service secure (legitimate interests): preventing abuse, detecting suspicious activity, rate limiting.",
        "To comply with law (legal obligation) if required.",
      ],
    },
    {
      title: "4. Cookies and similar technologies",
      paragraphs: [
        "We use a cookie to keep you logged in (refresh token). This is strictly necessary for authentication.",
        "We do not use advertising cookies.",
      ],
    },
    {
      title: "5. Data sharing",
      paragraphs: [
        "We do not sell your personal data.",
        "We may share data with infrastructure providers (hosting, databases, email delivery) only as needed to operate the Service.",
      ],
    },
    {
      title: "6. Data retention",
      bullets: [
        "Account data is kept while your account is active.",
        "Posts/comments/likes are kept unless removed or your account is deleted (depending on deletion rules).",
        "Security logs are kept for a limited time to protect the Service.",
      ],
    },
    {
      title: "7. Your rights (EEA/EU)",
      bullets: [
        "Access: request a copy of your data.",
        "Rectification: correct inaccurate data.",
        "Erasure: request deletion (subject to legal/security constraints).",
        "Objection/restriction: limit certain processing in some cases.",
        "Portability: receive your data in a structured format where applicable.",
      ],
    },
    {
      title: "8. Security",
      paragraphs: [
        "We use password hashing, HTTPS (when deployed properly), and token-based authentication to protect accounts.",
        "No system is perfectly secure, but we take reasonable technical and organizational measures to reduce risk.",
      ],
    },
    {
      title: "9. Contact",
      paragraphs: [
        "If you have questions or requests about privacy, contact: dadjokes@andresensolutions.no",
      ],
    },
  ],
};

export default privacyContent;
