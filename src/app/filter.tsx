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
import { Stack, router } from "expo-router";

const Filter = () => {
  const { mutateAsync: searchWithFilter, isPending } =
    useRecipesByKeywordWithFilter();
  const { parameters, updateParameters, filtersCount } = useParams();
  const cuisineTypes: RadioButtonProps[] = useMemo(
    () => Filters.cuisineType,
    []
  );
  const timeRange: RadioButtonProps[] = useMemo(() => Filters.time, []);
  const dietTypes: RadioButtonProps[] = useMemo(() => Filters.diet, []);
  const [selectedDiet, setSelectedDiet] = useState<string | undefined>(
    parameters.dietFilter &&
      (
        Filters.diet.findIndex((diet) => diet.value === parameters.dietFilter) +
        1
      ).toString()
  );
  const [selectedCuisine, setSelectedCuisine] = useState<string | undefined>(
    parameters.cuisineFilter &&
      (
        Filters.cuisineType.findIndex(
          (cuisine) => cuisine.value === parameters.cuisineFilter
        ) + 1
      ).toString()
  );
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    parameters.timeFilter &&
      (
        Filters.time.findIndex((time) => time.value === parameters.timeFilter) +
        1
      ).toString()
  );
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
    {
      title: "Cooking Time (minutes)",
      renderItem: () => (
        <RadioGroup
          radioButtons={timeRange}
          onPress={(e) => {
            setSelectedTime(e);
          }}
          selectedId={selectedTime}
          containerStyle={{ alignItems: "flex-start", paddingBottom: 12 }}
        />
      ),
      data: ["placeholder"],
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              disabled={!selectedDiet && !selectedCuisine && !selectedTime}
              onPress={() => {
                updateParameters({
                  ...parameters,
                  dietFilter: "",
                  cuisineFilter: "",
                  timeFilter: "",
                });
                setSelectedCuisine(undefined);
                setSelectedDiet(undefined);
                setSelectedTime(undefined);
                console.log("clear");
              }}
            >
              {({ pressed }) => (
                <Text
                  style={{
                    opacity:
                      pressed ||
                      (!selectedDiet && !selectedCuisine && !selectedTime)
                        ? 0.5
                        : 1,
                  }}
                >
                  Clear
                </Text>
              )}
            </Pressable>
          ),
        }}
      />
      <SectionList
        showsVerticalScrollIndicator={false}
        sections={SECTIONS}
        keyExtractor={(index) => index}
        renderItem={({ section: { renderItem } }) => <>{renderItem}</>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
      />
      <Pressable
        disabled={!selectedDiet && !selectedCuisine && !selectedTime}
        style={styles.button}
        onPress={async () => {
          updateParameters({
            ...parameters,
            dietFilter:
              selectedDiet && dietTypes[Number(selectedDiet) - 1].value,
            cuisineFilter:
              selectedCuisine &&
              cuisineTypes[Number(selectedCuisine) - 1].value,
            timeFilter:
              selectedTime && timeRange[Number(selectedTime) - 1].value,
          });
          await searchWithFilter({
            ...parameters,
            dietFilter:
              selectedDiet && dietTypes[Number(selectedDiet) - 1].value,
            cuisineFilter:
              selectedCuisine &&
              cuisineTypes[Number(selectedCuisine) - 1].value,
            timeFilter:
              selectedTime && timeRange[Number(selectedTime) - 1].value,
          });
          router.back();
        }}
      >
        {({ pressed }) => (
          <Text
            style={[
              styles.buttonText,
              {
                opacity:
                  pressed ||
                  (!selectedDiet && !selectedCuisine && !selectedTime)
                    ? 0.5
                    : 1,
              },
            ]}
          >
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
