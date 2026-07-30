const baseUrl = `http://www.omdbapi.com/?apikey=3ebbfbc4`
const getAllMovies = query => `${baseUrl}&s=${query}`
const getSingleMovie = query => `${baseUrl}&i=${query}`
const row = document.getElementById('movies')

fetch(getAllMovies('ben'))
  .then(res => {
    return res.json()
  })
  .then(res => {
    const movies = res.Search
    let cards = ''

    console.log(movies)
    movies.forEach(movie => {
      cards += ` <div class="col-md-4 my-3">
        <div class="card">
          <img src="${movie.Poster}" class="card-img-top" alt="">
          <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
            <h5 class="card-title">${movie.Title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
            <a class="btn btn-primary movie-details-button" data-bs-toggle="modal" data-bs-target="#movieModal" data-imdbid="${movie.imdbID}">Show Details</a>
          </div>
        </div>
      </div> `
    })

    row.insertAdjacentHTML("beforeend", cards)
  })
  .catch(err => console.log(err))

row.addEventListener('click', event => {
  if (event.target.classList.contains('movie-details-button')) {
    const query = event.target.dataset.imdbid
    fetch(getSingleMovie(query))
      .then(res => res.json())
      .then(res => console.log(res))
  }
})
