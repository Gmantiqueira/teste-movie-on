$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});
//Enter executa a função de pesquisar os vídeos


$('#searchText').on("click", function () {
  $(this).select();
});
//Seleciona tudo quando clica no form

$(function(){
  $("#searchForm").click(
      function(){
          $("#ic-search").addClass("active");
      }
  );

  $("#searchForm").hover(
      function(){
          $(".ic-search").css('opacity', '1');
      },
      function(){
          $(".ic-search").css('opacity', '0.5')
      }
  );
});
//Ajusta opacidade da lupa quando clica/hover

function getMovies(searchText){
  axios.get('http://www.omdbapi.com/?s='+searchText+'&apikey=f08e915b')
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output +=`
          <div onclick="movieSelected('${movie.imdbID}')" id="movie-wraper" class="movie-wraper">
                      <img src="${movie.Poster}">
                      <div id="movie-mask" class="movie-mask">
                <div class="text-wraper">
                  <div class="text-spacing"></div>
                  <h2>${movie.Title}</h5>
                </div>
                <p>${movie.Year}</p>
              </div>
          </div>
        `;
      });
        $('#movies').html(output);
          axios.get('http://www.omdbapi.com/?s='+searchText+'&page=2'+'&apikey=f08e915b')
            .then((response) => {
              console.log(response);
              let movies = response.data.Search;
              let output = '';
              $.each(movies, (index, movie) => {
                output +=`
                  <div onclick="movieSelected('${movie.imdbID}')" id="movie-wraper" class="movie-wraper">
                      <img src="${movie.Poster}">
                      <div id="movie-mask" class="movie-mask">
                        <div class="text-wraper">
                          <div class="text-spacing"></div>
                          <h2>${movie.Title}</h5>
                        </div>
                        <p>${movie.Year}</p>
                      </div>
                  </div>
                `;
              });
                $(output).appendTo('#movies');
                axios.get('http://www.omdbapi.com/?s='+searchText+'&page=3'+'&apikey=f08e915b')
            .then((response) => {
              console.log(response);
              let movies = response.data.Search;
              let output = '';
              $.each(movies, (index, movie) => {
                output +=`
                  <div onclick="movieSelected('${movie.imdbID}')" id="movie-wraper" class="movie-wraper">
                      <img src="${movie.Poster}">
                      <div id="movie-mask" class="movie-mask">
                        <div class="text-wraper">
                          <div class="text-spacing"></div>
                          <h2>${movie.Title}</h5>
                        </div>
                        <p>${movie.Year}</p>
                      </div>
                  </div>
                `;
              });
                $(output).appendTo('#movies');
                axios.get('http://www.omdbapi.com/?s='+searchText+'&page=4'+'&apikey=f08e915b')
            .then((response) => {
              console.log(response);
              let movies = response.data.Search;
              let output = '';
              $.each(movies, (index, movie) => {
                output +=`
                  <div onclick="movieSelected('${movie.imdbID}')" id="movie-wraper" class="movie-wraper">
                      <img src="${movie.Poster}">
                      <div id="movie-mask" class="movie-mask">
                        <div class="text-wraper">
                          <div class="text-spacing"></div>
                          <h2>${movie.Title}</h5>
                        </div>
                        <p>${movie.Year}</p>
                      </div>
                  </div>
                `;
              });
                $(output).appendTo('#movies');
              })
              })
              })
            .catch((err) => {
              console.log(err);
            });
});
}
//Retorna 20 filmes da pesquisa

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}
//Guarda o filme que cliquei e me manda pra outra página

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=f08e915b')
    .then((response) => {
      console.log(response);
      let movie = response.data;
      var year = movie.Released.split(' ')[2];
      var genre = movie.Genre.split(',');
      let output =`
        <a href="index.html"><div class="close">
            <img id="ic-close" class="ic-close" src="imagens/ic-close.svg">
            <p>Voltar</p>
        </div></a>

        <div class="img-wraper">
          <div class="left-gradient"></div>
          <div class="top-gradient"></div>
            <img src="${movie.Poster}">
          <div class="bottom-gradient"></div>  
          <div class="right-gradient"></div>
        </div>
        
        <div class="container">
          <div class="about-wraper">
              <h2>${movie.Title}</h2>
              <ul>
                  <li>${year} |</li>
                  <li> ${movie.Runtime} |</li>
                  <li>${genre[0]}, ${genre[1]}, ${genre[2]}</li>
              </ul>
          </div>

          <div id="stars" class="stars" data-rating="${movie.imdbRating}" data-num-stars="5"></div>
          
          <p class="rate">${movie.imdbRating}/10</p>
          <div class="clear"></div>
          <div class="plot-wraper">
            <h3>Plot</h3>
            <p>${movie.Plot}</p>
          </div>
        </div>
        <div class="clear"></div>
      `;
      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
//Renderiza a página do filme e seus dados

$("div.close").click( 
  function() {
    window.location.href = "index.html";
    return false;
});

$('movie.html').ready(() => {
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=f08e915b')

    .then((response) => {

    var FilledStar = $(`<object id="svg-object" data="imagens/ic-star-m-filled.svg" type="image/svg+xml"></object>`);

    var HalfStar = $(`<object id="svg-object" data="imagens/ic-ic-star-m-hollow.svg" type="image/svg+xml"></object>`);

    var HollowStar = $(`<object id="svg-object" data="imagens/ic-ic-star-m-hollow.svg" type="image/svg+xml"></object>`);

    var rate = parseInt(response.data.imdbRating);
    rate/=2;
    for(var i = 0; i < 5; i++) {
      if(i < rate){
      $(FilledStar).clone().appendTo("#stars");
      }

      if((i > rate)&(rate%1 != 0)){
        $(HollowStar).clone().appendTo("#stars");
      } 
    }
  });
});
//Gera as estrelas da avaliação do filme
