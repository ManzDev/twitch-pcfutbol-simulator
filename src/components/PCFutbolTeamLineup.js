import "./PCFutbolPlayer.js";
import { shuffle } from "../modules/shuffle.js";

class PCFutbolTeamLineup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --player-width: 150px;
        --grid-sizes: 25px 150px repeat(6, 35px) 50px;
      }

      .table {
        display: inline-flex;
        flex-direction: column;
        border: 1px solid #000;
        background: #fff;
        padding: 1px 2px 2px 2px;
        box-shadow: 5px 5px 0 #0004;
      }

      .table header {
        display: inline-grid;
        grid-template-columns: var(--grid-sizes);
      }

      .table header {
        padding: 1px 0;
      }

      .table .players {
        border-bottom: 1px solid #000;
      }

      .table header div {
        border: 1px solid #000;
        padding: 2px 4px;
        font-family: "Orbitron", sans-serif;
        font-variation-settings: "wght" 900;
        color: #fff;
        font-size: 0.8rem;
        text-shadow: 1px 1px 0 #000;
        text-transform: uppercase;
        background: var(--bgcolor, #186914);
        text-align: center;
      }

      header div:nth-child(2) { --bgcolor: #86aa1c; }
      header div:nth-child(8) { --bgcolor: #188614; }
      header div:nth-child(9) { --bgcolor: #86aa1c; }

      .players pcfutbol-player:first-child { --bgcolor: #d9e5f3; }
      .players pcfutbol-player:nth-child(2),
      .players pcfutbol-player:nth-child(3),
      .players pcfutbol-player:nth-child(4),
      .players pcfutbol-player:nth-child(5) { --bgcolor: #aebed3; }
      .players pcfutbol-player:nth-child(6),
      .players pcfutbol-player:nth-child(7),
      .players pcfutbol-player:nth-child(8),
      .players pcfutbol-player:nth-child(9) { --bgcolor: #90b7da; }
      .players pcfutbol-player:nth-child(10),
      .players pcfutbol-player:nth-child(11) { --bgcolor: #6996be; }
    `;
  }

  connectedCallback() {
    this.render();
    this.playerNumerate();
  }

  getFreePositions() {
    const players = [...this.shadowRoot.querySelectorAll("pcfutbol-player")];
    const freePositions = players
      .filter(player => player.name === "")
      .map(player => Number(player.number));
    return shuffle(freePositions);
  }

  setPlayer(index, data) {
    const players = this.shadowRoot.querySelectorAll("pcfutbol-player");
    players[index - 1].setData(data);

    const elements = [...this.shadowRoot.querySelectorAll("pcfutbol-player")]
      .filter(player => player.average > 0)
      .map(player => player.average);

    const average = ~~(elements.reduce((first, second) => first + second) / elements.length);
    const detail = { team: (this.classList.item(0) === "team-a" ? "local" : "visitante"), average };
    const event = new CustomEvent("UPDATE_TEAM_AVERAGE", { detail, composed: true, bubbles: true });
    this.dispatchEvent(event);
  }

  getDataPlayers() {
    const container = this.shadowRoot.querySelector(".players");
    const players = [...container.querySelectorAll("pcfutbol-player")];
    return players.map(({ number, name, stats, average, demarcation }) => ({ number, name, stats, average, demarcation }));
  }

  playerNumerate() {
    this.shadowRoot.querySelectorAll("pcfutbol-player")
      .forEach((player, index) => {
        player.setAttribute("number", index + 1);
      });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolTeamLineup.styles}</style>
    <div class="table">
      <header>
        <div class="number">N</div>
        <div class="playername">Jugador</div>
        <div>Ve</div>
        <div>Re</div>
        <div>Ag</div>
        <div>Ca</div>
        <div>En</div>
        <div>Me</div>
        <div>Dem.</div>
      </header>
      <div class="players">
        <pcfutbol-player></pcfutbol-player>
        <pcfutbol-player></pcfutbol-player>
        <pcfutbol-player></pcfutbol-player>
        <pcfutbol-player></pcfutbol-player>
        <pcfutbol-player></pcfutbol-player>
        <pcfutbol-player></pcfutbol-player>
        <pcfutbol-player></pcfutbol-player>
        <pcfutbol-player></pcfutbol-player>
        <pcfutbol-player></pcfutbol-player>
        <pcfutbol-player></pcfutbol-player>
        <pcfutbol-player></pcfutbol-player>
      </div>
    </div>`;
  }
}

customElements.define("pcfutbol-team-lineup", PCFutbolTeamLineup);
