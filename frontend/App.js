/** @format */

import { StyleSheet } from "react-native";
import StackNavigator from "./src/route/StackNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalPortal } from "react-native-modals";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StackNavigator />
      <ModalPortal />
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({});
