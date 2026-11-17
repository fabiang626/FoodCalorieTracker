
// Food form elements
const foodForm = document.getElementById("food-form");
const foodName = document.getElementById("food-name");
const foodCalories = document.getElementById("food-calories");
const foodList = document.getElementById("food-list");
const totalCalories = document.getElementById("total-calories");
const formMessage = document.getElementById("form-message");

// Goal form elements
const goalForm = document.getElementById("goal-form");
const calorieGoalInput = document.getElementById("calorie-goal");
const dailyGoalDisplay = document.getElementById("daily-goal-display");
const remainingCaloriesDisplay = document.getElementById("remaining-calories");
const remainingMessage = document.getElementById("remaining-message");
const goalMessage = document.getElementById("goal-message");

// Load saved food entries
let foods =
    JSON.parse(localStorage.getItem("foods")) || [];

// Load saved calorie goal
let calorieGoal =
    Number(localStorage.getItem("calorieGoal")) || 0;


// US-04: Save Daily Calorie Goal
goalForm.addEventListener("submit", function(event)
{
    event.preventDefault();

    const goal = Number(calorieGoalInput.value);

    // Validate calorie goal
    if (!Number.isFinite(goal) || goal <= 0)
    {
        goalMessage.textContent =
            "Calorie goal must be greater than 0.";
        return;
    }

    // Save goal
    calorieGoal = goal;

    localStorage.setItem(
        "calorieGoal",
        calorieGoal
    );

    goalMessage.textContent =
        "Daily calorie goal saved successfully!";

    displayCalorieGoal();
    renderFoods();
});


// Display saved calorie goal
function displayCalorieGoal()
{
    if (calorieGoal > 0)
    {
        dailyGoalDisplay.textContent =
            calorieGoal + " calories per day";

        calorieGoalInput.value = calorieGoal;
    }
    else
    {
        dailyGoalDisplay.textContent = "No goal set";
    }
}


// Sprint 1: Add Food
foodForm.addEventListener("submit", function(event)
{
    event.preventDefault();

    const name = foodName.value.trim();
    const calories = Number(foodCalories.value);

    if(name === "")
    {
        formMessage.textContent =
            "Food name cannot be empty.";
        return;
    }

    if(!Number.isFinite(calories) || calories <= 0)
    {
        formMessage.textContent =
            "Calories must be greater than 0.";
        return;
    }

    formMessage.textContent = "";

    foods.push(
    {
        name: name,
        calories: calories
    });

    localStorage.setItem(
        "foods",
        JSON.stringify(foods)
    );

    renderFoods();

    foodForm.reset();
});


// Display food entries and total calories
function renderFoods()
{
    foodList.innerHTML = "";

    let total = 0;

    foods.forEach(function(food)
    {
        const item =
            document.createElement("li");

        item.textContent =
            food.name +
            " - " +
            food.calories +
            " calories";

        foodList.appendChild(item);

        total += food.calories;
    });

    totalCalories.textContent = total;
    if (calorieGoal > 0)
{
    const remainingCalories =
        calorieGoal - total;

    remainingCaloriesDisplay.textContent =
        remainingCalories;

    if (remainingCalories < 0)
    {
        remainingMessage.textContent =
            "⚠ Over Goal By " +
            Math.abs(remainingCalories) +
            " Calories";
    }
    else
    {
        remainingMessage.textContent = "";
    }
}
else
{
    remainingCaloriesDisplay.textContent =
        "No goal set";

    remainingMessage.textContent = "";
}
}


// Load saved information when page opens
renderFoods();
displayCalorieGoal();
