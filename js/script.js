const baseUrl = `http://www.omdbapi.com/?apikey=3ebbfbc4`
const separator = '&s='
const query = 'ben'
const fullUrl = `${baseUrl}${separator}${query}`

fetch(fullUrl)
  .then(res => {
    return res.json()
  })
  .then(res => {
    const movies = res.Search
    const row = document.getElementById('movies')
    let cards = ''

    console.log(movies)
    movies.forEach(movie => {
      cards += ` <div class="col-md-4 my-3">
        <div class="card">
          <img src="${movie.Poster}" class="card-img-top" alt="">
          <div class="card-body d-flex flex-column justify-content-center align-items-center text-center">
            <h5 class="card-title">${movie.Title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${movie.Year}</h6>
            <a href="#" class="btn btn-primary">Show Details</a>
          </div>
        </div>
      </div> `
    })

    row.insertAdjacentHTML("beforeend", cards)
  })
  .catch(err => console.log(err))
  .finally(console.log('executed'))
