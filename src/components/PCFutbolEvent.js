import soccer from "../assets/icons/soccer.svg?raw";
import whistle from "../assets/icons/whistle.svg?raw";
import timer from "../assets/icons/timer.svg?raw";
import aidkit from "../assets/icons/aidkit.svg?raw";
import redcard from "../assets/icons/redcard.svg?raw";
import yellowcard from "../assets/icons/yellowcard.svg?raw";
import redflag from "../assets/icons/redflag.svg?raw";

import snarkdown from "snarkdown";

const goalTemplate = (user) => {
  const texts = [
    `¡Ha marcado gol el usuario ${user}!`,
    `¡Gol! ¡Gol! ¡Gol! ¡Ha marcado ${user}!`
  ];

  const random = Math.floor(Math.random() * texts.length);
  return texts[random];
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

      svg {
        max-width: 22px;
        max-height: 22px;
        margin-right: 10px;
      }
    `;
  }

  connectedCallback() {
    this.type = this.getAttribute("type") || "time";
    this.icon = ICONS[this.type];
    this.user = this.getAttribute("user");
    this.time = this.getAttribute("time");
    this.render();
    const html = snarkdown(this.markdown.trim());
    this.shadowRoot.querySelector("p").innerHTML = html;
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolEvent.styles}</style>
    <div class="container">
      <header>
        ${this.icon}
        <p></p>
      </header>
    </div>`;
  }
}

customElements.define("pcfutbol-event", PCFutbolEvent);
