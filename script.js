// function gets random vidoe games from api
let apiURL = "https://api.rawg.io/api/games?key=8ebef05b9cf54a87969c47f921a9be58";
let genreAPIURL = "https://api.rawg.io/api/genres?key=8ebef05b9cf54a87969c47f921a9be58";
let genreList = [];

function loadInitWebpage() {
    fetch(apiURL)
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      
      let data = json.results
      for (let index = 0; index < data.length; index ++) {
        loadGameCard(data[index]["name"], data[index]["rating"], data[index]["released"],data[index]["background_image"],data[index]["genres"],data[index]["id"])  
      }
      
    })
    // $(".videoGamesContainer").
}
function loadGameCard(name, rating, releaseDate,bgImg,genreArray,id) {
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
  let cardDiv = `<div class = "gameCards"><div class = "gameImgContainer"><img onclick = "websiteView(${id})" class = "gameImages" src = ${bgImg}></div><div class = "descriptions"><p>${name} has a rating of ${rating}<br>Release Date: ${releaseDate}<br>${genreString}</p></div></div>`;
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
      loadGameCard(data[ind]["name"],data[ind]["rating"],data[ind]["released"],data[ind]["background_image"],data[ind]["genres"],data[ind]["id"]);
    }
  })
})

function setupDropdownMenu() {
  fetch(genreAPIURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    for (let index = 0; index < json["results"].length; index ++) {
      genreList.push(json["results"][index]["name"]);
    }
    
    for (let ind = 0; ind < genreList.length; ind ++) {
      let option = document.createElement("option");
      option.value = genreList[ind];
      option.text = genreList[ind];
      // option.setAttribute("class","options");
       $(".genreSelect").append(option);
    }
  })
}



  // let selectedOption = $(".genreSelect").options($(".genreSelect").selectedIndex);
loadInitWebpage();
setupDropdownMenu();

$(".genreSelect").change(function() {
    // console.log("epic"); // work on this to event handle based on genre selection or alternatively use buttons
  let optionSelected = $("option:selected", this);
  let genre = optionSelected[0].label;
  if (genre != "Select Genres") { // then it is a valid input and search based on genre
    let newAPIURL = apiURL + "&genres=" + genre.toLowerCase();
  fetch(newAPIURL)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    $(".videoGamesContainer").empty();
    let data = json["results"];
    console.log(data);
    for (let ind = 0; ind < data.length; ind ++) {
      loadGameCard(data[ind]["name"],data[ind]["rating"],data[ind]["released"],data[ind]["background_image"],data[ind]["genres"],data[ind]["id"]);
    } 
  })
  }
  
})

function websiteView(gameID) {
  let apiCall = "https://api.rawg.io/api/games/" + gameID + "?key=8ebef05b9cf54a87969c47f921a9be58"; //fetch info not working
  fetch(apiCall)
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    window.location = json["website"];
  })
}
