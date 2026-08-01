const baseUrl = `http://www.omdbapi.com/?apikey=3ebbfbc4`
const row = document.getElementById('movies')
const modal = document.getElementById('movie-modal')
const search = document.querySelector('.search-button')
const input = document.querySelector('.input-keyword')

// handle click button
search.addEventListener('click', handleSearch)

// handle movie details button
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('movie-details-button')) {
    updateMovieDetails(e.target.dataset.imdbid)
  }
})

async function handleSearch() {
  let movies = await getMovies(input.value)
  updateCards(movies)
}

async function getMovies(keywords) {
  const res = await fetch(`${baseUrl}&s=${keywords}`)
  const data = await res.json()
  return data.Search
}

async function getMovieDetails(imdbid) {
  const res = await fetch(`${baseUrl}&i=${imdbid}`)
  const data = await res.json()
  return data
}

function updateCards(movies) {
  let cards = ''

  movies && movies.forEach(movie => {
    cards += showCards(movie)
  });

  row.innerHTML = cards
}

async function updateMovieDetails(imdbid) {
  const movieDetails = await getMovieDetails(imdbid)
  modal.innerHTML = showModal(movieDetails)
}

function showCards(movie) {
  return `<div class="col-md-4 my-3">
      <div class="card">
        <img src="${movie.Poster}" class="card-img-top" alt="">
        <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
          <h5 class="card-title">${movie.Title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
          <a class="btn btn-primary movie-details-button" data-bs-toggle="modal" data-bs-target="#movieModal" data-imdbid="${movie.imdbID}">Show Details</a>
        </div>
      </div>
    </div> `
}

function showModal(res) {
  return `<div class="container-fluid">
    <div class="row">
      <div class="col-md-3">
        <img src="${res.Poster}" alt="" class="img-fluid">
      </div>
      <div class="col-md">
        <ul class="list-group">
          <li class="list-group-item">
            <h4>${res.Title}</h4>
          </li>
          <li class="list-group-item"><strong>Director: ${res.Director}</strong></li>
          <li class="list-group-item"><strong>Actor: ${res.Actors}</strong></li>
          <li class="list-group-item"><strong>Writer: ${res.Writer}</strong></li>
          <li class="list-group-item"><strong>Plot: <br></strong> ${res.Plot}</li>
        </ul>
      </div>
    </div>
  </div>`
}
