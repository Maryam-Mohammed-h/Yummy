import { FetchData } from "./fetchData.module.js";
import { FormValidation } from "./formValidation.module.js";
//Global definiations
let linkCards = document.querySelector("#linkCards");
let speciallyForSearch = document.querySelector("#speciallyForSearch");
let fetchDataObject = new FetchData();
let formValidate = new FormValidation();
let mealDetailsModal = document.querySelector(
  "#myModal .modal-dialog .modal-content"
);
export function displayCategoriesOnLoad() {
  const typeMeals = fetchDataObject.getTypes("c").then((response) => {
    displayGenre(response, "c");
  });
}
export function chooseType() {
  $("#sidebarLinks li").click(function (e) {
    let linkTypeAtt = $(this).attr("data-link-type");

    if (linkTypeAtt == "search") {
      linkCards.innerHTML = "";
      displaySearch();
    } else if (linkTypeAtt == "contact") {
      speciallyForSearch.innerHTML = "";
      displayContact();
    } else {
      speciallyForSearch.innerHTML = "";
      const typeMeals = fetchDataObject
        .getTypes(linkTypeAtt)
        .then((response) => {
          displayGenre(response, linkTypeAtt);
        });
    } //end of if else
  });
}

function displaySearch() {
  let content = "";
  content += `
  <div class="container" id="searchContainer">
  <div class="row g-3">
  <div class="col">
    <input
      type="search"
      id="searchByName"
      class="form-control"
      placeholder="search by name"
    />
  </div>
  <div class="col">
    <input
      type="search"
     maxlength="1"
      class="form-control"
      id="searchByFirstLetter"
      placeholder="search by first letter"
    />
  </div>
</div>
</div>
<div class="row p-3 g-1" id="mealsFromSearchResults"></div>
  `;
  speciallyForSearch.innerHTML = content;
  // $(() => {
  const checkSearchContainer = setInterval(() => {
    if ($("#searchContainer").length > 0) {
      clearInterval(checkSearchContainer);
      let mealsFromSearchResults = $("#mealsFromSearchResults");
      $("#searchByName").on("keyup", function () {
        let mealName = $("#searchByName").val();
        const searchByName = fetchDataObject
          .getMealByName(mealName)
          .then((response) => {
            mealsFromSearchResults.innerHTML = displayMeals(response);
          });
      });
    }
  }, 100);
  const checkInputFirstName = setInterval(() => {
    let mealChar;
    if ($("#searchContainer").length > 0) {
      clearInterval(checkInputFirstName);
      let mealsFromSearchResults = $("#mealsFromSearchResults");
      $("#searchByFirstLetter").on("keyup", function (e) {
        mealChar = $("#searchByFirstLetter").val();
        if (mealChar.length >= 1) {
          $(this).val($(this).val().charAt(0));
          // e.preventDefault();
          if (mealChar.length == 1) {
            const searchByName = fetchDataObject
              .getMealByFirstLetter(mealChar)
              .then((response) => {
                mealsFromSearchResults.innerHTML = displayMeals(response);
              });
          }
        }
      });
    }
  }, 100);
  // });
}

function displayContact() {
  let content = "";
  content += `<div class="container" id="contactContainer">
  <div class="row g-3 text-center">
    <div class="col-6">
      <input
        type="text"
        id="userName"
        class="form-control"
        placeholder="Enter your name"
      />
      <span class="alert alert-danger d-none">Special characters and numbers not allowed</span>
    </div>
    <div class="col-6">
      <input
        type="email"
        class="form-control"
        id="userEmail"
        placeholder="Enter Your Email"
      />
      <span class="alert alert-danger d-none">Email not valid *exemple@yyy.zzz</span>
    </div>
    <div class="col-6">
      <input
      type="tel" pattern="^01[0-2,5][0-9]{8}$"
        id="userPhone"
        class="form-control"
        placeholder="Enter your phone"
      />
      <span class="alert alert-danger d-none">Enter valid Phone Number</span>
    </div>
    <div class="col-6">
      <input
        type="number"
        class="form-control"
        id="userAge"
        placeholder="Enter Your Age"
      />
      <span class="alert alert-danger d-none">Enter valid age from 10 to 99</span>
    </div>
    <div class="col-6">
      <input
        type="password"
        id="userPassword"
        class="form-control"
        placeholder="Enter your password"
      />
      <span class="alert alert-danger d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*</span>
    </div>
    <div class="col-6">
      <input
        type="password"
        class="form-control"
        id="userRepassword"
        placeholder="rewrite your password"
      />
      <span class="alert alert-danger d-none">Enter valid repassword</span>
    </div>
    <div class="col-12 py-2">
    <button id="contactSubmitBtn"class="btn btn-danger">Submit</button>
    </div>
  </div>
</div>`;

  linkCards.innerHTML = content;
  const checkContactLoad = setInterval(() => {
    if ($("#contactContainer").length > 0) {
      formValidate.enableDisableSubmit(false);
      clearInterval(checkContactLoad);
      // formValidate.validateForm();
      $("#contactContainer input[type]").on("keyup", function (e) {
        let targetInput = e.target.id;
        let targetValue = $(e.target).val();
        formValidate.validateForm(targetInput, targetValue);
      });
      $("#userAge").on("change", function (e) {
        let targetInput = e.target.id;

        let targetValue = $(e.target).val();

        formValidate.validateForm(targetInput, targetValue);
      });
    }
  }, 100);
}
function displayGenre(genreMeals, genre) {
  let content = "";

  if (genre == "c") {
    genreMeals = genreMeals.categories;
    for (var i = 0; i < genreMeals.length; i++) {
      content += `<div class="linkCard col-3 d-flex py-2">
    <a href="#" class="linkCardA">
    <div class="card bg-transparent rounded-2 position-relative targetedCard" data-type-id="${
      genreMeals[i].strCategory
    }">
    <img src="${
      genreMeals[i].strCategoryThumb
    }" class="card-img-top p-2 rounded-2 " alt="image">
    <div class="card-body text-center rounded-2 px-1 py-0">
    <h3 class="card-title">${genreMeals[i].strCategory}</h3>
    <p class="card-text pb-2 ">${
      genreMeals[i].strCategoryDescription
        ? genreMeals[i].strCategoryDescription.substring(0, 90)
        : ""
    }</p>


    </div>
  </div>
  </a>
  </div>`;
    }
  } else {
    genreMeals = genreMeals.meals;
    for (var i = 0; i < genreMeals.length; i++) {
      content += `<div class="linkCard col-3 d-flex align-items-stretch">
    <a href="#" class="linkCardA">
    <div class="card bg-transparent rounded-2 text-center targetedCard" data-type-id=${
      genre == "i" ? genreMeals[i].strIngredient : genreMeals[i].strArea
    }>
    <i class="fa ${
      genre == "i" ? "fa-solid fa-drumstick-bite" : "fa-home"
    }  fa-4x card-img-top p-2 rounded-2" ></i>

    <div class="card-body-type position-reltive ">
    <h3 class="card-title ">${
      genre == "i" ? genreMeals[i].strIngredient : genreMeals[i].strArea
    }</h3>
    ${
      genre == "i"
        ? `<p class="card-text pb-3 ">

        ${
          genreMeals[i].strDescription
            ? genreMeals[i].strDescription.substring(0, 50)
            : ""
        }
        </p>`
        : ``
    }
    
    

    </div>
  </div>
  </a>
  </div>`;
    }
  }
  linkCards.innerHTML = content;

  let relatedCards = $(".linkCard");
  let genreValue;
  for (let c = 0; c < relatedCards.length; c++) {
    $(relatedCards[c]).click(function (e) {
      genreValue = $(relatedCards[c])
        .find(".targetedCard")
        .attr("data-type-id");
      const meals = fetchDataObject
        .getMeals(genre, genreValue)
        .then((response) => {
          displayMeals(response);
        });
    });
  }
}
function displayMeals(meals) {
  meals = meals.meals;

  let content = "";
  for (let i = 0; i < meals.length; i++) {
    content += `<div class="linkCard col-4 d-flex align-items-stretch">
        <a class="linkCardA" type="button" data-bs-toggle="modal"
        data-bs-target="#myModal">
        <div class="card bg-transparent rounded-2 targetedCard" data-meal-id=${meals[i].idMeal}>
        <img src="${meals[i].strMealThumb}" class="w-100 card-img-top  rounded-2" alt="image">
        <div class="card-body w-100 d-flex justify-content-center align-items-center  rounded-2">
        <h2 class="card-title">${meals[i].strMeal}</h2>
        </div>
      </div>
      </a>
      </div>`;
    linkCards.innerHTML = content;
  }
  let mealCards = $(".linkCard");
  for (let x = 0; x < mealCards.length; x++) {
    $(mealCards[x]).click(function (e) {
      let mealId = $(mealCards[x]).find(".targetedCard").attr("data-meal-id");

      const meals = fetchDataObject.getMealDetails(mealId).then((response) => {
        displayMealModal(response);
      });
    });
  }
}

function displayMealModal(mealDetails) {
  mealDetails = mealDetails.meals[0];
  let mealTags = mealDetails.strTags;
  let mealModal = "";
  mealModal += `

        <div class="row">
        <div class="col-1 offset-11 text-white p-3">
        <button
        type="button"
        class="btn-close bg-white"
        data-bs-dismiss="modal"
      ></button>
        </div>

        <div class="col-3 p-3">
        
        <div > <img class="w-100 mealImage"src="${mealDetails.strMealThumb}" />
        <h3>${mealDetails.strMeal}</h3></div>
        </div>
        <div class="col-8 p-4">
        <div class="mealData">
        <h2> Insturctions </h2>
        <p class="p-3"> ${mealDetails.strInstructions}</p>
        
        <h4><span>Area :</span> ${mealDetails.strArea}</h4>
        <h4><span>Category :</span>  ${mealDetails.strCategory}</h4>
        <h4><span>Recipes :  </span> ${recipesLoop(mealDetails)}</h4>
        <h4><span>Tags :  
        ${tagLoop(mealTags)}
        </span> 
        </h4>
        </div>
        <div class="pt-2">
        <a
        type="button"
        title="The link will open in new tab"
        href="${mealDetails.strSource}"
        class="btn btn-success "
        target="_blank"

      >Source</a>
      <a
        type="button"
        title="The link will open in new tab"
        href="${mealDetails.strYoutube}"
        class="btn btn-danger "
        target="_blank"

      >Youtube</a>
        </div>
  
        </div>
        </div>

  `;

  mealDetailsModal.innerHTML = mealModal;
}
function tagLoop(arr) {
  let allElements = "";
  arr = arr.split(",");
  for (let x = 0; x < arr.length; x++) {
    allElements += `<span class="alert h5 alert-danger m-2 p-1"> ${arr[x]}</span>`;
  }
  return allElements;
}

function recipesLoop(mealDetails) {
  let ingredient = "^strIngredient";
  let measure = `^strMeasure`;
  const regexp = new RegExp(ingredient);
  const regexp2 = new RegExp(measure);
  let ingArray = [];
  let measureArray = [];
  let recipe = "";

  for (const mealObj in mealDetails) {
    if (regexp.test(mealObj)) {
      if (mealDetails[mealObj] != "") {
        ingArray.push(mealDetails[mealObj]);
      }
    }
    if (regexp2.test(mealObj)) {
      if (mealDetails[mealObj] != "") {
        measureArray.push(mealDetails[mealObj]);
      }
    }
  }

  for (let c = 0; c < ingArray.length; c++) {
    recipe += `<span class="alert alert-info p-0 m-2 h6">
    ${measureArray[c]}
  ${ingArray[c]}

    </span>`;
  }
  return recipe;
}
