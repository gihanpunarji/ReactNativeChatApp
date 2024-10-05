import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export const useCustomFonts = () => {
  const [loaded, error] = useFonts({
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
  });

  // Hide splash screen when fonts are loaded or an error occurs
  if (loaded || error) {
    SplashScreen.hideAsync();
  }

  return { loaded, error };
};
