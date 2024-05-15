import { AppRegistry, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./screens/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { theme } from "./utils/theme";
import SignupScreen from "./screens/SignupScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import CheckEmail from "./screens/CheckEmail";
import Animation from "./components/Animation";
import SetPassword from "./screens/SetPassword";
import ResetConfirmation from "./screens/ResetConfirmation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AllApps from "./screens/AllApps";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tools from "./screens/Tools";
import Premium from "./screens/Premium";
import Settings from "./screens/Settings";
import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Unlocked from "./screens/Unlocked";
import Locked from "./screens/Locked";
import Accountsettings from "./screens/Accountsettings";
import Applicationsettings from "./screens/Applicationsettings";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
const AppStack = createNativeStackNavigator();

function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 30 }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>App Name</Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 25 }}
      >
        <View
          style={{ flex: 1, height: 1, width: 4, backgroundColor: "#ccc" }}
        />
      </View>

      <View style={{ marginTop: 20, paddingLeft: 20 }}>
        <TouchableOpacity>
          <View style={{ flexDirection: "row", paddingVertical: 10 }}>
            <MaterialCommunityIcons name="eye-remove" size={24} color="red" />
            <Text style={{ paddingLeft: 10, fontSize: 16 }}>Remove Ads</Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity>
        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
            <MaterialCommunityIcons
              name="help-circle"
              size={24}
              color="#04aa64"
            />
            <Text style={{ paddingLeft: 10, fontSize: 16 }}>Help</Text>
        </View>
          </TouchableOpacity>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <View
          style={{ flex: 1, height: 1, width: 4, backgroundColor: "#ccc" }}
        />
      </View>

      <View style={{ marginTop: 30, paddingLeft: 20 }}>
        <TouchableOpacity>
          
        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
          <MaterialCommunityIcons name="star" size={24} color="#666666" />
          <Text style={{ paddingLeft: 10, fontSize: 16 }}>Rate Us</Text>
        </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
          <Entypo name="share" size={24} color="#666666" />
          <Text style={{ paddingLeft: 10, fontSize: 16 }}>Share</Text>
        </View>
        <View style={{ flexDirection: "row", paddingVertical: 10 }}>
          <MaterialIcons name="feedback" size={24} color="#666666" />
          <Text style={{ paddingLeft: 10, fontSize: 16 }}>Feedback</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.accent },
        headerTintColor: "#000000",
        headerShadowVisible: false,
        sceneContainerStyle: { backgroundColor: theme.colors.error },
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTitle: "Login",
          headerTitleStyle: {
            // fontFamily: "gilroy",
            fontSize: 16,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignupScreen}
        options={{
          headerTitle: "Sign Up",
          headerTitleStyle: {
            // fontFamily: "gilroy",
            fontSize: 16,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          headerTitle: "Forgot Password",
          headerTitleStyle: {
            // fontFamily: "gilroy",
            fontSize: 16,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="CheckEmail"
        component={CheckEmail}
        options={{
          headerTitle: "Check Mail",
          headerTitleStyle: {
            // fontFamily: "gilroy",
            fontSize: 16,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="SetPassword"
        component={SetPassword}
        options={{
          headerTitle: "Set Password",
          headerTitleStyle: {
            // fontFamily: "gilroy",
            fontSize: 16,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ResetConfirmPass"
        component={ResetConfirmation}
        options={{
          headerTitle: "Confirmed",
          headerTitleStyle: {
            // fontFamily: "gilroy",
            fontSize: 16,
          },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "white" },
        drawerContentStyle: { backgroundColor: "white" },
      }}
    >
      <Drawer.Screen name="AllApps" component={TopNavigator} />
    </Drawer.Navigator>
  );
}

function TopNavigator() {
  return (
    <TopTab.Navigator
      screenOptions={() => ({
        swipeEnabled: true,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: theme.colors.primary,
        tabBarIndicatorStyle: {
          height: null,
          top: "10%",
          bottom: "10%",
          width: "45%",
          left: "2.5%",
          borderRadius: 8,
          backgroundColor: theme.colors.primary,
        },
        tabBarStyle: {
          alignSelf: "center",
          width: "100%",
          // borderRadius: 8,
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.secondary,
          // margin: 8,
          elevation: 0,
        },
        tabBarItemStyle: {
          borderRadius: 8,
          margin: 2,
        },
        // tabBarGap: 10,
      })}
      // swipeEnabled={true}
    >
      <TopTab.Screen name="Unlocked" component={Unlocked} />
      <TopTab.Screen name="Locked" component={Locked} />
    </TopTab.Navigator>
  );
}

function AppSettings() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="ApplicationSettings"
        component={Applicationsettings}
      />
      <Stack.Screen name="AccountSettings" component={Accountsettings} />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          height: 80,
        },
        tabBarInactiveTintColor: theme.colors.secondary200,
        tabBarLabelStyle: { height: 30 },
      }}
    >
      <Tab.Screen
        name="DrawerNavigator"
        component={DrawerNavigator}
        options={{
          title: "All Apps",
          tabBarLabel: "All Apps",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore1" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tools"
        component={Tools}
        options={{
          // title: 'Home',
          // tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="tools" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Premium"
        component={Premium}
        options={{
          title: "Premium",
          tabBarLabel: "Premium",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="diamond-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="AppSettings"
        component={AppSettings}
        options={{
          title: "Settings",
          tabBarLabel: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({});
