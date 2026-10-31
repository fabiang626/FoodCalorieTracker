const foodForm = document.getElementById("food-form");
const foodName = document.getElementById("food-name");
const foodCalories = document.getElementById("food-calories");
const foodList = document.getElementById("food-list");
const totalCalories = document.getElementById("total-calories");
const formMessage = document.getElementById("form-message");

let foods =
    JSON.parse(localStorage.getItem("foods")) || [];

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

    if(calories <= 0)
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
}

renderFoods();