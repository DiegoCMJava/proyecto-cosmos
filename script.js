function renderData(jsonData, sectionId) {
    const section = document.getElementById(sectionId);
    /*grid grid-flow-col gap-4*/
    for (let i = 0; i < jsonData.length; i++) {
        section.innerHTML += `
        <article class="w-80 bg-gray-800 rounded-lg shadow-lg snap-center flex-shrink-0" >
            <div class="m-4">
                <h2 class="text-xl font-bold text-white mb-2">${jsonData[i].title}</h2>
                <img src="${jsonData[i].imgurl}" alt="Imagen de ${jsonData[i].title}" class="w-24 h-40 object-cover rounded mb-4"/>
            </div>
            <div class="m-4"> 
                <p class="text-gray-300 text-sm mb-4">${jsonData[i].description}</p>
                <a href="${jsonData[i].url}" target="_blank" rel="noopener noreferrer"
                class="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4">Ir</a>
            </div>    
    </article>`
    }


}

async function loadJson(path, sectionId) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error("Error al cargar " + path);
        const data = await response.json();
        renderData(data, sectionId);
    } catch (error) {
        console.error(error);

    }
}

loadJson("nasa.json", "nasa-content");
loadJson("esa.json", "esa-content");
loadJson("mixed.json", "mixed-content");
loadJson("amusement.json", "amusement-content");
