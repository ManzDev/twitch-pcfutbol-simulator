class PCFutbolTeamHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
      }

      .container {
        display: grid;
        grid-template-columns: 80px 1fr;
        grid-template-rows: 100px;
        gap: 0 20px;
        margin: 10px;
      }

      .emblem {
        background: #222;
        border: 3px solid #fff;
        box-shadow: 3px 3px 0 #0004;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .emblem img {
        width: 80%;
      }

      .group {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
        font-family: "Orbitron", sans-serif;
        font-variation-settings: "wght" 800;
        font-size: 1.25rem;
        color: #afbfd4;
      }

      .data .name {
        background: #000;
        text-align: center;
        padding: 4px 0;
        text-transform: capitalize;
      }

      .data .team {
        background: #fff;
        text-align: center;
        color: #000;
        padding: 4px 0;
        text-transform: capitalize;
      }

      .stats {
        background: #000;
        color: #6691b8;
        margin-top: 8px;
        padding: 2px;
        border: 2px solid #fff;
        box-shadow:
          0 0 0 1px #000,
          3px 3px 0 #0004;
        font-family: "Orbitron", sans-serif;
        font-variation-settings: "wght" 800;
        padding: 2px 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .stats output {
        color: #fff;
        font-variation-settings: "wght" 600;
      }

      .stats .meter {
        background: #444;
        width: 150px;
        height: 5px;
      }

      .stats .meter .bar {
        background: gold;
        width: var(--value, 100%);
        height: 100%;
        transition: width 0.5s;
      }
    `;
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.image = `logos/${this.name}.svg`;
    this.type = this.getAttribute("type") || "local";
    this.render();
    document.addEventListener("UPDATE_TEAM_AVERAGE", (ev) => {
      const { team, average } = ev.detail;

      if (team === this.type) {
        this.updateAverageTeam(average);
      }
    });
  }

  updateAverageTeam(value) {
    console.log("update", value);
    this.shadowRoot.querySelector("output").textContent = value;
    this.shadowRoot.querySelector(".bar").style.setProperty("--value", `${value}%`);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${PCFutbolTeamHeader.styles}</style>
    <div class="container">
      <div class="emblem">
        <img src="${this.image}" alt="Equipo ${this.type}">
      </div>

      <div class="data">
        <div class="group">
          <div class="name">${this.name.replace("-", " ")}</div>
          <div class="team">${this.type}</div>
        </div>
        <div class="stats">
          MEDIA EQUIPO
          <output>0</output>
          <div class="meter">
            <div class="bar" style="--value: 0%"></div>
          </div>
        </div>
      </div>

    </div>`;
  }
}

customElements.define("pcfutbol-team-header", PCFutbolTeamHeader);
