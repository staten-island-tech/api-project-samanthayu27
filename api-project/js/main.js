import '../styles/style.css';
import { DOMselectors } from "./domselectors";

const URL = 'https://genshinlist.com/api/characters';
let data; 
//the let data makes the variable data more widely available 

async function getData(URL) {

    try {
        const response = await fetch(URL);
        //requesting a response to REST API's

        if (response.status !== 200) {
            throw new Error(response.statusText);
        }

        data = await response.json(); 
        //converts response to JSON
        console.log(data);

        makeCard(data);

    } catch (error) {
        console.log(error, "uhm idk dont ask me");
        //says this in the console if the api doesnt work but i made a card instead hehehehe 
    }
}

function clearHTMLFields() {
    DOMselectors.cardcontainer.innerHTML = "";
    //resets the cards in the card container
}

function clearSearch() {
    DOMselectors.searchfor.value = "";
    //resets the search bar to clear 
}

function makeCard(data) {
    clearHTMLFields();

    data.forEach(obj => {
        DOMselectors.cardcontainer.insertAdjacentHTML(
            "beforeend",
            //beforeend puts the cards inside the target element, after the last child (a child is something directly below and connected to an element)
            `<div class="card">
                <h2 class="name">${obj.name}</h2>
                <h3 class="description">${obj.description}</h3>
            </div>`
        );
    });
}

function filtering() {
    DOMselectors.buttons.forEach((btn) => btn.addEventListener("click", function () {
        let category = btn.textContent.toLowerCase();
        //converts the label on the button to lowercase because "Pyro" is different from "pyro" etc etc 
        let newArr = data.filter((el) => el.vision.toLowerCase() === category);
        //says that if the lowercased label is equal to the vision, then run the function make card 
        makeCard(newArr);
    }));
}

getData(URL);
filtering();

DOMselectors.form.addEventListener("submit", function (event) {
    event.preventDefault();
    //prevents the site from reloading anytime something is put into the search bar
    clearHTMLFields();
    //clears the html of any exisiting cards 
    const lowercased = DOMselectors.searchfor.value.toLowerCase();
    //collects whatever the user inputted into the seach bar
    const finder = data.find((el) => el.name.toLowerCase() === lowercased);
    //searches through the data/api to match whatever was inputted into the search bar
    clearSearch();
    //clears the search **DONT PUT THE FUNCTION BEFORE THE CODE ACTUALLY DOES ANY SEARCHING BECUASE IT WILL CLEAR THE SEARCH FIELD BEFORE ACTUALLY SEARCHING FOR THE CHARACTER**

    if (finder) {
        makeCard([finder]);
        //if the code was able to find a character that matches with whatever the user inputs, make a card
    } else {
        DOMselectors.cardcontainer.innerHTML = ` 
      <div class = "errorcard">
      <h5> rat god said that this genshin character could not be found so check ur spelling or wait another eternity for this api to be updated</h5>
        <img src = "https://media.tenor.com/g7qJiz2zYZsAAAAC/nuh-uh-rat.gif" alt="nuhuh">
    </div>`

        //says this if the code didnt manage to find anything 
    }
});
