import { FlatList, StyleSheet, Text } from "react-native";
import { View } from "@/src/components/Themed";
import { useFavorites } from "@/src/providers/FavoritesContextProvider";
import RecipeListItem from "@/src/components/RecipeListItem";

export default function Favorites() {
  const favorites = useFavorites().favorites;

  if (!favorites.length)
    return (
      <View style={styles.emptyView}>
        <Text>No favorites added yet</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.recipe.label}
        renderItem={({ item }) => <RecipeListItem item={item} />}
        contentContainerStyle={{ gap: 12, paddingHorizontal: 5 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#E0FBE2",
  },
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0FBE2",
  },
});
