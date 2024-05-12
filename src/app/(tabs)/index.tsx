import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "@/src/components/Themed";
import SearchBar from "@/src/components/SearchBar";
import RecipesList from "@/src/components/RecipeList";
import { useRecipesByKeyword } from "@/src/api/recipes";
import { useParams } from "@/src/providers/SearchFilterContextProvider";

export default function Home() {
  const { mutate: searchRecipe, isPending } = useRecipesByKeyword();
  const { parameters, updateParameters } = useParams();
  const handleSubmit = (text: string) => {
    if (text) {
      const formattedText = text.replace(/[^a-zA-Z]+/g, " ").trim();
      updateParameters({ ...parameters, searchText: formattedText });
      searchRecipe(formattedText);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar handleSubmit={handleSubmit} />
      <View style={styles.searchResults}>
        {isPending && <ActivityIndicator />}
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
