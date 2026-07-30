const baseUrl = `http://www.omdbapi.com/?apikey=3ebbfbc4`
const getAllMovies = query => `${baseUrl}&s=${query}`
const getSingleMovie = query => `${baseUrl}&i=${query}`
const row = document.getElementById('movies')
const modal = document.getElementById('movie-modal')

fetch(getAllMovies('ben'))
  .then(res => res.json())
  .then(res => {
    const movies = res.Search
    let cards = ''

    movies.forEach(movie => {
      cards += showCards(movie)
    })

    row.innerHTML = cards
  })
  .catch(err => console.log(err))

row.addEventListener('click', event => {
  if (event.target.classList.contains('movie-details-button')) {
    const query = event.target.dataset.imdbid
    fetch(getSingleMovie(query))
      .then(res => res.json())
      .then(res => {
        let modalBody = showModal(res)
        modal.innerHTML = modalBody
      })
      .catch(err => console.log(err))
  }
})

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
