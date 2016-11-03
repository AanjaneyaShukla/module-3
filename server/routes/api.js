var express = require('express');
var router = express.Router();

var movies = require('../data/movies.json')

// allow easy lookup by id
var moviesById = {}
movies.movieList.map(function(movie) {
  moviesById[movie.movieId] = movie
})

/* GET example. */
router.get('/example', function(req, res, next) {
  var foo = {
    message: 'hello from express!'
  }
  res.send(foo);
});

router.get('/movies', function(req, res, next) {
  var moviesListOut = '';
  for (var id in moviesById) {
    var tempMovie = moviesById[id];
    moviesListOut += '<section>' +
                      '<h3>' + tempMovie.title + ':</h3>' +
                        '<ul>' +
                          '<li>Runtime - ' + tempMovie.runtime + '</li>' +
                          '<li>ReleaseYear - ' + tempMovie.releaseYear + '</li>' +
                          '<li>Average Rating - ' + tempMovie.avgRating + '</li>' +
                        '</ul>' +
                        '<a href="/movie/' + id + '">' + tempMovie.title + ' Details</a>' +
                      '</section>';
  }
  res.send({message: moviesListOut});
});

router.get('/movies/:id', function(req, res, next) {
  var movie = moviesById[req.params.id]
  var movieOut = '<section>' +
                        '<h3>' + movie.title + ':</h3>' +
                          '<ul>' +
                            '<li>Runtime - ' + movie.runtime + '</li>' +
                            '<li>ReleaseYear - ' + movie.releaseYear + '</li>' +
                            '<li>Average Rating - ' + movie.avgRating + '</li>' +
                            '<li>Imdb - ' +
                              '<a href="http://www.imdb.com/title/tt' + movie.imdbMovieId + '">IMDB</a>' +
                            '</li>' +
                            '<li>Mpaa - ' + movie.mpaa + '</li>' +
                            '<li>Genres - ' + movie.genres + '</li>' +
                            '<li>PlotSummary - ' + movie.plotSummary + '</li>' +
                          '</ul>' +
                        '</section>' +
                        '<img class="Poster" src=http://image.tmdb.org/t/p/original/' + movie.posterPath + '>' +
                        '<iframe class="Trailer" src="https://www.youtube.com/embed/' + movie.youtubeTrailerIds[0] + '"></iframe>' +
                        '<a href="/">HomePage</a>';
  console.log('http://image.tmdb.org/t/p/original/' + movie.posterPath);
  if (movie) {
    res.send({message: movieOut});
  } else {
    res.status(404).send('movie id %d not found', req.params.id);
  }
});

module.exports = router;
