import soccer from "../assets/icons/soccer.svg?raw";
import whistle from "../assets/icons/whistle.svg?raw";
import timer from "../assets/icons/timer.svg?raw";
import aidkit from "../assets/icons/aidkit.svg?raw";
import redcard from "../assets/icons/redcard.svg?raw";
import yellowcard from "../assets/icons/yellowcard.svg?raw";
import redflag from "../assets/icons/redflag.svg?raw";

import snarkdown from "snarkdown";

const randomTemplate = (templates, user) => {
  const random = Math.floor(Math.random() * templates.length);
  return snarkdown(templates[random]);
};

const goalTemplate = (user) => {
  const safeUser = user.replaceAll("_", " ");
  const texts = [
    `¡Ha marcado gol el usuario **${safeUser}**!`,
    `¡Gol! ¡Gol! ¡Gooooool! ¡**${safeUser}** ha marcado!`,
    `¡Golazo! ¡De la chistera sacó **${safeUser}** semejante pepazo!`,
    `¡**${safeUser}** ha marcado justo en el último momento!`,
    `¡**${safeUser}** de mi vida! ¡Gol!`,
    `¡Gooool! ¡Gol de **${safeUser}** en toda la escuadra!`,
    `¡El Dios del fútbol **${safeUser}**! ¡Gooooool!`,
    `¡Descomunal golazo de cabeza de **${safeUser}**!`,
    `¡Balón al palo y gol de remate de **${safeUser}** con la izquierda!`
  ];
  return randomTemplate(texts, user);
};

const ICONS = {
  goal: soccer,
  time: timer,
  whistle,
  fault: whistle,
  lesion: aidkit,
  redcard,
  yellowcard,
  offside: redflag
};

class PCFutbolEvent extends HTMLElement {
  constructor() {
    super();
    this.markdown = this.textContent;
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        border: 1px solid #777;
        background: #2225;
        box-sizing: border-box;
        padding: 0.75em;
        margin: 0.25em 0;
      }

      header {
        display: flex;
        align-items: flex-start;
      }

      h1,
      p {
        margin: 0;
      }

      h1 {
        display: inline-block;
        font-family: "Orbitron", sans-serif;
        font-variation-settings: "wght" 700;
        color: #fff;
        text-shadow: 2px 2px 0 #000000;
        letter-spacing: 2px;
        font-size: 1.5em;
      }

      p {
        font-family: "Chakra Petch", sans-serif;
        text-shadow:
          0 -1px 5px #0006,
          1px 1px 2px #000;
        font-size: 1rem;
        color: #ddd;
      }

      p strong:first-child {
        background: none;
        color: #11d707;
      }

      strong {
        color: #b9e40b;
      }

      .shake {
        animation: shake-horizontal 0.4s cubic-bezier(0.455, 0.030, 0.515, 0.955) both;
      }

      svg {
        max-width: 22px;
        max-height: 22px;
        margin-right: 10px;
      }

      @keyframes shake-horizontal {
        0%,
        100% {
          transform: translateX(0);
        }
        10%,
        30%,
        50%,
        70% {
          transform: translateX(-3px);
        }
        20%,
        40%,
        60% {
          transform: translateX(3px);
        }
        80% {
          transform: translateX(1.5px);
        }
        90% {
          transform: translateX(-1.5px);
        }
      }

    `;
  }

  connectedCallback() {
    this.type = this.getAttribute("type") || "time";
    this.icon = ICONS[this.type];
    this.user = this.getAttribute("user");
    this.time = this.getAttribute("time");
    this.render();
    setTimeout(() => this.shadowRoot.querySelector(".container").classList.remove("shake"), 1000);
  }

  getTime() {
    return `<strong>${this.time}'</strong>`;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolEvent.styles}</style>
    <div class="container shake">
      <header>
        ${this.icon}
        <p>${this.getTime()} ${goalTemplate(this.user)}</p>
      </header>
    </div>`;
  }
}

customElements.define("pcfutbol-event", PCFutbolEvent);
