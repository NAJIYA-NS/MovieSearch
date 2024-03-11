document.getElementById('searchButton').addEventListener('click', function() {
    var movieName = document.getElementById('searchInput').value;
    if (movieName.trim() !== '') {
        fetchMovieData(movieName);
    } else {
        alert('Please enter a movie name');
    }
});

function fetchMovieData(moviename) {
    var apiKey = 'fa1c9c03'; // Use your API key here
    var url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURI(moviename)}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        if (data.Response === "True") {
            displayMovieDetails(data);
        } else {
            alert('Movie not found!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayMovieDetails(movie) {
    var detailsHTML = `
        <div class="card mb-3" style="max-width: 540px; margin: 0 auto; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); border: 1px solid #ddd; border-radius: 10px; background-color: #f8f9fa;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="img-fluid rounded-start" alt="Movie Poster">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title bg-warning" style="color: blue;">${movie.Title}</h5>
                        <p class="card-text"><small class="text-light" style="background-color:grey">Released: ${movie.Released}</small></p>
                        <p class="card-text">Actors: ${movie.Actors}</p>
                        <p class="card-text">Plot: ${movie.Plot}</p>
                        <p class="card-text bg-warning"><strong>Ratings:</strong></p>
                        <ul class="list-unstyled">
                            ${movie.Ratings.map(rating => `<li>${rating.Source}: ${rating.Value}</li>`).join('')}
                        </ul>
                        <button class="btn btn-outline-warning" onclick="openIMDb('${movie.imdbID}')">View on IMDb</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('movieDetails').innerHTML = detailsHTML;
}

// Open IMDb in a new tab
function openIMDb(imdbID) {
    window.open(`https://www.imdb.com/title/${imdbID}`, '_blank');
}

