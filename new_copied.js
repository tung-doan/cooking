const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// Event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe");
});

let recipesData = [];
fetch('./baking.json')
    .then((response) => response.json())
    .then((data) => {
        recipesData = data;
    })
    .catch((error) => {
        console.error('Error fetching local JSON file:', error);
    });

// Get meal list that matches with the ingredients
function getMealList() {
    let searchInputTxt = document.getElementById("search-input").value.trim().toLowerCase();

    fetch('http://localhost:3000/run-script', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ argument: searchInputTxt })
    })
    .then(response => {
        if (response.ok) {
            console.log('Script executed successfully');
        } else {
            console.error('Error executing script');
        }
    })
    .catch(error => console.error('Error:', error));

    // No filtering of the JSON data
    let html = "";
    recipesData.forEach((recipe) => {
        html += `   
        <div class="meal-item" data-id="${recipe.id}">
            <div class="meal-img">
                <img src="${recipe.image}" alt="food">
            </div>
            <div class="meal-name">
                <h3>${recipe.name}</h3>
                <p>${recipe.description}</p>
                <a href="#" class="recipe-btn">Get Recipe</a>
            </div>
        </div>
        `;
    });

    mealList.innerHTML = html;

    // No need to check for not found
    mealList.classList.remove("notFound");
}

// Get recipe of the meal
function getMealRecipe(e) {
    e.preventDefault();
    if (e.target.classList.contains("recipe-btn")) {
        let mealItem = e.target.parentElement.parentElement;
        let mealId = mealItem.dataset.id;

        let recipe = recipesData.find(recipe => recipe.id === mealId);
        if (recipe) {
            mealRecipeModal([recipe]);
        } else {
            console.error('Recipe not found');
        }
    }
}

// Create a modal
function mealRecipeModal(meal) {
    meal = meal[0];
    let html = `
        <h2 class="recipe-title">${meal.name}</h2>
        <p class="recipe-category">${meal.subcategory}</p>
        <div class="recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.steps.join('<br>')}</p>
        </div>
        <div class="recipe-meal-img">
            <img src="${meal.image}" alt="">
        </div>
        <div class="recipe-link">
            <a href="${meal.url}" target="_blank">View Full Recipe</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add("showRecipe");
}
