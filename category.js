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
    if (queryString === "creatures") {
        fetch(`https://botw-compendium.herokuapp.com/api/v2/category/${queryString}`)
            .then(response => response.json())
            .then(parsedResponse => {
                getArrayOfAllCreatures(parsedResponse)
                    .forEach(item => createHtml(item))
            }).catch(error => {
                console.error(error.message)
                throwError()
            })
    } else {
        fetch(`https://botw-compendium.herokuapp.com/api/v2/category/${queryString}`)
            .then(response => response.json())
            .then(parsedResponse => {
                parsedResponse.data.map(item => {
                    createHtml(item)
                })
            }).catch(error => {
                console.error(error.message)
                throwError()
            })
    }
}

function loadSearchResults(queryString) {
    const filterItems = []
    fetch(`https://botw-compendium.herokuapp.com/api/v2/all`)
        .then(response => response.json())
        .then(parsedResponse => {
            const allItems = parsedResponse.data
            setFilteredItems(allItems, filterItems, queryString)
            if (filterItems.length === 0)
                throw new Error(searchError())
            filterItems.forEach(item => {
                fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${item.name}`)
                    .then(response => response.json())
                    .then(parsedResponse => {
                        createHtml(parsedResponse.data)
                    }).catch(error => {
                        console.error(error.message)
                        throwError()
                    })
            })
        }).catch(error => {
            console.error(error.message)
            throwError()
        })
}

function createHtml(item) {
    const pageTitle = document.querySelector("#landing-title p")
    pageTitle.textContent = capitalizeStrings(`${item.category}`)
    const $ul = document.querySelector("ul")
    const $li = document.createElement("li")
    $li.id = "item-select"
    $li.innerHTML = `
            <a href="item.html?category=${item.id}">
                <figure>
                    <img src="${item.image}" alt="${item.name}">
                    <figcaption>
                        <p>${capitalizeStrings(item.name)}</p>
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

function setFilteredItems(items, filterItems, queryString) {
    items.creatures.food.forEach(item => {
        if (item.name.includes(`${queryString}`))
            filterItems.push(item)
    })
    items.creatures.non_food.forEach(item => {
        if (item.name.includes(`${queryString}`))
            filterItems.push(item)
    })
    items.equipment.forEach(item => {
        if (item.name.includes(`${queryString}`))
            filterItems.push(item)
    })
    items.monsters.forEach(item => {
        if (item.name.includes(`${queryString}`))
            filterItems.push(item)
    })
    items.materials.forEach(item => {
        if (item.name.includes(`${queryString}`))
            filterItems.push(item)
    })
    items.treasure.forEach(item => {
        if (item.name.includes(`${queryString}`))
            filterItems.push(item)
    })
}

function getArrayOfAllCreatures(object) {
    const creatureFoods = object.data.food.map(item => item)
    const creatureNonFoods = object.data.non_food.map(item => item)
    return [...creatureFoods, ...creatureNonFoods]
}