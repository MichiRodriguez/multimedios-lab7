Prompt modificado:

Quiero que crees una web que será una plataforma donde voy a añadir información y videos de los partidos del ADM Liberia que formen parte de un historial organizado por temporadas.

Quiero que a la izquierda aparezca un grid (simulando un árbol de habilidades como el de los videojuegos), pero respecto a los partidos del equipo y sus secciones (temporadas, torneos, partidos ganados, empatados, perdidos, clásicos, etc...).

Quiero que los partidos salgan como cuadraditos o cubos, apilados encima, debajo, o a los lados (similar al selector de personajes del Street Fighter, debe recordar a ese selector grid) y al seleccionarlo, se vea en grande su información a la derecha. Esta parte los cuadraditos rectos, con esquinas afiladas, como cubos, compactos y que no sean muy grandes. Es importante que esta parte esté hecha con webcomponents para que sea fácil de reutilizar.

Toda esta parte estará en un menú lateral del lado izquierdo de la página. La página principal estará a la derecha, donde aparecerá el contenido seleccionado.

Ten en cuenta que el contenido es así:

Equipo: ADM Liberia, que incluye varias temporadas.
Temporada: Agrupa los partidos según el torneo o año.
Partido: Cada uno de los partidos de una temporada. Cada partido es un cuadradito de los que mencionamos. Al pulsar en el partido, mostramos a la derecha todo el contenido de ese partido.

Cada partido tiene: un video del resumen o partido completo (YouTube), resultado (ganado, perdido o empatado), marcador, rival, fecha y highlights a minutos específicos.

Opcionalmente puede tener análisis o momentos clave del partido.

Momentos clave: Clips o partes destacadas del partido que pueden agrupar varios highlights.

Busca una forma de mostrarlo todo, que sea natural y recordando que todos los partidos tienen highlights, pero puede que no tengan momentos clave adicionales, o puede que sí.

También quiero que se pueda incluir una sección de historia del equipo (logros, ascensos, datos importantes).

Quiero que lo hagas en HTML/CSS/JS vanilla y que estén componentizados (webcomponents) sus partes más sensibles a reutilizar, para poder personalizarlo más tarde y reutilizar al máximo. Estilo moderno, limpio y darkmode con accents indigo y deeppink.


Archivo por IA:

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ADM Liberia - Historial</title>
<style>
  :root {
    --bg: #0f0f1a;
    --panel: #18182a;
    --accent: indigo;
    --accent2: deeppink;
    --text: #eaeaf0;
  }

  body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    display: flex;
    height: 100vh;
  }

  sidebar-tree {
    width: 300px;
    background: var(--panel);
    padding: 10px;
    overflow-y: auto;
    border-right: 2px solid #222;
  }

  main-content {
    flex: 1;
    padding: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }

  .node {
    width: 60px;
    height: 60px;
    background: #222;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 2px solid #333;
    transition: 0.2s;
  }

  .node:hover {
    border-color: var(--accent2);
  }

  .node.active {
    background: var(--accent);
  }

  iframe {
    width: 100%;
    height: 400px;
    border: none;
  }

  .highlight {
    cursor: pointer;
    padding: 5px;
    border-bottom: 1px solid #333;
  }

  .highlight:hover {
    color: var(--accent2);
  }
</style>
</head>
<body>

<sidebar-tree></sidebar-tree>
<main-content></main-content>

<script>
const data = {
  temporadas: [
    {
      nombre: "Temporada Actual",
      partidos: [
        { rival: "Saprissa", resultado: "Ganado", marcador: "2-1", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", highlights: [{ tiempo: 45, texto: "Gol decisivo" }] },
        { rival: "Alajuelense", resultado: "Perdido", marcador: "0-2", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", highlights: [{ tiempo: 30, texto: "Primera llegada" }] },
        { rival: "Herediano", resultado: "Empatado", marcador: "1-1", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", highlights: [{ tiempo: 60, texto: "Empate" }] },
        { rival: "Cartaginés", resultado: "Ganado", marcador: "3-2", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", highlights: [{ tiempo: 75, texto: "Gol final" }] },
        { rival: "Puntarenas", resultado: "Ganado", marcador: "1-0", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", highlights: [{ tiempo: 20, texto: "Gol temprano" }] },
        { rival: "Grecia", resultado: "Perdido", marcador: "1-2", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", highlights: [{ tiempo: 50, texto: "Empate parcial" }] },
        { rival: "Santos", resultado: "Empatado", marcador: "2-2", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", highlights: [{ tiempo: 80, texto: "Gol empate" }] },
        { rival: "Sporting", resultado: "Ganado", marcador: "2-0", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", highlights: [{ tiempo: 10, texto: "Gol inicial" }] },
        { rival: "Pérez Zeledón", resultado: "Perdido", marcador: "0-1", video: "https://www.youtube.com/embed/dQw4w9WgXcQ", highlights: [{ tiempo: 70, texto: "Oportunidad fallada" }] }
      ]
    }
  ]
};

class SidebarTree extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="grid"></div>`;
    const grid = this.querySelector('.grid');

    data.temporadas.forEach(temp => {
      temp.partidos.forEach(partido => {
        const node = document.createElement('div');
        node.className = 'node';
        node.textContent = partido.marcador;

        node.onclick = () => {
          document.querySelectorAll('.node').forEach(n => n.classList.remove('active'));
          node.classList.add('active');
          document.querySelector('main-content').load(partido);
        };

        grid.appendChild(node);
      });
    });
  }
}

class MainContent extends HTMLElement {
  load(partido) {
    this.innerHTML = `
      <h1>${partido.rival}</h1>
      <p>${partido.resultado} - ${partido.marcador}</p>
      <iframe src="${partido.video}" allowfullscreen></iframe>
      <h3>Highlights</h3>
      ${partido.highlights.map(h => `
        <div class="highlight" onclick="document.querySelector('iframe').src='${partido.video}?start=${h.tiempo}'">
          ${h.texto} (${h.tiempo}s)
        </div>
      `).join('')}
    `;
  }
}

customElements.define('sidebar-tree', SidebarTree);
customElements.define('main-content', MainContent);
</script>

</body>
</html>
