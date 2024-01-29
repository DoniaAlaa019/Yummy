// sidebar
$("#show-menu").click(function() {
    $("#close").css("display", "block");
    $("#show-menu").css("display", "none");
    $("#all-list").show(1000, function() {
        $("#copy-right").animate({ opacity: "1" }, 100);
        $("#menu").animate({ paddingTop: "0px", opacity: "1" });
        $(".btn-a").animate({ paddingTop: "15px", opacity: "1" }, 500);
        $("#list").css("opacity", "1", 100);
    });
});
$("#close").click(function() {
    $("#close").css("display", "none");
    $("#show-menu").css("display", "block");
    $("#copy-right").animate({ opacity: "0" }, 100);
    $("#menu").animate({ paddingTop: "30px", opacity: "0" });
    $("#all-list").hide(1000);
});
//meals
$(".head-loading").css("display", "block");
async function getMeals(url) {
    let response = await fetch(url);
    const data = await response.json();
    $(".head-loading").css("display", "block");
    $("#meals").css("display", "none");
    $("#sidebar").css("display", "none");
    // console.log(data);
    if (response.status == 200) {
        let meal = ``;
        for (let i = 0; i < 20; i++) {
            if (data.meals.length - 1 < i) {
                break;
            }
            meal += `<div class="col-md-3 ">
            <div class="image meal" data-id="${data.meals[i].idMeal}">
                <div class="brief">
                    <div class="d-flex flex-column justify-content-center h-100 text-black text-start mx-auto py-3">
                        <h2 class="px-1">${data.meals[i].strMeal}</h2>
                    </div>
                </div>
                <img src="${data.meals[i].strMealThumb}" alt="image" />
            </div>
        </div>`;
        }
        $(".head-loading").css("display", "none");
        $("#meals").css("display", "block");
        $("#sidebar").css("display", "block");
        $("#meals-content").html(meal);
        get();
    }
}
getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);

function get() {
    document.querySelectorAll(".meal").forEach((item) => {
        item.addEventListener("click", () => {
            const id = item.dataset.id;
            console.log(id);
            getDetails(id);
        });
    });
}
// details
async function getDetails(id) {
    let response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    console.log(data);
    $(".head-loading").css("display", "block");
    $("#details").css("display", "none");
    $("#sidebar").css("display", "none");
    $("#meals").css("display", "none");

    if (response.status == 200) {
        $(".head-loading").css("display", "none");
        $("#details").css("display", "block");
        $("#sidebar").css("display", "block");
        $("#meals").css("display", "none");
        let meal = ` <div class="container py-4 text-white">
            <div class="row">
                <div class="col-md-4">
                    <img src="${
                      data.meals[0].strMealThumb
                    }" alt="image" class="rounded-3 mb-2 w-100" />
                    <h3 class="text-white">${data.meals[0].strMeal}</h3>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${data.meals[0].strInstructions}</p>
                    <h2>Area : ${data.meals[0].strArea}</h2>
                    <h2>category : ${data.meals[0].strCategory}</h2>
                    <h2>Recipes : </h2>
                    <div class="d-flex flex-row justify-content-start align-items-center flex-wrap">
                      ${getRecipes(data.meals[0])}
                    </div>
                    <h2>Tags : </h2>
                    <div class="d-flex flex-row justify-content-start align-items-center flex-wrap">
                    ${gettags(data.meals[0]["strTags"])}
                    </div>

        <div class="d-flex flex-row justify-content-start align-items-center flex-wrap pt-2">
        <a href="${
          data.meals[0].strSource
        }" target="_blank"><button class="btn btn-success me-2">Source</button></a>
        <a href="${
          data.meals[0].strYoutube
        }" target="_blank"><button class="btn btn-danger">Youtube</button></a>

        </div>

                </div>
            </div>
        </div>`;
        $("#details").html(meal);
    }
}

function getRecipes(arr1) {
    let item = ``;
    let i = 1;
    while (arr1[`strIngredient${i}`] != "") {
        item += `<span class="px-2 py-1 m-2 text-info-emphasis bg-info-subtle rounded-3">${
      arr1[`strMeasure${i}`]
    } ${arr1[`strIngredient${i}`]}</span>`;
    i++;
  }
  return item;
}
function gettags(tag) {
  let item = ``;
  if (tag == null) {
    item = `<span class=" m-2 text-danger-emphasis bg-danger-subtle rounded-3"></span>`;
    return item;
  }
  let tags = tag.split(",");
  for (let i = 0; i < tags.length; i++) {
    item = `<span class="px-2 py-1 m-2 text-danger-emphasis bg-danger-subtle rounded-3">${tags[i]}</span>`;
  }
  return item;
}
//category
$("#btn-category").click(async function () {
  $(".head-loading").css("display", "block");
  $("section").css("display", "none");
  $("#meals").css("display", "none");
  $("#details").css("display", "none");
  $("#close").css("display", "none");
  $("#show-menu").css("display", "block");
  $("#copy-right").animate({ opacity: "0" }, 100);
  $("#menu").animate({ paddingTop: "30px", opacity: "0" });
  $("#all-list").hide(1000);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const data = await response.json();

  if (response.status == 200) {
    $(".head-loading").css("display", "none");
    $("#categories").css("display", "block");
    // console.log(data);
    let meal = ``;
    for (let i = 0; i < data.categories.length; i++) {
      meal += `<div class="col-md-3">
            <div class="image category" data-name="${
              data.categories[i].strCategory
            }">
                <div class="brief">
                    <div class="d-flex flex-column justify-content-center align-content-center text-black text-center mx-auto py-3">
                        <h3>${data.categories[i].strCategory}</h3>
                        <p class="px-3">${data.categories[i][
                          "strCategoryDescription"
                        ]
                          .split(" ")
                          .slice(0, 20)
                          .join(" ")}</p>
                    </div>
                </div>
                <img src="${data.categories[i].strCategoryThumb}" alt="image" />
            </div>
        </div>`;
    }
    $("#category-content").html(meal);
    getcategory();
  }
});
function getcategory() {
  document.querySelectorAll(".category").forEach((item) => {
    item.addEventListener("click", () => {
      const name = item.dataset.name;
      // console.log(name);
      getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`);
      $("section").css("display", "none");
    });
  });
}
//area
$("#btn-area").click(async function () {
  $(".head-loading").css("display", "block");
  $("section").css("display", "none");
  $("#meals").css("display", "none");
  $("#details").css("display", "none");
  $("#close").css("display", "none");
  $("#show-menu").css("display", "block");
  $("#copy-right").animate({ opacity: "0" }, 100);
  $("#menu").animate({ paddingTop: "30px", opacity: "0" });
  $("#all-list").hide(1000);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const data = await response.json();

  if (response.status == 200) {
    $(".head-loading").css("display", "none");
    $("#areas").css("display", "block");
    // console.log(data);
    let meal = ``;
    for (let i = 0; i < data.meals.length; i++) {
      meal += ` <div class="col-md-3">
            <a href="#" class="area" data-name="${data.meals[i].strArea}">
                <i class="fa-solid fa-house-laptop fa-5x py-2" style="color: #ffffff;"></i>
                <h3>${data.meals[i].strArea}</h3>
            </a>

        </div>`;
    }
    $("#area-content").html(meal);
    getarea();
  }
});
function getarea() {
  document.querySelectorAll(".area").forEach((item) => {
    item.addEventListener("click", () => {
      const name = item.dataset.name;
      // console.log(name);
      getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
      $("section").css("display", "none");
    });
  });
}
//area
$("#btn-ingredient").click(async function () {
  $(".head-loading").css("display", "block");
  $("section").css("display", "none");
  $("#meals").css("display", "none");
  $("#details").css("display", "none");
  $("#close").css("display", "none");
  $("#show-menu").css("display", "block");
  $("#copy-right").animate({ opacity: "0" }, 100);
  $("#menu").animate({ paddingTop: "30px", opacity: "0" });
  $("#all-list").hide(1000);
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const data = await response.json();

  if (response.status == 200) {
    $(".head-loading").css("display", "none");
    $("#ingredients").css("display", "block");
    console.log(data);
    let meal = ``;
    for (let i = 0; i < 24; i++) {
      meal += ` <div class="col-md-3">
            <a href="#" class="ingredient" data-name="${
              data.meals[i].strIngredient
            }">
                <i class="fa-solid fa-drumstick-bite fa-4x" style="color: #ffffff;"></i>
                <h3>${data.meals[i].strIngredient}</h3>
                <p>${data.meals[i]["strDescription"]
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
            </a>
        </div>`;
    }
    $("#ingredient-content").html(meal);
    getingredient();
  }
});
function getingredient() {
  document.querySelectorAll(".ingredient").forEach((item) => {
    item.addEventListener("click", () => {
      const name = item.dataset.name;
      console.log(name);
      getMeals(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
      $("section").css("display", "none");
    });
  });
}
//search
$("#btn-search").click(function () {
  $("section").css("display", "none");
  $("#meals").css("display", "none");
  $("#details").css("display", "none");
  $("#close").css("display", "none");
  $("#show-menu").css("display", "block");
  $("#copy-right").animate({ opacity: "0" }, 100);
  $("#menu").animate({ paddingTop: "30px", opacity: "0" });
  $("#all-list").hide(1000);
  $("#search").css("display", "block");
});
$("#searchbyname").keyup(function (e) {
  let name = $("#searchbyname").val();
  getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
});
$("#searchbyfirstletter").keyup(function (e) {
  let name = Array.from($("#searchbyfirstletter").val());
  if (name[0] == undefined) {
    getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
  } else {
    getMeals(`https://www.themealdb.com/api/json/v1/1/search.php?f=${name[0]}`);
    console.log(name[0]);
  }
});
// contact
$("#btn-contact").click(function () {
  $("section").css("display", "none");
  $("#meals").css("display", "none");
  $("#details").css("display", "none");
  $("#close").css("display", "none");
  $("#show-menu").css("display", "block");
  $("#copy-right").animate({ opacity: "0" }, 100);
  $("#menu").animate({ paddingTop: "30px", opacity: "0" });
  $("#all-list").hide(1000);
  $("#contact").css("display", "block");
  $(".name").css("display", "none");
  $(".email").css("display", "none");
  $(".phone").css("display", "none");
  $(".age").css("display", "none");
  $(".password").css("display", "none");
  $(".repassword").css("display", "none");
});
let flag = true;
$("#name").keyup(function (e) {
  if ((/([a-zA-Z0-9_\s]+)/).test($("#name").val())) {
    $(".name").css("display", "block");
    flag = false;
  } else {
    $(".name").css("display", "none");
    flag = true;
  }
});
$("#email").keyup(function (e) {
  var regexemail = /\w{5,20}@[A-z]{4,6}(\.)[A-z]{3}$/;
  if (!regexemail.test($("#email").val())) {
    $(".email").css("display", "block");
    flag = false;
  } else {
    $(".email").css("display", "none");
    flag = true;
  }
});
$("#phone").keydown(function (e) {
  if ((/^(\+)?([ 0-9]){10,16}$/).test($("#phone").val())) {
    $(".phone").css("display", "block");
    flag = false;
  } else {
    $(".phone").css("display", "none");
    flag = true;
  }
});
$("#age").keydown(function (e) {
  if ((/^([1-2]|[2-9]\d)$/).test($("#age").val())) {
    $(".age").css("display", "block");
    flag = false;
  } else {
    $(".age").css("display", "none");
    flag = true;
  }
});
$("#password").keydown(function (e) {
  var regexpassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  if (regexpassword.test($("#password").val())) {
    $(".password").css("display", "block");
    flag = false;
  } else {
    $(".password").css("display", "none");
    flag = true;
  }
});
$("#repassword").keydown(function (e) {
  if ($("#repassword").val() == $("#password").val()) {
    $(".repassword").css("display", "block");
    flag = false;
  } else {
    $(".repassword").css("display", "none");
    flag = true;
  }
});
let submit = document.getElementById('Submit')
if(flag){
    submit.classlist.replace('disable','opacity-100');
}else{
    submit.classlist.replace('opacity-100','disable');
}