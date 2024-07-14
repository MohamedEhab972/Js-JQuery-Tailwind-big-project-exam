import { display, mainSection, array3, mainSection2 } from "./index.js";
//////////////////////////////////////////////////////////////////////////////////
export function displayArea() {
  box = "";
  for (let i = 0; i < array3.length; i++) {
    box += `<div id="meals1" class="col cursor-pointer relative overflow-hidden w-full md:w-[23%] group">
              <div class="area bg-white text-center w-full h-full p-3 px-5">
                  <i class="fa-solid fa-house-laptop fa-5x bg-white "></i>
                  <h3 class="mt-1 text-3xl font-bold">${array3[i].strArea}</h3>
              </div>
            </div>`;
  }
  document.querySelector("#mainSection2 .container .row").innerHTML = box;
  let meals1 = document.querySelectorAll("#meals1 .area");
  let area = document.querySelectorAll("#meals1 .area h3");
  for (let i = 0; i < meals1.length; i++) {
    meals1[i].addEventListener("click", (e) => {
      mainSection2.classList.add("hidden");
      mainSection.classList.remove("hidden");
      getApiFilterByArea(area[i].innerHTML);
    });
  }
}
////////////////////////////////////////////////////////////////////////////
export async function getApiFilterByArea(params) {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${params}`
    );
    const resp = await api.json();
    array = resp.meals.slice(0, 20);
    display();
  } catch (error) {}
}
////////////////////////////////////////////////////////////////////////////////
export async function getApiByArea() {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const resp = await api.json();
    array3 = resp.meals;
    displayArea();
  } catch (error) {}
}
getApiByArea();
