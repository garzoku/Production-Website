const $main = document.querySelector('main')
const queryString = new URLSearchParams(window.location.search)
const spinner = document.createElement('div')
const spinnerImage = document.createElement('img')
spinnerImage.alt = 'page loading indicator'
spinner.append(spinnerImage)

document.addEventListener('DOMContentLoaded', (event) => {
    displayLoadingIcon()
})

fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${queryString.get('category')}`)
    .then(response => response.json())
    .then(parsedResponse => {
        createHtml(parsedResponse)
        setMapLocations(parsedResponse)
    }).catch(error => {
        console.error(error.message)
        throwError()
    })

function createHtml(item) {
    const $div = document.querySelector('#landing-item')
    const $section = document.createElement('section')
    $section.id = 'item-profile'
    $section.innerHTML = `
                <figure>
                    <img src="${item.data.image}" alt="${capitalizeStrings(item.data.name)}">
                    <figcaption>
                        <h3>${capitalizeStrings(item.data.name)}</h3>
                        <p>${item.data.description}</p>
                        <div id="optional-data">
                        </div>
                    </figcaption>
                </figure>
                 <div id="interactive-map">
                    <section>
                    <h4>Common Locations</h4>
                    <ul></ul>
                    <div>
                        <iframe src="https://www.zeldadungeon.net/breath-of-the-wild-interactive-map/" title="interactive map of hyrule" SameSite="None; Secure"></iframe
                    </div>
                    </section>
                </div>
    `
    $div.append($section)
    setDrops(item)
}
function setMapLocations(item) {
    const $ul = document.querySelector('#interactive-map ul')
    if (!item.data.common_locations) {
        const $li = document.createElement('li')
        $li.textContent = 'No common locations. How mysterious....'
        $ul.append($li)
    } else {
        item.data.common_locations.forEach(location => {
            const $li = document.createElement('li')
            const $span = document.createElement('span')
            $span.innerHTML = `<span id="${location.slice(0, 3)}">${location}</span><button id="${location.slice(1, 3)}" onclick="copyToClipboard('${location.slice(0, 3)}')">Copy</button>`
            $ul.append($li)
            $li.append($span)
        })
    }
}
function setDrops(item) {
    const $div = document.querySelector('#optional-data')
    const $h5 = document.createElement('h5')
    $h5.textContent = 'Drops'
    $div.append($h5)
    const $ul = document.createElement('ul')
    $h5.append($ul)
    if ('drops' in item.data) {
        item.data.drops.forEach(element => {
            const $li = document.createElement('li')
            $li.innerHTML = `
                <div>${capitalizeStrings(element)}</div>
                    `
            $ul.append($li)
        })
    } else {
        const $li = document.createElement('li')
        $li.innerHTML = `
                    <div>${'This item has no drops'}</div>
                        `
        $ul.append($li)
    }
}

function capitalizeStrings(string) {
    if (string.includes(' ')) {
        const strings = string.split(' ').map(element => {
            return `${element.slice(0, 1).toUpperCase()}${element.slice(1, element.length)} `
        })
        return `${strings[0]} ${strings[1]} `
    } else { return `${string.slice(0, 1).toUpperCase()}${string.slice(1, string.length)} ` }
}

function throwError() {
    window.location.assign('error.html')
}

function displayLoadingIcon() {
    spinner.classList.add('spinner')
    spinnerImage.src = 'image/loading-icon.gif'
    $main.append(spinner)
}

function hideSpinner() {
    spinner.classList.add('hidden')
}

function copyToClipboard(elementId) {
    const processedId = `#${elementId}`
    const buttonId = `#${elementId.slice(1, elementId.length)}`
    // Create a "hidden" input
    const hiddenInput = document.createElement('input')
    // Assign it the value of the specified element
    hiddenInput.setAttribute('value', document.querySelector(`${processedId}`).innerHTML)
    document.body.appendChild(hiddenInput)
    hiddenInput.select()
    document.execCommand('copy')
    document.body.removeChild(hiddenInput)
    document.querySelectorAll('button').forEach(button => {
        button.textContent = 'Copy'
    })
    document.querySelector(`${buttonId}`).textContent = 'Copied!'
}
