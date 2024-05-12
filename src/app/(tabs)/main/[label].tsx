import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCachedRecipes } from "@/src/api/recipes";
import { CachedRecipes } from "@/src/utils/Types";

const Details = () => {
  const { label } = useLocalSearchParams();
  const recipes: CachedRecipes | undefined = useCachedRecipes();
  const currentRecipe =
    recipes &&
    recipes.hits.find(
      (item) => item.recipe.label.replace(/[^a-zA-Z]+/g, " ").trim() === label
    );

  if (!currentRecipe) {
    return (
      <View>
        <Text>No details for this recipe</Text>
      </View>
    );
  }

  return (
    <View>
      <Stack.Screen
        options={{
          title: typeof label === "string" ? label : "",
          headerBackTitleVisible: false,
        }}
      />
      <Image
        source={{
          uri: currentRecipe && currentRecipe.recipe.image,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text>{label}</Text>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
  },
});
