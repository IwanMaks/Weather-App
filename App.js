import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, StyleSheet, Text, View, BackHandler } from "react-native";
import * as Location from "expo-location";
import axios from "axios";

import { Loading } from "./Loading";
import { Weather } from "./Weather";

const API_KEY = "6e58dae4d3f083e8cbe4151a9735d577";

export default class extends React.Component {
    state = {
        isLoading: true,
        temp: 0,
        condition: "",
        name: "",
        feels_like: 0,
        speed: 0,
        deg: 0,
    };

    getWeather = async (latitude, longitude) => {
        const {
            data: {
                main: { temp, feels_like },
                weather,
                name,
                wind: { deg, speed },
            },
        } = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=ru`
        );
        this.setState({
            isLoading: false,
            temp,
            condition: weather[0].main,
            name,
            feels_like,
            speed,
            deg,
        });
    };

    getLocation = async () => {
        try {
            const hasEnablea = await Location.hasServicesEnabledAsync();
            if (hasEnablea) {
                while (
                    (await Location.getPermissionsAsync()).status !== "granted"
                ) {
                    if ((await Location.getPermissionsAsync()).canAskAgain) {
                        await Location.requestPermissionsAsync();
                    } else {
                        break;
                    }
                }
                const {
                    coords: { latitude, longitude },
                } = await Location.getCurrentPositionAsync({});
                this.getWeather(latitude, longitude);
            } else {
                throw Error(
                    "На вашем устройстве отключены или не поддерживаются службы геопозиции"
                );
            }
        } catch (e) {
            Alert.alert("Ошибка", e.message, [
                { text: "Ок", onPress: () => BackHandler.exitApp() },
            ])
        }
    };

    componentDidMount() {
        //this.getWeather(1, 2);
        this.getLocation();
    }

    render() {
        const {
            isLoading,
            temp,
            condition,
            name,
            feels_like,
            deg,
            speed,
        } = this.state;
        return isLoading ? (
            <Loading />
        ) : (
            <Weather
                temp={Math.round(temp)}
                condition={condition}
                name={name}
                feels_like={Math.round(feels_like)}
                speed={speed}
                deg={deg}
                getLoc={this.getLocation}
            />
        );
    }
}
