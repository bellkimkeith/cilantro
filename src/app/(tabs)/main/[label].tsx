import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCachedRecipes } from "@/src/api/recipes";
import { CachedRecipes } from "@/src/utils/Types";
import NutrientDetails from "@/src/components/NutrientDetails";
import Ingredients from "@/src/components/Ingredients";
import { useFavorites } from "@/src/providers/FavoritesContextProvider";

const Details = () => {
  const { label } = useLocalSearchParams();
  const recipes: CachedRecipes | undefined = useCachedRecipes();
  const favorites = useFavorites().favorites;
  const currentRecipe =
    (recipes &&
      recipes.hits.find(
        (item) => item.recipe.label.replace(/[^a-zA-Z]+/g, " ").trim() === label
      )) ||
    favorites.find(
      (item) => item.recipe.label.replace(/[^a-zA-Z]+/g, " ").trim() === label
    );

  if (!currentRecipe) {
    return (
      <View style={styles.emptyContainer}>
        <Stack.Screen options={{ title: "", headerBackTitleVisible: false }} />
        <Text>No details for this recipe</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: typeof label === "string" ? label : "",
          headerBackTitleVisible: false,
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri: currentRecipe && currentRecipe.recipe.image,
          }}
          style={styles.image}
        />
        <NutrientDetails
          recipe={currentRecipe.recipe}
          _links={currentRecipe._links}
        />
        <Ingredients
          recipe={currentRecipe.recipe}
          _links={currentRecipe._links}
        />
      </ScrollView>
    </>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    height: 250,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
