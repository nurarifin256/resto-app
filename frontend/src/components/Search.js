/** @format */

import React, { useCallback, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { themeColors } from "../theme";
import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getData } from "../storage/userStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logoutUser } from "../hooks/authHook";
import { useMutation } from "@tanstack/react-query";
import {
  Modal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
  ScaleAnimation,
} from "react-native-modals";
import { useToast } from "react-native-toast-notifications";

export default function Search() {
  const navigation = useNavigation();
  const toast = useToast();
  const [token, setToken] = useState(null);
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getData().then((data) => {
        if (data) {
          setToken(data.token);
        }
      });
    }, [])
  );

  const { mutate: logout } = useMutation((token) => logoutUser(token), {
    onSuccess: (data) => {
      if (data.message == "Succesfully logout") {
        AsyncStorage.removeItem("storage_user");
        toast.show("Logout user success", {
          type: "success",
          placement: "top",
          duration: 4000,
          offsetTop: 50,
          animationType: "zoom-in",
        });
        setToken(null);
        setVisible(false);
      }
    },
  });

  const handleLogout = () => {
    logout(token);
  };

  return (
    <View>
      <View className="flex-row items-center space-x-2 px-4">
        <View className="flex-row flex-1 items-center p-3 rounded-full border border-gray-300">
          <AntDesign name="search1" size={25} color="gray" />
          <TextInput placeholder="Search..." className="ml-2 flex-1" />
        </View>
        {token ? (
          <TouchableOpacity
            onPress={() => setVisible(true)}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="p-3 rounded-full"
          >
            <MaterialIcons name="logout" size={25} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ backgroundColor: themeColors.bgColor(1) }}
            className="p-3 rounded-full"
          >
            <MaterialIcons name="login" size={25} color="white" />
          </TouchableOpacity>
        )}
      </View>
      <Modal
        modalTitle={<ModalTitle title="Confirm Logout" align="center" />}
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
            <ModalButton text="Yes" onPress={() => handleLogout()} />
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
