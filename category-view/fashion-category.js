// let websiteUrls = window.location.href;

if (websiteUrl.includes("/category-view/category.html?Fashion")) {
  let itemCol = document.querySelector(".item-col-2");

  async function fashionFetch() {
    const url = "./category-json/fashion.json";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getFashionData() {
    let data = await fashionFetch();
    //   console.log(data[1].name);
    for (let i = 0; i < data.length; i++) {
      let col_2 = document.createElement("div");
      let starRating = document.createElement("div");
      starRating.classList.add("rating-container");

      /* STAR RATING */
      if (data[i].rating === 10) {
        starRating.innerHTML = `
            <div class="rating-col">
              <i class="fa-solid fa-star" style="color: goldenrod"></i>
              <i class="fa-solid fa-star" style="color: goldenrod"></i>
              <i class="fa-solid fa-star" style="color: goldenrod"></i>
              <i class="fa-solid fa-star" style="color: goldenrod"></i>
              <i class="fa-solid fa-star" style="color: goldenrod"></i>
            </div>`;
      } else if (data[i].rating === 8 || data[i].rating === 9) {
        starRating.innerHTML = `
          <div class="rating-col">
            <i class="fa-solid fa-star" style="color: goldenrod"></i>
            <i class="fa-solid fa-star" style="color: goldenrod"></i>
            <i class="fa-solid fa-star" style="color: goldenrod"></i>
            <i class="fa-solid fa-star" style="color: goldenrod"></i>
              <i
          class="fa-solid fa-star"
          style="color: rgba(0, 0, 0, 0.2)"
          ></i>
          </div>`;
      } else if (data[i].rating === 6 || data[i].rating === 7) {
        starRating.innerHTML = `
          <div class="rating-col">
            <i class="fa-solid fa-star" style="color: goldenrod"></i>
            <i class="fa-solid fa-star" style="color: goldenrod"></i>
            <i class="fa-solid fa-star" style="color: goldenrod"></i>
             <i
          class="fa-solid fa-star"
          style="color: rgba(0, 0, 0, 0.2)"
          ></i>  <i
          class="fa-solid fa-star"
          style="color: rgba(0, 0, 0, 0.2)"
          ></i>

          </div>`;
      } else if (data[i].rating === 4 || data[i].rating < 7) {
        starRating.innerHTML = `
          <div class="rating-col">
            <i class="fa-solid fa-star" style="color: goldenrod"></i>
            <i class="fa-solid fa-star" style="color: goldenrod"></i>
    <i
          class="fa-solid fa-star"
          style="color: rgba(0, 0, 0, 0.2)"
          ></i>          <i
          class="fa-solid fa-star"
          style="color: rgba(0, 0, 0, 0.2)"
          ></i>  <i
          class="fa-solid fa-star"
          style="color: rgba(0, 0, 0, 0.2)"
          ></i>

          </div>`;
      } else {
        starRating.innerHTML = `
            <div class="rating-col">
            <i class="fa-solid fa-star" style="color: goldenrod"></i>
            <i
            class="fa-solid fa-star"
            style="color: rgba(0, 0, 0, 0.2)"
            ></i>
            <i
            class="fa-solid fa-star"
            style="color: rgba(0, 0, 0, 0.2)"
            ></i>          <i
            class="fa-solid fa-star"
            style="color: rgba(0, 0, 0, 0.2)"
            ></i>
            <i
            class="fa-solid fa-star"
            style="color: rgba(0, 0, 0, 0.2)"
            ></i>

            </div>`;
      }
      col_2.innerHTML = `   
        <a href="${data[i].anchor}">
          <div class="deal-item">
            <div class="deal-img-container">
              <img src="${data[i].src}" alt="Smart Watch" />
            </div>
            </a>
            <div class="flex-col">
            <div class="deal-item-col-2">
              <div class="price">
                <h3>${data[i].price}</h3>
                <h5>${data[i].discount_price}</h5>
              </div>
              <div class="rating-container">
                ${starRating.innerHTML}
                <p>${data[i].rating}</p>
              </div>
              </div>     
              <i class="fa-solid fa-heart heart-btn default-heart-btn "></i>

            </div>
             <p style="color: rgba(0, 0, 0, 0.5); margin-top: 0.5rem">
                ${data[i].name}
              </p>
          </div>
        `;

      function heartFunctionality() {
        const heartButtons = document.querySelectorAll(".heart-btn");

        heartButtons[i].addEventListener("click", function () {
          const defaultHeart =
            heartButtons[i].classList.contains("default-heart-btn");

          // Example item data (replace with your actual data source)
          const item = {
            id: data[i].id,
            name: data[i].name,
            price: data[i].price,
            discount_price: data[i].discount_price,
            img_src: data[i].src,
            model: data[i].model,
            seller: data[i].seller,
          };

          // Get existing saved items or initialize an empty array
          let savedItems = JSON.parse(localStorage.getItem("wishlist")) || [];

          if (defaultHeart) {
            heartButtons[i].classList.add("red-heart-btn");
            heartButtons[i].classList.remove("default-heart-btn");

            // Push new item if not already in list
            if (!savedItems.find((obj) => obj.id === item.id)) {
              savedItems.push(item);
              localStorage.setItem("wishlist", JSON.stringify(savedItems));
              // console.log(item);
            }

            // console.log(item);

            console.log("Item saved to wishlist.");
          } else {
            heartButtons[i].classList.add("default-heart-btn");
            heartButtons[i].classList.remove("red-heart-btn");

            //  remove from savedItems if unhearted
            savedItems = savedItems.filter((obj) => obj.id !== item.id);
            localStorage.setItem("wishlist", JSON.stringify(savedItems));
            console.log("Item removed from wishlist.");
          }
        });
      }

      itemCol.appendChild(col_2);
      heartFunctionality();
    }
  }
  getFashionData();
}
