$main = document.querySelector("main")


fetchImage()



function fetchImage() {
    const imageIds = ["386", "224", "171", "148"]
    imageIds.forEach(id => {
        fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${id}`)
            .then(response => response.json())
            .then(parsedResponse => {
                createHtml(parsedResponse)
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
            <img src="${image.data.image}" alt="${image.data.name}">
            <figcaption>
                <p>${image.data.category}</p>
            </figcaption>
        </figure>
    </a>
     `
    $ul.append($li)
}