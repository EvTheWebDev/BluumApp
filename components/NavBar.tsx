import React, { useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
// This type gives you auto-completion for props!
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

// NOTE: I've assumed your file names in (tabs) are:
// - index.tsx (for Home)
// - shop.tsx
// - tasks.tsx
// If they are different, just change the names in navigation.navigate('...')
// and in the activeRouteName === '...' checks.

export function Navbar({ state, navigation }: BottomTabBarProps) {
  const [isOpen, setIsOpen] = useState(true);

  const activeRouteName = state.routes[state.index].name;

  return (
    <View style={[styles.bottomNav, !isOpen && styles.bottomNavClosed]}>
      <TouchableOpacity style={[styles.navIcon, styles.navToggle]}
      onPress={() => setIsOpen(!isOpen)}>
        <Image
          style={[styles.navIcon, styles.navToggleIcon]}
          source={require("../app/assets/icons/navigation.svg")}
        />
      </TouchableOpacity>

      {/* --- Your Navigation Buttons --- */}

      {isOpen && (
        <>
          <TouchableOpacity 
            style={styles.navIcon}
            onPress={() => navigation.navigate('index')}
          >
            {/* ... Home Icon and Text ... */}
            <Image
              style={[
                styles.navButtonIcon,
                activeRouteName === 'index' && { tintColor: '#FFA500' }
              ]}
              source={require("../app/assets/icons/homeIcon.svg")}
            />
            <Text style={[
              styles.navIconText,
              activeRouteName === 'index' && { fontWeight: 'bold' }
            ]}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navIcon}
            onPress={() => navigation.navigate('shop')}
          >
            {/* ... Shop Icon and Text ... */}
            <Image
              style={[
                styles.navButtonIcon,
                activeRouteName === 'shop' && { tintColor: '#FFA500' } 
              ]}
              source={require("../app/assets/icons/shopIcon.svg")}
            />
            <Text style={[
              styles.navIconText,
              activeRouteName === 'shop' && { fontWeight: 'bold' }
            ]}>
              Shop
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navIcon}
            onPress={() => navigation.navigate('tasks')}
          >
            {/* ... Tasks Icon and Text ... */}
            <Image
              style={[
                styles.navButtonIcon,
                activeRouteName === 'tasks' && { tintColor: '#FFA500' }
              ]}
              source={require("../app/assets/icons/tasksIcon.svg")}
            />
            <Text style={[
              styles.navIconText,
              activeRouteName === 'tasks' && { fontWeight: 'bold' }
            ]}>
              Tasks
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.navClose, styles.navIcon]}
            // You might want this to close the bar too
            onPress={() => setIsOpen(false)} // This also closes the bar
          >
            <Text style={styles.navIconText}>X</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

// PASTE YOUR FULL STYLESHEET OBJECT HERE
const { width, height } = Dimensions.get("window");
// const Colors = { ... } // Make sure Colors is defined if you use it

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: height * 0.04,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#5A3E9B",
    borderRadius: 100,
    paddingVertical: height * 0.01,
    width: width * 0.7,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },

  bottomNavClosed: {
    width: width * 0.12,         // 1. Shrink width to match the toggle icon
    height: width * 0.12,        // 2. Set height to match
    alignSelf: "flex-start",     // 3. Move to the left
    left: height * 0.04,         // 4. Give it the same padding from the edge as it has from the bottom
    justifyContent: "center",    // 5. Center the single icon
    paddingVertical: 0,          // 6. Reset padding
    // The borderRadius: 100 from bottomNav will make this a circle
  },


  navIcon: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navToggleIcon: {
    resizeMode: "contain",
  },
  navToggle: {
    width: width * 0.12,
    height: width * 0.12,
    borderRadius: (width * 0.12) / 2,
  },
  navButtonIcon: {
    width: width * 0.08,
    height: width * 0.08,
    resizeMode: "contain",
    tintColor: "#FFFFFF",
  },
  navIconText: {
    color: "#FFFFFF",
    fontSize: width * 0.025,
    marginTop: height * 0.005,
  },
  navClose: {},
});
