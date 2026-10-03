const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 1499,
        icon: "🎧"
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 2499,
        icon: "⌚"
    },

    {
        id: 3,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 1299,
        icon: "🔊"
    },

    {
        id: 4,
        name: "Casual T-Shirt",
        category: "fashion",
        price: 699,
        icon: "👕"
    },

    {
        id: 5,
        name: "Running Shoes",
        category: "fashion",
        price: 1999,
        icon: "👟"
    },

    {
        id: 6,
        name: "Denim Jacket",
        category: "fashion",
        price: 1799,
        icon: "🧥"
    },

    {
        id: 7,
        name: "Backpack",
        category: "accessories",
        price: 999,
        icon: "🎒"
    },

    {
        id: 8,
        name: "Sunglasses",
        category: "accessories",
        price: 599,
        icon: "🕶️"
    }
];


let cart = JSON.parse(
    localStorage.getItem("cart")
) || [];


// DISPLAY PRODUCTS

function displayProducts() {

    const container =
        document.getElementById("productContainer");

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    const category =
        document.getElementById("categoryFilter")
        .value;


    const filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                .toLowerCase()
                .includes(search);

            const matchesCategory =
                category === "all" ||
                product.category === category;

            return matchesSearch && matchesCategory;
        });


    container.innerHTML = "";


    if (filteredProducts.length === 0) {

        container.innerHTML =
            "<p>No products found.</p>";

        return;
    }


    filteredProducts.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="category">
                    ${product.category}
                </p>

                <p class="price">
                    ₹${product.price}
                </p>

                <button
                    class="add-btn"
                    onclick="addToCart(${product.id})">

                    Add to Cart

                </button>

            </div>
        `;


        container.appendChild(card);

    });

}


// ADD TO CART

function addToCart(id) {

    const product =
        products.find(p => p.id === id);

    cart.push(product);

    saveCart();

    updateCartCount();

    alert(
        product.name +
        " added to cart!"
    );
}


// SAVE CART

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// UPDATE CART COUNT

function updateCartCount() {

    document.getElementById(
        "cartCount"
    ).textContent = cart.length;
}


// SHOW CART

function showCart() {

    const modal =
        document.getElementById("cartModal");

    const cartItems =
        document.getElementById("cartItems");

    const cartTotal =
        document.getElementById("cartTotal");


    modal.style.display = "block";

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML =
            "<p>Your cart is empty.</p>";

        cartTotal.textContent = "0";

        return;
    }


    let total = 0;


    cart.forEach((item, index) => {

        total += item.price;


        const div =
            document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `

            <span>
                ${item.icon}
                ${item.name}
            </span>

            <span>
                ₹${item.price}

                <button
                    onclick="removeFromCart(${index})">

                    ❌

                </button>
            </span>

        `;


        cartItems.appendChild(div);

    });


    cartTotal.textContent = total;

}


// REMOVE FROM CART

function removeFromCart(index) {

    cart.splice(index, 1);

    saveCart();

    updateCartCount();

    showCart();
}


// CLOSE CART

function closeCart() {

    document.getElementById(
        "cartModal"
    ).style.display = "none";
}


// CHECKOUT

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "Thank you for shopping with ShopEase!"
    );


    cart = [];

    saveCart();

    updateCartCount();

    closeCart();
}


// INITIAL LOAD

displayProducts();

updateCartCount();
