import Colors from "@/src/constants/Colors";
import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerTintColor: Colors.light.tint }}>
      <Stack.Screen name="index" options={{ title: "Cilantro" }} />
    </Stack>
  );
}
