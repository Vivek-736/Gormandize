import useAuthStore from "@/store/auth.store";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log(
      "Index - Mounted. isAuthenticated:",
      isAuthenticated,
      "isLoading:",
      isLoading
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(
      "Index - State changed. isAuthenticated:",
      isAuthenticated,
      "isLoading:",
      isLoading
    );
  }, [isAuthenticated, isLoading]);

  console.log("Index - Rendering. isAuthenticated:", isAuthenticated, "isLoading:", isLoading);

  if (!mounted || isLoading) {
    console.log("Index - Still loading or not mounted, showing loader");
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const redirectPath = isAuthenticated ? "/(tabs)" : "/(auth)/sign-in";
  console.log("Index - Redirecting to:", redirectPath, "| isAuthenticated:", isAuthenticated);

  return <Redirect href={redirectPath} />;
}