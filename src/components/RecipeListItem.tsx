import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { memo } from "react";
import { Link } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

type RecipeListItemProp = {
  item: {
    recipe: {
      label: string;
      image: string;
      source: string;
      calories: number;
    };
  };
};

const RecipeListItem = memo(({ item }: RecipeListItemProp) => {
  return (
    <Link href={"/"} asChild onPress={() => {}}>
      <Pressable>
        {({ pressed }) => (
          <View style={[styles.container, { opacity: pressed ? 0.8 : 1 }]}>
            <Image source={{ uri: item.recipe.image }} style={styles.image} />
            <View style={styles.details}>
              <View>
                <Text style={styles.detailsHeaderText}>
                  {item.recipe.label}
                </Text>
              </View>
              <View style={styles.detailsSubView}>
                <Text style={styles.detailsSubText}>{item.recipe.source}</Text>
                <Text style={styles.detailsSubText}>
                  <FontAwesome5 name="fire-alt" size={16} color="#777" />{" "}
                  {item.recipe.calories.toFixed(0)} kcal
                </Text>
              </View>
            </View>
          </View>
        )}
      </Pressable>
    </Link>
  );
});

export default RecipeListItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    borderRadius: 20,
    shadowRadius: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
  },
  image: {
    height: 200,
    borderRadius: 20,
  },
  details: {
    padding: 16,
    borderEndEndRadius: 20,
    gap: 8,
  },
  detailsHeaderText: {
    fontSize: 20,
    fontWeight: "500",
  },
  detailsSubView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsSubText: {
    fontSize: 18,
    color: "#777",
  },
});
