import { Colors } from "@/constants/theme";
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

// --- Mock Data Array ---
// REPLACE THIS WITH LARAVEL SHOP TABLE PULL
const MOCK_SHOP_ITEMS = [
  {
    id: 1,
    cat: "hat",
    name: "Beanie",
    icon: require("../assets/icons/shop-beanie.png"),
    price: 600,
  },

  {
    id: 2,
    name: "Bow",
    cat: "hat",
    icon: require("../assets/icons/shop-bow.png"),
    price: 600,
  },
  {
    id: 3,
    name: "Glasses",
    cat: "acc",
    icon: require("../assets/icons/shop-glasses.png"),
    price: 600,
  },
  {
    id: 4,
    name: "Dress",
    cat: "shirt",
    icon: require("../assets/icons/shop-dress.png"),
    price: 600,
  },
  {
    id: 5,
    name: "Sneakers",
    cat: "shoes",
    icon: require("../assets/icons/shop-sneakers.png"),
    price: 600,
  },
  {
    id: 6,
    name: "Jacket",
    cat: "shirt",
    icon: require("../assets/icons/shop-jacket.png"),
    price: 600,
  },
  {
    id: 7,
    name: "Bow Tie",
    cat: "acc",
    icon: require("../assets/icons/shop-bowtie.png"),
    price: 600,
  },
  {
    id: 8,
    name: "Tuxedo",
    cat: "shirt",
    icon: require("../assets/icons/shop-tuxedo.png"),
    price: 600,
  },
];

// Mock categories
const CATEGORIES = [
  { id: "all", icon: require("../assets/icons/closetButton.png") },
  { id: "shirts", icon: require("../assets/icons/catShirts.png") },
  { id: "acc", icon: require("../assets/icons/catGlasses.png") },
  { id: "shoes", icon: require("../assets/icons/catShoes.png") },
  { id: "hats", icon: require("../assets/icons/catHats.png") },
  { id: "jackets", icon: require("../assets/icons/catJackets.png") },
];

// Styles
const createStyles = (effectiveWidth: number, effectiveHeight: number) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: Colors.wall,
    },

    // --- Top Preview Area ---
    roomView: {
      width: effectiveWidth,
      height: effectiveHeight * 0.45,
      position: "absolute",
      top: 0,
    },
    wall: {
      flex: 1,
      backgroundColor: Colors.wall,
    },
    floor: {
      height: effectiveHeight * 0.1,
      backgroundColor: Colors.floor,
      borderTopColor: "#000",
      borderTopWidth: 2,
    },
    characterPlaceholder: {
      width: effectiveWidth * 0.5,
      height: effectiveHeight * 0.25,
      position: "absolute",
      bottom: effectiveHeight * 0.05,
      resizeMode: "contain",
      alignSelf: "center",
    },
    roomActions: {
      position: "absolute",
      bottom: effectiveHeight * 0.12,
      right: effectiveWidth * 0.05,
      flexDirection: "column",
      gap: effectiveWidth * 0.025,
    },
    iconButton: {
      width: effectiveWidth * 0.1,
      height: effectiveHeight * 0.12,
      borderRadius: (effectiveWidth * 0.12) / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    iconButtonImage: {
      resizeMode: "contain",
      tintColor: "#FFF",
    },

    // --- Bottom Shop Panel ---
    shopPanel: {
      position: "absolute",
      bottom: 0,
      width: "100%",
      height: effectiveHeight * 0.6,
      backgroundColor: Colors.lightPurpleBackground,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: effectiveWidth * 0.05,
      paddingTop: effectiveHeight * 0.03,

      ...Platform.select({
        ios: {
          shadowColor: "#000",
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
      fontSize: effectiveWidth * 0.045,
      fontWeight: "600",
      color: Colors.white,
      marginBottom: effectiveHeight * 0.02,
    },
    categoriesAndItems: {
      backgroundColor: Colors.white,
      padding: 20,
      borderRadius: 20,
      width: "100%",
    },

    categories: {
      flexDirection: "row",
      width: "100%",
      gap: 20,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 50,
    },
    categoryIcon: {
      width: effectiveWidth * 0.08,
      height: effectiveWidth * 0.08,
      borderRadius: (effectiveWidth * 0.14) / 2,
      justifyContent: "center",
      alignItems: "center",
    },
    categoryIconImage: {
      width: "70%",
      height: "70%",
      resizeMode: "contain",
      tintColor: "white",
    },
    // --- Item Grid ---
    itemGridContainer: {
      flex: 1,
    },
    itemGridContentContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      paddingBottom: effectiveHeight * 0.1,
    },
    itemGrid: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    itemCard: {
      backgroundColor: Colors.lightPurpleCardBackground,
      width: effectiveWidth * 0.2,
      height: effectiveHeight * 0.2,
      borderRadius: 20,
      padding: effectiveWidth * 0.02,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: effectiveWidth * 0.04,

      ...Platform.select({
        ios: {
          shadowColor: "#000",
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
      resizeMode: "cover",
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    gemIcon: {
      width: effectiveWidth * 0.03,
      height: effectiveHeight * 0.03,
      resizeMode: "contain",
    },
    priceText: {
      color: Colors.textPrimary,
      fontWeight: "bold",
      fontSize: effectiveWidth * 0.025,
    },
    
  });

// --- Shop Screen Component ---
const ShopScreen = () => {
  // --- Hooks ---
  const { width, height } = useWindowDimensions();
  const MAX_WIDTH = 1000;
  const MAX_HEIGHT = 1400;
  const effectiveWidth = Math.min(width, MAX_WIDTH);
  const effectiveHeight = Math.min(height, MAX_HEIGHT);
  const styles = createStyles(effectiveWidth, effectiveHeight);

  // State for shop items (from mock data)
  const [shopItems, setShopItems] = useState(MOCK_SHOP_ITEMS);

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <SafeAreaView style={styles.appContainer} edges={["top"]}>
      <View style={styles.roomView}>
        <View style={styles.wall} />
        <View style={styles.floor} />
        <Image
          source={require("../assets/icons/axolotlCharacter.svg")}
          style={styles.characterPlaceholder}
        />
        {/* Room action icons from screenshot */}
        <View style={styles.roomActions}>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require("../assets/icons/closetButton.svg")}
              style={styles.iconButtonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require("../assets/icons/roomButton.svg")}
              style={styles.iconButtonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Image
              source={require("../assets/icons/poseButton.svg")}
              style={styles.iconButtonImage}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* 2. Bottom Shop Panel */}
      <View style={styles.shopPanel}>
        {/* Categories */}

        {/* Item Grid */}
        <ScrollView
          style={styles.itemGridContainer}
          contentContainerStyle={styles.itemGridContentContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.panelTitle}>Clothes • All</Text>
          <View style={styles.categoriesAndItems}>
            <View
              // horizontal
              // showsHorizontalScrollIndicator={false}
              // style={styles.categoryScrollView}
              style={styles.categories}
            >
              {CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryIcon,
                    {
                      backgroundColor:
                        selectedCategory === cat.id
                          ? Colors.purpleButtonActive
                          : Colors.purpleButtonInactive,
                    },
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <Image source={cat.icon} style={styles.categoryIconImage} />
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.itemGrid}>
              {shopItems.map((item) => (
                <TouchableOpacity key={item.id} style={styles.itemCard}>
                  <Image style={styles.itemIcon} source={item.icon} />
                  {/* <Image source={item.icon} style={styles.itemIcon} /> */}
                  <View style={styles.priceContainer}>
                    <Image
                      source={require("../assets/icons/currencyIcon.png")}
                      style={styles.gemIcon}
                    />
                    <Text style={styles.priceText}>{item.price}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ShopScreen;
