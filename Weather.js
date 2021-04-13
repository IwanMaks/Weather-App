import React from "react";
import propTypes from "prop-types";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
    Thunderstorm: {
        iconName: "weather-lightning",
        gradient: ["#141E30", "#243B55"],
        gradient: ["#141E30", "#243B55"],
        title: "Сиди дома",
        subtitle: "Ты видишь что на улице?",
    },
    Drizzle: {
        iconName: "weather-rainy",
        gradient: ["#3a7bd5", "#3a6073"],
        gradient: ["#3a7bd5", "#3a6073"],
        title: "Возьми зонтик",
        subtitle: "Возможно скоро дождь усилится ",
    },
    Rain: {
        iconName: "weather-pouring",
        gradient: ["#000046", "#1CB5E0"],
        gradient: ["#000046", "#1CB5E0"],
        title: "На улице дождь",
        subtitle: "А значит скоро будет радуга!",
    },
    Snow: {
        iconName: "snowflake",
        gradient: ["#83a4d4", "#b6fbff"],
        gradient: ["#83a4d4", "#b6fbff"],
        title: "На улице снежок!",
        subtitle: "Одевайтесь потеплее, лепите снеговиков",
    },
    Dust: {
        iconName: "weather-windy-variant",
        gradient: ["#B79891", "#94716B"],
        gradient: ["#B79891", "#94716B"],
        title: "Пыльно",
        subtitle: "Лучше закройте окна",
    },
    Smoke: {
        iconName: "weather-windy",
        gradient: ["#56CCF2", "#2F80ED"],
        gradient: ["#56CCF2", "#2F80ED"],
        title: "На улице смог :(",
        subtitle: "Не советую выходить без необходимости",
    },
    Haze: {
        iconName: "weather-hazy",
        gradient: ["#3E5151", "#DECBA4"],
        gradient: ["#3E5151", "#DECBA4"],
        title: "На улице снежок!",
        subtitle: "Одевайтесь потеплее, лепите снеговиков",
    },
    Mist: {
        iconName: "weather-fog",
        gradient: ["#606c88", "#3f4c6b"],
        gradient: ["#606c88", "#3f4c6b"],
        title: "Ни черта не видно в тумане",
        subtitle: "Зато как в Сайлент-Хилле :)",
    },
    Clear: {
        iconName: "weather-sunny",
        gradient: ["#56CCF2", "#2F80ED"],
        gradient: ["#56CCF2", "#2F80ED"],
        title: "Погода супер :)",
        subtitle: "Иди гулять, хватит сидеть дома!",
    },
    Clouds: {
        iconName: "weather-cloudy",
        gradient: ["#757F9A", "#D7DDE8"],
        gradient: ["#757F9A", "#D7DDE8"],
        title: "Облака",
        subtitle: "Белогривые лошадки",
    },
};

export const Weather = ({
    temp,
    condition,
    name,
    feels_like,
    speed,
    deg,
    getLoc,
}) => {
    let degree = 0;
    if (deg > 0 && deg < 90) {
        degree = 45;
    } else if (deg === 90) {
        degree = 90;
    } else if (deg > 90 && deg < 180) {
        degree = 135;
    } else if (deg === 180) {
        degree = 180;
    } else if (deg > 180 && deg < 270) {
        degree = 225;
    } else if (deg === 270) {
        degree = 270;
    } else if (deg > 270 && deg < 360) {
        degree = 315;
    }

    return (
        <LinearGradient
            colors={weatherOptions[condition].gradient}
            style={styles.container}
        >
            {/* TODO: Проверить на платформу */}
            <StatusBar barStyle="light-content" />
            <View style={styles.countryWrapp}>
                <Text style={styles.country}>{name}</Text>
                <MaterialCommunityIcons.Button
                    name="reload"
                    size={24}
                    color="white"
                    backgroundColor="transparent"
                    onPress={getLoc}
                />
            </View>
            <View style={styles.halfContainer}>
                <MaterialCommunityIcons
                    name={weatherOptions[condition].iconName}
                    size={96}
                    color="white"
                />
                <Text style={styles.temp}>{temp}°</Text>
                {temp !== feels_like ? (
                    <Text style={styles.subTemp}>
                        Ощущается как {feels_like}°
                    </Text>
                ) : null}
                <View style={styles.windWrapp}>
                    <Text style={styles.wind}>Ветер {speed} м/с</Text>
                    <MaterialCommunityIcons
                        size={20}
                        name="arrow-right"
                        color="white"
                        style={{ transform: [{ rotate: `-${degree}deg` }] }}
                    />
                </View>
            </View>
            <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
                <Text style={styles.title}>
                    {weatherOptions[condition].title}
                </Text>
                <Text style={styles.subTitle}>
                    {weatherOptions[condition].subtitle}
                </Text>
            </View>
        </LinearGradient>
    );
};

Weather.propTypes = {
    temp: propTypes.number.isRequired,
    condition: propTypes.oneOf([
        "Thunderstorm",
        "Drizzle",
        "Rain",
        "Snow",
        "Mist",
        "Smoke",
        "Clear",
        "Clouds",
        "Haze",
        "Dust",
        "Fog",
        "Sand",
        "Ash",
        "Squall",
        "Tornado",
    ]).isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    temp: {
        fontSize: 42,
        color: "white",
    },
    subTemp: {
        color: "white",
        fontSize: 20,
    },
    wind: {
        color: "white",
        fontSize: 18,
        marginRight: 5,
    },
    windWrapp: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    title: {
        color: "white",
        fontSize: 44,
        fontWeight: "300",
        marginBottom: 10,
    },
    subTitle: {
        color: "white",
        fontWeight: "600",
        fontSize: 24,
    },
    textContainer: {
        paddingHorizontal: 20,
        alignItems: "flex-start",
    },
    country: {
        color: "white",
        fontSize: 24,
    },
    countryWrapp: {
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        marginLeft: 26
    },
});
