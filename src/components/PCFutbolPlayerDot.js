class PCFutbolPlayerDot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .player {
        width: 32.5px;
        height: 32.5px;
        background: #fff;
        border-radius: 50%;
        box-shadow: 1px 1px 0 #0008;

        display: flex;
        justify-content: center;
        align-items: center;
        font-family: "Chakra Petch", sans-serif;
        font-size: 1.3rem;
      }
    `;
  }

  connectedCallback() {
    this.number = this.getAttribute("number");
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolPlayerDot.styles}</style>
    <div class="player">
      ${this.number}
    </div>`;
  }
}

customElements.define("pcfutbol-player-dot", PCFutbolPlayerDot);
