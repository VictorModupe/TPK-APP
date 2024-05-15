import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Switch, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../utils/theme";
import { AntDesign } from "@expo/vector-icons";
import { SocialMediaApps } from "../utils/socialMediaApps";

const Unlocked = () => {
  const [socialMediaAppList, setSocialMediaAppList] = useState([]);
  const [lockedSocialMediaApps, setLockedSocialMediaApps] = useState([]);

  useEffect(() => {
    // Fetch social media apps from AsyncStorage
    const fetchLockedSocialMediaApps = async () => {
      try {
        const storedApps = await AsyncStorage.getItem("lockedSocialMediaApps");
        if (storedApps) {
          setLockedSocialMediaApps(JSON.parse(storedApps));
        }
      } catch (error) {
        console.error("Error fetching locked social media appss:", error);
      }
    };
    fetchLockedSocialMediaApps();
  }, []);

  useEffect(() => {
    // Filter social media apps based on locked status
    const filteredApps = SocialMediaApps.map((app) => ({
      ...app,
      isLocked: lockedSocialMediaApps.includes(app.id),
    }));
    setSocialMediaAppList(filteredApps);
  }, [lockedSocialMediaApps]);

  const toggleAppLock = async (appId, isLocked) => {
    // Toggle the lock status of the app
    const updatedLockedApps = isLocked
      ? [...lockedSocialMediaApps, appId]
      : lockedSocialMediaApps.filter((app) => app !== appId);
    setLockedSocialMediaApps(updatedLockedApps);

    // Update AsyncStorage with the new locked apps list
    await AsyncStorage.setItem(
      "lockedSocialMediaApps",
      JSON.stringify(updatedLockedApps)
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.accent }}>
      <FlatList
        data={socialMediaAppList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{item.name}</Text>
            <Switch
              value={item.isLocked}
              onValueChange={(isLocked) => toggleAppLock(item.id, isLocked)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Unlocked;

// import React, { useState, useEffect } from "react";
// import { View, Text, FlatList, TouchableOpacity } from "react-native";
// // import { PackageManager } from "expo-package-manager";

// // import { PackageManager } from "@expo/package-manager";

// const Unlocked = () => {
//   const [installedApps, setInstalledApps] = useState([]);
//   const [selectedApps, setSelectedApps] = useState([]);

//   useEffect(() => {
//     async function getInstalledApps() {
//       const apps = await PackageManager.getInstalledApps();
//       const socialMediaApps = apps.filter((app) => {
//         // Filter social media apps (e.g., Facebook, Twitter, Instagram)
//         return (
//           app.name.includes("Facebook") ||
//           app.name.includes("Twitter") ||
//           app.name.includes("Instagram")
//         );
//       });
//       setInstalledApps(socialMediaApps);
//     }
//     getInstalledApps();
//   }, []);

//   const handleSelectApp = (app) => {
//     const alreadySelected = selectedApps.includes(app);
//     if (alreadySelected) {
//       setSelectedApps(
//         selectedApps.filter((selectedApp) => selectedApp !== app)
//       );
//     } else {
//       setSelectedApps([...selectedApps, app]);
//     }
//   };

//   return (
//     <View>
//       <FlatList
//         data={installedApps}
//         renderItem={({ item }) => (
//           <TouchableOpacity onPress={() => handleSelectApp(item)}>
//             <Text>{item.name}</Text>
//           </TouchableOpacity>
//         )}
//       />
//       <Text>Selected Apps:</Text>
//       {selectedApps.map((app) => (
//         <Text key={app.name}>{app.name}</Text>
//       ))}
//     </View>
//   );
// };

// export default Unlocked;
