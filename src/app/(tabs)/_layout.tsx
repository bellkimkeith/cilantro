import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { useClientOnlyValue } from "@/src/components/useClientOnlyValue";
import { Badge } from "@rneui/base";
import { useFavorites } from "@/src/providers/FavoritesContextProvider";
import { useGroceries } from "@/src/providers/GroceriesContextProvider";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome6>["name"];
  color: string;
}) {
  return <FontAwesome6 size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const favorites = useFavorites().favorites;
  const groceries = useGroceries().groceries;
  const uncheckedItems = groceries.filter((item) => !item.checked).length;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="main"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bowl-food" color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color, size }) => (
            <>
              <FontAwesome name="star" size={size} color={color} />
              <Badge
                value={favorites.length}
                status="error"
                containerStyle={{
                  position: "absolute",
                  top: 2,
                  right: 42,
                  display: favorites.length > 0 ? "flex" : "none",
                }}
              />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="groceries"
        options={{
          title: "Groceries",
          tabBarIcon: ({ color }) => (
            <>
              <TabBarIcon name="list-check" color={color} />
              <Badge
                value={uncheckedItems}
                status="error"
                containerStyle={{
                  position: "absolute",
                  top: 2,
                  right: 42,
                  display: uncheckedItems > 0 ? "flex" : "none",
                }}
              />
            </>
          ),
        }}
      />
    </Tabs>
  );
}
