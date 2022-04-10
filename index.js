const $main = document.querySelector("main")
const spinner = document.createElement("div")
const spinnerImage = document.createElement("img")
spinner.append(spinnerImage)
const $input = document.querySelector("input")
$input.addEventListener("change", refreshData);
const itemIds = ["1", "386", "224", "171", "148"]

document.addEventListener('DOMContentLoaded', (event) => {
    displayLoadingIcon()
})

itemIds.forEach(id => {
    fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${id}`)
        .then(response => response.json())
        .then(parsedResponse => {
            createHtml(parsedResponse)
        }).catch(error => {
            console.error(error.message)
            throwError()
        })
});
function createHtml(item) {
    const $ul = document.querySelector("ul")
    const $li = document.createElement("li")
    $li.id = "category-select"
    $li.innerHTML = `
    <a href="category.html?category=${item.data.category}">
        <figure>
            <img src="${item.data.image}" alt="${capitalizeStrings(item.data.name)}">
            <figcaption>
                <p>${capitalizeStrings(item.data.category)}</p>
            </figcaption>
        </figure>
    </a>
     `
    $ul.append($li)
}

function refreshData(e) {
    const nameOfItem = e.target.value;
    const url = (`https://botw-compendium.herokuapp.com/api/v2/category/${nameOfItem}`)
    fetch(url)
        .then((response) => response.json())
        .catch(error => {
            console.error(error.message)
            throwError()
        })
}

function capitalizeStrings(string) {
    if (string.includes(" ")) {
        const strings = string.split(" ").map(element => {
            return `${element.slice(0, 1).toUpperCase()}${element.slice(1, element.length)}`
        });
        return `${strings[0]} ${strings[1]}`
    }
    else
        return `${string.slice(0, 1).toUpperCase()}${string.slice(1, string.length)}`
}

function throwError() {
    window.location.assign("error.html");
}

function displayLoadingIcon() {
    spinner.classList.add('spinner')
    spinnerImage.src = 'image/loading-icon.gif'
    $main.append(spinner)
}

function hideSpinner() {
    spinner.classList.add("hidden")
}