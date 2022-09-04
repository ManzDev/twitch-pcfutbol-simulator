import timer from "../assets/icons/timer.svg?raw";

class PCFutbolTimer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: block;
        height: 100%;
      }

      .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        position: relative;
      }

      svg {
        width: 42px;
        height: 42px;
        transform: translateX(-1em);
      }

      .time-container {
        width: 540px;
        height: 100%;
        background: #333;
      }

      .time-elapsed {
        --size: calc(var(--minutes, 0) * 6px);

        width: var(--size);
        height: 100%;
        box-shadow:
          0 0 5px 3px #06671c,
          2px 0 0 2px #0ac837 inset,
          -2px 0 0 2px #0ac837 inset;
        background: #06a82c;
        background-image: linear-gradient(140deg, transparent 25%, #2fce54, transparent 75%);
        transition: width 1s ease-in-out;
        box-sizing: border-box;
      }

      .time-elapsed.start {
        box-shadow: none;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  setUpdate(minutes) {
    this.style.setProperty("--minutes", minutes);
    this.shadowRoot.querySelector(".time-elapsed").classList.remove("start");
  }

  get minutes() {
    const minutes = Number(this.style.getPropertyValue("--minutes"));
    return minutes;
  }

  incMinutes() {
    const minutes = this.style.getPropertyValue("--minutes") ?? 0;
    this.setUpdate(Number(minutes) + 1);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolTimer.styles}</style>
    <div class="container">
      ${timer}
      <div class="time-container">
        <div class="time-elapsed start"></div>
      </div>
    </div>`;
  }
}

customElements.define("pcfutbol-timer", PCFutbolTimer);
