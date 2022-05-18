// function gets random vidoe games from api
let apiURL = "https://api.rawg.io/api/games?key=8ebef05b9cf54a87969c47f921a9be58";

function loadInitWebpage() {
    fetch(apiURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      let card = document.createElement("div");
      card.setAttribute("class","gameCards");
      let data = json.results
      console.log(data.length);
      for (let index = 0; index < data.length; index ++) {
        loadGameCard(card, data[index]["name"], data[index]["rating"], data[index]["released"],data[index]["background_image"])  
      }
      $(".videoGamesContainer").append(card);
    })
    // $(".videoGamesContainer").
}
function loadGameCard(cardDiv, name, rating, releaseDate,bgImg) {
  
  $(".gameCards").append($(`<div class = "gameImgContainer"><img class = "gameImages" src = ${bgImg}></div>`));
  $(".gameCards").append($(`<div><p>${name} has a rating of ${rating}<br>Release Date: ${releaseDate}</p></div>`));
  
}

loadInitWebpage();