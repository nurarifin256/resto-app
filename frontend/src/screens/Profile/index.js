/** @format */

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getData } from "../../storage/userStorage";

const Profile = () => {
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getData().then((data) => {
        if (data) {
          setToken(data.token);
        }
      });
    }, [])
  );

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <View className="mt-28">
        {token ? (
          <Text>Profile Screen</Text>
        ) : (
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>You are not login, please login</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
