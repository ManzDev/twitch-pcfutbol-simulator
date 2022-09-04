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

        overflow: hidden;
        display: flex;
        align-items: start;
        justify-content: center;
      }

      .report {
        width: 65%;
        height: 100%;
        max-height: 470px;
        background: #2226;
        padding: 1em 1.5em;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: end;
      }

      .report pcfutbol-event:nth-last-child(2) { opacity: 0.8 }
      .report pcfutbol-event:nth-last-child(3) { opacity: 0.6 }
      .report pcfutbol-event:nth-last-child(4) { opacity: 0.4 }
      .report pcfutbol-event:nth-last-child(5) { opacity: 0.3 }
      .report pcfutbol-event:nth-last-child(6) { opacity: 0.2 }
      .report pcfutbol-event:nth-last-child(7) { opacity: 0.15 }
      .report pcfutbol-event:nth-last-child(8) { opacity: 0.10 }
    `;
  }

  connectedCallback() {
    this.render();

    // START MATCH
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
