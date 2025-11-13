import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/theme";

import { useAuth } from "../../context/AuthContext";

const LoginScreen = () => {
  const [code, setCode] = useState("");
  const { signIn } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/logoWithType.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.subtitle}>Inpatient Companion for Kids</Text>

      <View style={styles.inputWrapper}>
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 15,
            zIndex: 1,
            justifyContent: "center",
          }}
        >
          <Image
            source={require("../assets/icons/lock.png")}
            style={{
              width: 25,
              height: 25,
              tintColor: Colors.placeholder,
            }}
            resizeMode="contain"
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Activation Code"
          placeholderTextColor={Colors.placeholder}
          value={code}
          onChangeText={setCode}
          autoCapitalize="none"
        />
      </View>

      <TouchableOpacity
        style={styles.customButton}
        activeOpacity={0.8}
        onPress={signIn}
      >
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: Colors.primaryPurple,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: "600%",
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 50,
    fontWeight: "bold",
    marginBottom: 0,
    color: Colors.white,
  },
  subtitle: {
    fontSize: 30,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: Colors.white,
  },
  inputWrapper: {
    width: "50%",
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: Colors.white,
    color: Colors.textPrimary,
    borderColor: Colors.placeholder,
    paddingLeft: 45,
    width: "100%",
  },
  customButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "50%",
    alignSelf: "center",
    backgroundColor: Colors.lightPurple,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;



// OLD LOGIN SCREEN
// import Constants from "expo-constants";
// import { StatusBar } from "expo-status-bar";
// import React, { useState } from "react";
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   useColorScheme
// } from "react-native";
// import { ColorPalette, Colors } from "../../constants/theme";

// // Auth Import
// import { useAuth } from "../../context/AuthContext";


// const LoginScreen = () => {
//   // --- AUTHENTICATION & THEME LOGIC ---
  
//   // Get the signIn function from the simple AuthContext

//   const systemTheme = useColorScheme();
//   const [localTheme, setLocalTheme] = useState<"light" | "dark">(
//     systemTheme || "light"
//   );

//   const theme = Colors;

//   const toggleTheme = () => {
//     setLocalTheme(localTheme === "light" ? "dark" : "light");
//   };

//   const [code, setCode] = useState("");

// const { signIn } = useAuth();

//   return (
//     <View style={[styles(theme).container]}>
      
//       {/* Theme Toggle Button */}
//       <TouchableOpacity style={styles(theme).themeButton} onPress={toggleTheme}>
//         <Text style={{ color: theme.text, fontSize: 24 }}>
//           {localTheme === "light" ? "🌙" : "☀️"}
//         </Text>
//       </TouchableOpacity>

//       {/* App Logo and Title */}
//       <View style={styles(theme).headerContainer}>
//         <Image 
//           source={require("../assets/images/bluumLogo.png")} 
//           style={styles(theme).logo} 
//           resizeMode="contain"
//         />
//         <Text style={[styles(theme).title, { color: theme.textPrimary }]}>Bluum</Text>
//       </View>
//       <Text style={[styles(theme).subtitle, { color: theme.textPrimary }]}>
//         Inpatient Companion for Kids
//       </Text>

//       {/* Input Field (50% Width Container) */}
//       <View style={styles(theme).inputWrapper}> 
        
//         {/* Lock Icon Container: Correctly positioned absolute container */}
//         <View
//           style={{
//             position: "absolute",
//             top: 0,
//             bottom: 0, 
//             left: 15,
//             zIndex: 1,
//             justifyContent: "center", // Vertically centers the icon
//           }}
//         >
//           {/* Lock Icon */}
//           <Image
//             source={require("../assets/icons/lock.png")}
//             style={{
//               width: 25,
//               height: 25,
//               tintColor: theme.placeholder,
//             }}
//             resizeMode="contain"
//           />
//         </View>
        
//         <TextInput
//           style={[
//             styles(theme).input,
//             {
//               color: "#11181C",
//               borderColor: "#11181C",
//               paddingLeft: 45, // Space for the icon
//               width: "100%", // Fill parent (50% width)
//             },
//           ]}
//           placeholder="Activation Code"
//           placeholderTextColor={theme.placeholder}
//           value={code}
//           onChangeText={setCode}
//           autoCapitalize="none"
//         />
//       </View>

//       {/* Log In Button (50% Width) */}
//       <TouchableOpacity
//         style={[
//           styles(theme).customButton,
//           { backgroundColor: theme.button }, 
//         ]}
//         activeOpacity={0.8} 
//         onPress={signIn}
//       >
//         <Text style={styles(theme).buttonText}>Log In</Text>
//       </TouchableOpacity>

//       <StatusBar style={localTheme === "light" ? "dark" : "light"} />
//     </View>
//   );
// };

// // --- Stylesheet Function ---
// // Assumes ColorPalette has the required properties (background, text, button, buttonText, placeholder)

// const styles = (theme: ColorPalette) =>
//   StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       padding: 30,
//       // backgroundColor: theme.primaryPurple,
//     },
//     headerContainer: {
//       flexDirection: "row",
//       alignItems: "center",
//       justifyContent: "center",
//       marginBottom: 10,
//     },
//     logo: {
//       width: 50,
//       height: 50,
//       marginRight: 10,
//     },
//     title: {
//       fontSize: 50,
//       fontWeight: "bold",
//       marginBottom: 0,
//     },
//     subtitle: {
//       fontSize: 30,
//       marginBottom: 30,
//       textAlign: "center",
//       fontWeight: "bold",
//     },
//     inputWrapper: {
//         width: "50%",
//         alignSelf: "center",
//         marginBottom: 20,
//     },
//     input: {
//       height: 50,
//       borderWidth: 1,
//       borderRadius: 8,
//       paddingHorizontal: 15,
//       // backgroundColor: theme.background === '#121212' ? theme.background : '#fff', 
//     },
//     customButton: {
//       padding: 15,
//       borderRadius: 8,
//       alignItems: "center", 
//       marginTop: 10,
//       width: "50%",
//       alignSelf: "center",
//     },
//     buttonText: {
//       color: "#fff", 
//       fontSize: 16,
//       fontWeight: "bold",
//     },
//     themeButton: {
//       position: "absolute",
//       top: Constants.statusBarHeight + 10,
//       right: 20,
//       zIndex: 10,
//       padding: 5,
//     },
//   });

// export default LoginScreen;