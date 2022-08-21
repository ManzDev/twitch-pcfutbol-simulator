import "./PCFutbolTimer.js";
import "./PCFutbolEvent.js";

class PCFutbolSimulation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        width: var(--width);
        height: var(--height);
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .window {
        display: grid;
        grid-template-rows: 50px 1fr;
        gap: 10px;
        width: calc(var(--width) * 0.9);
        height: calc(var(--height) * 0.9);
        border: 1px solid #a8a8a8;
        border-bottom: 1px solid #424242;
        border-right: 1px solid #424242;
        background: #6e6e6e;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 6px 6px 3px #0008;
      }

      header {
        background: #2224;
      }

      .report-container {
        background: #2226;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      }

      .report {
        width: 65%;
        height: 100%;
        background: #2226;
        padding: 1em 1.5em;
        box-sizing: border-box;
      }
    `;
  }

  connectedCallback() {
    this.render();
    const timer = this.shadowRoot.querySelector("pcfutbol-timer");

    const generateRandomEvent = () => {
      const ocurrsEvent = Math.floor(Math.random() * 10);

      // 9
    };

    const increment = () => {
      timer.incMinutes();
      setTimeout(() => increment(), 1000);
      generateRandomEvent();
    };
    setTimeout(() => increment(), 1000);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolSimulation.styles}</style>
    <div class="window">
      <header>
        <pcfutbol-timer></pcfutbol-timer>
      </header>
      <div class="report-container">
        <div class="report">
          <pcfutbol-event type="offside" user="jelitter" time="3"></pcfutbol-event>
        </div>
      </div>
    </div>`;
  }
}

customElements.define("pcfutbol-simulation", PCFutbolSimulation);

// Silbato
// Gol (⚽)
// Tarjeta amarilla
// Tarjeta roja
// Lesión (Botiquín)
// Falta (Botiquín)
// Fuera de juego (🚩)
// Penalty (Silbato)
// * Corredor espontáneo
