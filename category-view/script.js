let searchBar = document.querySelector("#searchbar");
let categoryOption = document.querySelector("#drop-down");
let searchButton = document.querySelector(".search-btn-container");
let allCategoryOption = document.querySelector(".all-category-option");

function selectCategoryOption() {
  searchButton.addEventListener("click", function () {
    let selectedOption = categoryOption.value;
    if (selectedOption) {
      window.location.href = "./category.html?" + selectedOption;
      localStorage.setItem("selectedCategory", selectedOption); // ✅ Save to localStorage
      // ALL CATEGORY OPTION
    } else if (!selectedOption) {
      window.location.href = "/category-view/category.html?All-Category";
      localStorage.setItem("selectedCategory", selectedOption);
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  let storedOption = localStorage.getItem("selectedCategory");
  // console.log(storedOption);
  if (storedOption) {
    categoryOption.value = storedOption;
  }
});

selectCategoryOption();
