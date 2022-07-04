const API =
  "https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLh1HNAyVrjvAO2fqnWW0rvQX4ySFrHaIJ&part=snippet&maxResults=12";

const content = null || document.getElementById("content");

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "b367879d4fmsh10ab576d817c5cap170c04jsn659b18a93e5a",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

//Funcion que se invoca a si misma. Permite automaticamente llamarlas. No hay que invocarlas.
(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
      ${videos.items
        .map(
          (video) => `
        <div class="group relative">
          <div
            class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
            <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
          </div>
          <div class="mt-4 flex justify-between">
            <h3 style="color: black;" class="text-sm text-gray-700">
              <span aria-hidden="true" class="absolute inset-0"></span>
              ${video.snippet.title}
            </h3>
          </div>
        </div>
      `
        )
        .slice(0, 4)
        .join("")}
      `;
    content.innerHTML = view;
  } catch (error) {
    alert("Se ha encontrado el siguiente error: " + error);
  }
})();
