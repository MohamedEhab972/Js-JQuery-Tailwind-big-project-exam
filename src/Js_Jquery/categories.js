import { array1, mainSection, display, mainSection1 } from "./index.js";
//////////////////////////////////////////////////////////////////////////////////
function displayCat() {
  box = "";
  for (let i = 0; i < array1.length; i++) {
    box += `<div id="meals1" class="col  relative overflow-hidden w-full md:w-[23%] group">
      <div class="info w-full  transition-all duration-[0.5s] absolute p-2 h-full top-full group-hover:top-0 left-0 text-black text-2xl font-bold rounded-md bg-white bg-opacity-75 flex items-center">${array1[i].strCategory}</div>
          <img src="${array1[i].strCategoryThumb}" class="w-full object-cover rounded-md" alt="" />
        </div>`;
  }
  document.querySelector("#mainSection1 .container .row").innerHTML = box;
  let meals1 = document.querySelectorAll("#meals1 .info");
  meals1.forEach((el) => {
    el.addEventListener("click", (e) => {
      mainSection1.classList.add("hidden");
      mainSection.classList.remove("hidden");
      getApiFilterByCategory(e.target.innerHTML);
    });
  });
}
////////////////////////////////////////////////////////////////////////////
async function getApiByOfCategories() {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/categories.php`
    );
    const resp = await api.json();
    array1 = resp.categories;
    displayCat();
  } catch (error) {}
}
getApiByOfCategories();
////////////////////////////////////////////////////////////////////////////
async function getApiFilterByCategory(params) {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${params}`
    );
    const resp = await api.json();
    array = resp.meals.slice(0, 20);
    display();
  } catch (error) {}
}
