export type AppLanguage = "NO" | "EN";

const homeContent = {
  NO: {
    heading: "Et fellesskap for klassiske pappavitser",
    paragraph: "Send inn vitser, lik de beste, og bygg et rangert arkiv av tidløse ordspill.",
    button0: "DASHBOARD",
    button1: "REGISTRER",
    button2: "FINN VITSER",
  },
  EN: {
    heading: "A Community for Classic Dad Humor",
    paragraph: "Submit dad jokes, like the best ones, and watch the collection grow into a ranked archive of timeless puns.",
    button0: "DASHBOARD",
    button1: "REGISTER",
    button2: "FIND JOKES",
  },
} as const;

export default homeContent;