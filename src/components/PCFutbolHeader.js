class PCFutbolHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {

      }

      nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: "Orbitron", sans-serif;
        font-variation-settings: "wght" 700;
        text-shadow: 1px 1px 0 #186914;
        font-size: 1.25rem;
        color: #fff;
        background: var(--theme-light);
        border-top: 1px solid #a2d324;
        border-bottom: 1px solid #186914;
        padding: 0 30px;
        box-shadow:
          0 1px 0 #000,
          0 3px 0 #0005;
      }

      nav p {
        margin: 0;
      }

      nav time {
        display: flex;
        align-items: center;
        background: #186914;
        padding: 0 10px;
        font-size: 1rem;
        height: 20px;
        color: #d8f091;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.updateDate();
  }

  updateDate() {
    const time = this.shadowRoot.querySelector("nav time");
    time.textContent = new Date().toLocaleDateString();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolHeader.styles}</style>
    <nav>
      <p>TWITCH.TV/MANZDEV</p>
      <time></time>
    </nav>`;
  }
}

customElements.define("pcfutbol-header", PCFutbolHeader);
