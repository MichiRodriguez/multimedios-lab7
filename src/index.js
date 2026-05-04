import { data } from "./modules/storage.js";
import { SidebarTree, MainContent } from "./modules/ui.js";

customElements.define("sidebar-tree", SidebarTree);
customElements.define("main-content", MainContent);

// Inicializar con primer partido
window.addEventListener("DOMContentLoaded", () => {
  const first = data.temporadas[0].partidos[0];
  document.querySelector("main-content").load(first);
});