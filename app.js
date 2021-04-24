fetch("https://rickandmortyapi.com/api/episode")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderEpisodes(data);
  });

function renderEpisodes(data) {
  document.querySelector("#episodes").innerHTML = " <h1>Episodes</h1> ";
  data.results.forEach((element) => {
    let title = document.createElement("h6");
    title.textContent = element.episode + " " + element.name;
    title.addEventListener("click", () => renderCharacters(element.characters));
    document.querySelector("#episodes").appendChild(title);
  });
  createNavButtons(data);
}

function createNavButtons(data) {
  const buttonContainer = document.createElement("div");
  const nextPage = document.createElement("button");
  const previousPage = document.createElement("button");
  buttonContainer.classList.add("navButtons");
  nextPage.innerText = "Next";
  previousPage.innerText = "Previous";

  //disable buttons
  if (!data.info.prev) {
    previousPage.setAttribute("disabled", true);
  }

  if (data.info.next === null) {
    nextPage.setAttribute("disabled", true);
  }

  //event listeners
  nextPage.addEventListener("click", () => fetchEpisodesList(data.info.next));
  previousPage.addEventListener("click", () =>
    fetchEpisodesList(data.info.prev)
  );

  //append buttons
  buttonContainer.appendChild(previousPage);
  buttonContainer.appendChild(nextPage);
  document.querySelector("#episodes").appendChild(buttonContainer); //appending the button div to the page
}

function fetchEpisodesList(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderEpisodes(data);
    });
}

function renderCharacters(dataArray) {
  //console.log(dataArray);
  document.querySelector("#characters").innerHTML = " ";
  dataArray.forEach((characterURL) => {
    fetch(characterURL)
      .then((res) => res.json())
      .then((data) => characterCard(data));
  });
}

function characterCard(characterObj) {
  let card = document.createElement("div");
  let img = document.createElement("img");
  let title = document.createElement("h5");
  card.classList.add("characterCard"); //adding a class of "card"
  img.classList.add("characterImage");
  title.classList.add("characterName");
  img.setAttribute("src", characterObj.image);
  title.innerText = characterObj.name;
  card.appendChild(img);
  card.appendChild(title);
  document.appendChild("#characters").appendChild(card); //appending both the image and the title to the div card
}
