import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Ingredient, Recipe } from "../utils/Types";

type GroceriesType = {
  groceries: Ingredient[];
  addItem: (data: Recipe, multiplier: number) => void;
  removeItem: (id: string) => void;
  toggleCheck: (id: string) => void;
};

const GroceriesContext = createContext<GroceriesType>({
  groceries: [],
  addItem: () => {},
  removeItem: () => {},
  toggleCheck: () => {},
});

const GroceriesContextProvider = ({ children }: PropsWithChildren) => {
  const [groceries, setGroceries] = useState<Ingredient[] | []>([]);

  const addItem = (data: Recipe, multiplier: number) => {
    const newGroceries = data.ingredients.map((item) => {
      const GroceryExists = groceries.find(
        (groceryItem) =>
          groceryItem.foodId === item.foodId || groceryItem.food === item.food
      );
      if (GroceryExists) {
        return {
          ...GroceryExists,
          weight: GroceryExists.weight + item.weight * multiplier,
          checked: false,
        };
      } else {
        return { ...item, checked: false };
      }
    });
    setGroceries(newGroceries);
  };

  const resetGroceries = () => {
    setGroceries([]);
  };

  const toggleCheck = (id: string) => {
    const updatedGroceries = groceries.map((item) =>
      item.foodId !== id ? item : { ...item, checked: !item.checked }
    );
    setGroceries(updatedGroceries);
  };

  const removeItem = (id: string) => {
    const filteredGroceries = groceries.filter((item) => item.foodId !== id);
    setGroceries(filteredGroceries);
  };

  return (
    <GroceriesContext.Provider
      value={{ groceries, addItem, removeItem, toggleCheck }}
    >
      {children}
    </GroceriesContext.Provider>
  );
};

export default GroceriesContextProvider;

export const useGroceries = () => useContext(GroceriesContext);
