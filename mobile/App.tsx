import React from "react";

import { useFonts } from "expo-font";
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

import Routes from "./src/routes";

export default function App() {
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Routes />;
}

// import React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   Dimensions,
//   TouchableOpacity,
// } from "react-native";
// import { useFonts } from "expo-font";
// import {
//   Nunito_600SemiBold,
//   Nunito_700Bold,
//   Nunito_800ExtraBold,
// } from "@expo-google-fonts/nunito";
// import Routes from "./src/routes";

// export default function App() {
//   const [fontsLoader] = useFonts({
//     Nunito_600SemiBold,
//     Nunito_700Bold,
//     Nunito_800ExtraBold,
//   });

//   if (!fontsLoader) {
//     return null;
//   }

//   return <Routes />;
// }
