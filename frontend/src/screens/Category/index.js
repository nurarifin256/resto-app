/** @format */

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { themeColors } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../hooks/categoryHook";
import Domain from "../../../Domain";

export default function Category() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const { refetch, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <View className="flex-1">
      <ScrollView>
        <View className="mx-5 mt-10 mb-20">
          <View>
            <Text className="text-center p-3 text-3xl font-bold">
              List Category
            </Text>
          </View>
          {categories?.categories.map((category, index) => {
            return (
              <View
                key={index}
                className="bg-white rounded-xl flex-row h-20 my-2"
              >
                <Image
                  className="rounded-full w-16 h-16 my-auto mx-3 bg-gray-200"
                  source={{
                    uri: `${Domain.ipAddress}/api/${category.image}`,
                  }}
                />
                <Text className="text-lg text-gray-500 text-center my-auto">
                  {category.name}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Add/Category", {
            refetch: refetch,
          })
        }
        className="rounded-full absolute bottom-0 right-0 h-16 w-16"
      >
        <AntDesign name="pluscircle" size={45} color={themeColors.bgColor(1)} />
      </TouchableOpacity>
    </View>
  );
}
