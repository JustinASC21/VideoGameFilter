// function gets random vidoe games from api
let apiURL = "https://api.rawg.io/api/games?key=8ebef05b9cf54a87969c47f921a9be58";

function loadInitWebpage() {
    fetch(apiURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      
      let data = json.results
      for (let index = 0; index < data.length; index ++) {
        loadGameCard(data[index]["name"], data[index]["rating"], data[index]["released"],data[index]["background_image"],data[index]["genres"])  
      }
      
    })
    // $(".videoGamesContainer").
}
function loadGameCard(name, rating, releaseDate,bgImg,genreArray) {
  let genreString = "Genres: ";
  for (let n = 0; n < genreArray.length; n ++) {
    if (n + 1 == genreArray.length) {
      // last genre
      genreString = genreString + genreArray[n]["name"];
    }
    else {
       genreString += genreArray[n]["name"] + ", ";
    }
  }
  let cardDiv = `<div class = "gameCards"><div class = "gameImgContainer"><img class = "gameImages" src = ${bgImg}></div><div class = "descriptions"><p>${name} has a rating of ${rating}<br>Release Date: ${releaseDate}<br>${genreString}</p></div></div>`;
  $(".videoGamesContainer").append(cardDiv);
}

$(".search").click(function() {
  $(".videoGamesContainer").empty();
  let input = $(".searchInput").val();
  let newAPICall = apiURL + "&search=" + input;
  fetch(newAPICall)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    let data = json.results;
    for (let ind = 0; ind < data.length; ind ++) {
      loadGameCard(data[ind]["name"],data[ind]["rating"],data[ind]["released"],data[ind]["background_image"],data[ind]["genres"]);
    }
  })
})

loadInitWebpage();