import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Ingredient, Recipe } from "../utils/Types";

type GroceryItem = {
  id: string;
  recipe: Recipe;
  ingredients: Ingredient[];
};

type GroceriesType = {
  groceries: GroceryItem[];
  addItem: (data: Recipe, multiplier: number) => void;
  removeItem: (id: string) => void;
  toggleCheck: (id: string, foodId: string) => void;
  resetGroceries: () => void;
};

const GroceriesContext = createContext<GroceriesType>({
  groceries: [],
  addItem: () => {},
  removeItem: () => {},
  toggleCheck: () => {},
  resetGroceries: () => {},
});

const GroceriesContextProvider = ({ children }: PropsWithChildren) => {
  const [groceries, setGroceries] = useState<GroceryItem[] | []>([]);

  // const addItem = (data: Recipe, multiplier: number) => {
  //   const newGroceries = data.ingredients.map((item) => {
  //     const GroceryExists = groceries.find(
  //       (groceryItem) =>
  //         groceryItem.foodId === item.foodId || groceryItem.food === item.food
  //     );
  //     if (GroceryExists) {
  //       return {
  //         ...GroceryExists,
  //         weight: GroceryExists.weight + item.weight * multiplier,
  //         checked: false,
  //       };
  //     } else {
  //       return { ...item, checked: false };
  //     }
  //   });
  //   setGroceries(newGroceries);
  // };

  const addItem = (recipe: Recipe, multiplier: number) => {
    const groceryItemExists = groceries.find((item) => item.recipe === recipe);

    if (groceryItemExists) {
      const updatedIngredients = groceryItemExists.ingredients.map((item) => {
        const originalWeight =
          recipe.ingredients.find((rec) => rec.foodId === item.foodId)
            ?.weight || 0;
        const computedWeight = originalWeight * multiplier;
        return { ...item, weight: item.weight + computedWeight };
      });
      updateQuantity(recipe.label, updatedIngredients);
      return;
    }

    const newGroceryItem: GroceryItem = {
      id: recipe.shareAs,
      recipe,
      ingredients: recipe.ingredients.map((item) => ({
        ...item,
        checked: false,
        parentRecipeLabel: recipe.label,
      })),
    };

    setGroceries([newGroceryItem, ...groceries]);
  };

  const updateQuantity = (recipeLabel: string, ingredients: Ingredient[]) => {
    const updatedGroceryItems = groceries.map((item) =>
      item.recipe.label !== recipeLabel
        ? item
        : { ...item, ingredients: ingredients }
    );
    setGroceries(updatedGroceryItems);
  };

  const resetGroceries = () => {
    setGroceries([]);
  };

  const toggleCheck = (recipeLabel: string, foodId: string) => {
    const groceryItemExists = groceries.find(
      (item) => item.recipe.label === recipeLabel
    );

    let updatedIngredients: Ingredient[] = [];

    if (groceryItemExists) {
      updatedIngredients = groceryItemExists.ingredients.map((item) =>
        item.foodId !== foodId ? item : { ...item, checked: !item.checked }
      );
    }

    const updatedGroceryItems = groceries.map((item) =>
      item.recipe.label !== recipeLabel
        ? item
        : { ...item, ingredients: updatedIngredients }
    );

    setGroceries(updatedGroceryItems);
  };

  const removeItem = (id: string) => {
    const filteredGroceries = groceries.filter((item) => item.id !== id);
    setGroceries(filteredGroceries);
  };

  return (
    <GroceriesContext.Provider
      value={{ groceries, addItem, removeItem, toggleCheck, resetGroceries }}
    >
      {children}
    </GroceriesContext.Provider>
  );
};

export default GroceriesContextProvider;

export const useGroceries = () => useContext(GroceriesContext);
