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
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteCategory, getCategories } from "../../hooks/categoryHook";
import Domain from "../../../Domain";
import {
  Modal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
  ScaleAnimation,
} from "react-native-modals";
import { useToast } from "react-native-toast-notifications";

export default function Category() {
  const navigation = useNavigation();
  const toast = useToast();
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState(null);

  const { refetch, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { mutate: delCategory } = useMutation((id) => deleteCategory(id), {
    onSuccess: (data) => {
      console.log(data);
      if (data.message == "Successfull delete category") {
        refetch();
        toast.show("Delete category success", {
          type: "success",
          placement: "top",
          duration: 4000,
          offsetTop: 50,
          animationType: "zoom-in",
        });
        setVisible(false);
      }
    },
  });

  const handleDelete = () => {
    delCategory(id);
  };

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
              <View key={index} className="relative">
                <View
                  style={{
                    shadowColor: themeColors.bgColor(0.8),
                    shadowRadius: 7,
                  }}
                  className="bg-white rounded-xl flex-row h-20 my-2 shadow-lg"
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

                <TouchableOpacity
                  className="absolute -right-2 -top-0"
                  onPress={() => {
                    setId(category.id), setVisible(true);
                  }}
                >
                  <AntDesign name="closecircle" size={25} color="red" />
                </TouchableOpacity>
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

      <Modal
        modalTitle={<ModalTitle title="Confirm Delete" align="center" />}
        visible={visible}
        onTouchOutside={() => setVisible(false)}
        modalAnimation={
          new ScaleAnimation({
            initialValue: 0,
            useNativeDriver: true,
          })
        }
        width={0.7}
        footer={
          <ModalFooter>
            <ModalButton text="Cancel" onPress={() => setVisible(false)} />
            <ModalButton text="Yes" onPress={() => handleDelete(id)} />
          </ModalFooter>
        }
      >
        <ModalContent>
          <Text className="text-lg">Are you sure ?</Text>
        </ModalContent>
      </Modal>
    </View>
  );
}
