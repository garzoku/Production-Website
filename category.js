$main = document.querySelector("main")
const queryString = new URLSearchParams(window.location.search)

fetch(`https://botw-compendium.herokuapp.com/api/v2/category/${queryString.get('category')}`)
    .then(response => response.json())
    .then(parsedResponse => {
        const imageUrls = parsedResponse.data.map(item => {
            createHtml(item)
        })
    })




function createHtml(equipment) {
    const pageTitle = document.querySelector("#landing-title p")
    pageTitle.textContent = capitalizeStrings(`${equipment.category}`)
    const $ul = document.querySelector("ul")
    const $li = document.createElement("li")
    $li.id = "item-select"
    $li.innerHTML = `
            <a href="category.html?category=${equipment.id}">
                <figure>
                    <img src="${equipment.image}" alt="${equipment.name}">
                    <figcaption>
                        <p>${equipment.name}</p>
                    </figcaption>
                </figure>
            </a>
    `
    $ul.append($li)
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