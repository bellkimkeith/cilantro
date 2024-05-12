import { Text } from "react-native";
import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { Hits, Recipe } from "../utils/Types";

type FavoritesType = {
  favorites: Hits[];
  addItem: (data: Hits) => void;
  removeItem: (label: string) => void;
};

const FavoritesContext = createContext<FavoritesType>({
  favorites: [],
  addItem: () => {},
  removeItem: () => {},
});

const FavoritesContextProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hits[] | []>([]);

  const addItem = (data: Hits) => {
    setFavorites([...favorites, data]);
  };

  const removeItem = (label: string) => {
    const filteredFavorites = favorites.filter(
      (item) => item.recipe.label !== label
    );
    setFavorites(filteredFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addItem, removeItem }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;

export const useFavorites = () => useContext(FavoritesContext);
