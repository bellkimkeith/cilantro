const appId = process.env.EXPO_PUBLIC_APP_ID;
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export const Edamam = {
  baseUrl: `${process.env.EXPO_PUBLIC_API_URL}&app_id=${appId}&app_key=${apiKey}`,
};
