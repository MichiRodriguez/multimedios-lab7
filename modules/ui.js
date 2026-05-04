import { data } from "./storage.js";

export class SidebarTree extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="grid"></div>`;
    const grid = this.querySelector(".grid");

    data.temporadas[0].partidos.forEach(partido => {
      const node = document.createElement("div");
      node.className = `node ${partido.resultado.toLowerCase()}`;
      node.textContent = partido.marcador;

      node.onclick = () => {
        document.querySelectorAll(".node").forEach(n => n.classList.remove("active"));
        node.classList.add("active");
        document.querySelector("main-content").load(partido);
      };

      grid.appendChild(node);
    });
  }
}

export class MainContent extends HTMLElement {
  load(partido) {
    this.innerHTML = `
      <h1>${partido.rival}</h1>
      <p>${partido.resultado} - ${partido.marcador}</p>

      <iframe src="${partido.video}" allowfullscreen></iframe>

      <h3>Highlights</h3>
      ${partido.highlights.map(h => `
        <div class="highlight"
          onclick="document.querySelector('iframe').src='${partido.video}?start=${h.tiempo}'">
          ${h.texto} (${h.tiempo}s)
        </div>
      `).join("")}
    `;
  }
}