import React, { useState } from "react";
import {
  Button,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// Color Vars
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
};

const createStyles = (width: number, height: number) =>
  StyleSheet.create({
    bg: {
      flex: 1,
      backgroundColor: "#3b1f6dff",
    },
    appContainer: {
      flex: 1,
      backgroundColor: Colors.floor,
      maxWidth: 1100,
      alignSelf: "center",
    },
    // Room View
    roomView: {
      //   flex: 1,
      width: width,
      height: height * 0.5, // 50% of screen height
    },
    wall: {
      flex: 1,
      backgroundColor: Colors.wall,
    },
    floor: {
      height: height * 0.1, // 10% of screen height
      backgroundColor: Colors.floor,
      borderBottomColor: "black",
      borderBottomWidth: 2,
    },
    characterPlaceholder: {
      width: width * 0.5,
      height: height * 0.25,
      position: "absolute",
      bottom: height * 0.1, // 5% from bottom
      resizeMode: "contain",

      left: "50%",
      // Make sure this is half of width to keep centered
      transform: [{ translateX: -(width * 0.51) / 2 }],
    },
    roomActions: {
      position: "absolute",
      bottom: height * 0.1, // 2.5% from bottom
      right: width * 0.05, // 5% from right
      flexDirection: "row",
      gap: width * 0.025, // 2.5% of screen width
    },
    iconButton: {
      width: width * 0.07,
      height: width * 0.07,
      borderRadius: (width * 0.1) / 2,
      backgroundColor: "rgba(88, 88, 88, 0.3)",
    },

    infoCards: {
      backgroundColor: Colors.floor,
    },

    // Info Cards (Shared)
    infoCard: {
      backgroundColor: Colors.cardBg,
      height: height * 0.3,
      borderRadius: 20,
      padding: width * 0.04,
      width: width * 0.9,
      alignSelf: "center",
      marginTop: height * 0.02,
    },
    statsCard: {},
    tasksCard: {},

    // Stats Card
    profileHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: width * 0.04, // 4% of screen width
    },
    avatar: {
      width: width * 0.15, // 15% of screen width
      height: width * 0.15, // Keep it square
      borderRadius: (width * 0.15) / 2, // Half of width/height
    },
    avatarImg: {
      width: "100%",
      height: "100%",
      borderRadius: (width * 0.15) / 2, // Must match avatar's radius
    },
    userDetails: {
      flexDirection: "row",
      top: 0,
      justifyContent: "space-between",
      alignItems: "center",
      flex: 1,
    },
    username: {
      color: Colors.font,
      fontWeight: "bold",
      fontSize: width * 0.03, // 4.5% of screen width
    },
    currency: {
      flexDirection: "row",
      gap: width * 0.04, // 4% of screen width
      marginLeft: width * 0.015,
    },
    currencyCount: {
      flexDirection: "row",
      alignItems: "center",
      gap: width * 0.015,
    },
    gemCount: {
      backgroundColor: "#27A36A",
      ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
      default: {
        // This will apply to BOTH 'ios' AND 'web'
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
    padding: 20,
    borderRadius: 10,
    },
    currencyText: {
      color: Colors.font,
      fontSize: width * 0.025, // 3.5% of screen width
    },
    progressBar: {
      width: "100%",
      height: height * 0.025, // 2.5% of screen height
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      borderRadius: 10,
      marginTop: height * 0.015, // 1.5% of screen height
    },
    progressFill: {
      height: "100%",
      borderRadius: 10,
    },
    xpFill: { width: "80%", backgroundColor: Colors.progressXp },
    waterFill: { width: "50%", backgroundColor: Colors.progressWater },
    plusIcon: {
      position: "absolute",
      right: -5,
      top: -2,
      width: width * 0.06, // 6% of screen width
      height: width * 0.06, // Keep it square
      borderRadius: (width * 0.06) / 2, // Half for circle
      backgroundColor: Colors.font,
      justifyContent: "center",
      alignItems: "center",
    },
    plusIconText: {
      color: "#555",
      fontWeight: "bold",
    },

    // Tasks Card
    cardTitle: {
      color: Colors.font,
      fontSize: width * 0.045, // 4.5% of screen width
      fontWeight: "bold",
      marginBottom: height * 0.012, // 1.2% of screen height
    },
    taskItem: {
      backgroundColor: "#fff",
      borderRadius: 15,
      paddingVertical: height * 0.012, // 1.2% of screen height
      paddingHorizontal: width * 0.04, // 4% of screen width
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    taskText: { color: "#333" },
    taskReward: { color: Colors.progressXp, fontWeight: "bold" },
    taskCompleteCheck: {
      width: width * 0.08, // 8% of screen width
      height: width * 0.08, // Keep it square
      borderRadius: (width * 0.08) / 2, // Half for circle
      borderWidth: 2,
      borderColor: "#ccc",
      justifyContent: "center",
      alignItems: "center",
    },

    // Bottom Nav
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
      //Add Selected / Active styles here 
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

const characterData = {
  dog: {
    pfp: require("../assets/icons/rowdyPFP.svg"),
    character: require("../assets/icons/rowdyCharacter.svg"),
  },
  axolotl: {
    pfp: require("../assets/icons/axolotlPFP.svg"),
    // You will need to add this 'axolotlCharacter' image to your assets!
    character: require("../assets/icons/axolotlCharacter.svg"),
  },
};

type characterKey = keyof typeof characterData;

const HomeScreen = () => {
  // Setting Up Styles (Using Viewport Dimensions)
  const { width, height } = useWindowDimensions();
  const MAX_HEIGHT = 1400;
  const MAX_WIDTH = 1000;

  const effectiveWidth = Math.min(width, MAX_WIDTH);
  const effectiveHeight = Math.min(height, MAX_HEIGHT);

  const styles = createStyles(effectiveWidth, effectiveHeight);

  const [selectedChar, setSelectedChar] = useState<characterKey>("dog");

  const currentCharData = characterData[selectedChar];

  const currentPfpImage = currentCharData.pfp;
  const currentCharacterImage = currentCharData.character;

  return (
    <SafeAreaView style={styles.bg}>
      <SafeAreaView style={styles.appContainer}>
        <ScrollView>
          {/* 1. The Room and Character View */}
          <View style={styles.roomView}>
            <ImageBackground
              source={require("../assets/images/room.png")}
              style={{ width: "100%", height: "100%", marginLeft: -2, }}
            />
            <View style={styles.wall}>
              <View style={styles.roomActions}>
                <TouchableOpacity style={styles.iconButton}>
                  <ImageBackground
                    source={require("../assets/icons/closetButton.svg")}
                    style={{ width: "105%", height: "105%", marginLeft: -2 }}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                  <ImageBackground
                    source={require("../assets/icons/roomButton.svg")}
                    style={{ width: "105%", height: "105%", marginLeft: -2 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                  <ImageBackground
                    source={require("../assets/icons/poseButton.svg")}
                    style={{ width: "105%", height: "105%", marginLeft: -2 }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Render character last, above floor */}
            <View style={styles.characterPlaceholder} />
            <ImageBackground></ImageBackground>
            <Image
              source={currentCharacterImage}
              style={styles.characterPlaceholder}
            />
          </View>

          {/* Character Selector Buttons  (PLACEHOLDER FOR TESTING) */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              margin: 10,
            }}
          >
            <Button
              title="Set Rowdy PFP"
              onPress={() => setSelectedChar("dog")}
              disabled={selectedChar === "dog"}
            />
            <Button
              title="Set Axolotl PFP"
              onPress={() => setSelectedChar("axolotl")}
              disabled={selectedChar === "axolotl"}
            />
          </View>

          <View style={styles.infoCards}>
            {/* 2. User Stats Card */}
            <View style={[styles.infoCard, styles.statsCard]}>
              <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                  <Image style={styles.avatarImg} source={currentPfpImage} />
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.username}>[Rowdy#7890]</Text>
                  <View style={styles.currency}>
                    <View style={styles.currencyCount}>
                      <Image source={require("../assets/icons/xpIcon.png")} />
                      <Text style={styles.currencyText}>[INSERT USER XP]</Text>
                    </View>
                    <View style={[styles.currencyCount, styles.gemCount]}>
                      <Image
                        source={require("../assets/icons/currencyIcon.png")}
                      />
                      <Text style={styles.currencyText}>[1000]</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, styles.xpFill]} />
              </View>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, styles.waterFill]} />
                <TouchableOpacity style={styles.plusIcon}>
                  <Text style={styles.plusIconText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* 3. Upcoming Tasks Card */}
            <View style={[styles.infoCard, styles.tasksCard]}>
              <Text style={styles.cardTitle}>Upcoming Tasks</Text>
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>Placeholder for a task...</Text>
                <Text style={styles.taskReward}>⚡ 50</Text>
                <TouchableOpacity style={styles.taskCompleteCheck}>
                  <Text>✓</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Spacer to push content up from the absolute positioned nav */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default HomeScreen;
