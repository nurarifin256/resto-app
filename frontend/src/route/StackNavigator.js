/** @format */

import { StyleSheet } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import {
  AddCategory,
  Category,
  Favourite,
  Home,
  Login,
  Profile,
  Register,
  Search,
} from "../screens";
import { themeColors } from "../theme";
import { getData } from "../storage/userStorage";

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    getData().then((data) => {
      setToken(data.token);
      setUsername(data.user.name);
    });
  }, []);

  function BottomTabs() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarHideOnKeyboard: true,
        }}
      >
        {username === "admin" ? (
          <>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Entypo
                      name="home"
                      size={24}
                      color={themeColors.bgColor(1)}
                    />
                  ) : (
                    <AntDesign name="home" size={24} color="black" />
                  ),
              }}
            />

            <Tab.Screen
              name="Category"
              component={Category}
              options={{
                tabBarLabel: "Category",
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Ionicons
                      name="fast-food"
                      size={24}
                      color={themeColors.bgColor(1)}
                    />
                  ) : (
                    <Ionicons
                      name="fast-food-outline"
                      size={24}
                      color="black"
                    />
                  ),
              }}
            />

            <Tab.Screen
              name="Search"
              component={Search}
              options={{
                tabBarLabel: "Search",
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Ionicons
                      name="notifications"
                      size={24}
                      color={themeColors.bgColor(1)}
                    />
                  ) : (
                    <Ionicons
                      name="notifications-outline"
                      size={24}
                      color="black"
                    />
                  ),
              }}
            />

            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Ionicons
                      name="person"
                      size={24}
                      color={themeColors.bgColor(1)}
                    />
                  ) : (
                    <Ionicons name="person-outline" size={24} color="black" />
                  ),
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{
                tabBarLabel: "Home",
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Entypo
                      name="home"
                      size={24}
                      color={themeColors.bgColor(1)}
                    />
                  ) : (
                    <AntDesign name="home" size={24} color="black" />
                  ),
              }}
            />

            <Tab.Screen
              name="Favourite"
              component={Favourite}
              options={{
                tabBarLabel: "Favourite",
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <AntDesign
                      name="heart"
                      size={24}
                      color={themeColors.bgColor(1)}
                    />
                  ) : (
                    <AntDesign name="hearto" size={24} color="black" />
                  ),
              }}
            />

            <Tab.Screen
              name="Search"
              component={Search}
              options={{
                tabBarLabel: "Search",
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Ionicons
                      name="notifications"
                      size={24}
                      color={themeColors.bgColor(1)}
                    />
                  ) : (
                    <Ionicons
                      name="notifications-outline"
                      size={24}
                      color="black"
                    />
                  ),
              }}
            />

            <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                tabBarLabel: "Profile",
                tabBarIcon: ({ focused }) =>
                  focused ? (
                    <Ionicons
                      name="person"
                      size={24}
                      color={themeColors.bgColor(1)}
                    />
                  ) : (
                    <Ionicons name="person-outline" size={24} color="black" />
                  ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Add/Category" component={AddCategory} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
