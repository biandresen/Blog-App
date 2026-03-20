export type AppLanguage = "NO" | "EN";

export const translations = {
  NO: {
    common: {
      loading: "laster..."
    },

    extra: {
      aria: {
        scrollButton: "Scroll til toppen"
      },
    },

    layout: {
      report: {
        button: "Melding",
        aria: "Rapporter et problem",
        title: "Rapporter et problem",
      },
    },

    validation: {
      username: {
        length: "Brukernavn må være mellom 3 og 16 tegn",
      },
      email: {
        length: "E-post må være mellom 5 og 50 tegn",
        invalid: "Ugyldig e-postadresse",
      },
      password: {
        length: "Passord må være minst 8 tegn langt",
        uppercase: "Passord må inneholde en stor bokstav",
        number: "Passord må inneholde et tall",
        symbol: "Passord må inneholde et symbol",
      },
       userInput: {
        required: "Skriv inn brukernavn eller e-post",
      },

      loginPassword: {
        required: "Skriv inn passord",
      },
      blockedComment: "Det som ble skrevet inneholder ord som ikke er lov å bruke.",
      blockedContent: "Det som ble skrevet inneholder ord som ikke er lov å bruke.",
      blockedUsername: "Dette brukernavnet inneholder språk som ikke er tillatt.",
    },

    contactTemplate: {
      heading: "Velg et tema (fyller inn emne + melding):",
      copy: "Kopier",
      copySuccess: "Kopierte mal for {{label}}",
      copyError: "Kopiering feilet (utklippstavletillatelse blokkert)",
      fallbackInfo:
        "Hvis e-postknappen ikke åpner noe, bruk «Kopier» og lim inn i et e-postprogram.",

      topics: {
        BUG: "Feil",
        FEATURE: "Funksjonsønske",
        SUGGESTION: "Forslag",
        FEEDBACK: "Generell tilbakemelding",
      },

      subjects: {
        BUG: "[DADJOKES][FEIL]",
        FEATURE: "[DADJOKES][FUNKSJONSØNSKE]",
        SUGGESTION: "[DADJOKES][FORSLAG]",
        FEEDBACK: "[DADJOKES][TILBAKEMELDING]",
      },

      bodies: {
        BUG: `Beskriv problemet:

    Steg for å gjenskape problemet:
    1.
    2.
    3.

    Forventet resultat:
    Faktisk resultat:
    Skjermbilder (hvis aktuelt):

    Enhet / nettleser: {{device}}
    Side-URL:
    `,

        FEATURE: `Hvilken funksjon ønsker du å se?

    Hvorfor er den nyttig?

    Har du eksempler/lenker?

    Enhet / nettleser: {{device}}
    Side-URL:
    `,

        SUGGESTION: `Forslaget ditt:

    Hvilket problem løser det?

    Ekstra kontekst?

    Enhet / nettleser: {{device}}
    Side-URL:
    `,

        FEEDBACK: `Tilbakemeldingen din:

    Hva likte du?

    Hva kan forbedres?

    Enhet / nettleser: {{device}}
    Side-URL:
    `,
      },
    },

    home: {
      heading: "Et fellesskap for klassiske pappavitser",
      paragraph: "Send inn vitser, lik de beste, og bygg et rangert arkiv av tidløse ordspill.",
      button0: "DASHBOARD",
      button1: "REGISTRER",
      button2: "FINN VITSER",
    },

    error404: {
      heading: "BEKLAGER! SIDEN FINNES IKKE",
      paragraph: "Gå tilbake ved å klikke knappen under for å returnere til startsiden.",
      button: "GÅ TIL STARTSIDEN",
    },

    about: {
  heading: "OM DADJOKES",

  paragraph1:
    "Dadjokes er en enkel plattform dedikert til én ting: herlig dårlige dad jokes.",

  paragraph2:
    "Registrerte brukere kan lage vitser, like vitser og kommentere — og dermed hjelpe fellesskapet med å løfte frem den beste (eller verste) pappahumoren.",

  paragraph3:
    "Hver dag velges en eksisterende vits automatisk ut som Dagens Vits. Hvis du ser dagens vits jevnlig, bygger du opp streaken din.",

  paragraph4:
    "Dadjokes støtter både engelsk og norsk. Appen fungerer som to språkspesifikke versjoner i én, slik at vitser, fremhevet innhold, rangeringer og søkeresultater følger det valgte språket.",

  paragraph5:
    "Hvis du noen gang har sagt «Hei sulten, jeg er pappa», er du på riktig sted.",

  featuresHeading: "FUNKSJONER",

  features: [
    {
      title: "✍️ Lag, lik og kommenter",
      description:
        "Lag dine egne vitser, lik vitser du synes er morsomme, og kommenter for å bli med i samtalen.",
    },
    {
      title: "🌍 Engelsk og norsk",
      description:
        "Bytt mellom engelsk og norsk. Innhold som vitser, fremhevede sider, rangeringer og søkeresultater følger det valgte språket.",
    },
    {
      title: "📅 Dagens vits",
      description:
        "En eksisterende vits blir fremhevet hver dag på siden for Dagens Vits.",
    },
    {
      title: "🔥 Daglig streak",
      description:
        "Se dagens vits flere dager på rad for å bygge streaken din.",
    },
    {
      title: "🏅 Merker",
      description:
        "Tjen merker for prestasjoner som Dagens Vits og Trending.",
    },
    {
      title: "📊 Topplister",
      description:
        "Se brukere og vitser med spesielle merker og oppdag topprangerte bidrag.",
    },
    {
      title: "🎲 Tilfeldig vits",
      description:
        "Bla gjennom tilfeldige vitser med en knapp for å få en ny tilfeldig vits.",
    },
  ],
    },

    contact: {
      heading: "KONTAKT OSS",
      paragraph1:
        "Har du en vits som fortjener rampelyset? Funnet en bug? Eller vil du bare si hei?",
      paragraph2a: "Send oss en e-post til",
      paragraph2Span: "dadjokes@andresensolutions.no",
      paragraph2b:
        "så ser vi på det. Enten det er tilbakemelding, feature-forslag eller din beste (eller verste) pappavits.",
    },

    register: {
      welcome: "Velkommen! Opprett en konto for å komme i gang.",
      invalidForm: "Fyll ut skjemaet riktig før du sender inn.",
      verifyEmail: "Bekreft e-posten din for å fortsette.",
      registrationFailed: "Registrering mislyktes",
      highlightedErrors: "Rett opp feilene og prøv igjen.",
      success: "Velkommen, {{username}}!",

      infoHeading: "Opprett konto",
      infoListHeading: "Med en konto kan du:",
      infoListItems: [
        "Sende inn dine egne pappavitser",
        "Like og reagere på andre vitser",
        "Legge til tags for å organisere vitsene dine",
        "Administrere profilen din",
      ],

      inputHeading: "REGISTRER",
      usernameLabel: "Brukernavn",
      emailLabel: "E-post",
      passwordLabel: "Passord",
      confirmPasswordLabel: "Bekreft passord",

      usernamePlaceholder: "John92",
      emailPlaceholder: "john92@gmail.com",
      passwordPlaceholder: "********",
      confirmPasswordPlaceholder: "********",

      passwordsDoNotMatch: "Passordene er ikke like",
      agreeTo: "Jeg godtar",
      terms: "bruksvilkårene",
      communityRules: "reglene for fellesskapet",

      button: "REGISTRER",
      goToLogin: "Har du allerede en konto?",
      link: "Logg inn",
    },

    login: {
      welcome: "Velkommen! Logg inn på kontoen din.",
      loginFailed: "Innlogging mislyktes",
      fixErrors: "Rett opp feilene og prøv igjen.",
      missingAccessToken: "Innloggingssvaret mangler access token",
      success: "Velkommen tilbake, {{username}}!",

      infoHeading: "Logg inn og slipp løs din indre pappa",
      infoListHeading: "Hva er nytt:",
      infoListItems: [
        "Fellesskapsrangert pappahumor",
        "Send inn dine egne legendariske ordspill",
      ],

      inputHeading: "VELKOMMEN TILBAKE",
      userInputLabel: "Brukernavn/E-post",
      userInputPlaceholder: "John92/john@gmail.com",
      passwordLabel: "Passord",
      passwordPlaceholder: "********",

      button: "LOGG INN",
      forgotPassword: "Glemt passord?",
      link2: "Tilbakestill passord",
      goToRegister: "Ny her?",
      link: "Opprett konto",
    },

    resetPassword: {
      infoHeading: "Nytt passord",
      infoListHeading: "Slik gjør du det:",
      infoListItems: [
        "1. Skriv et nytt passord",
        "2. Bekreft passordet",
        "3. Klikk på knappen for å opprette passord",
      ],
      inputHeading: "Nytt passord",

      passwordLabel: "Passord",
      confirmPasswordLabel: "Bekreft passord",
      passwordPlaceholder: "********",
      confirmPasswordPlaceholder: "********",

      button: "Opprett passord",

      welcome: "Vennligst tilbakestill passordet ditt.",
      missingToken: "Ugyldig eller manglende token.",
      failed: "Tilbakestilling av passord mislyktes",
      success: "Passordet ble tilbakestilt. Du kan nå logge inn med det nye passordet.",
      genericError: "Noe gikk galt. Prøv igjen senere.",
      passwordsDoNotMatch: "Passordene er ikke like",
    },

    forgotPassword: {
      infoHeading: "Tilbakestill passord",
      infoListHeading: "Slik gjør du det:",
      infoListItems: [
        "1. Skriv inn e-posten som er knyttet til brukeren din",
        "2. Følg lenken du får på e-post",
        "3. Sett et nytt passord og logg inn",
      ],

      inputHeading: "Tilbakestill passord",
      emailLabel: "E-post",
      emailPlaceholder: "john@gmail.com",

      button: "Send e-post",

      welcome: "Skriv inn e-posten din.",
      failed: "Kunne ikke sende e-post for tilbakestilling av passord",
      fixError: "Rett opp feilen og prøv igjen.",
      success: "Informasjon sendt til {{email}}. Sjekk søppelpost hvis du ikke ser e-posten.",
      newLink: "Fikk du ikke e-post?",
      retryNow: "Prøv igjen",
      retryIn: "Send på nytt om {{seconds}} sekunder",
    },

    terms: {
      heading: "BRUKSVILKÅR",
      versionText: "Versjon",
      version: "1.0",
      lastUpdated: "2026-02-10",
      lastUpdatedText: "Sist oppdatert",
      relatedPolicies: "Relaterte retningslinjer",
      intro:
        "Disse bruksvilkårene («Vilkårene») regulerer din bruk av DadJokes («Tjenesten»). Ved å opprette en konto eller bruke Tjenesten godtar du disse Vilkårene.",

      incorporatedPolicies: [
        { label: "Personvernerklæring", path: "/privacy" },
        { label: "Cookie-informasjon", path: "/cookies" },
        { label: "Regler for fellesskapet", path: "/rules" },
      ],

      sections: [
        {
          title: "1. Hvem vi er",
          paragraphs: [
            "DadJokes drives av Andresen Solutions (andresensolutions.no).",
            "Kontakt: dadjokes@andresensolutions.no",
          ],
        },

        {
          title: "2. Relaterte retningslinjer (innlemmet ved henvisning)",
          paragraphs: [
            "Disse Vilkårene innlemmer vår personvernerklæring, cookie-informasjon og regler for fellesskapet ved henvisning.",
            "Ved å bruke Tjenesten godtar du å følge reglene for fellesskapet og erkjenner vår personvernerklæring og cookie-informasjon.",
          ],
        },

        {
          title: "3. Kvalifikasjon og kontoer",
          paragraphs: [
            "Du må oppgi korrekt informasjon når du oppretter en konto.",
            "Du er ansvarlig for å holde innloggingsinformasjonen din sikker. Hvis du mistenker uautorisert tilgang, kontakt oss.",
            "Vi kan suspendere eller fjerne kontoer som bryter disse Vilkårene eller reglene for fellesskapet.",
          ],
        },
        {
          title: "4. Ditt innhold",
          paragraphs: [
            "Du kan publisere vitser og annet tekstinnhold («Brukerinnhold»). Du beholder eierskapet til ditt Brukerinnhold.",
            "Ved å publisere Brukerinnhold gir du DadJokes en ikke-eksklusiv lisens til å hoste, lagre, reprodusere og vise innholdet for å kunne drifte Tjenesten.",
            "Ikke publiser innhold du ikke har rett til å dele.",
          ],
        },
        {
          title: "5. Forbudt atferd",
          paragraphs: [
            "Du må ikke trakassere andre, publisere hatefullt eller ulovlig innhold, spamme, forsøke å hacke eller forstyrre Tjenesten, eller misbruke likesystemet.",
            "Vi kan fjerne innhold eller begrense kontoer etter eget skjønn for å beskytte Tjenesten og brukerne.",
          ],
        },
        {
          title: "6. Likes, rangeringer og ledertavler",
          paragraphs: [
            "Likes og rangeringer er ment for underholdning. Vi kan endre hvordan rangeringer fungerer når som helst.",
            "Vi kan bruke tiltak mot misbruk (for eksempel rate limiting, svindeldeteksjon eller kontobegrensninger).",
          ],
        },
        {
          title: "7. Beta / tilgjengelighet",
          paragraphs: [
            "Tjenesten kan være i beta. Funksjoner kan endres eller slutte å virke, og vi kan midlertidig deaktivere deler av Tjenesten.",
          ],
        },
        {
          title: "8. Opphør",
          paragraphs: [
            "Du kan når som helst slutte å bruke Tjenesten.",
            "Vi kan suspendere eller avslutte tilgangen din hvis du bryter disse Vilkårene, eller dersom det er nødvendig av sikkerhetsmessige eller juridiske grunner.",
          ],
        },
        {
          title: "9. Ansvarsfraskrivelser",
          paragraphs: [
            "Tjenesten leveres «som den er» uten garantier av noe slag.",
            "Vi gjør vårt beste for å holde Tjenesten tilgjengelig og sikker, men vi kan ikke garantere uavbrutt tilgang.",
          ],
        },
        {
          title: "10. Ansvar",
          paragraphs: [
            "I den grad loven tillater det, er vi ikke ansvarlige for indirekte skader eller tap av data, fortjeneste eller goodwill.",
          ],
        },
        {
          title: "11. Endringer i disse Vilkårene",
          paragraphs: [
            "Vi kan oppdatere disse Vilkårene fra tid til annen. Vi oppdaterer datoen for «Sist oppdatert» og versjonsnummeret når vi gjør det.",
            "Hvis endringene er vesentlige, kan vi be deg om å godta de oppdaterte Vilkårene på nytt.",
          ],
        },
      ],
    },

    privacy: {
      heading: "PERSONVERNERKLÆRING",
      versionText: "Versjon",
      version: "1.0",
      lastUpdatedText: "Sist oppdatert",
      lastUpdated: "2026-02-10",
      intro:
        "Denne personvernerklæringen forklarer hvilke personopplysninger vi samler inn, hvordan vi bruker dem, og hvilke rettigheter du har etter personvernreglene i EU/EØS (GDPR).",

      sections: [
        {
          title: "1. Behandlingsansvarlig",
          paragraphs: [
            "Dadjokes drives av Andresen Solutions (andresensolutions.no).",
            "Kontakt: dadjokes@andresensolutions.no",
          ],
        },
        {
          title: "2. Hva vi samler inn",
          bullets: [
            "Kontodata: brukernavn, e-post, passordhash (aldri passordet ditt i klartekst).",
            "Profildata du velger å legge til: avatarbilde.",
            "Innhold du oppretter: vitser, kommentarer og likes.",
            "Sikkerhetsdata: IP-adresse og user-agent for å forhindre misbruk, rate limiting og tokensikkerhet.",
          ],
        },
        {
          title: "3. Hvorfor vi behandler opplysningene dine (rettslig grunnlag)",
          bullets: [
            "For å levere tjenesten (avtale): opprette kontoer, logge inn, poste vitser/kommentarer og vise likes.",
            "For å holde tjenesten sikker (berettiget interesse): forhindre misbruk, oppdage mistenkelig aktivitet og bruke rate limiting.",
            "For å overholde loven (rettslig forpliktelse) dersom det kreves.",
          ],
        },
        {
          title: "4. Cookies og lignende teknologier",
          paragraphs: [
            "Vi bruker en cookie for å holde deg innlogget (refresh token). Denne er strengt nødvendig for autentisering.",
            "Vi bruker ikke reklamecookies.",
          ],
        },
        {
          title: "5. Deling av data",
          paragraphs: [
            "Vi selger ikke personopplysningene dine.",
            "Vi kan dele data med leverandører av infrastruktur (hosting, databaser, e-postlevering) kun i den grad det er nødvendig for å drifte tjenesten.",
          ],
        },
        {
          title: "6. Lagringstid",
          bullets: [
            "Kontodata lagres så lenge kontoen din er aktiv.",
            "Vitser, kommentarer og likes lagres med mindre de fjernes eller kontoen din slettes (avhengig av sletteregler).",
            "Sikkerhetslogger lagres i en begrenset periode for å beskytte tjenesten.",
          ],
        },
        {
          title: "7. Dine rettigheter (EØS/EU)",
          bullets: [
            "Innsyn: be om en kopi av opplysningene dine.",
            "Retting: korrigere unøyaktige opplysninger.",
            "Sletting: be om sletting (med forbehold om juridiske og sikkerhetsmessige begrensninger).",
            "Innsigelse/begrensning: begrense visse former for behandling i noen tilfeller.",
            "Dataportabilitet: motta opplysningene dine i et strukturert format der det er relevant.",
          ],
        },
        {
          title: "8. Sikkerhet",
          paragraphs: [
            "Vi bruker passordhashing, HTTPS (når løsningen er riktig satt opp) og tokenbasert autentisering for å beskytte kontoer.",
            "Ingen systemer er helt sikre, men vi tar rimelige tekniske og organisatoriske tiltak for å redusere risiko.",
          ],
        },
        {
          title: "9. Kontakt",
          paragraphs: [
            "Hvis du har spørsmål eller forespørsler om personvern, kontakt: dadjokes@andresensolutions.no",
          ],
        },
      ],
    },

    cookies: {
      heading: "INFORMASJON OM COOKIES",
      versionText: "Versjon",
      version: "1.0",
      lastUpdatedText: "Sist oppdatert",
      lastUpdated: "2026-02-10",

      intro:
        "Denne siden forklarer hvilke cookies Dadjokes bruker og hvorfor.",

      sections: [
        {
          title: "1. Hva cookies er",
          paragraphs: [
            "Cookies er små tekstfiler som lagres på enheten din. De hjelper nettsteder med å huske informasjon, som for eksempel innloggingsøkter.",
          ],
        },
        {
          title: "2. Cookies vi bruker",
          bullets: [
            "Autentiseringscookie (refresh token): strengt nødvendig for å holde deg innlogget og for å utstede nye tilgangstokener på en sikker måte.",
          ],
        },
        {
          title: "3. Bruker vi analyse- eller reklamecookies?",
          paragraphs: [
            "Nei. Dadjokes bruker ikke reklamecookies.",
            "Hvis vi legger til analyseverktøy senere, vil vi oppdatere denne informasjonen og, dersom det kreves, be om samtykke.",
          ],
        },
        {
          title: "4. Administrering av cookies",
          paragraphs: [
            "Du kan kontrollere cookies gjennom innstillingene i nettleseren din. Hvis du deaktiverer cookies, kan det føre til at innlogging ikke fungerer.",
          ],
        },
      ],
    },

    rules: {
      heading: "REGLER FOR FELLESSKAPET",
      versionText: "Versjon",
      version: "1.0",
      lastUpdatedText: "Sist oppdatert:",
      lastUpdated: "2026-02-10",
      intro:
        "Dadjokes skal være morsomt og inkluderende. Disse reglene finnes for å holde stemningen god.",

      sections: [
        {
          title: "1. Vis respekt",
          bullets: [
            "Ingen trakassering, trusler eller hatefulle ytringer.",
            "Ingen målrettet mobbing eller deling av private opplysninger.",
          ],
        },
        {
          title: "2. Hold det lovlig og trygt",
          bullets: [
            "Ingen ulovlig innhold eller instruksjoner til ulovlige handlinger.",
            "Ingen ondsinnede lenker eller forsøk på å kompromittere kontoer eller systemer.",
          ],
        },
        {
          title: "3. Ingen spam eller manipulering",
          bullets: [
            "Ingen spam-innlegg eller spam-kommentarer.",
            "Ingen manipulering av likes, falske kontoer eller automatiserte handlinger.",
          ],
        },
        {
          title: "4. Modereringstiltak",
          paragraphs: [
            "Vi kan fjerne innhold eller begrense kontoer for å håndheve disse reglene.",
          ],
        },
      ],
    },

    admin: {
      infoHeading: "ADMINPANEL",
      infoListItems: [
        "Hent brukerprofiler via brukernavn eller e-post",
        "Slett / reaktiver brukerprofiler",
        "Oppdater brukerroller",
      ],
      inputHeading: "OPPDATER BRUKERE",

      userInputLabel: "Brukernavn/E-post",
      removeFetchedUser: "fjern hentet bruker",
      statusLabel: "Status",
      active: "Aktiv",
      inactive: "Inaktiv",

      mustBeLoggedInFetch: "Du må være logget inn for å hente en bruker.",
      mustBeLoggedInReactivate: "Du må være logget inn for å reaktivere en bruker.",
      mustBeLoggedInDeactivate: "Du må være logget inn for å deaktivere en bruker.",

      requestFailed: "Forespørselen mislyktes",
      userFound: "Bruker funnet!",
      fetchFailed: "Kunne ikke hente bruker",
      userNotFound: "Bruker ikke funnet",

      userActivated: "Bruker {{username}} aktivert!",
      activateFailed: "Kunne ikke aktivere bruker",

      userDeactivated: "Bruker {{username}} deaktivert!",
      deactivateFailed: "Kunne ikke deaktivere bruker",

      button1: "HENT BRUKER",
      button2: "REAKTIVER BRUKER",
      button3: "SLETT BRUKER",
    },

    profile: {
      infoHeading: "PROFILDATA",
      inputHeading: "OPPDATER PROFIL",

      facts: {
        bestDailyStreak: "🔥 Beste daglige streak:",
        username: "Brukernavn",
        email: "E-post",
        role: "Rolle",
        created: "Opprettet",
        updated: "Oppdatert",
        termsAccepted: "Godkjente vilkår",
        termsVersion: "Vilkårsversjon",
        notAvailable: "Ikke tilgjengelig",
      },

      fields: {
        username: "Brukernavn",
        email: "E-post",
        password: "Passord",
        avatar: "Avatar",
      },

      placeholders: {
        password: "valgfritt - fyll kun inn for å endre",
      },

    drafts: {
      heading1: "UTKAST",
      heading2: "Ingen utkast enda",
      paragraph: "Start å skrive en ny vits og lagre som utkast",
    },

    newPost: {
      heading: "NY VITS",
      button1: "LAGRE SOM UTKAST",
      button2: "PUBLISER VITS",
    },



      avatar: {
        help1: "Maks størrelse: {{size}}MB. Støttede formater: JPG, JPEG, WEBP, PNG.",
        help2: "Opplasting av ny avatar vil erstatte den nåværende.",
        previewAlt: "Forhåndsvisning av avatar",
        invalidType: "Kun JPG-, PNG- eller WEBP-bilder er tillatt.",
        tooLarge: "Avatarfilen er større enn {{size}}MB. Velg en mindre fil.",
      },

      modal: {
        title: "Slett bruker",
        message: "Er du sikker på at du vil slette denne brukeren? Denne handlingen kan ikke angres.",
        confirmText: "Slett",
        cancelText: "Avbryt",
      },

      deleteBox: {
        text: "Sletting av kontoen deaktiverer den og fjerner tilgangen din.",
      },

      actions: {
        logout: "LOGG UT",
        deleteProfile: "SLETT PROFIL",
        update: "OPPDATER",
      },

      toasts: {
        deleteSuccess: "Profilen din er slettet.",
        deleteFailed: "Kunne ikke slette profil",
        updateSuccess: "Profil oppdatert!",
        updateFailed: "Kunne ikke oppdatere profil",
        avatarTooLarge: "Avatarfilen overskrider grensen. Maks størrelse er 6MB.",
      },
    },

    badges: {
      heading: "Medaljer",

      current: {
        heading: "Aktive",
        subheading: "Aktive medaljer",
        empty: "Ingen aktive medaljer ennå.",
        since: "Siden",
      },

      history: {
        heading: "Historikk",
        subheading: "Alle tildelinger (nyeste først)",
        empty: "Ingen medalje-historikk ennå.",
        valid: "Gyldig",
        from: "fra",
        to: "til",
      },

      relatedPost: "Relatert innlegg",
      loading: "Laster...",
      page: "Side",
      of: "av",
      total: "Totalt",
      prev: "Forrige",
      next: "Neste",
    },

    drafts: {
      heading: "UTKAST",

      authRequired: "Logg inn for å se utkastene dine.",

      toggleShowTitles: "Vis utkasttitler",
      toggleShowFull: "Vis hele utkast",
      reload: "Last inn på nytt",

      empty: "Du har ikke opprettet noen utkast ennå.",
      createDraft: "Opprett utkast",

      showing: "Viser {{shown}} av {{total}}",
    },

    newPost: {
      heading: "NY VITS",

      fields: {
        title: "Tittel",
        body: "Innhold",
        tags: "Tags",
      },

      placeholders: {
        title: "Skriv vitsetittel her...",
        body: "Skriv vitsen her...",
        tags: "Legg til tags (kommaseparert)",
      },

      toasts: {
        mustBeLoggedInDraft: "Du må være logget inn for å lagre et utkast.",
        mustBeLoggedInPublish: "Du må være logget inn for å publisere en vits.",
        titleAndBodyRequired: "Tittel og innhold er påkrevd.",
        draftSaved: "Utkast lagret!",
        jokePublished: "Vits publisert!",
        sessionExpired: "Økten din har utløpt. Logg inn igjen.",
        requestFailed: "Forespørselen mislyktes",
      },

      actions: {
        saveDraft: "LAGRE SOM UTKAST",
        publishJoke: "PUBLISER VITS",
      },

      currentLanguageLabel: "Denne vitsen vil bli laget som: "
    },

    search: {
      heading: "SØK",

      filters: {
        heading: "Filtre:",
        title: "Tittel",
        body: "Innhold",
        comments: "Kommentarer",
        tags: "Tags",
      },

      actions: {
        reload: "Last inn på nytt",
        loadMore: "Last inn flere",
      },

      states: {
        typeToSearch: "Skriv noe for å søke etter vitser.",
        noResults: "Ingen resultater",
        loading: "Laster...",
        showing: "Viser {{shown}} av {{total}}",
        foundIn: "Funnet i",
      },

      matchLabels: {
        title: "tittel",
        body: "innhold",
        comment: "kommentar",
        tag: "tag",
      },

      placeholder: "Søk vitser..."
    },

    myJokes: {
      heading: "MINE VITSER",

      authRequired: "Logg inn for å se vitsene dine.",

      toggleShowFull: "Vis hele vitser",
      toggleShowTitles: "Vis vitsetitler",
      reload: "Last inn på nytt",

      empty: "Du har ikke laget noen vitser ennå.",
      createJoke: "Lag vits",

      loadMore: "Last inn flere",
      loading: "Laster...",

      showing: "Viser {{shown}} av {{total}}",

      login: "Logg inn"
    },

    allJokes: {
      heading: "ALLE VITSER",

      actions: {
        showTitles: "Vis vitsetitler",
        showFull: "Vis hele vitser",
        reload: "Last inn på nytt",
        loadMore: "Last inn flere",
      },

      states: {
        empty: "Ingen vitser funnet",
        loading: "Laster...",
        showing: "Viser {{shown}} av {{total}}",
      },
    },

    popular: {
      heading: "👍 POPULÆRE VITSER",
      subtitle: "10 mest likte vitser",

      actions: {
        showFull: "Vis hele vitser",
        showTitles: "Vis vitsetitler",
      },

      states: {
        empty: "Ingen vitser funnet",
        failed: "Kunne ikke laste populære vitser",
      },
    },

    dailyJoke: {
      heading: "👑 DAGENS VITS",
      subtitle: "Vitsen som er valgt for i dag",

      states: {
        notFound: "Fant ikke vitsen",
        failed: "Kunne ikke hente dagens vits",
      },
    },

    randomJoke: {
      heading: "🎲 TILFELDIG VITS",

      actions: {
        getRandomJoke: "Hent tilfeldig vits",
        newJoke: "Ny vits",
        loading: "Laster...",
      },

      states: {
        notFound: "Fant ikke vitsen",
        failed: "Kunne ikke hente tilfeldig vits",
      },
    },

    hallOfFame: {
      heading: "Hall of Fame",

      periods: {
        week: "Denne uken",
        month: "Denne måneden",
        all: "Alle tider",
      },

      table: {
        rank: "#",
        user: "Bruker",
        wins: "Seire",
        streak: "Streak",
        likes: "Likes",
      },

      mobileStats: {
        wins: "Seire",
        streak: "Streak",
        likes: "Likes",
      },

      states: {
        empty: "Ingen rangeringer ennå.",
        failed: "Kunne ikke laste Hall of Fame",
      },
    },

    featured: {
      noJoke: "Ingenting ennå...",
      topCreatorMonth: {
        title: "🏆 TOPPSKAPER DENNE MÅNEDEN",
        subtitle: "Skaperen med flest vitser denne måneden.",
      },
      trendingWeek: {
        title: "⚡ TRENDER DENNE UKEN",
        subtitle: "Vitsen som får mest oppmerksomhet akkurat nå.",
      },
      mostCommentedWeek: {
        title: "🎭 MEST KOMMENTERT DENNE UKEN",
        subtitle: "Vitsen med flest kommentarer denne uken.",
      },
      fastestGrowing: {
        title: "🚀 RASKEST VOKSENDE",
        subtitle: "Vitsen med størst vekst denne uken.",
      },
    },

    commentForm: {
      placeholder: "Skriv en kommentar...",

      actions: {
        addComment: "Legg til kommentar",
        posting: "Publiserer...",
      },

      toasts: {
        mustBeLoggedIn: "Du må være logget inn for å publisere en kommentar.",
        empty: "Kommentaren kan ikke være tom",
        published: "Kommentar publisert!",
        sessionExpired: "Økten din har utløpt. Logg inn igjen.",
        failed: "Kunne ikke publisere kommentar",
        requestFailed: "Forespørselen mislyktes",
      },

      aria: {
        submitTitle: "Kommenter vits",
      },
    },

    comment: {
      actions: {
        edit: "Rediger kommentar",
        delete: "Slett kommentar",
        send: "Send",
      },

      aria: {
        edit: "Rediger kommentar",
        editMessage: "Rediger melding",
      },
    },

    sidebar: {
      dashboard: {
        newJoke: "Ny vits",
        drafts: "Utkast",
        profile: "Profil",
        badges: "Medaljer",
        admin: "Admin",
      },

      jokes: {
        search: "Søk",
        myJokes: "Mine vitser",

        groups: {
          explore: "Utforsk",
          games: "Spill",
          rankings: "Rangeringer",
        },

        items: {
          allJokes: "Alle vitser",
          popular: "Populære",
          dailyJoke: "Dagens vits",
          random: "Tilfeldig",
          jokeVsJoke: "Vits mot vits",
          hallOfFame: "Hall of Fame",
          topCreator: "Toppskaper",
          trending: "Trending",
          mostCommented: "Mest kommentert",
          fastestGrowing: "Raskest voksende",
        },
      },
    },

    legalMenu: {
      openAria: "Åpne juridisk meny",
      title: "Juridisk",
      heading: "Juridisk",

      links: {
        terms: "Bruksvilkår",
        privacy: "Personvernerklæring",
        cookies: "Informasjon om cookies",
        rules: "Regler for fellesskapet",
      },
    },

    mobileNavHint: {
      title: "Navigasjon",
      description: "Bruk disse knappene for å åpne menyer:",
      left: "Venstre = Utforsk",
      right: "Høyre = Hurtigliste",
      dismiss: "Skjønner",
    },

    modal: {
      closeAria: "Lukk modal",
      closeTitle: "Lukk",
      confirm: "Bekreft",
      cancel: "Avbryt",
      close: "Lukk",
    },

    postCard: {
      open: "ÅPNE",
    },

    rightSidebar: {
      heading: "Navigasjon",

      empty: {
        title: "Ingen vitser funnet",
        action: "Hent vitser",
      },

      pagination: {
        previous: "Forrige",
        next: "Neste",
        page: "Side",
      },
    },

    tagsCard: {
      show: "VIS TAGS"
    },

    userMenu: {
      signedInAs: "Logget inn som",
      profile: "Profil",
      logout: "Logg ut",
      loggedOut: "Du er nå logget ut.",
    },

    header: {
      brand: "DadJokes",
      beta: "Beta",

      actions: {
        toggleNavMenu: "Åpne/lukk navigasjonsmeny",
        toggleMenu: "Åpne/lukk meny",
      },
    },

    navbar: {
      links: {
        jokes: "Vitser",
        dashboard: "Dashbord",
        register: "Registrer",
        login: "Login",
        about: "Om",
        contact: "Kontakt",
      },

      actions: {
        toggleTheme: "Bytt lyst/mørkt tema",
      },
    },

    post: {
      status: {
        draft: "UTKAST",
      },

      actions: {
        openComments: "VIS KOMMENTARER",
        closeComments: "LUKK KOMMENTARER",
        showLess: "Vis mindre",
        readMore: "Les mer",
        publish: "Publiser",
        loadMoreComments: "Last inn flere kommentarer",
        loading: "Laster...",
        goToLogin: "Logg inn"
      },

      toasts: {
        mustBeLoggedInToLike: "Du må være logget inn for å like en vits",
        cannotLikeOwn: "Du kan ikke like din egen vits",
        toggleLikeFailed: "Kunne ikke endre like",
        postEdited: "Vits oppdatert!",
        postDeleted: "Vits slettet!",
        commentEdited: "Kommentar oppdatert!",
        commentDeleted: "Kommentar slettet!",
        editJokeFailed: "Kunne ikke redigere vits",
        deleteJokeFailed: "Kunne ikke slette vits",
        editCommentFailed: "Kunne ikke redigere kommentar",
        deleteCommentFailed: "Kunne ikke slette kommentar",
        published: "Publisert",
        unpublished: "Avpublisert",
      },

      modal: {
        deleteTitle: "Slett vits",
        deleteMessage: "Er du sikker på at du vil slette denne vitsen? Denne handlingen kan ikke angres.",
        deleteConfirm: "Slett",
        cancel: "Avbryt",
      },

      aria: {
        editJoke: "Rediger vits",
        deleteJoke: "Slett vits",
        likeJoke: "Lik vits",
        goToJoke: "Gå til vits",
        editJokeTitle: "Rediger vitsetittel",
        editJokeBody: "Rediger vitsetekst",
        editJokeTags: "Rediger tags",
        publishUnpublish: "Publiser/avpubliser",
        editMessage: "Rediger melding",
        toggleComments: "Vis/skjul kommentarer",
      },

      labels: {
        username: "Brukernavn",
        postDate: "Publiseringsdato",
        comments: "KOMMENTARER",
        noComments: "Ingen kommentarer ennå.",
        beFirstToComment: "Vær den første som kommenterer!",
        failedToLoadComments: "Kunne ikke laste kommentarer",
        logInToComment: "Logg inn for å kommentere."
      },

      buttons: {
        send: "Send",
      },
    },

    avatarWithBadges: {
      streak: "Daglig streak",
      badges: "Medaljer",
      noBadges: "Ingen medjaler ennå.",
      noValue: "—",
    },
  },

  EN: {
   common: {
      loading: "loading..."
    },

    extra: {
      aria: {
        scrollButton: "Scroll to the top"
      },
      loading: "loading..."
    },

    layout: {
      report: {
        button: "Report",
        aria: "Report an issue",
        title: "Report an issue",
      },
    },

    validation: {
      username: {
        length: "Username must be between 3 and 16 characters",
      },
      email: {
        length: "Email must be between 5 and 50 characters",
        invalid: "Invalid email address",
      },
      password: {
        length: "Password must be at least 8 characters long",
        uppercase: "Password must contain an uppercase letter",
        number: "Password must contain a number",
        symbol: "Password must contain a symbol",
      },
      userInput: {
        required: "Enter your username or email",
        },

      loginPassword: {
        required: "Enter your password",
      },
      blockedComment: "This content contains language that is not allowed.",
      blockedContent: "This content contains language that is not allowed.",
      blockedUsername: "This username contains language that is not allowed.",

    },

    contactTemplate: {
      heading: "Choose a topic (prefills subject + message):",
      copy: "Copy",
      copySuccess: "Copied {{label}} template",
      copyError: "Copy failed (clipboard permission blocked)",
      fallbackInfo:
        "If the email button doesn’t open anything, use “Copy” and paste into any email app.",

      topics: {
        BUG: "Bug",
        FEATURE: "Feature request",
        SUGGESTION: "Suggestion",
        FEEDBACK: "General feedback",
      },

      subjects: {
        BUG: "[DADJOKES][BUG]",
        FEATURE: "[DADJOKES][FEATURE]",
        SUGGESTION: "[DADJOKES][SUGGESTION]",
        FEEDBACK: "[DADJOKES][FEEDBACK]",
      },

      bodies: {
        BUG: `Describe the issue:

        Steps to reproduce:
        1.
        2.
        3.

        Expected result:
        Actual result:
        Screenshots (if applicable):

        Device / Browser: {{device}}
        Page URL:
        `,

                FEATURE: `What feature would you like to see?

        Why is it valuable?

        Any examples/links?

        Device / Browser: {{device}}
        Page URL:
        `,

                SUGGESTION: `Your suggestion:

        What problem does it solve?

        Any extra context?

        Device / Browser: {{device}}
        Page URL:
        `,

                FEEDBACK: `Your feedback:

        What did you like?

        What could be improved?

        Device / Browser: {{device}}
        Page URL:
        `,
              },
    },

    home: {
      heading: "A Community for Classic Dad Humor",
      paragraph:
        "Submit dad jokes, like the best ones, and watch the collection grow into a ranked archive of timeless puns.",
      button0: "DASHBOARD",
      button1: "REGISTER",
      button2: "FIND JOKES",
    },

    error404: {
      heading: "SORRY! PAGE NOT FOUND",
      paragraph:
        "Get back on track by clicking the button below to return to the home page.",
      button: "GO TO HOME PAGE",
    },

    about: {
  heading: "ABOUT DADJOKES",

  paragraph1:
    "Dadjokes is a simple platform dedicated to one thing: gloriously bad dad jokes.",

  paragraph2:
    "Registered users can create jokes, like jokes, and comment — helping the community surface the best (or worst) dad humor.",

  paragraph3:
    "Every day, an existing joke is automatically selected as the Joke of the Day. Viewing the daily joke consistently builds your daily streak.",

  paragraph4:
    "Dadjokes supports both English and Norwegian. The app works like two language-specific versions in one, so jokes, featured content, rankings, and search results follow the selected language.",

  paragraph5:
    "If you've ever said 'Hi hungry, I'm dad', you're in the right place.",

  featuresHeading: "FEATURES",

  features: [
    {
      title: "✍️ Create, Like & Comment",
      description:
        "Create your own jokes, like jokes you enjoy, and comment to join the conversation.",
    },
    {
      title: "🌍 English & Norwegian",
      description:
        "Switch between English and Norwegian. Content such as jokes, featured pages, rankings, and search results follows the selected language.",
    },
    {
      title: "📅 Joke of the Day",
      description:
        "An existing joke is featured every day on the Joke of the Day page.",
    },
    {
      title: "🔥 Daily Streak",
      description:
        "View the daily joke multiple days in a row to build your streak.",
    },
    {
      title: "🏅 Badges",
      description:
        "Earn badges for achievements like Joke of the Day and Trending.",
    },
    {
      title: "📊 Leaderboards",
      description:
        "Browse users and jokes with special badges and see top performers.",
    },
    {
      title: "🎲 Random Joke",
      description:
        "Browse random jokes with a button for a new random joke.",
    },
  ],
    },

    contact: {
      heading: "CONTACT US",
      paragraph1:
        "Have a joke that deserves the spotlight? Found a bug? Or just want to say hi?",
      paragraph2a: "Send us an email at",
      paragraph2Span: "dadjokes@andresensolutions.no",
      paragraph2b:
        "and we'll be happy to hear from you. Feedback and dad jokes are welcome.",
    },

    register: {
      welcome: "Welcome! Create an account to get started.",
      invalidForm: "Please fill out the form correctly before submitting.",
      verifyEmail: "Please verify your email to continue.",
      registrationFailed: "Registration failed",
      highlightedErrors: "Correct the highlighted errors and try again.",
      success: "Welcome, {{username}}!",

      infoHeading: "Create your account",
      infoListHeading: "With an account you can:",
      infoListItems: [
        "Submit your own dad jokes",
        "Like and react to other jokes",
        "Add tags to organize your jokes",
        "Manage your profile",
      ],

      inputHeading: "REGISTER",
      usernameLabel: "Username",
      emailLabel: "Email",
      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm Password",

      usernamePlaceholder: "John92",
      emailPlaceholder: "john92@gmail.com",
      passwordPlaceholder: "********",
      confirmPasswordPlaceholder: "********",

      passwordsDoNotMatch: "Passwords do not match",
      agreeTo: "I agree to",
      terms: "the terms",
      communityRules: "the community rules",

      button: "REGISTER",
      goToLogin: "Already have an account?",
      link: "Login",
    },

    login: {
      welcome: "Welcome! Please log in to your account.",
      loginFailed: "Login failed",
      fixErrors: "Correct the error(s) and try again.",
      missingAccessToken: "Login response missing accessToken",
      success: "Welcome back, {{username}}!",

      infoHeading: "Log in to unleash your inner dad",
      infoListHeading: "What's new:",
      infoListItems: [
        "Community-ranked dad jokes",
        "Submit your own legendary puns",
      ],

      inputHeading: "WELCOME BACK",
      userInputLabel: "Username/Email",
      userInputPlaceholder: "John92/john@gmail.com",
      passwordLabel: "Password",
      passwordPlaceholder: "********",

      button: "LOGIN",
      forgotPassword: "Forgot your password?",
      link2: "Reset password",
      goToRegister: "New here?",
      link: "Create account",
    },

    resetPassword: {
      infoHeading: "New password!",
      infoListHeading: "How to do it:",
      infoListItems: [
        "1. Enter a new password",
        "2. Confirm it",
        "3. Click the button to create your password",
      ],
      inputHeading: "New password",

      passwordLabel: "Password",
      confirmPasswordLabel: "Confirm Password",
      passwordPlaceholder: "********",
      confirmPasswordPlaceholder: "********",

      button: "Create password",

      welcome: "Please reset your password.",
      missingToken: "Invalid or missing token.",
      failed: "Password reset failed",
      success: "Password reset successful! You can now log in with your new password.",
      genericError: "Something went wrong. Try again later.",
      passwordsDoNotMatch: "Passwords do not match",
    },

    forgotPassword: {
      infoHeading: "Reset password!",
      infoListHeading: "How to do it:",
      infoListItems: [
        "1. Enter the email connected to your user",
        "2. Follow the link you receive by email",
        "3. Set a new password and log in",
      ],

      inputHeading: "Reset password",
      emailLabel: "Email",
      emailPlaceholder: "john@gmail.com",

      button: "Send email",

      welcome: "Enter your email.",
      failed: "Failed to send reset password email",
      fixError: "Correct the error and try again.",
      success: "Info sent to {{email}}. Check spam folder if you don't see the email.",
      newLink: "Didn't receive an email?",
      retryNow: "Try again",
      retryIn: "Send again in {{seconds}} seconds",
    },

    terms: {
      heading: "TERMS OF SERVICE",
      version: "1.0",
      versionText: "Version",
      lastUpdatedText: "Last updated",
      lastUpdated: "2026-02-10",
      relatedPolicies: "Related policies",

      intro:
        "These Terms of Service (“Terms”) govern your use of DadJokes (“the Service”). By creating an account or using the Service, you agree to these Terms.",

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

        {
          title: "2. Related policies (incorporated by reference)",
          paragraphs: [
            "These Terms incorporate by reference our Privacy Policy, Cookie Policy, and Community Rules.",
            "By using the Service, you agree to comply with the Community Rules and acknowledge our Privacy and Cookie Policies.",
          ],
        },

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
    },

    privacy: {
      heading: "PRIVACY POLICY",
      versionText: "Version",
      version: "1.0",
      lastUpdatedText: "Last updated",
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
    },

    cookies: {
      heading: "COOKIE NOTICE",
      versionText: "Version",
      version: "1.0",
      lastUpdatedText: "Last updated",
      lastUpdated: "2026-02-10",

      intro:
        "This page explains what cookies Dadjokes uses and why.",

      sections: [
        {
          title: "1. What cookies are",
          paragraphs: [
            "Cookies are small text files stored on your device. They help websites remember information such as login sessions.",
          ],
        },
        {
          title: "2. Cookies we use",
          bullets: [
            "Authentication cookie (refresh token): strictly necessary to keep you logged in and to issue new access tokens securely.",
          ],
        },
        {
          title: "3. Do we use analytics or ads cookies?",
          paragraphs: [
            "No. Dadjokes does not use advertising cookies.",
            "If we add analytics later, we will update this notice and, if required, request your consent.",
          ],
        },
        {
          title: "4. Managing cookies",
          paragraphs: [
            "You can control cookies through your browser settings. Disabling cookies may prevent login from working.",
          ],
        },
      ],
    },

    rules: {
      heading: "COMMUNITY RULES",
      version: "1.0",
      lastUpdated: "2026-02-10",
      intro:
        "Dadjokes is meant to be fun and welcoming. These rules exist to keep the vibes good.",

      sections: [
        {
          title: "1. Be respectful",
          bullets: [
            "No harassment, threats, or hate speech.",
            "No targeted bullying or doxxing.",
          ],
        },
        {
          title: "2. Keep it legal and safe",
          bullets: [
            "No illegal content or instructions to do illegal acts.",
            "No malicious links or attempts to compromise accounts or systems.",
          ],
        },
        {
          title: "3. No spam or manipulation",
          bullets: [
            "No spam posts/comments.",
            "No like manipulation, sockpuppet accounts, or automated actions.",
          ],
        },
        {
        title: "4. Moderation actions",
        paragraphs: [
          "We may remove content or restrict accounts to enforce these rules.",
        ],
      },
    ],
    },

    admin: {
      infoHeading: "ADMIN PANEL",
      infoListItems: [
        "Get user profiles by username or email",
        "Delete/Reactivate user profiles",
        "Update user roles",
      ],
      inputHeading: "UPDATE USERS",

      userInputLabel: "Username/Email",
      removeFetchedUser: "remove fetched user",
      statusLabel: "Status",
      active: "Active",
      inactive: "Inactive",

      mustBeLoggedInFetch: "You must be logged in to fetch a user.",
      mustBeLoggedInReactivate: "You must be logged in to reactivate a user.",
      mustBeLoggedInDeactivate: "You must be logged in to deactivate a user.",

      requestFailed: "Request failed",
      userFound: "User found!",
      fetchFailed: "Failed to fetch user",
      userNotFound: "User not found",

      userActivated: "User {{username}} activated!",
      activateFailed: "Failed to activate user",

      userDeactivated: "User {{username}} deactivated!",
      deactivateFailed: "Failed to deactivate user",

      button1: "GET USER",
      button2: "REACTIVATE USER",
      button3: "DELETE USER",
    },

    profile: {
      infoHeading: "PROFILE DATA",
      inputHeading: "UPDATE PROFILE",

      facts: {
        bestDailyStreak: "🔥 Best daily streak:",
        username: "Username",
        email: "Email",
        role: "Role",
        created: "Created",
        updated: "Updated",
        termsAccepted: "Terms accepted",
        termsVersion: "Terms version",
        notAvailable: "N/A",
      },

      fields: {
        username: "Username",
        email: "Email",
        password: "Password",
        avatar: "Avatar",
      },

      placeholders: {
        password: "optional - only fill to change",
      },

      avatar: {
        help1: "Max size: {{size}}MB. Supported formats: JPG, JPEG, WEBP, PNG.",
        help2: "Uploading a new avatar will replace your current one.",
        previewAlt: "Avatar preview",
        invalidType: "Only JPG, PNG or WEBP images are allowed.",
        tooLarge: "Avatar file size exceeds {{size}}MB. Choose a smaller file.",
      },

      modal: {
        title: "Delete user",
        message: "Are you sure you want to delete this user? This action cannot be undone.",
        confirmText: "Delete",
        cancelText: "Cancel",
      },

      deleteBox: {
        text: "Deleting your account disables it and removes your access.",
      },

      actions: {
        logout: "LOGOUT",
        deleteProfile: "DELETE PROFILE",
        update: "UPDATE",
      },

      toasts: {
        deleteSuccess: "Your profile has been deleted.",
        deleteFailed: "Failed to delete profile",
        updateSuccess: "Profile updated successfully!",
        updateFailed: "Failed to update profile",
        avatarTooLarge: "Avatar file size exceeds the limit. Max size is 6MB.",
      },
    },

    badges: {
      heading: "Badges",

      current: {
        heading: "Current",
        subheading: "Active badges",
        empty: "No active badges yet.",
        since: "Since",
      },

      history: {
        heading: "History",
        subheading: "All awards (newest first)",
        empty: "No badge history yet.",
        valid: "Valid",
        from: "from",
        to: "to",
      },

      relatedPost: "Related post",
      loading: "Loading...",
      page: "Page",
      of: "of",
      total: "Total",
      prev: "Prev",
      next: "Next",
    },

    drafts: {
      heading: "DRAFTS",

      authRequired: "Please log in to view your drafts.",

      toggleShowTitles: "Show draft titles",
      toggleShowFull: "Show full drafts",
      reload: "Reload",

      empty: "You haven't created any drafts yet.",
      createDraft: "Create Draft",

      showing: "Showing {{shown}} of {{total}}",
    },

    newPost: {
      heading: "NEW JOKE",

      fields: {
        title: "Title",
        body: "Body",
        tags: "Tags",
      },

      placeholders: {
        title: "Joke title here...",
        body: "Joke content here...",
        tags: "Add tags (comma separated)",
      },

      toasts: {
        mustBeLoggedInDraft: "You must be logged in to save a draft.",
        mustBeLoggedInPublish: "You must be logged in to publish a joke.",
        titleAndBodyRequired: "Title and body are required.",
        draftSaved: "Draft saved!",
        jokePublished: "Joke published!",
        sessionExpired: "Your session has expired. Please log in again.",
        requestFailed: "Request failed",
      },

      actions: {
        saveDraft: "SAVE AS DRAFT",
        publishJoke: "PUBLISH JOKE",
      },

      currentLanguageLabel: "This joke will be created as: "
    },

    search: {
      heading: "SEARCH",

      filters: {
        heading: "Filters:",
        title: "Title",
        body: "Body",
        comments: "Comments",
        tags: "Tags",
      },

      actions: {
        reload: "Reload",
        loadMore: "Load more",
      },

      states: {
        typeToSearch: "Type something to search jokes.",
        noResults: "No results",
        loading: "Loading...",
        showing: "Showing {{shown}} of {{total}}",
        foundIn: "Found in",
      },

      matchLabels: {
        title: "title",
        body: "body",
        comment: "comment",
        tag: "tag",
      },

      placeholder: "Search jokes..."
    },

    myJokes: {
      heading: "MY JOKES",

      authRequired: "Log in to view your jokes.",

      toggleShowFull: "Show full jokes",
      toggleShowTitles: "Show joke titles",
      reload: "Reload",

      empty: "You haven't created any jokes yet.",
      createJoke: "Create Joke",

      loadMore: "Load more",
      loading: "Loading...",

      showing: "Showing {{shown}} of {{total}}",

      login: "Login"
    },

    allJokes: {
      heading: "ALL JOKES",

      actions: {
        showTitles: "Show joke titles",
        showFull: "Show full jokes",
        reload: "Reload",
        loadMore: "Load more",
      },

      states: {
        empty: "No jokes found",
        loading: "Loading...",
        showing: "Showing {{shown}} of {{total}}",
      },
    },

    popular: {
      heading: "👍 POPULAR JOKES",
      subtitle: "10 most liked jokes",

      actions: {
        showFull: "Show full jokes",
        showTitles: "Show joke titles",
      },

      states: {
        empty: "No jokes found",
        failed: "Failed to load popular jokes",
      },
    },

    dailyJoke: {
      heading: "👑 JOKE OF THE DAY",
      subtitle: "The joke selected for today",

      states: {
        notFound: "Joke not found",
        failed: "Failed to fetch daily joke",
      },
    },

    randomJoke: {
      heading: "🎲 RANDOM JOKE",

      actions: {
        getRandomJoke: "Get random joke",
        newJoke: "New joke",
        loading: "Loading...",
      },

      states: {
        notFound: "Joke not found",
        failed: "Failed to fetch random joke",
      },
    },

    hallOfFame: {
      heading: "Hall of Fame",

      periods: {
        week: "This week",
        month: "This month",
        all: "All-time",
      },

      table: {
        rank: "#",
        user: "User",
        wins: "Wins",
        streak: "Streak",
        likes: "Likes",
      },

      mobileStats: {
        wins: "Wins",
        streak: "Streak",
        likes: "Likes",
      },

      states: {
        empty: "No rankings yet.",
        failed: "Failed to load Hall of Fame",
      },
    },

    featured: {
      noJoke: "Nothing yet...",
      topCreatorMonth: {
        title: "🏆 TOP CREATOR THIS MONTH",
        subtitle: "The creator with the most jokes this month.",
      },
      trendingWeek: {
        title: "⚡ TRENDING THIS WEEK",
        subtitle: "The joke gaining the most traction right now.",
      },
      mostCommentedWeek: {
        title: "🎭 MOST COMMENTED THIS WEEK",
        subtitle: "The joke with the most comments this week.",
      },
      fastestGrowing: {
        title: "🚀 FASTEST GROWING",
        subtitle: "The joke with the most growth this week.",
      },
    },

    commentForm: {
      placeholder: "Write a comment...",

      actions: {
        addComment: "Add Comment",
        posting: "Posting...",
      },

      toasts: {
        mustBeLoggedIn: "You must be logged in to publish a comment.",
        empty: "Comment cannot be empty",
        published: "Comment published!",
        sessionExpired: "Your session has expired. Please log in again.",
        failed: "Failed to publish comment",
        requestFailed: "Request failed",
      },

      aria: {
        submitTitle: "Joke comment",
      },
    },

    comment: {
      actions: {
        edit: "Edit comment",
        delete: "Delete comment",
        send: "Send",
      },

      aria: {
        edit: "Edit comment",
        editMessage: "Edit Message",
      },
    },

    sidebar: {
      dashboard: {
        newJoke: "New joke",
        drafts: "Drafts",
        profile: "Profile",
        badges: "Badges",
        admin: "Admin",
      },

      jokes: {
        search: "Search",
        myJokes: "My Jokes",

        groups: {
          explore: "Explore",
          games: "Games",
          rankings: "Rankings",
        },

        items: {
          allJokes: "All Jokes",
          popular: "Popular",
          dailyJoke: "Daily Joke",
          random: "Random",
          jokeVsJoke: "Joke vs. Joke",
          hallOfFame: "Hall of Fame",
          topCreator: "Top Creator",
          trending: "Trending",
          mostCommented: "Most Commented",
          fastestGrowing: "Fastest Growing",
        },
      },
    },

    legalMenu: {
      openAria: "Open legal menu",
      title: "Legal",
      heading: "Legal",

      links: {
        terms: "Terms of Service",
        privacy: "Privacy Policy",
        cookies: "Cookie Policy",
        rules: "Community Rules",
      },
    },

    mobileNavHint: {
      title: "Navigation",
      description: "Use these buttons to open menus:",
      left: "Left = Explore",
      right: "Right = Quick list",
      dismiss: "Got it",
    },

    modal: {
      closeAria: "Close modal",
      closeTitle: "Close",
      confirm: "Confirm",
      cancel: "Cancel",
      close: "Close",
    },

    postCard: {
      open: "OPEN",
    },

    rightSidebar: {
      heading: "Navigation",

      empty: {
        title: "No jokes found",
        action: "Get jokes",
      },

      pagination: {
        previous: "Prev",
        next: "Next",
        page: "Page",
      },
    },

    tagsCard: {
      show: "SHOW TAGS"
    },

    userMenu: {
      signedInAs: "Signed in as",
      profile: "Profile",
      logout: "Logout",
      loggedOut: "You have been logged out.",
    },

    header: {
      brand: "DadJokes",
      beta: "Beta",

      actions: {
        toggleNavMenu: "Toggle navigation menu",
        toggleMenu: "Toggle menu",
      },
    },

    navbar: {
      links: {
        jokes: "Jokes",
        dashboard: "Dashboard",
        register: "Register",
        login: "Login",
        about: "About",
        contact: "Contact",
      },

      actions: {
        toggleTheme: "Toggle light/dark theme",
      },
    },

    post: {
      status: {
        draft: "DRAFT",
      },

      actions: {
        openComments: "SHOW COMMENTS",
        closeComments: "CLOSE COMMENTS",
        showLess: "Show less",
        readMore: "Read more",
        publish: "Publish",
        loadMoreComments: "Load more comments",
        loading: "Loading...",
        goToLogin: "Log in"
      },

      toasts: {
        mustBeLoggedInToLike: "You must be logged in to like a joke",
        cannotLikeOwn: "You cannot like your own joke",
        toggleLikeFailed: "Failed to toggle like",
        postEdited: "Post edited!",
        postDeleted: "Joke deleted!",
        commentEdited: "Comment edited!",
        commentDeleted: "Comment deleted!",
        editJokeFailed: "Failed to edit joke",
        deleteJokeFailed: "Failed to delete joke",
        editCommentFailed: "Failed to edit comment",
        deleteCommentFailed: "Failed to delete comment",
        published: "Published",
        unpublished: "Unpublished",
      },

      modal: {
        deleteTitle: "Delete joke",
        deleteMessage: "Are you sure you want to delete this joke? This action cannot be undone.",
        deleteConfirm: "Delete",
        cancel: "Cancel",
      },

      aria: {
        editJoke: "Edit joke",
        deleteJoke: "Delete joke",
        likeJoke: "Like joke",
        goToJoke: "Go to joke",
        editJokeTitle: "Edit joke title",
        editJokeBody: "Edit joke body",
        editJokeTags: "Edit joke tags",
        publishUnpublish: "Publish/Unpublish",
        editMessage: "Edit Message",
        toggleComments: "Toggle comments",
      },

      labels: {
        username: "Username",
        postDate: "Date of post",
        comments: "COMMENTS",
        noComments: "No comments yet.",
        beFirstToComment: "Be the first to comment!",
        failedToLoadComments: "Failed to load comments",
        logInToComment: "Log in to comment."
      },

      buttons: {
        send: "Send",
      },
    },

    avatarWithBadges: {
      streak: "Daily streak",
      badges: "Badges",
      noBadges: "No badges yet.",
      noValue: "—",
    },
  }
} as const;
