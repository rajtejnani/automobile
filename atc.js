let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');
let partsContainerHTML = document.querySelector('.parts-container');
let listcartHTML = document.querySelector('.listcart');
let iconCartSpan = document.querySelector('.icon-cart span');
let checkoutButton = document.querySelector('.checkOut');

let partsContainer = [];
let carts = [];

// Toggle cart visibility
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// Add data to the HTML container
const addDataToHTML = () => {
    partsContainerHTML.innerHTML = '';
    if (partsContainer.length > 0) {
        partsContainer.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.innerHTML = `
                <div class="box">
                <img src="${product.image}" alt="">
                <h3>${product.name}</h3>
                <div class="price">$${product.price}</div>
                <i class="bx bxs-star">(6 Reviews)</i>
                <a href="#" class="btn">Buy Now</a>
                <a class="details" href="#">
                View Details
                </a>
                <button class="addCart" data-id="${product.id}">
                    Add To Cart
                </button>
                </div>
            `;
            partsContainerHTML.appendChild(newProduct);
        });
    }
};

// Handle clicks on "Add To Cart" button
partsContainerHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id = positionClick.getAttribute('data-id'); // Retrieve product_id from data attribute
        addToCart(product_id);
    }
});

// Add product to the cart
const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity += 1;
    }
    addToCartHTML();
    addToCartMemory();
};

const addToCartMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

// Update the cart HTML
const addToCartHTML = () => {
    listcartHTML.innerHTML = ''; // Clear the cart display before updating
    let totalQuantity = 0;
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = partsContainer.findIndex((value) => value.id == cart.product_id);
            let info = partsContainer[positionProduct];
            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    $${info.price * cart.quantity}
                </div>
                <div class="quantity">
                    <span class="minus">-</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">+</span>
                </div>
            `;
            listcartHTML.appendChild(newCart);
        });
    }
    iconCartSpan.innerText = totalQuantity;
};
listcartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = 'minus';
    if (positionClick.classList.contains('plus')){
        type = 'plus';
    }
    changeQuantity(product_id, type);
    }
})

// Initialize the application
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        switch (type) {
            case 'plus':
            carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
            break;

            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addToCartMemory();
    addToCartHTML();
}
const initApp = () => {
    fetch('product.json')
    .then(Response => Response.json())
    .then(data => {
        partsContainer = data;
        addDataToHTML();

        // get cart from memory
        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addToCartHTML();
        }
    })
    .catch(error => {
        console.error('Error fetching product data:', error);
    });
};

initApp();

// Check out Button---

checkoutButton.addEventListener('click', () => {
    alert("Thank you for your purchase! Your order has been successfully placed.");
    clearCart();
});

const clearCart = () => {
    carts = [];
    addToCartHTML();
    addToCartMemory();
}