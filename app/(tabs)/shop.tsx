import React, { useState } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Reuse the Colors from your home screen
const Colors = {
  appBg: "#4A5C50",
  cardBg: "#2CB777",
  wall: "#6A3EBF",
  floor: "#27A36A",
  progressXp: "#FBC53E",
  progressWater: "#5AC2EE",
  navBg: "#411393",
  font: "#FFFFFF",
  placeholder: "#d3a48c",
  placeholderBorder: "#593b2b",
  // New Colors from Screenshot
  shopPanelBg: "#F1EDFE",
  shopItemBg: "#FFFFFF",
  shopIconBg: "#7B5FBF",
  shopIconInactive: "#A592D8",
  shopText: "#4A3B73",
  gemIcon: "#30D1B3",
};

// --- Mock Data Array ---
// You will replace this with your Laravel API fetch
const MOCK_SHOP_ITEMS = [
  { id: 1, name: "Beanie", icon: require("../assets/icons/shop-beanie.png"), price: 600 },
  { id: 2, name: "Bow", icon: require("../assets/icons/shop-bow.png"), price: 600 },
  { id: 3, name: "Glasses", icon: require("../assets/icons/shop-glasses.png"), price: 600 },
  { id: 4, name: "Dress", icon: require("../assets/icons/shop-dress.png"), price: 600 },
  { id: 5, name: "Sneakers", icon: require("../assets/icons/shop-sneakers.png"), price: 600 },
  { id: 6, name: "Jacket", icon: require("../assets/icons/shop-jacket.png"), price: 600 },
  { id: 7, name: "Bow Tie", icon: require("../assets/icons/shop-bowtie.png"), price: 600 },
  { id: 8, name: "Tuxedo", icon: require("../assets/icons/shop-tuxedo.png"), price: 600 },
];
// Mock categories
const MOCK_CATEGORIES = [
  { id: "all", icon: require("../assets/icons/closetButton.svg") },
  { id: "shirts", icon: require("../assets/icons/cat-shirts.png") },
  { id: "jackets", icon: require("../assets/icons/cat-jacket.png") },
  { id: "shoes", icon: require("../assets/icons/cat-shoes.png") },
  { id: "hats", icon: require("../assets/icons/cat-hat.png") },
  { id: "acc", icon: require("../assets/icons/cat-acc.png") },
];
// --- End Mock Data ---


// --- Responsive Stylesheet ---
const createStyles = (width: number, height: number) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: Colors.wall, // Use the wall color for the top background
    },
    // --- Top Preview Area ---
    roomView: {
      width: width,
      height: height * 0.45, // 45% of screen height for the preview
      position: 'absolute',
      top: 0,
    },
    wall: {
      flex: 1,
      backgroundColor: Colors.wall,
    },
    floor: {
      height: height * 0.1, // 10% of screen height
      backgroundColor: Colors.floor,
      borderTopColor: "#000",
      borderTopWidth: 2,
    },
    characterPlaceholder: {
      width: width * 0.5,
      height: height * 0.25,
      position: "absolute",
      bottom: height * 0.05,
      resizeMode: "contain",
      left: "50%",
      transform: [{ translateX: -(width * 0.5) / 2 }],
    },
    roomActions: {
      position: "absolute",
      bottom: height * 0.12, // Position above the floor
      right: width * 0.05,
      flexDirection: 'column', // Stack icons vertically
      gap: width * 0.025,
    },
    iconButton: {
      width: width * 0.12,
      height: width * 0.12,
      borderRadius: (width * 0.12) / 2,
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconButtonImage: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
        tintColor: '#FFF',
    },

    // --- Bottom Shop Panel ---
    shopPanel: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: height * 0.6, // 60% of screen height
      backgroundColor: Colors.shopPanelBg,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: width * 0.05,
      paddingTop: height * 0.03,
      // Cross-platform shadow
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        android: {
          elevation: 20,
        },
      }),
    },
    panelTitle: {
      fontSize: width * 0.07,
      fontWeight: "bold",
      color: Colors.shopText,
      marginBottom: height * 0.02,
    },
    categoryScrollView: {
      marginBottom: height * 0.02,
    },
    categoryIcon: {
      width: width * 0.14,
      height: width * 0.14,
      borderRadius: (width * 0.14) / 2,
      justifyContent: "center",
      alignItems: "center",
      marginRight: width * 0.03,
    },
    categoryIconImage: {
      width: "60%",
      height: "60%",
      resizeMode: "contain",
      tintColor: "#FFFFFF",
    },
    // --- Item Grid ---
    itemGridContainer: {
      flex: 1, // Takes up remaining space in the panel
    },
    itemGridContentContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingBottom: height * 0.1, // Padding for scroll area
    },
    itemCard: {
      width: "48%", 
      backgroundColor: Colors.shopItemBg,
      borderRadius: 20,
      padding: width * 0.03,
      alignItems: "center",
      marginBottom: width * 0.04,
      // Small shadow for each item
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
        },
        android: {
          elevation: 3,
        },
      }),
    },
    itemIcon: {
      width: "80%",
      aspectRatio: 1, // Make it square
      resizeMode: "contain",
      marginBottom: height * 0.01,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    gemIcon: {
      width: width * 0.04,
      height: width * 0.04,
      resizeMode: "contain",
      marginRight: 5,
    },
    priceText: {
      color: Colors.shopText,
      fontWeight: "bold",
      fontSize: width * 0.04,
    },

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
      width: width * 0.8,

      // Shadow (optional, but good)
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 8,
    },
    navIcon: {
      // This is the container for *each* button
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
      borderRadius: (width * 0.12) / 2, // Makes it a circle
    },
    navButtonIcon: {
      // A new style for just the <Image>
      width: width * 0.08,
      height: width * 0.08,
      resizeMode: "contain",
      tintColor: "#FFFFFF", // This is key! It makes all your SVG icons white
    },
    navIconText: {
      color: "#FFFFFF",
      fontSize: width * 0.025, // Small, responsive font
      marginTop: height * 0.005, // Space between icon and text
    },
    navClose: {
      // No extra styles needed, it just uses navIcon and navButtonIcon
    },
    navIconActive: {
      // ... (no properties here, but you could add them)
    },
    activeAvatar: {
      width: "100%",
      height: "100%",
      borderRadius: (width * 0.13) / 2, // Must match navIcon's radius
      backgroundColor: Colors.placeholder,
      borderWidth: 3,
      borderColor: Colors.font,
    },
  });


// --- Shop Screen Component ---
const ShopScreen = () => {
  // --- Hooks ---
  const { width, height } = useWindowDimensions();
  // Responsive caps (same as home.tsx)
  const MAX_WIDTH = 1000;
  const MAX_HEIGHT = 1400;
  const effectiveWidth = Math.min(width, MAX_WIDTH);
  const effectiveHeight = Math.min(height, MAX_HEIGHT);
  const styles = createStyles(effectiveWidth, effectiveHeight);

  // State for shop items (from mock data)
  const [shopItems, setShopItems] = useState(MOCK_SHOP_ITEMS);
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState("all");

  // --- Render ---
  return (
    <SafeAreaView style={styles.appContainer} edges={['top']}>
      {/* 1. Top Preview Area */}
      <View style={styles.roomView}>
        <View style={styles.wall} />
        <View style={styles.floor} />
        <Image
          source={require("../assets/icons/axolotlCharacter.svg")} // Hardcoded character
          style={styles.characterPlaceholder}
        />
        {/* Room action icons from screenshot */}
        <View style={styles.roomActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/icons/closetButton.svg')} style={styles.iconButtonImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/icons/roomButton.svg')} style={styles.iconButtonImage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image source={require('../assets/icons/poseButton.svg')} style={styles.iconButtonImage} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Bottom Shop Panel */}
      <View style={styles.shopPanel}>
        <Text style={styles.panelTitle}>Clothes • All</Text>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScrollView}>
          {MOCK_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryIcon,
                { backgroundColor: selectedCategory === cat.id ? Colors.shopIconBg : Colors.shopIconInactive }
              ]}
              onPress={() => setSelectedCategory(cat.id)}
            >
              <Image source={cat.icon} style={styles.categoryIconImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Item Grid */}
        <ScrollView 
          style={styles.itemGridContainer} 
          contentContainerStyle={styles.itemGridContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {shopItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.itemCard}>
              <Image source={item.icon} style={styles.itemIcon} />
              <View style={styles.priceContainer}>
                <Image source={require('../assets/icons/currencyIcon.png')} style={styles.gemIcon} />
                <Text style={styles.priceText}>{item.price}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
    </SafeAreaView>
  );
};

export default ShopScreen;