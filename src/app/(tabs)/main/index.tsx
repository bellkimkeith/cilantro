import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "@/src/components/Themed";
import SearchBar from "@/src/components/SearchBar";
import RecipesList from "@/src/components/RecipeList";
import {
  useRecipesByKeyword,
  useRecipesByKeywordWithFilter,
} from "@/src/api/recipes";
import { useParams } from "@/src/providers/SearchFilterContextProvider";

export default function Main() {
  const { mutate: searchRecipe, isPending: isPendingSearch } =
    useRecipesByKeyword();
  const { parameters, updateParameters } = useParams();
  const { mutate: searchRecipeWithFilter, isPending: isPendingWithFilter } =
    useRecipesByKeywordWithFilter();
  const handleSubmit = (text: string) => {
    if (text) {
      const formattedText = text.replace(/[^a-zA-Z]+/g, " ").trim();
      updateParameters({ ...parameters, searchText: formattedText });
      if (
        parameters.cuisineFilter ||
        parameters.dietFilter ||
        parameters.timeFilter
      ) {
        searchRecipeWithFilter({ ...parameters, searchText: formattedText });
      } else {
        searchRecipe(formattedText);
      }
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar handleSubmit={handleSubmit} />
      <View style={styles.searchResults}>
        {(isPendingSearch || isPendingWithFilter) && <ActivityIndicator />}
        <RecipesList />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchResults: {
    flex: 1,
    gap: 5,
  },
});
