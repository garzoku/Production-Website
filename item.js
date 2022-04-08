$main = document.querySelector("main")
const queryString = new URLSearchParams(window.location.search)


fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${queryString.get('category')}`)
    .then(response => response.json())
    .then(parsedResponse => {
        createHtml(parsedResponse)
        setMapLocations(parsedResponse)
    })




function createHtml(item) {
    const pageTitle = document.querySelector("#landing-title p")
    pageTitle.textContent = capitalizeStrings(`${item.data.category}`)
    const $div = document.querySelector("#landing-title")
    const $section = document.createElement("section")
    $section.id = "item-profile"
    $section.innerHTML = `
                <figure>
                    <img src="${item.data.image}" alt="${capitalizeStrings(item.data.name)}">
                    <figcaption>
                        <h3>${capitalizeStrings(item.data.name)}</h3>
                        <p>${item.data.description}</p>
                        <ul id="optional-data"></ul>
                    </figcaption>
                </figure>
                 <div id="interactive-map">
                    <section>
                    <h4>Common Locations</h4>
                    <ul></ul>
                    <div>
                        <iframe src="https://www.zeldadungeon.net/breath-of-the-wild-interactive-map/" title="interactive map of hyrule"></iframe
                    </div>
                    </section>
                </div>
    `
    $div.append($section)

    switch (item.data.category) {
        case "treasure":
            const $ul = document.querySelector("#optional-data")
            item.data.drops.forEach(element => {
                const $li = document.createElement("li")
                $li.innerHTML = `
        <figure>
            <img src="" alt="">
            <figcaption>${element}</figcaption>
        </figure>
        `
                $ul.append($li)
            });
            break;

        default:
            break;
    }
}
function setMapLocations(item) {
    const $ul = document.querySelector("#interactive-map ul")
    item.data.common_locations.forEach(location => {
        const $li = document.createElement("li")
        $li.textContent = `${location}`
        $ul.append($li)
    })
}
function setDrops() {

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