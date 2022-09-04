import { chooseTeam } from "./modules/chooseTeam.js";
import { shuffle } from "./modules/shuffle.js";
import "./components/PCFutbolScreen.js";
import { startMatch } from "./modules/events.js";

const CHANNEL = "ManzDev";

const playersList = new Set();

const teams = document.querySelector("pcfutbol-screen").shadowRoot.querySelectorAll("pcfutbol-team-lineup");

/*
const client = new window.tmi.Client({
  channels: [CHANNEL]
});

client.connect();
*/

const getDemarcation = (number) => {
  if (number === 1) return "POR";
  if ((number > 1 && number < 4)) return "DEF";
  if ((number > 3 && number < 9)) return "MED";
  if ((number > 8)) return "DEL";
};

const addPlayer = (username) => {
  if (!playersList.has(username)) {
    const homeTeam = teams[0].getFreePositions();
    const visitorTeam = teams[1].getFreePositions();
    // console.log({ username, homeTeam, visitorTeam });
    const isHomeFull = homeTeam.length === 0;
    const isVisitorFull = visitorTeam.length === 0;
    playersList.add(username);

    const isReady = isHomeFull && isVisitorFull;

    if (isReady) {
      console.log("Lo siento, los equipos ya están llenos.");
      return;
    }

    const choosedTeam = chooseTeam(isHomeFull, isVisitorFull);
    const choosedPosition = (choosedTeam === 0 ? homeTeam.pop() : visitorTeam.pop());
    // console.log({ choosedPosition });
    const demarcation = getDemarcation(choosedPosition);
    teams[choosedTeam].setPlayer(choosedPosition, { name: username, demarcation });

    if (isHomeFull && isVisitorFull) {
      // Iniciar partido
    }
  }
};

// document.addEventListener("UPDATE_TEAM_AVERAGE", (ev) => console.log(ev.detail));

/*
client.on("message", (channel, tags, message, self) => {
  const { username } = tags;
  const isCommand = message.toLowerCase().startsWith("!jugar");

  isCommand && addPlayer(username);
});

*/

fetch("http://localhost:9999/api/users")
  .then(response => response.json())
  .then(data => {
    const users = shuffle(data);
    users.slice(0, 22).forEach(user => addPlayer(user));

    startMatch();
  });
