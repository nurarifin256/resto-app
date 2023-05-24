/** @format */

import { StyleSheet } from "react-native";
import StackNavigator from "./src/route/StackNavigator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalPortal } from "react-native-modals";
import { ToastProvider } from "react-native-toast-notifications";

const queryClient = new QueryClient();

export default function App() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <StackNavigator />
        <ModalPortal />
      </QueryClientProvider>
    </ToastProvider>
  );
}

const styles = StyleSheet.create({});
