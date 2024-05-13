import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { memo } from "react";
import { Link } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { RecipeListItemProp } from "../utils/Types";

const RecipeListItem = memo(({ item }: RecipeListItemProp) => {
  const formattedText = item.recipe.label.replace(/[^a-zA-Z]+/g, " ").trim();

  return (
    <Link href={`/(tabs)/main/${formattedText}`} asChild onPress={() => {}}>
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
                <Text style={[styles.detailsSubText, { flex: 1 }]}>
                  {item.recipe.source}
                </Text>
                <Text style={styles.detailsSubText}>
                  <FontAwesome5 name="fire-alt" size={16} color="#E72929" />{" "}
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
    backgroundColor: "#ACE1AF",
    borderRadius: Platform.OS === "android" ? 8 : 20,
    shadowRadius: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    borderWidth: 0.2,
    elevation: Platform.OS === "android" ? 4 : 0,
  },
  image: {
    height: 200,
    borderRadius: Platform.OS === "android" ? 8 : 20,
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
    color: "#000",
  },
});
