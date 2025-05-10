let allCategoryUrl = window.location.href;
let pageButton = document.querySelectorAll(".page-btn");
console.log(pageButton);

if (allCategoryUrl.includes("/category-view/category.html?All-Category")) {
  // FETCH RANDOM DATA
  let itemCol = document.querySelector(".item-col-2");
  async function randomDataFetch() {
    const url = "./category-json/random-data.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.log("Error: " + response.status);
      }
      const json = await response.json();
      // console.table(json);
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }
  async function getRandomData() {
    const data = await randomDataFetch();
    const dataLength = data.length;
    const randomItemIdArray = [];

    // Generate unique random indexes
    while (randomItemIdArray.length < dataLength) {
      let randomIndex = Math.floor(Math.random() * dataLength);
      if (!randomItemIdArray.includes(randomIndex)) {
        randomItemIdArray.push(randomIndex);
      }
    }

    // Utility function to generate star rating HTML
    function generateStarRating(rating) {
      let stars = "";
      let fullStars = Math.floor(rating / 2);
      let emptyStars = 5 - fullStars;

      for (let i = 0; i < fullStars; i++) {
        stars += `<i class="fa-solid fa-star" style="color: goldenrod"></i>`;
      }
      for (let i = 0; i < emptyStars; i++) {
        stars += `<i class="fa-solid fa-star" style="color: rgba(0, 0, 0, 0.2)"></i>`;
      }

      return `<div class="rating-col">${stars}</div>`;
    }

    // Renders products from start to end index
    function renderProducts(start, end) {
      itemCol.innerHTML = ""; // Clear previous items
      for (let i = start; i < end && i < randomItemIdArray.length; i++) {
        let item = data[randomItemIdArray[i]];
        let col_2 = document.createElement("div");
        let starRating = document.createElement("div");

        starRating.classList.add("rating-container");
        starRating.innerHTML = generateStarRating(item.rating);

        col_2.innerHTML = `
          <a href="${item.anchor}">
            <div class="deal-item">
              <div class="deal-img-container">
                <img src="${item.src}" alt="${item.name}" />
              </div>
              <div class="deal-item-col-2">
                <div class="price">
                  <h3>${item.price}</h3>
                  <h5>${item.discount_price}</h5>
                </div>
                <div class="rating-container">
                  ${starRating.innerHTML}
                  <p>${item.rating}</p>
                </div>
                <p style="color: rgba(0, 0, 0, 0.5); margin-top: 0.5rem">
                  ${item.name}
                </p>
              </div>
            </div>
          </a>`;

        itemCol.appendChild(col_2);
      }
    }

    // Initial render (page 1)
    renderProducts(0, 9);

    // Setup pagination click
    const pageButtons = document.querySelectorAll(".page-btn");
    pageButtons.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const page = Number(event.target.textContent);
        const start = (page - 1) * 9;
        const end = page * 9;
        renderProducts(start, end);
      });
    });
  }

  getRandomData();
}
