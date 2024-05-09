import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          onSubmitEditing={(e) => {
            console.log(e.nativeEvent.text);
          }}
        />
        <FontAwesome6 name="magnifying-glass" size={24} color="gray" />
      </View>
      <View>
        <FontAwesome6
          name="filter"
          size={24}
          color="gray"
          onPress={() => {
            console.log("show filter options");
          }}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  search: {
    flex: 1,
    borderRadius: 20,
    padding: 12,
    backgroundColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
