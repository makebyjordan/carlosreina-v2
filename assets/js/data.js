async function loadJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`Error al cargar ${url}`);
  }
  return response.json();
}

function renderEmpty(container) {
  container.innerHTML = '<div class="empty-state">No hay elementos publicados por el momento.</div>';
}

function renderCard(item, options = {}) {
  const info = [];
  if (item.ubicacion) info.push(item.ubicacion);
  if (item.tipo) info.push(item.tipo);
  if (item.estado) info.push(item.estado);
  if (item.rol) info.push(item.rol);

  return `
    <article class="card card--stamp">
      <div class="card__image">
        <img src="${item.imagen}" alt="${item.titulo}" loading="lazy" />
      </div>
      <hr class="hr-gold" />
      <h3 class="gold-text">${item.titulo}</h3>
      <div class="card__meta">
        ${info.map((text) => `<span class="badge">${text}</span>`).join("")}
      </div>
      <p>${item.descripcion_corta}</p>
      ${options.cta ? `<a class="btn btn--gold" href="${options.cta}">${options.ctaLabel || "Solicitar información"}</a>` : ""}
    </article>
  `;
}

async function renderList({ url, containerId, cta, ctaLabel }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const data = await loadJson(url);
    if (!Array.isArray(data) || data.length === 0) {
      renderEmpty(container);
      return;
    }
    container.innerHTML = data
      .map((item) => renderCard(item, { cta, ctaLabel }))
      .join("");
  } catch (error) {
    renderEmpty(container);
  }
}

async function renderHighlights({ urls, containerId, limit = 3 }) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const lists = await Promise.all(urls.map((url) => loadJson(url)));
    const items = lists.flat().slice(0, limit);
    if (items.length === 0) {
      renderEmpty(container);
      return;
    }
    container.innerHTML = items.map((item) => renderCard(item)).join("");
  } catch (error) {
    renderEmpty(container);
  }
}
