import menuArray from "./data.js";

const itemWrapper = document.querySelector('#item-wrapper')

renderMenu()

function addBtn() {
    const addBtn = document.querySelector('#add-btn')
}

function getMenuHTML(arr) {
    return arr.map(item => {
    return `
    <div class="item">
        <div class="item-group">
            <p id="item-image">${item.emoji}</p>
            <div class="item-info">
                <h1 id="name">${item.name}</h1>
                <p id="ingredients">${item.ingredients}</p>
                <p id="price">$${item.price}</p>
            </div>
        </div>
        <button id="add-btn">+</button>
    </div>
    <div class="divider"></div>
    `
    })

}

function renderMenu() {
    itemWrapper.innerHTML = getMenuHTML(menuArray).join("")
}

