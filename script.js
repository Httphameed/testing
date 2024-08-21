function validateForm() {
	var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

   if (name === "" || email === "" || message === "") {
  alert("All fields must be filled out");
  return false;
}
alert("Form submitted successfully!");
return true;
}
// Function to add items to the shopping bag
function addToCart(productName, productPrice, productImage) {
    // Get the current cart from localStorage, or create an empty one if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const itemIndex = cart.findIndex(item => item.name === productName);

    // If it is, increase the quantity
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += 1;
    } else {
        // If it isn't, add the new product to the cart
        cart.push({
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Item added to the shopping bag');
}

// Function to load items from the cart into the shopping bag page
function loadCartItems() {
    // Get the current cart from localStorage, or create an empty one if it doesn't exist
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const bagItemsBody = document.getElementById('bag-items-body');
    let subtotal = 0;

    // Loop through the items in the cart and create HTML for each one
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        // Create a table row for each item
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name}</p>
            </td>
            <td>£${item.price}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)"></td>
            <td>£${itemTotal}</td>
            <td><button class="remove-item" onclick="removeItem('${item.name}')">Remove</button></td>
        `;
        bagItemsBody.appendChild(tr);
    });

    // Update the subtotal and total prices
    document.getElementById('subtotal').innerText = `Subtotal: £${subtotal}`;
    document.getElementById('total').innerText = `Total: £${subtotal + 20}`;
}

// Function to update the quantity of an item in the cart
function updateQuantity(productName, quantity) {
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.name === productName);

    // Update the quantity of the specified item
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = parseInt(quantity);
    }

    // Save the updated cart to localStorage and reload the page
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

// Function to remove an item from the cart
function removeItem(productName) {
    // Get the current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filter out the item to be removed
    cart = cart.filter(item => item.name !== productName);

    // Save the updated cart to localStorage and reload the page
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
}

// Load cart items when the shopping bag page loads
if (document.getElementById('bag-items-body')) {
    window.onload = loadCartItems;
}

