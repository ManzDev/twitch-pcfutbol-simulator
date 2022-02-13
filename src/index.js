import "./components/PCFutbolScreen.js";

const [teamA, teamB] = document.querySelector("pcfutbol-screen").shadowRoot.querySelectorAll("pcfutbol-team-lineup");

const PLAYERS = [
  "cybermanzdev",
  "manzdev",
  "maxi83c",
  "juliokrack27",
  "commanderroot",
  "ullacasa",
  "devgeer",
  "billxanthi",
  "hdmc6",
  "streamlabs",
  "kugram",
  "boamorte55",
  "srcarlosa",
  "dynaterra",
  "alopezciotta",
  "olandaeta",
  "a1t0rmenta",
  "eltaladros",
  "scemigdio",
  "m_akali",
  "erika_fnbr",
  "ferchoo17",
  "rogueg1rl",
  "locura_78",
  "aguzbruno",
  "maikolmyers77",
  "zerobytes_",
  "adeptw",
  "tizcloud",
  "elmoliiii",
  "jamsmendez",
  "dolce_nyx",
  "luismac09",
  "wpfid5555",
  "kaxips06",
  "jelitter",
  "itsthefrits",
  "lanarayyyy",
  "virgoproz",
  "midsooooooooon",
  "itzemmaaaaaaa",
  "shompys",
  "jordandiaz1988",
  "infraavalorado",
  "kbemon",
  "leannpiano",
  "gallowtown",
  "chuvv1",
  "itsvodoo",
  "javi_more_music",
  "frankkdrebin",
  "anotherttvviewer",
  "esgameplayer",
  "baikin_lol",
  "ele_eme_esther",
  "miottotv",
  "pablorocha",
  "patatokill",
  "ldp_20",
  "brayanli_",
  "justoserrano",
  "devkaos",
  "spiketrapclair",
  "misterybrk",
  "z3thii"
].sort(() => Math.random() - 0.5);

for (let i = 0; i < 11; i++) {
  teamA.setPlayer(i + 1, { name: PLAYERS[i] });
}

for (let i = 0; i < 11; i++) {
  teamB.setPlayer(i + 1, { name: PLAYERS[11 + i] });
}
