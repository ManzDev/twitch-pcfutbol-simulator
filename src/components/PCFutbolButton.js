const ARROW_ICON = /* svg */`
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 27" xml:space="preserve">
  <path d="M26.105,21.891c-0.229,0-0.439-0.131-0.529-0.346l0,0c-0.066-0.156-1.716-3.857-7.885-4.59
    c-1.285-0.156-2.824-0.236-4.693-0.25v4.613c0,0.213-0.115,0.406-0.304,0.508c-0.188,0.098-0.413,0.084-0.588-0.033L0.254,13.815
    C0.094,13.708,0,13.528,0,13.339c0-0.191,0.094-0.365,0.254-0.477l11.857-7.979c0.175-0.121,0.398-0.129,0.588-0.029
    c0.19,0.102,0.303,0.295,0.303,0.502v4.293c2.578,0.336,13.674,2.33,13.674,11.674c0,0.271-0.191,0.508-0.459,0.562
    C26.18,21.891,26.141,21.891,26.105,21.891z"/>
</svg>
`;

class PCFutbolButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        display: inline-flex;
        align-items: center;
        background: #aebed3;
        font-family: "Chakra Petch", sans-serif;
        font-size: 0.8rem;
        text-transform: uppercase;
        padding: 8px 12px;
        box-shadow:
          2px 2px 0 1px #fff inset,
          -2px -2px 0 1px #6488a8 inset,
          0 0 0 4px #76a0c4 inset,
          -2px -2px 0 3px #88898c inset,
          0 0 0 1px #000,
          3px 3px 0 #0004;
      }

      span::first-letter {
        color: #f11;
      }

      svg {
        width: 24px;
        height: 24px;
        filter: drop-shadow(4px 4px 0 #0004);
        fill: #fff;
        margin-right: 0.5em;
      }
    `;
  }

  connectedCallback() {
    this.text = this.getAttribute("text") || "Volver";
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolButton.styles}</style>
    <div class="container">
      ${ARROW_ICON}
      <span>${this.text}</span>
    </div>`;
  }
}

customElements.define("pcfutbol-button", PCFutbolButton);
