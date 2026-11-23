function calculateRemainingCalories(goal, total)
{
    return goal - total;
}

function calculateProgress(goal, total)
{
    return (total / goal) * 100;
}

function isValidGoal(goal)
{
    return goal > 0;
}

test("calculates remaining calories correctly", () =>
{
    expect(
        calculateRemainingCalories(2500, 1800)
    ).toBe(700);
});

test("returns negative calories when over goal", () =>
{
    expect(
        calculateRemainingCalories(2500, 3000)
    ).toBe(-500);
});

test("calculates progress percentage correctly", () =>
{
    expect(
        calculateProgress(2500, 1250)
    ).toBe(50);
});

test("accepts a valid goal", () =>
{
    expect(
        isValidGoal(2500)
    ).toBe(true);
});

test("rejects an invalid goal", () =>
{
    expect(
        isValidGoal(0)
    ).toBe(false);
});