import data from "./acetaminophen_results.js";
import { Drug } from "./Drugs.js";

const results = data.results;

const resultContainer = document.getElementById("resultContainer");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById('searchButton');

resultContainer.innerHTML = Drug.searchDrugs(results, "").map(
    ( drug ) => new Drug(drug).toHtml() + "\n"
)

const searchDrugs = ( drugSearch ) => {
    resultContainer.innerHTML = Drug.searchDrugs(results, drugSearch).map(
        ( drug ) => new Drug(drug).toHtml() + "\n"
    )
}

searchInput.oninput = ( event ) => {
    searchDrugs(searchInput.value);
}

searchButton.onclick = ( event ) => {
    searchDrugs(searchInput.value);
}
