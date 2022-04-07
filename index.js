$main = document.querySelector("main")

fetch(`https://botw-compendium.herokuapp.com/api/v2/all`)
    .then(response => response.json())
    .then(parsedResponse => {
        console.log(parsedResponse)
        createHtml()
    })




function createHtml() {
    const $ul = document.querySelector("ul")
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
    $ul.append($li)
}