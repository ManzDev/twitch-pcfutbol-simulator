import "./PCFutbolPlayerDot.js";

class PCFutbolStadium extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --grass:
          conic-gradient(
            #168613 90deg,
            #196915 0 180deg,
            #168613 0 270deg,
            #196915 0);
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
      }

      .stadium {
        width: 504px;
        height: 300px;
        border: 1px solid #fff;
        background: var(--grass);
        background-size: 67px 67px;
        box-shadow:
          0 0 0 2px #0004,
          1px 1px 0 2px #0006;
        position: relative;
        overflow: hidden;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .half {
        width: 50%;
        height: 100%;
        border-right: 1px solid #fff;
        display: flex;
        align-items: center;
      }

      .half:nth-child(2) {
        transform: scaleX(-1);
        border-right: 0;
      }

      /* Corners */
      .half::before {
        content: "";
        border: 1px solid #fff;
        width: 25px;
        height: 25px;
        position: absolute;
        border-radius: 50%;
        top: -15px;
        left: -15px;
      }

      .half::after {
        content: "";
        border: 1px solid #fff;
        width: 25px;
        height: 25px;
        position: absolute;
        border-radius: 50%;
        bottom: -15px;
        left: -15px;
      }

      .area {
        width: 33%;
        height: 55%;
        border: 1px solid #fff;
        border-left: 0;
        display: flex;
        align-items: center;
      }

      /* Penalty dot */
      .area::before {
        content: "";
        display: block;
        border: 2px solid #fff;
        position: absolute;
        border-radius: 50%;
        transform: translateX(1350%);
      }

      /* Area semi-circle */
      .area::after {
        content: "";
        display: block;
        border: 1px solid #fff;
        width: 55%;
        height: 35%;
        border-radius: 50%;
        transform: translateX(20px);
        clip-path: polygon(100% 0, 63% 0, 63% 100%, 100% 100%);
      }

      .semiarea {
        width: 40%;
        height: 50%;
        border: 1px solid #fff;
        border-left: 0;
      }

      .circle {
        border: 1px solid #fff;
        border-radius: 50%;
        position: absolute;
        width: 90px;
        height: 90px;

        display: flex;
        justify-content: center;
        align-items: center;
      }

      .circle::before {
        content: "";
        border: 2px solid #fff;
        display: block;
        position: absolute;
        border-radius: 50%;
        transform: translateX(-0.5px);
      }

      .players {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
      }

      .home,
      .away {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-template-areas: var(--lineup);
        width: 50%;
      }

      .lineup-1 {
        --lineup: ". d2 . . d10" ". . d4 d7 ." "d1 . d5 d8 ." ". . d6 d9 ." ". d3 . . d11";
      }

      .lineup-2 {
        --lineup:
          ". . d4 . d10"
          ". d2 . d7 ."
          "d1 . d5 . d8"
          ". d3 . d9 ."
          ". . d6 . d11";
      }

      pcfutbol-player-dot[number="1"] { grid-area: d1; }
      pcfutbol-player-dot[number="2"] { grid-area: d2; }
      pcfutbol-player-dot[number="3"] { grid-area: d3; }
      pcfutbol-player-dot[number="4"] { grid-area: d4; }
      pcfutbol-player-dot[number="5"] { grid-area: d5; }
      pcfutbol-player-dot[number="6"] { grid-area: d6; }
      pcfutbol-player-dot[number="7"] { grid-area: d7; }
      pcfutbol-player-dot[number="8"] { grid-area: d8; }
      pcfutbol-player-dot[number="9"] { grid-area: d9; }
      pcfutbol-player-dot[number="10"] { grid-area: d10; }
      pcfutbol-player-dot[number="11"] { grid-area: d11; }
    `;
  }

  connectedCallback() {
    this.render();

    // setTimeout(() => this.setLineup(), 4000);
  }

  /*
  setLineup(lineup) {
    const home = this.shadowRoot.querySelector(".home");
    home.style.setProperty("--lineup", "\". d2 . . d10\" \". . d4 d7 .\" \"d1 . d5 d8 .\" \". . d6 d9 .\" \". d3 . . d11\"");
  }
  */

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolStadium.styles}</style>
    <div class="stadium">
      <div class="half">
        <div class="area">
          <div class="semiarea"></div>
        </div>
      </div>
      <div class="half">
        <div class="area">
          <div class="semiarea"></div>
        </div>
      </div>
      <div class="circle"></div>
      <div class="players">
        <div class="home lineup-2">
          <pcfutbol-player-dot number="1"></pcfutbol-player-dot>
          <pcfutbol-player-dot number="2"></pcfutbol-player-dot>
          <pcfutbol-player-dot number="3"></pcfutbol-player-dot>
          <pcfutbol-player-dot number="4"></pcfutbol-player-dot>
          <pcfutbol-player-dot number="5"></pcfutbol-player-dot>
          <pcfutbol-player-dot number="6"></pcfutbol-player-dot>
          <pcfutbol-player-dot number="7"></pcfutbol-player-dot>
          <pcfutbol-player-dot number="8"></pcfutbol-player-dot>
          <pcfutbol-player-dot number="9"></pcfutbol-player-dot>
          <pcfutbol-player-dot number="10"></pcfutbol-player-dot>
          <pcfutbol-player-dot number="11"></pcfutbol-player-dot>
        </div>
        <div class="away">
        </div>
      </div>
    </div>`;
  }
}

customElements.define("pcfutbol-stadium", PCFutbolStadium);
