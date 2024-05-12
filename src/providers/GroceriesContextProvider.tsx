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
};

const GroceriesContext = createContext<GroceriesType>({
  groceries: [],
  addItem: () => {},
  removeItem: () => {},
});

const GroceriesContextProvider = ({ children }: PropsWithChildren) => {
  const [groceries, setGroceries] = useState<Ingredient[] | []>([]);

  const addItem = (data: Recipe, multiplier: number) => {
    const newGroceries = data.ingredients.map((item) => {
      const GroceryExists = groceries.find(
        (groceryItem) => groceryItem.foodId === item.foodId
      );
      if (GroceryExists) {
        return {
          ...GroceryExists,
          weight: GroceryExists.weight + item.weight * multiplier,
        };
      } else {
        return item;
      }
    });
    setGroceries(newGroceries);
  };

  const resetGroceries = () => {
    setGroceries([]);
  };

  const removeItem = (id: string) => {
    const filteredGroceries = groceries.filter((item) => item.foodId !== id);
    setGroceries(filteredGroceries);
  };

  return (
    <GroceriesContext.Provider value={{ groceries, addItem, removeItem }}>
      {children}
    </GroceriesContext.Provider>
  );
};

export default GroceriesContextProvider;

export const useGroceries = () => useContext(GroceriesContext);
