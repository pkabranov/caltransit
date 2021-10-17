import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { Appbar, Button, Card, Paragraph } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { COLOR_ACCENT, COLOR_PRIMARY } from "./AppStyles";

// Theme Object for React Native Paper
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: COLOR_PRIMARY,
    accent: COLOR_ACCENT,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.8719,
              longitude: -122.2585,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              key={1}
              coordinate={{ latitude: 37.8719, longitude: -122.2585 }}
              title={"UC Berkeley"}
              description={"#1 Public University"}
            />
          </MapView>
          <Appbar
            title="button"
            style={{
              position: "absolute",
              bottom: 50,
              width: Dimensions.get("window").width,
            }}
          />
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
