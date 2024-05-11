import { Pressable, SectionList, StyleSheet, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { RadioButtonProps, RadioGroup } from "react-native-radio-buttons-group";
import Filters from "../constants/Filters";

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
            console.log(dietTypes[Number(e) - 1]);
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
            console.log(dietTypes[Number(e) - 1]);
            setSelectedCuisine(e);
          }}
          selectedId={selectedCuisine}
          containerStyle={{ alignItems: "flex-start", paddingBottom: 12 }}
        />
      ),
      data: ["placeholder"],
    },
  ];

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
      <Pressable style={styles.button}>
        {({ pressed }) => (
          <Text style={[styles.buttonText, { opacity: pressed ? 0.5 : 1 }]}>
            Apply
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
