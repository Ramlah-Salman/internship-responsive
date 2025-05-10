"use strict";
let attributeSection = document.querySelector(".attributes-section");
let cartItem = document.querySelector(".cart-item-grid");

// console.log(cartItem);
// console.log(discountAmount);
// console.log(taxAmount);

{
  /* <div class="attribute-col">
          <div class="img-container">
            <i class="fa-solid fa-lock" style="color: #8b96a5"></i>
          </div>
          <div class="flex-col">
            <p style="font-weight: 700">Secure Payment</p>
            <p>Feel Free to Trust Us</p>
          </div>
        </div> */
}

window.addEventListener("DOMContentLoaded", function () {
  const savedItems = JSON.parse(localStorage.getItem("wishlist")) || [];
  let cartItem = document.querySelector(".cart-item-grid");

  console.table(savedItems);

  function addItemToCart() {
    for (let i = 0; i < savedItems.length; i++) {
      cartItem.innerHTML += `<div class="cart-col-1">
        <div class="cart-1">
          <div class="cart-sub-col-1">
            <img src="${savedItems[i].img_src}" alt="Iphone" />
          </div>
          <div class="cart-sub-col-2">
            <h3 class="item-name">${savedItems[i].name}</h3>
            <p>Model: ${savedItems[i].model}</p>
            <p>Seller: ${savedItems[i].seller}</p>
            <div class="btn-container">
              <button class="remove-btn">Remove</button>
              <button class="save-button">Save for Later</button>
            </div>
          </div>
        </div>
        <div class="cart-2">
          <h4>${savedItems[i].price}</h4>
          <select name="qty-drop-down" class="qty-dropdown" id= "qty" data-index="${i}">
            <option value="Qty:1">Qty:1</option>
            <option value="Qty:2">Qty:2</option>
            <option value="Qty:3">Qty:3</option>
            <option value="Qty:4">Qty:4</option>
            <option value="Qty:5">Qty:5</option>
          </select>
        </div>
      </div>`;
    }
  }

  function itemQuantity() {
    let quantityDropdowns = document.querySelectorAll(".qty-dropdown");

    quantityDropdowns.forEach((dropdown) => {
      dropdown.addEventListener("change", function (event) {
        let value = event.target.value; // e.g., "Qty:3"
        let index = Number(event.target.dataset.index); // get item index
        let quantity = Number(value.split(":")[1]); // extract number
        savedItems[index].quantity = quantity; // store quantity
        totalAmount();
      });
    });
  }

  function totalAmount() {
    let totalAmount = document.querySelector(".total-amount");
    let discountAmount = document.querySelector(".discount-amount");
    let totalPrice = 0;
    let totalDiscountPrice = 0;

    for (let i = 0; i < savedItems.length; i++) {
      let quantity = savedItems[i].quantity || 1; // default to 1
      let itemPrice = Number(savedItems[i].price.slice(1));
      let discountPrice = Number(savedItems[i].discount_price.slice(1));

      totalPrice += itemPrice * quantity;
      totalDiscountPrice += discountPrice * quantity;
    }

    let finalDiscountPrice = totalPrice - totalDiscountPrice;

    totalAmount.innerHTML = `$${totalPrice.toFixed(2)}`;
    totalAmount.style.fontWeight = "600";
    discountAmount.innerHTML = `$${Math.abs(finalDiscountPrice).toFixed(2)}`;
  }
  function removeDataFunctionality() {
    let removeBtns = document.querySelectorAll(".remove-btn");
    let cartItems = document.querySelectorAll(".cart-col-1");

    removeBtns.forEach((button, index) => {
      button.addEventListener("click", function () {
        // Remove item from savedItems array
        savedItems.splice(index, 1);

        // Update localStorage
        localStorage.setItem("wishlist", JSON.stringify(savedItems));

        // Remove from DOM
        cartItems[index].remove();

        // Recalculate totals
        totalAmount();
      });
    });
  }

  addItemToCart();
  itemQuantity();
  totalAmount(); // Initial render
  removeDataFunctionality();
});

function attributeContainer() {
  const paragraph = [
    "Feel Free to Trust Us",
    "Provide you a best customer support",
    "Enjoy your free delivery",
  ];

  const heading = ["Secure Heading", "Customer Support", "Free Delivery"];
  const icon = ["fa-solid fa-lock", "fa-solid fa-message", "fa-solid fa-truck"];

  attributeSection.innerHTML = ""; // Clear existing content
  for (let i = 0; i < 3; i++) {
    attributeSection.innerHTML += `<div class="attribute-col">
          <div class="img-container">
            <i class="${icon[i]}" style="color: #8b96a5"></i>
          </div>
          <div class="flex-col">
            <p style="font-weight: 700">${heading[i]}</p>
            <p>${paragraph[i]}</p>
          </div>
        </div> `;
  }
}

attributeContainer();
