const DEMARCATION = ["POR", "DEF", "MED", "DEL"];
const randomValue = () => 30 + ~~(Math.random() * 69);
const randomDemarcation = () => DEMARCATION[~~(Math.random() * DEMARCATION.length)];

class PCFutbolPlayer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: grid;
        grid-template-columns: var(--grid-sizes);
      }

      div {
        border: 1px solid #000;
        border-bottom: 0;
        padding: 0px 4px;
        font-family: "Chakra Petch", sans-serif;
        text-shadow: 0 0 1px #0006;
        font-size: 1rem;
        background: var(--bgcolor, #86b4da);
      }

      .number {
        color: #fff;
        text-shadow: 1px 1px 0 #000;
      }

      .stats {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #000;
        color: #d4d4d4;
        border: 1px solid #fff;
      }

      .playername {
        padding-left: 10px;
      }

      .media {
        color: #fff;
      }

      div:first-of-type {
        --bgcolor: #4c9423;
      }

      .demarcation {
        text-transform: uppercase;
      }
    `;
  }

  get average() {
    return ~~(
      (this.stats.speed +
        this.stats.endurance +
        this.stats.agility +
        this.stats.quality +
        this.stats.energy) /
      5
    );
  }

  static get observedAttributes() {
    return ["number"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "number") {
      this.number = newValue;
      this.render();
    }
  }

  setData(data) {
    this.name = data.name;
    this.stats = {
      speed: randomValue(),
      endurance: randomValue(),
      agility: randomValue(),
      quality: randomValue(),
      energy: randomValue()
    };
    this.demarcation = data.demarcation || randomDemarcation();
    this.render();
  }

  connectedCallback() {
    this.name = this.getAttribute("name") || "";
    this.number = this.getAttribute("number");
    this.stats = {
      speed: Number(this.getAttribute("ve")) || 0,
      endurance: Number(this.getAttribute("re")) || 0,
      agility: Number(this.getAttribute("ag")) || 0,
      quality: Number(this.getAttribute("ca")) || 0,
      energy: Number(this.getAttribute("en")) || 0
    };
    this.demarcation = this.getAttribute("dem") || "";
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolPlayer.styles}</style>
    <div class="number">${this.number}</div>
    <div class="playername">${this.name}</div>
    <div class="stats">${this.stats.speed}</div>
    <div class="stats">${this.stats.endurance}</div>
    <div class="stats">${this.stats.agility}</div>
    <div class="stats">${this.stats.quality}</div>
    <div class="stats">${this.stats.energy}</div>
    <div class="stats media">${this.average}</div>
    <div class="demarcation">${this.demarcation}</div>
    `;
  }
}

customElements.define("pcfutbol-player", PCFutbolPlayer);
