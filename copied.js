const searchBtn = document.getElementById("search-btn
");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector("
.meal-details-content");
const recipeCloseBtn = document.getElementById("
recipe-close-btn");
// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMeal Recipe);
recipeCloseBtn.addEventListener("click", () => {
mealDetailsContent.parentElement.classList.remove("
showRecipe");
});
// get meal list that matches with the ingredients
function getMealList() {
Let searchInputTxt = document.getElementById("
search-input").value.trim();
fetch(
https://www.themealdb.com/api/json/v1/1/filter.php?i=
${searchInputTxt}`
)
.then((response) => response.json())
.then((data) => {
Let html = "";
if (data.meals) {
data.meals.forEach((meal) => {
html +=
<div class = "meal-item" data-id
${meal.idMeal}">
<div class = "meal-img">
<img src = "${meal.
strMealThumb}" alt = "food">
</div>
cipe-btn">Get Recipe</a>
<div class = "meal-name">
<h3>${meal.strMeal}</h3>
<a href="#" class = "re
</div>
</div>
});
mealList.classList.remove("notFound");
} else {
}
html = "Sorry, we didn't find any meal!";
mealList.classList.add("not Found");
mealList.innerHTML = html;
});
}
// get recipe of the meal
function getMeal Recipe(e) {
e.preventDefault();
if (e.target.classList.contains("recipe-btn")) {
Let mealItem = e.target.parentElement.
parentElement;
fetch(
https://www.themealdb.com/api/json/v1/1/lookup.php?i=
${mealItem.dataset.id}
)
.then((response) => response.json())
.then((data) => meal RecipeModal (data.meals));
}
}
// create a modal
function meal Recipe Modal (meal) {
console.log(meal);
meal = meal[0];
Let html =
</h2>
<h2 class = "recipe-title">${meal.strMeal}
<p class="recipe-category">${meal.
strCategory}</p>
"
<div class = "recipe-instruct">
<h3>Instructions:</h3>
<p>${meal.strInstructions}</p>
</div>
<div class = "recipe-meal-img">
<img src = "${meal.strMealThumb}
alt="">
</div>
<div class = "recipe-link">
<a href = "${meal.strYoutube}
target = "_blank">Watch Video</a>
</div>
mealDetailsContent.innerHTML = html;
mealDetailsContent. parentElement.classList.add("
showRecipe");
}
