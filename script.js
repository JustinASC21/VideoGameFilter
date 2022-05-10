// function gets random vidoe games from api
let apiURL = "https://api.rawg.io/api/games?key=8ebef05b9cf54a87969c47f921a9be58";

function loadInitWebpage() {
    fetch(apiURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
    })
    // $(".videoGamesContainer").
}

loadInitWebpage();