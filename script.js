/**
 * Renderiza los datos en formato de tarjeta horizontal educativa
 * Paleta: Azul brillante (#4A90E2), Amarillo (#F5C518), Verde (#50E3C2), Naranja (#FF6F61), Blanco (#FAFAFA), Gris (#E0E0E0)
 * @param {Array} jsonData Lista de objetos con title, description, url, imgurl
 * @param {string} sectionId ID del contenedor donde se insertarán las tarjetas
 */
function renderData(jsonData, sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const isAmusement = sectionId === "amusement-content";

    jsonData.forEach(item => {
        const isUpcoming = item.url === "#" || item.title.toLowerCase().includes("próximamente");

        const cardWidthClass = isAmusement 
            ? "w-full min-w-0 h-32 sm:h-36 shrink-0" 
            : "min-w-[300px] sm:min-w-[360px] md:min-w-[390px] max-w-[410px] h-32 sm:h-36 shrink-0 snap-start";

        // Botón CTA en Naranja Energético (#FF6F61)
        const actionButton = isUpcoming
            ? `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#E0E0E0] text-[#5A6B7C] border border-[#B0BEC5] cursor-not-allowed">
                <span>En desarrollo</span>
               </span>`
            : `<a href="${item.url}" target="_blank" rel="noopener noreferrer"
                  class="btn-cta-orange inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white shadow-md transition-all duration-200">
                <span>Explorar</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
               </a>`;

        const articleHTML = `
            <article class="cosmos-card ${cardWidthClass} flex flex-row rounded-xl overflow-hidden group">
                <!-- Imagen a la izquierda con borde gris claro (#E0E0E0) -->
                <div class="w-28 sm:w-36 shrink-0 h-full relative overflow-hidden bg-[#E0E0E0]/40 border-r border-[#E0E0E0]">
                    <img src="${item.imgurl}" alt="${item.title}" loading="lazy"
                         onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=300&auto=format&fit=crop';"
                         class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"/>
                </div>

                <!-- Contenido a la derecha (Fondo Blanco Suave #FAFAFA, Título, Descripción, Botón CTA Naranja) -->
                <div class="flex flex-col justify-between p-3 sm:p-3.5 flex-1 min-w-0 bg-[#FAFAFA] group-hover:bg-white transition-colors">
                    <div>
                        <h3 class="font-heading font-bold text-sm sm:text-base text-[#2C3E50] group-hover:text-[#4A90E2] transition-colors truncate" title="${item.title}">
                            ${item.title}
                        </h3>
                        <p class="text-xs text-[#5A6B7C] line-clamp-2 mt-1 leading-relaxed" title="${item.description}">
                            ${item.description}
                        </p>
                    </div>
                    <div class="flex items-center justify-end pt-2 border-t border-[#E0E0E0] mt-auto">
                        ${actionButton}
                    </div>
                </div>
            </article>
        `;

        section.insertAdjacentHTML("beforeend", articleHTML);
    });
}

/**
 * Control de desplazamiento suave de los carruseles
 * @param {string} id ID del elemento contenedor
 * @param {'left'|'right'|'up'|'down'} direction Dirección del desplazamiento
 */
function scrollCarousel(id, direction) {
    const el = document.getElementById(id);
    if (!el) return;

    const horizontalAmount = 380;
    const verticalAmount = 160;

    if (direction === "left") el.scrollBy({ left: -horizontalAmount, behavior: "smooth" });
    if (direction === "right") el.scrollBy({ left: horizontalAmount, behavior: "smooth" });
    if (direction === "up") el.scrollBy({ top: -verticalAmount, behavior: "smooth" });
    if (direction === "down") el.scrollBy({ top: verticalAmount, behavior: "smooth" });
}

/**
 * Carga de archivos JSON y renderizado automático
 * @param {string} path Ruta del archivo JSON
 * @param {string} sectionId ID del contenedor destino
 */
async function loadJson(path, sectionId) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("Error al cargar " + path);
        const data = await response.json();
        renderData(data, sectionId);
    } catch (error) {
        console.error("Error al cargar " + path + ":", error);
    }
}

// Inicialización de los datos
document.addEventListener("DOMContentLoaded", () => {
    loadJson("nasa.json", "nasa-content");
    loadJson("esa.json", "esa-content");
    loadJson("mixed.json", "mixed-content");
    loadJson("amusement.json", "amusement-content");
});
