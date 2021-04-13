import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";

export const Loading = () => {
    return (
        <View style={styles.container}>
            {/* TODO: Проверить на платформу */}
            <StatusBar barStyle='auto' />
            <Text style={styles.text}>Loading the weather...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 30,
        paddingVertical: 100,
        backgroundColor: '#FDF6AA',
    },
    text: {
        color: '#2c2c2c',
        fontSize: 30
    }
});
