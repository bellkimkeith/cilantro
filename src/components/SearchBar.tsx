import { Pressable, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Badge } from "@rneui/base";
import { useParams } from "../providers/SearchFilterContextProvider";

type SearchBarProps = {
  handleSubmit: (text: string) => void;
  isMain: boolean;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
};

const SearchBar = ({
  handleSubmit,
  isMain,
  setSearchText,
  searchText,
}: SearchBarProps) => {
  const { filtersCount, parameters } = useParams();

  return (
    <View style={styles.container}>
      <FontAwesome6
        name="magnifying-glass"
        size={24}
        color="grey"
        onPress={() => {
          handleSubmit(searchText);
        }}
        suppressHighlighting={true}
      />
      <View style={styles.search}>
        <TextInput
          placeholder="Search"
          onSubmitEditing={(e) => {
            handleSubmit(e.nativeEvent.text);
          }}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setSearchText}
          clearButtonMode="always"
        />
      </View>
      {isMain && (
        <View>
          <Link href="/filter" asChild>
            <Pressable>
              <FontAwesome6
                name="filter"
                size={24}
                color="gray"
                suppressHighlighting={true}
              />
              <Badge
                value={
                  parameters.searchText !== "" ? filtersCount - 1 : filtersCount
                }
                status="error"
                containerStyle={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  display: filtersCount > 0 ? "flex" : "none",
                }}
              />
            </Pressable>
          </Link>
        </View>
      )}
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
    backgroundColor: "#eee",
    borderRadius: 20,
    padding: 12,
  },
  search: {
    flex: 1,
  },
});
