$("#ex").on("click", function () {
  $(".box-nav").animate({ width: "toggle" }, 500);
  $("#firstEx").toggleClass("hidden");
  $("#secondEx").toggleClass("hidden");
});

////////////////////////////////////////////////////////////////////////////////
let array;
let array1;
let array2;
let array3;
let array4;
let mainSection = document.getElementById("mainSection");
let mainSection1 = document.getElementById("mainSection1");
let mainSection2 = document.getElementById("mainSection2");
let mainSection3 = document.getElementById("mainSection3");
let displayDetails = document.getElementById("displayDetails");
let SearchByName = document.getElementById("SearchByName");
let SearchByFirstLetter = document.getElementById("SearchByFirstLetter");
let buttons = document.getElementById("buttons");
let catLink = document.getElementById("catLink");

////////////////////////////////////////////////////////////////////////////////
async function getApiByName(params) {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${params}`
    );
    const resp = await api.json();
    array = resp.meals.slice(0, 20);
    display();
  } catch (error) {}
}
getApiByName("");
////////////////////////////////////////////////////////////////////////////////
async function getApiByNametwo(params) {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${params}`
    );
    const resp = await api.json();
    array2 = resp.meals.slice(0, 20);
    array = array2;
  } catch (error) {}
}
////////////////////////////////////////////////////////////////////////////////
async function getApiByArea() {
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
////////////////////////////////////////////////////////////////////////////////
async function getApiByIngredients() {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    const resp = await api.json();
    array4 = resp.meals.slice(0, 20);
    displayIngredients();
  } catch (error) {}
}
getApiByIngredients();
////////////////////////////////////////////////////////////////////////////
async function getApiByFirstLetter(params) {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${params}`
    );
    const resp = await api.json();
    array = resp.meals.slice(0, 20);
    display();
  } catch (error) {}
}
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
////////////////////////////////////////////////////////////////////////////
async function getApiFilterByArea(params) {
  try {
    const api = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${params}`
    );
    const resp = await api.json();
    array = resp.meals.slice(0, 20);
    display();
  } catch (error) {}
}
////////////////////////////////////////////////////////////////////////////
async function getApiFilterByIngredients(params) {
  try {
    const api = await fetch(
      `https:www.themealdb.com/api/json/v1/1/filter.php?i=${params}`
    );
    const resp = await api.json();
    array = resp.meals.slice(0, 20);
    display();
  } catch (error) {}
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
//////////////////////////////////////////////////////////////////////////////
if (SearchByFirstLetter == null) {
} else {
  SearchByFirstLetter.addEventListener("input", function () {
    mainSection.classList.remove("hidden");
    getApiByFirstLetter(SearchByFirstLetter.value);
  });
}
if (SearchByName == null) {
} else {
  SearchByName.addEventListener("input", function () {
    mainSection.classList.remove("hidden");
    getApiByName(SearchByName.value);
  });
}
catLink.addEventListener("click", function () {
  getApiByOfCategories();
});

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
//////////////////////////////////////////////////////////////////////////////////
function displayArea() {
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
//////////////////////////////////////////////////////////////////////////////////
function displayIngredients() {
  box = "";
  for (let i = 0; i < array4.length; i++) {
    box += ` <div
            id="meals1"
            class="col cursor-pointer text-white flex justify-center items-center w-full md:w-[24%] group"
          >
              <div class="area text-center w-full h-full p-3">
                <i class="fa-solid fa-drumstick-bite fa-5x"></i>
                <h3 class="mt-1 text-2xl w-full font-bold">${
                  array4[i].strIngredient
                }</h3>
                <p class="mt-2">
                  ${array4[i].strDescription.split(" ").slice(0, 20).join(" ")}
                </p>
            </div>
          </div>`;
  }
  document.querySelector("#mainSection3 .container .row").innerHTML = box;
  let meals1 = document.querySelectorAll("#meals1 .area");
  let Ingredients = document.querySelectorAll("#meals1 .area h3");
  for (let i = 0; i < meals1.length; i++) {
    meals1[i].addEventListener("click", (e) => {
      mainSection3.classList.add("hidden");
      mainSection.classList.remove("hidden");
      getApiFilterByIngredients(Ingredients[i].innerHTML);
    });
  }
}
//////////////////////////////////////////////////////////////////////////////////
function display() {
  box = "";
  for (let i = 0; i < array.length; i++) {
    box += `<div id="meals" class="col  relative overflow-hidden w-full md:w-[23%] group">
    <div class="info w-full  transition-all duration-[0.5s] absolute p-2 h-full top-full group-hover:top-0 left-0 text-black text-2xl font-bold rounded-md bg-white bg-opacity-75 flex items-center">${array[i].strMeal}</div>
        <img src="${array[i].strMealThumb}" class="w-full object-cover rounded-md" alt="" />
      </div>`;
  }
  document.querySelector("#mainSection .container .row").innerHTML = box;
  let meals = document.querySelectorAll("#meals");

  for (let i = 0; i < array.length; i++) {
    meals[i].addEventListener("click", async function (e) {
      await getApiByNametwo(e.target.innerHTML);
      mainSection.classList.add("hidden");
      buttons.classList.add("hidden");
      displayDetails.classList.remove("hidden");
      displayMealDetails();
    });
  }
}
////////////////////////////////////////////////////////////////////////////////////
function displayMealDetails() {
  let allTags = [];
  if (array[0].strTags == null) {
    allTags.push("No tags");
  } else {
    allTags = array[0].strTags.split(",");
  }
  let box = `<div class="container mx-auto p-0 ">
        <div class="row flex justify-center flex-wrap text-white">
          <div class="info1 w-full md:w-1/3 p-5">
            <img
              src="${array[0].strMealThumb}"
              class="w-full object-cover rounded-lg"
              alt=""
            />
            <h2 class="my-5 text-3xl font-bold">${array[0].strMeal}</h2>
          </div>
          <div class="info2 w-full md:w-2/3 p-5 text-white">
            <h2 class="my-5 text-4xl font-bold">Instructions</h2>
            <p class="my-5">
            ${array[0].strInstructions}
            </p>
            <h3 class="my-5 text-2xl">
              <span class="font-bold"> Area :</span> ${array[0].strArea}
            </h3>
            <h3 class="my-5 text-2xl">
              <span class="font-bold">Category :</span> ${array[0].strCategory}
            </h3>
            <h3 id="h5s" class="my-5 ">
              <span class="font-bold text-2xl block">Recipes :</span> <h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
                array[0].strMeasure1
              } ${
    array[0].strIngredient1
  }</p></h5> <h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure2
  } ${
    array[0].strIngredient2
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure3
  } ${
    array[0].strIngredient3
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure4
  } ${
    array[0].strIngredient4
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure5
  } ${
    array[0].strIngredient5
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure6
  } ${
    array[0].strIngredient6
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure7
  } ${
    array[0].strIngredient7
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure8
  } ${
    array[0].strIngredient8
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure9
  } ${
    array[0].strIngredient9
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure10
  } ${
    array[0].strIngredient10
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure11
  } ${
    array[0].strIngredient11
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure12
  } ${
    array[0].strIngredient12
  }</p></h5><h5 class=" mx-2 inline-block my-2 bg-blue-400 rounded-md"><p class="m-2">${
    array[0].strMeasure13
  } ${array[0].strIngredient13}</p></h5>
            </h3>
            <h3 class="my-2">
              <span class="text-2xl font-bold ">Tags :</span> ${allTags
                .map(
                  (el) =>
                    `<h5 class=" mx-2 inline-block my-2 bg-red-400 rounded-md"><p class="m-2">${el}</p></h5>`
                )
                .join("")}</h3>
               <h3 class="my-2">
               <a href="${array[0].strSource}"
                ><button
                  class="bg-green-700 p-2 text-white mx-2 rounded-lg hover:bg-green-800"
                >
                  Source
                </button></a
              >
              <a href="${array[0].strYoutube}"
                ><button
                  class="bg-red-700 p-2 text-white mx-2 rounded-lg hover:bg-red-800"
                >
                  Youtube
                </button></a
              >
               </h3>
          </div>
        </div>
      </div>`;
  document.querySelector("#displayDetails .container .row").innerHTML = box;
}
/////////////////////////////////////////////////////////////////////////////////////
let email = document.getElementById("email");
let name = document.getElementById("name");
let phone = document.getElementById("phone");
let age = document.getElementById("age");
let password = document.getElementById("password");
let repassword = document.getElementById("repassword");
let elements = $("#myForm form input").not("#repassword");
let btn = $("#myForm form button");
////////////////////////////////////////////////////////////////////////////////////////
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("input", function () {
    valedate(this);
    re();
  });
}
if (repassword == null) {
} else {
  repassword.addEventListener("input", function () {
    if (repassword.value == password.value) {
      repassword.classList.add("is-valid");
      repassword.classList.remove("is-invalid");
      repassword.nextElementSibling.classList.replace("block", "hidden");
    } else {
      repassword.classList.add("is-invalid");
      repassword.classList.remove("is-valid");
      repassword.nextElementSibling.classList.replace("hidden", "block");
    }
    re();
  });
}

/////////////////////////////////////////////////////////////////////////////////////
function valedate(element) {
  var regex = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    name: /^[a-zA-Z]{1,10}( )?([a-zA-Z]{1,10}?( )?[a-zA-Z]{1,10}?)?$/,
    phone: /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/i,
    age: /^(1[89]|[2-9]\d)$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!#%*?&]{8,}$/,
  };

  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("block", "hidden");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("hidden", "block");
  }
}
//////////////////////////////////////////////////////////////////////////////////////
function re() {
  if (
    email.classList.contains("is-valid") &&
    name.classList.contains("is-valid") &&
    phone.classList.contains("is-valid") &&
    age.classList.contains("is-valid") &&
    password.classList.contains("is-valid") &&
    repassword.classList.contains("is-valid")
  ) {
    btn.removeAttr("disabled");
    btn.addClass("text-white");
  }
  if (
    email.classList.contains("is-invalid") ||
    name.classList.contains("is-invalid") ||
    phone.classList.contains("is-invalid") ||
    age.classList.contains("is-invalid") ||
    password.classList.contains("is-invalid") ||
    repassword.classList.contains("is-invalid")
  ) {
    btn.attr("disabled", true);
    btn.removeClass("text-white");
  }
}
