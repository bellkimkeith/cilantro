import {
  ActivityIndicator,
  Pressable,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";
import Filters from "../constants/Filters";
import { useRecipesByKeywordWithFilter } from "../api/recipes";
import { useParams } from "../providers/SearchFilterContextProvider";
import { router } from "expo-router";

const Filter = () => {
  const [selectedDiet, setSelectedDiet] = useState<string | undefined>();
  const [selectedCuisine, setSelectedCuisine] = useState<string | undefined>();
  const cuisineTypes: RadioButtonProps[] = useMemo(
    () => Filters.cuisineType,
    []
  );
  const dietTypes: RadioButtonProps[] = useMemo(() => Filters.diet, []);
  const SECTIONS = [
    {
      title: "Diet",
      renderItem: () => (
        <RadioGroup
          radioButtons={dietTypes}
          onPress={(e) => {
            setSelectedDiet(e);
          }}
          selectedId={selectedDiet}
          containerStyle={{ alignItems: "flex-start", paddingBottom: 12 }}
        />
      ),
      data: ["placeholder"],
    },
    {
      title: "Cuisine",
      renderItem: () => (
        <RadioGroup
          radioButtons={cuisineTypes}
          onPress={(e) => {
            setSelectedCuisine(e);
          }}
          selectedId={selectedCuisine}
          containerStyle={{ alignItems: "flex-start", paddingBottom: 12 }}
        />
      ),
      data: ["placeholder"],
    },
  ];

  const { mutateAsync: searchWithFilter, isPending } =
    useRecipesByKeywordWithFilter();
  const { parameters } = useParams();

  return (
    <View style={styles.container}>
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={SECTIONS}
        keyExtractor={(index) => index}
        renderItem={({ section: { renderItem } }) => <>{renderItem}</>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      />
      <Pressable
        disabled={!selectedDiet && !selectedCuisine}
        style={styles.button}
        onPress={async () => {
          await searchWithFilter({
            ...parameters,
            dietFilter:
              selectedDiet && dietTypes[Number(selectedDiet) - 1].value,
            cuisineFilter:
              selectedCuisine &&
              cuisineTypes[Number(selectedCuisine) - 1].value,
          });
          router.back();
        }}
      >
        {({ pressed }) => (
          <Text style={[styles.buttonText, { opacity: pressed ? 0.5 : 1 }]}>
            {isPending ? <ActivityIndicator /> : "Apply"}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    backgroundColor: "#fff",
    fontWeight: "500",
    paddingBottom: 12,
  },
  button: {
    alignItems: "center",
    paddingBottom: 28,
    paddingTop: 10,
    backgroundColor: "#eee",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
  },
});
