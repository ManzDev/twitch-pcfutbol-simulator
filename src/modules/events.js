const timer = document.querySelector("pcfutbol-screen").shadowRoot
  .querySelector("pcfutbol-simulation").shadowRoot
  .querySelector("pcfutbol-timer");

const container = document.querySelector("pcfutbol-screen").shadowRoot
  .querySelector("pcfutbol-simulation").shadowRoot
  .querySelector(".report");

const teamsDiv = document.querySelector("pcfutbol-screen").shadowRoot
  .querySelectorAll("pcfutbol-team-lineup");

let teams;

const generateRandomEvent = () => {
  const eventProbability = Math.floor(Math.random() * 4);

  if (eventProbability === 0) {
    const selectedTeam = Math.floor(Math.random() * 2);
    const selectedPlayer = 1 + Math.floor(Math.random() * 10);
    const user = teams[selectedTeam][selectedPlayer].name;
    const event = document.createElement("pcfutbol-event");
    event.setAttribute("type", "goal");
    event.setAttribute("time", timer.minutes);
    event.setAttribute("user", user);
    container.appendChild(event);
  }
};

const incrementTime = (timer) => {
  timer.incMinutes();
  generateRandomEvent();
  if (timer.minutes < 90) {
    setTimeout(() => incrementTime(timer), 1000);
  }
};

export const startMatch = () => {
  teams = [...teamsDiv].map(team => team.getDataPlayers());
  setTimeout(() => incrementTime(timer), 1000);
};
