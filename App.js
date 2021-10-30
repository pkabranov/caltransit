import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { MarkerAnimated } from "react-native-maps";
import { Marker } from "react-native-maps";
import { Appbar, Button, Card, Paragraph } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { COLOR_ACCENT, COLOR_PRIMARY } from "./AppStyles";
import { useState, useEffect } from "react";

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

const state = {
  markers: [
    {
      coordinate: {
        latitude: 37.8719,
        longitude: -122.2585,
      },
      title: "UC Berkeley",
      description: "#1 Public University",
      identifier: "OG",
    },
  ],
};

const getStopsFromApi = (setStops) => {
  return fetch("https://caltransit.herokuapp.com/")
    .then((response) => response.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        state.markers.push({
          coordinate: {
            latitude: json[i].Latitude,
            longitude: json[i].Longitude,
          },
          identifier: json[i].StopId,
          title: json[i].Name,
        });
      }
      console.log(state.markers);
      setStops(json);
    })
    .catch((error) => {
      console.error(error);
    });
};

const Bar = () => {
  return (
    <Appbar style={styles.top}>
      <Appbar.Content
        title="CalTransit"
        titleStyle={{
          fontSize: 25,
          fontWeight: "bold",
          textShadowColor: "#000",
          textShadowRadius: 5,
        }}
      />
    </Appbar>
  );
};

export default function App() {
  const [stops, setStops] = useState([]);

  useEffect(() => {
    getStopsFromApi(setStops);
  }, []);

  let markers = [];
  for (let i = 0; i < state.markers.length; i++) {
    markers.push(
      <Marker
        key={i}
        coordinate={state.markers[i].coordinate}
        title={state.markers[i].title}
        description={"Stop ID: " + state.markers[i].identifier}
        identifier={state.markers[i].identifier}
      />
    );
  }
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
            {markers}
          </MapView>
          <Bar></Bar>
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
  top: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 90,
    paddingTop: 40,
    paddingBottom: 20,
  },
});
