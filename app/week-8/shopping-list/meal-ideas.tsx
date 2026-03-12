"use client";

import { useEffect, useState } from "react";

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

type MealIdeasProps = {
  ingredient: string;
};

export async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  const base = ingredient.trim().toLowerCase();
  if (!base) {
    return [];
  }

  const singular = base.endsWith("s") ? base.slice(0, -1) : base;
  const firstWord = base.split(" ")[0];
  const candidates = Array.from(new Set([base, singular, firstWord]));

  try {
    for (const candidate of candidates) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(candidate)}`,
      );

      const data = (await response.json()) as { meals: Meal[] | null };
      if (data.meals && data.meals.length > 0) {
        return data.meals;
      }
    }

    return [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }: MealIdeasProps) {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMealIdeas = async () => {
    const mealIdeas = await fetchMealIdeas(ingredient);
    setMeals(mealIdeas);
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div>
      <h2>Meal Ideas</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {meals.map((meal) => (
          <li
            key={meal.idMeal}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "0.75rem",
            }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width={64}
              height={64}
              style={{ borderRadius: "0.5rem", objectFit: "cover" }}
            />
            <span>{meal.strMeal}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
