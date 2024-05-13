import { ActivityIndicator, FlatList, StyleSheet, Text } from "react-native";
import React from "react";
import { useInitialRecipes } from "@/src/api/recipes";
import RecipeListItem from "./RecipeListItem";
import { View } from "./Themed";

const RecipeList = () => {
  const { data, isFetching } = useInitialRecipes();

  if (isFetching) return <ActivityIndicator />;

  if (!data.hits.length)
    return (
      <View style={styles.emptyView}>
        <Text>No Results</Text>
      </View>
    );
  return (
    <FlatList
      data={data.hits}
      keyExtractor={(item) => item.recipe.uri}
      renderItem={({ item }) => <RecipeListItem item={item} />}
      contentContainerStyle={{ gap: 12, paddingHorizontal: 5 }}
      showsVerticalScrollIndicator={false}
      initialNumToRender={10}
    />
  );
};

export default RecipeList;

const styles = StyleSheet.create({
  emptyView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0FBE2",
  },
});
