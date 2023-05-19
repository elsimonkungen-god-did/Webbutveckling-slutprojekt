axios.get('https://jsonplaceholder.typicode.com/posts')
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

const api_key = '320e277020c74e8f0f2e261620906618';

const BASE_URL = 'https://api.themoviedb.org/3';

async function sök(sökning) {
  console.log(sökning);
  let url = `${BASE_URL}/search/movie?query=${sökning}&api_key=${api_key}`;
  let object = await fetch(url);
  let json = await object.json();
  return json.results;
}

sökbar.addEventListener("keydown", async (e) => {
  var Sökhus = document.getElementById("resultat");
  Sökhus.innerHTML = "";
  if (e.key === "Enter" && document.getElementById('sökbar').value !== "") {
    var sökning = document.getElementById('sökbar').value;
    let resultat = await sök(sökning);

    var scrollContainer = document.createElement("div");
    scrollContainer.classList.add("scroll-container"); // Add a class for styling

    resultat.forEach(element => {
      let img_src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;

      var list = document.createElement("div");
      list.classList.add("list");
      list.innerHTML += `<img class="bildPåFilm" src="${img_src}">`;
      list.innerHTML += `<p class="bildtext">${element.title}</p>`;
      scrollContainer.appendChild(list);

      list.addEventListener("click", () => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('movie-details'); // Add the desired class name

        const backdropImage = document.createElement('img');
        backdropImage.src = `https://image.tmdb.org/t/p/original${element.backdrop_path}`;
        backdropImage.classList.add('backdrop-image');
        newDiv.appendChild(backdropImage);

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = element.title;
        newDiv.appendChild(movieTitle);

        const movieOverview = document.createElement('p');
        movieOverview.textContent = element.overview;
        newDiv.appendChild(movieOverview);

        const movieReleaseDate = document.createElement('p');
        movieReleaseDate.textContent = `Release Date: ${element.release_date}`;
        movieReleaseDate.classList.add('release-date');
        newDiv.appendChild(movieReleaseDate);

        document.body.appendChild(newDiv);

        // Delay the registration of the document event listener
        setTimeout(() => {
          document.addEventListener('click', (event) => {
            if (!newDiv.contains(event.target)) {
              newDiv.remove();
            }
          });
        }, 0);
      });
    });

    Sökhus.appendChild(scrollContainer);
  }
});

async function getPopularMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`);
    const data = await response.json();

    const filmer = data.results.slice(0, 15);

    filmer.forEach(film => {
      const posterPath = film.poster_path;
      const backdropPath = film.backdrop_path;
      const imgSrc = `https://image.tmdb.org/t/p/w500${posterPath}`;

      const imgElement = document.createElement('img');
      imgElement.src = imgSrc;

      imgElement.addEventListener('click', () => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('movie-details'); // Add the desired class name

        const backdropImage = document.createElement('img');
        backdropImage.src = `https://image.tmdb.org/t/p/original${backdropPath}`;
        backdropImage.classList.add('backdrop-image');
        newDiv.appendChild(backdropImage);

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = film.title;
        newDiv.appendChild(movieTitle);

        const movieOverview = document.createElement('p');
        movieOverview.textContent = film.overview;
        newDiv.appendChild(movieOverview);

        const movieReleaseDate = document.createElement('p');
        movieReleaseDate.textContent = `Release Date: ${film.release_date}`;
        movieReleaseDate.classList.add('release-date');
        newDiv.appendChild(movieReleaseDate);

        document.body.appendChild(newDiv);

        // Delay the registration of the document event listener
        setTimeout(() => {
          document.addEventListener('click', (event) => {
            if (!newDiv.contains(event.target)) {
              newDiv.remove();
            }
          });
        }, 0);
      });

      const kritikroserade = document.getElementById('kritikroserade');
      kritikroserade.appendChild(imgElement);
    });
  } catch (error) {
    console.log('Error:', error);
  }
}

getPopularMovies();

const lista = [10749, 27, 35, 53];
var a = 1;

async function genrefilmer() {
  try {
    for (let i = 0; i < lista.length; i++) {
      const genre = lista[i];
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genre}`);
      const data = await response.json();
      const filmer = data.results.slice(0, 20);

      filmer.forEach((movie) => {
        const posterPath = movie.poster_path;
        const backdropPath = movie.backdrop_path;
        const imgSrc = `https://image.tmdb.org/t/p/w500${posterPath}`;

        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;

        imgElement.addEventListener('click', () => {
          const newDiv = document.createElement('div');
          newDiv.classList.add('movie-details'); // Add the desired class name

          const backdropImage = document.createElement('img');
          backdropImage.src = `https://image.tmdb.org/t/p/original${backdropPath}`;
          backdropImage.classList.add('backdrop-image');
          newDiv.appendChild(backdropImage);

          const movieTitle = document.createElement('h2');
          movieTitle.textContent = movie.title;
          newDiv.appendChild(movieTitle);

          const movieOverview = document.createElement('p');
          movieOverview.textContent = movie.overview;
          newDiv.appendChild(movieOverview);

          const movieReleaseDate = document.createElement('p');
          movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
          movieReleaseDate.classList.add('release-date');
          newDiv.appendChild(movieReleaseDate);

          document.body.appendChild(newDiv);

          // Delay the registration of the document event listener
          setTimeout(() => {
            document.addEventListener('click', (event) => {
              if (!newDiv.contains(event.target)) {
                newDiv.remove();
              }
            });
          }, 0);
        });

        if (a === 1) {
          const romans = document.getElementById('romans');
          romans.appendChild(imgElement);
        } else if (a === 2) {
          const skräck = document.getElementById('skräck');
          skräck.appendChild(imgElement);
        } else if (a === 3) {
          const komedi = document.getElementById('komedi');
          komedi.appendChild(imgElement);
        } else {
          const thriller = document.getElementById('thriller');
          thriller.appendChild(imgElement);
        }
      });

      a++;
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

genrefilmer();
