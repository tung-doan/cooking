const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
const mealContainer = document.querySelector(".container");

let recipesData = [];
let recipeChunks = [];
let currentChunkIndex = 0;

// Event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
    mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// Fetch recipes data
fetch('./baking.json')
    .then((response) => response.json())
    .then((data) => {
        recipesData = data;
        // Split recipesData into chunks of 20 recipes each
        recipeChunks = chunkArray(recipesData, 20);
        // Populate meal list with the first chunk
        getMealList();
        // Create navigation boxes
        createNavigationBoxes();
    })
    .catch((error) => {
        console.error('Error fetching local JSON file:', error);
    });

// Function to split array into chunks
function chunkArray(arr, chunkSize) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
}

// Get meal list that matches with the ingredients
function getMealList() {
    let html = "";
    const currentChunk = recipeChunks[currentChunkIndex];
    currentChunk.forEach((recipe) => {
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
    mealList.classList.remove("notFound");
}

// Function to create navigation boxes
function createNavigationBoxes() {
    const numChunks = recipeChunks.length;
    const navigationContainer = document.createElement("div");
    navigationContainer.classList.add("navigation-boxes");

    for (let i = 0; i < numChunks; i++) {
        const box = document.createElement("div");
        box.classList.add("navigation-box");
        box.textContent = i + 1;
        box.addEventListener("click", () => {
            currentChunkIndex = i;
            getMealList();
        });
        navigationContainer.appendChild(box);
    }

    mealContainer.appendChild(navigationContainer);
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
