let expand_cart_btn = document.getElementById("cart-expand");
let expand_cart_arrow = document.getElementById("cart-arrow");
let cart_content = document.querySelector(".cart-content");

let expand_filters_btn = document.getElementById("filters-expand");
let expand_filters_arrow = document.getElementById("filters-arrow");
let filters_content = document.querySelector(".filter-content");

expand_cart_btn.addEventListener('click', () => 
{
    if (!expand_cart_btn.classList.contains('active')) 
    {
        expand_cart_btn.classList.add('active');
        showExpandedContent(cart_content);
        rotateArrow(expand_cart_arrow)
    } 
    else 
    {
        expand_cart_btn.classList.remove('active');
        hideExpandedContent(cart_content);
        disableRotationArrow(expand_cart_arrow)
    }
});

expand_filters_btn.addEventListener('click', () => 
{
    if (!expand_filters_btn.classList.contains('active')) 
    {
        expand_filters_btn.classList.add('active');
        showExpandedContent(filters_content);
        rotateArrow(expand_filters_arrow);
    } 
    else 
    {
        expand_filters_btn.classList.remove('active');
        hideExpandedContent(filters_content);
        disableRotationArrow(expand_filters_arrow)
    }
});

function showExpandedContent(content) 
{
    content.style.display = "flex";
    content.style.flexDirection = "column";
    content.style.gap = "10px";
}

function hideExpandedContent(content) 
{
    content.style.display = "none";
}

function rotateArrow(arrow) 
{
    arrow.classList.add("rotated-arrow")
}

function disableRotationArrow(arrow) 
{
    arrow.classList.remove("rotated-arrow")
}

class Good {
    company = "company";
    name = "name";
    price = 0;
    constructor(company, name, price) {
        this.company = company;
        this.name = name;
        this.price = price;
    }
}

class GoodCard {
    good = null;
    addToCartButton = null;
    constructor(good, addToCardButton) {
        this.good = good;
        this.addToCardButton = addToCardButton;
    }
}

class GoodInCart {
    good = null;
    cartNode = null;
    constructor(good, cartNode) {
        this.good = good;
        this.cartNode = cartNode;
    }
}

var DOMgoodsInCart = document.querySelector(".cart-summary-amount-value");
var DOMtotalCartPrice = document.querySelector(".cart-summary-price-value");
var cart = [];
var goodCards = [];
var boxes = document.querySelectorAll(".box");
var goodCardPrototype = document.querySelector(".cart-good");
initializeGoods();
checkPurchase();

function initializeGoods() {
    for (i = 0; i < boxes.length; i++) 
    {
        let currentName = boxes[i].querySelector(".box-name").textContent;
        let currentCompany = "";
        if (boxes[i].classList.contains("amd")) {
            currentCompany = "AMD";
        } else {
            currentCompany = "Intel"
        }
        let currentPrice = boxes[i].querySelector(".price").textContent;
        currentPrice = parseInt(currentPrice.slice(0, -1));
        let currentGood = new Good(currentCompany, currentName, currentPrice);
        let currentAddToCartButton = boxes[i].querySelector(".add-to-cart-btn");
        currentAddToCartButton.addEventListener("click", () => {
            addToCart(currentGood);
            if (!expand_cart_btn.classList.contains('active')) {
                expand_cart_btn.click();
            }
        });
        let currentGoodCard = new GoodCard(currentGood, currentAddToCartButton);
        goodCards.push(currentGoodCard);
        
    }
}

function getGoodByName(name) {
    for (i = 0; i < goodCards.length; i++) {
        if (goodCards[i].good.name.trim() == name.trim()) {
            return goodCards[i];
        }
    }
}

function checkPurchase() {
    if (localStorage.getItem("productName") != null) {
        addToCart(getGoodByName(localStorage.getItem("productName")).good);
        expand_cart_btn.click();
        localStorage.removeItem("productName");
    }
} 

function getGoodInCart(good) {
    for (i = 0; i < cart.length; i++) {
        if (cart[i].good.name == good.name) {
            return cart[i];
        }
    }
}

function addToCart(good) {
    if (isAlreadyInCart(good)) {
        let goodInCart = getGoodInCart(good);
        plus(goodInCart);
    } else {
        let newCartNode = goodCardPrototype.cloneNode(true);
        let newGoodInCart = new GoodInCart(Object.assign({}, good), newCartNode);
        
        if (newGoodInCart.good.company == "AMD") {
            newGoodInCart.cartNode.className = "cart-good amd-good";
        } else {
            newGoodInCart.cartNode.className = "cart-good intel-good";
        }
        newGoodInCart.cartNode.querySelector(".good-name").textContent = newGoodInCart.good.name;

        newGoodInCart.cartNode.querySelector(".good-price").textContent = newGoodInCart.good.price + '$';

        newGoodInCart.cartNode.querySelector(".goods-amount").textContent = "1";

        newGoodInCart.cartNode.querySelector(".cart-minus-btn").classList.add("disabled");

        showToltalPrice(newGoodInCart);
        
        newGoodInCart.cartNode.querySelector(".cart-plus-btn").addEventListener('click', () => {
            plus(newGoodInCart);
        });

        newGoodInCart.cartNode.querySelector(".cart-minus-btn").addEventListener('click', () => {
            minus(newGoodInCart);
        });

        newGoodInCart.cartNode.querySelector(".cart-bin-btn").addEventListener('click', () => {
            bin(newGoodInCart);
        });

        cart_content.append(newGoodInCart.cartNode);
        newGoodInCart.cartNode.classList.remove("hidden-cart-good");
        cart.push(newGoodInCart);
        updateSummary();
    }
}

function isAlreadyInCart(good) {
    for (i = 0; i < cart.length; i++) {
        if (cart[i].good.name == good.name) {
            return true;
        }
    }
    return false;
}

function showToltalPrice(goodInCart) {
    let amount =  parseInt(goodInCart.cartNode.querySelector(".goods-amount").textContent);
    let totalPrice = goodInCart.good.price * amount;
    goodInCart.cartNode.querySelector(".total-good-price").textContent = totalPrice + '$';
}

function plus(goodInCart) {
    let amount =  parseInt(goodInCart.cartNode.querySelector(".goods-amount").textContent);
    amount++;
    goodInCart.cartNode.querySelector(".goods-amount").textContent = amount;
    showToltalPrice(goodInCart);
    if (amount > 1) {
        goodInCart.cartNode.querySelector(".cart-minus-btn").classList.remove("disabled");
    }
    updateSummary();
}

function minus(goodInCart) {
    let amount =  parseInt(goodInCart.cartNode.querySelector(".goods-amount").textContent);
    if (amount > 1) {
        amount--;
        goodInCart.cartNode.querySelector(".goods-amount").textContent = amount;
        showToltalPrice(goodInCart);
    }
    if (amount == 1) {
        goodInCart.cartNode.querySelector(".cart-minus-btn").classList.add("disabled");
    }
    updateSummary();
}

function bin(goodInCart) {
    let index = cart.indexOf(goodInCart);
    cart.splice(index, 1);
    goodInCart.cartNode.remove();
    updateSummary();
}

function updateTotalCartPrice() {
    totalCartPrice = 0;
    for (i = 0; i < cart.length; i++) {
        let amount = parseInt(cart[i].cartNode.querySelector(".goods-amount").textContent);
        totalCartPrice += cart[i].good.price * amount;
    }
    DOMtotalCartPrice.textContent = totalCartPrice + "$";
}

function updateTotalCartAmount() {
    goodsInCart = 0;
    for (i = 0; i < cart.length; i++) {
        let amount = parseInt(cart[i].cartNode.querySelector(".goods-amount").textContent);
        goodsInCart += amount;
    }
    DOMgoodsInCart.textContent = goodsInCart;
}

function updateSummary() {
    updateTotalCartPrice();
    updateTotalCartAmount();
}

core9_13 = document.getElementById("core9_13");
core9_13.addEventListener("click", () => {
    window.location.href = "corei9_13900k.html";
});

core9_11 = document.getElementById("core9_11");
core9_11.addEventListener("click", () => {
    window.location.href = "corei9_11900K.html";
});

core3_12 = document.getElementById("core3_12");
core3_12.addEventListener("click", () => {
    window.location.href = "corei3_12300.html";
});

r9_7 = document.getElementById("r9_7");
r9_7.addEventListener("click", () => {
    window.location.href = "r9_7950X.html";
});

r7_7 = document.getElementById("r7_7");
r7_7.addEventListener("click", () => {
    window.location.href = "r7_7700X.html";
});

r9_5 = document.getElementById("r9_5");
r9_5.addEventListener("click", () => {
    window.location.href = "r9_5900X.html";
});

