import { menu } from './menu.js';

function viewMenu(section) {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
}

let totalPrice = 0;
let checkoutItems = [];

// Function to add items to the checkout list
function addToCheckout(item, price) {
    checkoutItems.push({ name: item, price: price });
    totalPrice += price;

    // Ensure that the total price is updated both in the console and in the DOM
    console.log("Updated Total Price: ", totalPrice);

    updateCheckoutList();
    updateTotalPriceDisplay();
}

// Function to update the checkout list display
function updateCheckoutList() {
    const checkoutList = document.getElementById('checkoutList');
    checkoutList.innerHTML = ''; // Clear existing list

    if (checkoutItems.length === 0) {
        checkoutList.innerHTML = '<p class="text-center">No items added to checkout.</p>';
    } else {
        checkoutItems.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            const removeButton = document.createElement('button');
            removeButton.className = 'btn btn-danger btn-sm remove-btn';
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => removeFromCheckout(index, item.price);

            listItem.appendChild(removeButton);
            checkoutList.appendChild(listItem);
        });
    }
}

// Function to remove items from the checkout list
function removeFromCheckout(index, price) {
    checkoutItems.splice(index, 1);
    totalPrice -= price;

    // Ensure that the total price is updated both in the console and in the DOM
    console.log("Updated Total Price (after removal): ", totalPrice);

    updateCheckoutList();
    updateTotalPriceDisplay();
}

// Function to update the total price display
function updateTotalPriceDisplay() {
    // Display the updated total price
    document.getElementById('total-amount').textContent = `Total: $${totalPrice.toFixed(2)}`;
}

// Function to handle order placement
let placebtn = document.getElementById('place-order-btn')
placebtn.addEventListener('click', function placeOrder() {
    if (checkoutItems.length === 0) {
        alert('No items in checkout.');
    } else {
        alert('Your order has been placed!');
        checkoutItems = [];
        totalPrice = 0; // Reset total price
        updateCheckoutList();
        updateTotalPriceDisplay(); // Update the total price display after resetting
    }
})


// Dynamically render menu items from the imported menu object
menu.forEach(i => {
    console.log(i);
    let div = document.createElement("div");
    div.className = "m-3 w-25"
    let h4 = document.createElement("h4");
    h4.textContent = i.type;
    let ul = document.createElement("ul");
    ul.className = "list-group";

    i.menu.forEach(j => {
        let li = document.createElement("li");
        li.className = "list-group-item menu-item d-flex justify-content-between align-items-center";

        let itemName = document.createElement("div");
        itemName.textContent = j.item;
        let price = document.createElement("div");
        price.textContent = `Rs ${j.price}`;

        li.appendChild(itemName);
        li.appendChild(price);
        ul.appendChild(li);

        li.addEventListener('click', function () {
            addToCheckout(j.item, j.price);
        });
    });

    div.appendChild(h4);
    div.appendChild(ul);
    document.getElementById("menu-items").appendChild(div);
});

// Initialize the total amount on page load
updateTotalPriceDisplay();
