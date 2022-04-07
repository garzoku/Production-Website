$main = document.querySelector("main")

function createNavLinks() {
    const $ul = document.querySelector("ul")
    fetch(`https://botw-compendium.herokuapp.com/api/v2/all`)
        .then(response => response.json())
        .then(parsedResponse => {
            console.log(parsedResponse)
            createNavLinkHtml($ul, parsedResponse)
        })


}

function createNavLinkHtml(element) {
    $li = document.createElement("li")
    $li.innerHTML = `
        <li>
            <a href="category.html?category=treasure">Treasure</a>
        </li>
                <li>
            <a href="category.html?category=equipment">Equipment</a>
        </li>
                <li>
            <a href="category.html?category=materials">Materials</a>
        </li>
                <li>
            <a href="category.html?category=monsters">Monsters</a>
        </li>
    `
    element.append($li)
}

createNavLinks()