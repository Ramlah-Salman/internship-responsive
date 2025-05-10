let searchBar = document.querySelector("#searchbar");
let categoryOption = document.querySelector("#drop-down");
let searchButton = document.querySelector(".search-btn-container");
let allCategoryOption = document.querySelector(".all-category-option");

function selectCategoryOption() {
  categoryOption.addEventListener("change", function (event) {
    // console.log(event.target.value);
    if (event.target.value) {
      searchButton.addEventListener("click", function () {
        // console.log(event.target.value);
        // console.log("Search is being clicked");
        window.location.href =
          "./category-view/category.html?" + event.target.value;
      });
    }
  });
  // ALL CATEGORY OPTION SELECT
  searchButton.addEventListener("click", function () {
    window.location.href = "./category-view/category.html?All-Category";
  });
}

selectCategoryOption();

document.addEventListener("DOMContentLoaded", function () {
  const productLinks = document.querySelectorAll(
    'a[href*="item-details/items.html"]'
  );

  productLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const url = this.href;

      // Create and show loading spinner
      const overlay = document.createElement("div");
      overlay.className = "loading-overlay";

      const spinner = document.createElement("div");
      spinner.className = "loading-spinner";

      overlay.appendChild(spinner);
      document.body.appendChild(overlay);

      // Redirect after 500ms (0.5 seconds)
      setTimeout(() => {
        window.location.href = url;
      }, 500);
    });
  });
});
