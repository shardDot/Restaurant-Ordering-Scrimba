import menuArray from "./data.js";

const itemWrapper = document.querySelector('#item-wrapper')
let cart = []

itemWrapper.addEventListener('click', (e) => {
    if(e.target.dataset.id) {
        const selectedItem = menuArray.find(item => item.id == e.target.dataset.id)
        const cartItem = {
            ...selectedItem,
        }

        // Check if cardItem already exist in the array
        if(!cart.find(item => item.id === cartItem.id)) {
            cartItem.quantity = 1
            cart.push(cartItem)
            renderPreCheckout()
        } else {
            cart.find(item => {if(item.id === cartItem.id) {
                item.quantity++
            }})
            renderPreCheckout()
        }
    }
    console.log(cart)
})

document.querySelector('#pre-checkout').addEventListener('click', (e) => {
        if(e.target.classList.contains('remove-btn')) {
            cart = cart.filter(item => item.id != e.target.dataset.id)
            renderPreCheckout()
        }

        if(cart.length === 0) {
            document.querySelector('#pre-checkout').innerHTML = ''
        }
        
})

function getMenuHTML(arr) {
    return arr.map(item => {
        return `
            <div class="item" data-id="${item.id}">
                <div class="item-group">
                    <p id="item-image">${item.emoji}</p>
                    <div class="item-info">
                        <h1 id="name">${item.name}</h1>
                        <p id="ingredients">${item.ingredients.join(", ")}</p>
                        <p id="price">$${item.price}</p>
                    </div>
                </div>
                <button id="add-btn" data-id="${item.id}">+</button>
            </div>
            <div class="divider"></div>
        `
    })

}

function renderMenu() {
    itemWrapper.innerHTML = getMenuHTML(menuArray).join("")
}

renderMenu()

function getCartItemsHTML() {
    return cart.map(item => {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="sec1">
                    <h2 class="name">${item.name} (${item.quantity})</h2>
                    <p class="remove-btn" data-id="${item.id}">remove</p>
                </div>
                <p class="price">$${item.price * item.quantity}</p>
            </div>
        `
    })
    
}

function renderPreCheckout() {
    document.querySelector('#pre-checkout').innerHTML = `
    <h1 id="order-title">Your Order</h1>
    <div class="cart-items">
        ${getCartItemsHTML().join("")}
    </div>
    
    <div class="divider" style="background-color: black; height: 2px; margin-block: 10px;"></div>
    <div class="total-price">
    <h2>Total price:</h2>
    <p>$${cart.reduce((acc, cur) => {
        return acc + cur.price * cur.quantity
    }, 0)}</p>
    </div>
    <button id="complete-order-btn">Complete order</button>
    `
}