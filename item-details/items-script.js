/* SELECTING ELEMENTS */
let itemHeading = document.querySelector(".details-title");
let itemPrice = document.querySelector(".item-price");
let itemImg = document.querySelector(".item-img");
let discountPrice = document.querySelectorAll(".discount-price");

console.log(itemHeading);
console.log(itemPrice);

/* FETCHING CONTENT FROM PRODUCTDETAILS.json */
async function getData() {
  const url = "../productDetails.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

/* DISPLAYING DATA BASED ON ID */
async function showDataById() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  console.log(params);
  console.log(id);

  const data = await getData();
  console.table(data);

  const result = data.find((item) => item.id === id);

  if (result) {
    itemHeading.innerText = result.name;
    itemImg.src = result.src;
    itemPrice.innerText = result.price;
    // let a = (discountPrice[0].textContent = Number(result.price / 2));
    // console.log(a);
    let sliceFirstPriceCharacter = Number(result.price.slice(1));
    discountPrice[0].textContent = `$${Math.floor(
      sliceFirstPriceCharacter / 1.5
    )}`;
    discountPrice[1].textContent = `$${Math.floor(
      sliceFirstPriceCharacter / 2
    )}`;
    // console.log(sliceFirstPriceCharacter, typeof sliceFirstPriceCharacter);
  } else {
    console.warn("No product found with the given ID.");
  }
}

showDataById();
