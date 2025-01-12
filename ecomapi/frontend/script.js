document.addEventListener("DOMContentLoaded", async function () {
    const productList = document.getElementById("product-list");
    const cartButton = document.getElementById("cart");

   
    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    
    function updateCartDisplay() {
        const totalItems = Object.values(cart).reduce((sum, item) => sum + item[0], 0); 
        cartButton.innerHTML = `Cart(${totalItems})`;
    }

    
    updateCartDisplay();

    try {
        
        const response = await axios.get('http://127.0.0.1:8000/productlist/');
        const products = response.data;

        products.forEach((product) => {
            
            const productCard = document.createElement("div");
            productCard.className = "product-card";

            productCard.innerHTML = `
                <img src="${product.img}" alt="${product.title}" class="product-img">
                <h2 class="product-title" id="nm${product.id}">${product.title}</h2>
                <p class="product-price" id="price${product.id}">${product.price}</p>
                <p class="product-category">Category: ${product.category}</p>
                <p class="product-description">${product.description}</p>
                <button class="add-to-cart-btn" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">Add to Cart</button>
            `;

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        productList.innerHTML = `<p>Failed to load products. Please try again later.</p>`;
    }

   
    productList.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart-btn")) {
            const item_id = event.target.getAttribute("data-id");
            const item_name = event.target.getAttribute("data-title");
            const item_price = parseFloat(event.target.getAttribute("data-price"));

            
            if (cart[item_id] != undefined) {
                cart[item_id][0] += 1; 
                cart[item_id][2] += item_price; 
            } else {
                cart[item_id] = [1, item_name, item_price]; 
            }

            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    
    cartButton.addEventListener("click", function () {
       
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "checkout.html"; 
    });
});
