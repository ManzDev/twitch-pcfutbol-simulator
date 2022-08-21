import { shuffle } from "../modules/shuffle.js";
import "./PCFutbolHeader.js";
import "./PCFutbolTeamLineup.js";
import "./PCFutbolTeamHeader.js";
import "./PCFutbolStadium.js";
import "./PCFutbolButton.js";
import "./PCFutbolSimulation.js";

const TEAMS_AVAILABLE = [
  "angular", "cpp", "go", "java",
  "jquery", "php", "react",
  "rust", "vue", "svelte",
  "javascript", "ruby", "python",
  "excel", "csharp", "lisp",
  "internet-explorer"
];

class PCFutbolScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 1024px;
        --height: 650px;
        --theme-light: #86aa1c;
      }

      .screen {
        background: #a2a2a2;
        width: var(--width);
        height: var(--height);
        padding-top: 10px;
        position: relative;
      }

      .content {
        padding: 20px 10px;
        display: grid;
        grid-template-columns: 0.85fr 1fr;
      }

      .players {
        display: flex;
        flex-direction: column;
        gap: 20px 0;
      }

      pcfutbol-button {
        position: absolute;
        bottom: 20px;
        right: 20px;
      }

      pcfutbol-simulation {
        position: absolute;
        top: 0;
        left: 0;
      }
    `;
  }

  connectedCallback() {
    this.selectTeams();
    this.render();
    const pcfutbolSimulation = document.createElement("pcfutbol-simulation");
    const screen = this.shadowRoot.querySelector(".screen");
    screen.appendChild(pcfutbolSimulation);
  }

  selectTeams() {
    const teams = shuffle(TEAMS_AVAILABLE);
    this.homeTeam = teams.pop();
    this.visitorTeam = teams.pop();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolScreen.styles}</style>
    <div class="screen">
      <pcfutbol-header></pcfutbol-header>

      <div class="content">
        <div class="players">
          <pcfutbol-team-lineup class="team-a"></pcfutbol-team-lineup>
          <pcfutbol-team-lineup class="team-b"></pcfutbol-team-lineup>
        </div>
        <div class="teams">
          <pcfutbol-team-header name="${this.homeTeam}"></pcfutbol-team-header>
          <pcfutbol-stadium></pcfutbol-stadium>
          <pcfutbol-team-header name="${this.visitorTeam}" type="visitante"></pcfutbol-team-header>
        </div>
      </div>

      <pcfutbol-button></pcfutbol-button>
    </div>`;
  }
}

customElements.define("pcfutbol-screen", PCFutbolScreen);
