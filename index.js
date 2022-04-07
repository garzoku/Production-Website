$main = document.querySelector("main")


fetchImage()



function fetchImage() {
    const imageIds = ["386", "224", "167", "147"]
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
    $li.id = "category-list-item"
    $li.innerHTML = `
        <img src="${image.data.image}" alt="${image.data.name}">
        <a href="category.html?category=${image.data.category}">${image.data.category}</a>
     `
    $ul.append($li)
}