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
    $li = document.createElement("li")
    $li.innerHTML = `
        <li>
            <figure id="category-list-item">
                <img src="${equipment.image}" alt="${equipment.name}">
                <figcaption>
                    <a href="category.html?category=${equipment.id}">${equipment.name}</a>
                </figcaption>
            </figure>   
        </li>
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