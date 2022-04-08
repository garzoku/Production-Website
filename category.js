$main = document.querySelector("main")
const queryString = new URLSearchParams(window.location.search)

switch (`${queryString.get('category')}`) {
    case "monsters":
    case "materials":
    case "equipment":
    case "treasure":
    case "creatures":
        loadCategoryResults(`${queryString.get('category')}`)
        break;
    default:
        loadSearchResults(`${queryString.get('category')}`)
        break;
}


function loadCategoryResults(queryString) {
    fetch(`https://botw-compendium.herokuapp.com/api/v2/category/${queryString}`)
        .then(response => response.json())
        .then(parsedResponse => {
            parsedResponse.data.map(item => {
                createHtml(item)
            })
        }).catch(error => {
            console.error(error)
        })
}

function loadSearchResults(queryString) {
    const filterItems = []
    fetch(`https://botw-compendium.herokuapp.com/api/v2/category/equipment`)
        .then(response => response.json())
        .then(parsedResponse => {
            const allItems = parsedResponse.data
            allItems.forEach(item => {
                if (item.name.includes(`${queryString}`))
                    filterItems.push(item)
            })
            console.log(filterItems)
            if (filterItems.length === 0)
                throw new Error(searchError())
            filterItems.forEach(item => {
                fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${item.name}`)
                    .then(response => response.json())
                    .then(parsedResponse => {
                        createHtml(parsedResponse.data)
                    }).catch(error => {
                        console.error(error)
                    })

            })
        }).catch(error => {
            console.error(error)
        })
}

function processUserInput(queryString) {

}

function createHtml(equipment) {
    const pageTitle = document.querySelector("#landing-title p")
    pageTitle.textContent = capitalizeStrings(`${equipment.category}`)
    const $ul = document.querySelector("ul")
    const $li = document.createElement("li")
    $li.id = "item-select"
    $li.innerHTML = `
            <a href="item.html?category=${equipment.id}">
                <figure>
                    <img src="${equipment.image}" alt="${equipment.name}">
                    <figcaption>
                        <p>${capitalizeStrings(equipment.name)}</p>
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

function throwError() {
    window.location.assign("error.html");
}