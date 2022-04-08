$main = document.querySelector("main")

const $input = document.querySelector("input")
$input.addEventListener("change", refreshData);


fetchImage()

function fetchImage() {
    const imageIds = ["386", "224", "171", "148"]
    imageIds.forEach(id => {
        fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${id}`)
            .then(response => response.json())
            .then(parsedResponse => {
                createHtml(parsedResponse)
            }).catch(error => {
                console.log("Error4")
            })
    });
}
function createHtml(image) {
    const $ul = document.querySelector("ul")
    const $li = document.createElement("li")
    $li.id = "category-select"
    $li.innerHTML = `
    <a href="category.html?category=${image.data.category}">
        <figure>
            <img src="${image.data.image}" alt="${capitalizeStrings(image.data.name)}">
            <figcaption>
                <p>${capitalizeStrings(image.data.category)}</p>
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
            console.log("Error5")
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