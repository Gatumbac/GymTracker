import { useAuth } from "@/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Pressable, Text, View } from "react-native";

const DrawerLayout = () => {

  const { signOut: logout } = useAuth();

  return (
    <Drawer
      screenOptions={{
        drawerType: "slide",
        overlayColor: "rgba(0,0,0,0.2)",
        headerTitleAlign: "center",
        drawerActiveTintColor: "#1B5E20",
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "500"
        }
      }}

      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <View style={{
            marginTop: 20,
            borderTopWidth: 1,
            borderTopColor: "#E0E0E0",
            paddingTop: 12,
            paddingHorizontal: 16
          }}>
            <Pressable
              onPress={logout}
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Ionicons
                name="log-out-outline"
                size={20}
                color="#C82828"
                style={{ marginRight: 12 }}
              />
              <Text style={{
                fontSize: 15,
                color: "#C62828",
                fontWeight: "500"
              }}
              >
                Cerrar Sesión
              </Text>
            </Pressable>
          </View>
        </DrawerContentScrollView>
      )}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "GymTracker",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="barbell" size={size} color={color} />
          )
        }}
      />

      <Drawer.Screen
        name="profile"
        options={{
          title: "Perfil",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          )
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;