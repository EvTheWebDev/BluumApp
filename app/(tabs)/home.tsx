import React, { useState } from 'react';
import { Button, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import {
    SafeAreaView
} from 'react-native-safe-area-context';

// Color Vars
const Colors = {
    appBg: '#4A5C50',
    cardBg: '#4CC790',
    wall: '#6A3EBF',
    floor: '#3B9D6E',
    progressXp: '#FBC53E',
    progressWater: '#5AC2EE',
    navBg: '#411393',
    font: '#FFFFFF',
    placeholder: '#d3a48c',
    placeholderBorder: '#593b2b',
};

const createStyles = (width: number, height: number) => StyleSheet.create({
    appContainer: {
        flex: 1,
        backgroundColor: Colors.appBg
    },
    // Room View
    roomView: {
        // flex: 1,
        height: height * 0.5, // 50% of screen height
    },
    wall: {
        flex: 1,
        backgroundColor: Colors.wall,
    },
    floor: {
        height: height * 0.1, // 10% of screen height
        backgroundColor: Colors.floor,
    },
    characterPlaceholder: {
        width: width * 0.2, 
        height: height * 0.25, 
        position: 'absolute',
        bottom: height * 0.05, // 5% from bottom
        
        left: '50%',
        // CRITICAL: This must be half of your new dynamic width
        transform: [{ translateX: -(width * 0.45) / 2 }], 
    },
    roomActions: {
        position: 'absolute',
        bottom: height * 0.025, // 2.5% from bottom
        right: width * 0.05, // 5% from right
        flexDirection: 'row',
        gap: width * 0.025, // 2.5% of screen width
    },
    iconButton: {
        width: width * 0.07, 
        height: width * 0.07, 
        borderRadius: (width * 0.1) / 2,
        backgroundColor: 'rgba(88, 88, 88, 0.3)',
    },

    // Info Cards (Shared)
    infoCard: {
        backgroundColor: Colors.cardBg,
        height: height * 0.3,
        borderRadius: 20, // Fixed radius often looks fine
        padding: width * 0.04, // 4% of screen width
        marginTop: height * 0.02, // 2% of screen height
    },
    statsCard: {},
    tasksCard: {},

    // Stats Card
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: width * 0.04, // 4% of screen width
    },
    avatar: {
        width: width * 0.15, // 15% of screen width
        height: width * 0.15, // Keep it square
        borderRadius: (width * 0.15) / 2, // Half of width/height
        backgroundColor: Colors.placeholder,
        borderWidth: 3,
        borderColor: Colors.font,
    },
    userDetails: { flex: 1 },
    username: {
        color: Colors.font,
        fontWeight: 'bold',
        fontSize: width * 0.045, // 4.5% of screen width
    },
    currency: {
        flexDirection: 'row',
        gap: width * 0.04, // 4% of screen width
    },
    currencyText: {
        color: Colors.font,
        fontSize: width * 0.035, // 3.5% of screen width
    },
    progressBar: {
        width: '100%',
        height: height * 0.025, // 2.5% of screen height
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 10,
        marginTop: height * 0.015, // 1.5% of screen height
    },
    progressFill: {
        height: '100%',
        borderRadius: 10,
    },
    xpFill: { width: '80%', backgroundColor: Colors.progressXp },
    waterFill: { width: '50%', backgroundColor: Colors.progressWater },
    plusIcon: {
        position: 'absolute',
        right: -5,
        top: -2,
        width: width * 0.06, // 6% of screen width
        height: width * 0.06, // Keep it square
        borderRadius: (width * 0.06) / 2, // Half for circle
        backgroundColor: Colors.font,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusIconText: {
        color: '#555',
        fontWeight: 'bold',
    },

    // Tasks Card
    cardTitle: {
        color: Colors.font,
        fontSize: width * 0.045, // 4.5% of screen width
        fontWeight: 'bold',
        marginBottom: height * 0.012, // 1.2% of screen height
    },
    taskItem: {
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingVertical: height * 0.012, // 1.2% of screen height
        paddingHorizontal: width * 0.04, // 4% of screen width
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskText: { color: '#333' },
    taskReward: { color: Colors.progressXp, fontWeight: 'bold' },
    taskCompleteCheck: {
        width: width * 0.08, // 8% of screen width
        height: width * 0.08, // Keep it square
        borderRadius: (width * 0.08) / 2, // Half for circle
        borderWidth: 2,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Bottom Nav
    bottomNav: {
        position: 'absolute',
        bottom: height * 0.04, // 4% from bottom
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly', // This evenly spaces the 5 buttons
        
        backgroundColor: '#5A3E9B', // The purple color from your image
        borderRadius: 50, // Makes it pill-shaped
        
        // Use vertical padding and a width percentage
        paddingVertical: height * 0.015,
        width: '90%', // Make the bar 90% of the screen width
        
        // Shadow (optional, but good)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
    },
    navIcon: {
        // This is the container for *each* button
        alignItems: 'center',
        justifyContent: 'center',
        // Give each button a flexible width
        flex: 1, 
    },
    navToggle: {
        // This *adds* styles to the first button
        backgroundColor: '#7B5FBF', // Lighter purple circle
        width: width * 0.12,
        height: width * 0.12,
        borderRadius: (width * 0.12) / 2, // Makes it a circle
    },
    navButtonIcon: {
        // A new style for just the <Image>
        width: width * 0.06,
        height: width * 0.06,
        resizeMode: 'contain',
        tintColor: '#FFFFFF', // This is key! It makes all your SVG icons white
    },
    navIconText: {
        color: '#FFFFFF',
        fontSize: width * 0.03, // Small, responsive font
        marginTop: height * 0.005, // Space between icon and text
    },
    navClose: {
        // No extra styles needed, it just uses navIcon and navButtonIcon
    },
    navIconActive: {
        // ... (no properties here, but you could add them)
    },
    activeAvatar: {
        width: '100%',
        height: '100%',
        borderRadius: (width * 0.13) / 2, // Must match navIcon's radius
        backgroundColor: Colors.placeholder,
        borderWidth: 3,
        borderColor: Colors.font,
    },
});


const pfpAssets = {
  dog: require("../assets/icons/rowdyPFP.svg"),
  axolotl: require("../assets/icons/axolotlPFP.svg"),
};
type PfpKey = keyof typeof pfpAssets;

const HomeScreen = () => {
// Setting Up Styles (Using Viewport Dimensions)
const { width, height } = useWindowDimensions();
const MAX_HEIGHT = 1400;
const MAX_WIDTH = 1000;

const effectiveWidth = Math.min(width, MAX_WIDTH);
const effectiveHeight = Math.min(height, MAX_HEIGHT);

const styles = createStyles(effectiveWidth, effectiveHeight);


const [selectedPfpKey, setSelectedPfpKey] = useState<PfpKey>('dog');

  const currentPfpImage = pfpAssets[selectedPfpKey];
    
    return (
        <SafeAreaView style={styles.appContainer}>
            <ScrollView>
            {/* 1. The Room and Character View */}
            <View style={styles.roomView}>
                <View style={styles.wall}>
                    
                    <View style={styles.roomActions}>
                        <TouchableOpacity style={[styles.iconButton,]}>
                            <ImageBackground  
                            source={require("../assets/icons/closetButton.svg")}
                            style={{ width: '105%', height: '105%', marginLeft: -2 }}
                        />
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.iconButton}>
                            <ImageBackground  
                            source={require("../assets/icons/roomButton.svg")}
                            style={{ width: '105%', height: '105%', marginLeft: -2 }}
                        />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <ImageBackground  
                            source={require("../assets/icons/poseButton.svg")}
                            style={{ width: '105%', height: '105%', marginLeft: -2 }}
                        />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.floor} />
                
                {/* Render character last, above floor */}
                <View style={styles.characterPlaceholder}/>
                <Image  
                    source={require("../assets/icons/Character.svg")}
                    style={styles.characterPlaceholder}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 10 }}>
        <Button 
          title="Set Rowdy PFP" 
          onPress={() => setSelectedPfpKey('dog')} 
          disabled={selectedPfpKey === 'dog'}
        />
        <Button 
          title="Set Axolotl PFP" 
          onPress={() => setSelectedPfpKey('axolotl')}
          disabled={selectedPfpKey === 'axolotl'}
        />
      </View>

            {/* 2. User Stats Card */}
            <View style={[styles.infoCard, styles.statsCard]}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                       <Image
        source={currentPfpImage}
                       />
                       </View>
                    <View style={styles.userDetails}>
                        <Text style={styles.username}>[Rowdy#7890]</Text>
                        <View style={styles.currency}>
                            <Text style={styles.currencyText}>⚡ [INSERT USER XP]</Text>
                            <Text style={styles.currencyText}>💎 [INSERT USER CURRENCY]</Text>
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

            {/* Spacer to push content up from the absolute positioned nav */}
            <View style={{ height: 100 }} />
</ScrollView>
            {/* 4. Bottom Navigation Bar */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={[styles.navIcon, styles.navToggle]}>
                    <Image
                    style={styles.navIcon}
        source={require("../assets/icons/navigation.svg")}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navIcon}>
                    <Image
                    style={styles.navButtonIcon}
        source={require("../assets/icons/homeIcon.svg")}
                    />
                    <Text style={styles.navIconText}>Home</Text></TouchableOpacity>
               <TouchableOpacity style={styles.navIcon}>
                    <Image
                    style={styles.navButtonIcon}
        source={require("../assets/icons/homeIcon.svg")}
                    />
                    <Text style={styles.navIconText}>Home</Text></TouchableOpacity>
                <TouchableOpacity style={styles.navIcon}>
                    <Image
                    style={styles.navButtonIcon}
        source={require("../assets/icons/homeIcon.svg")}
                    />
                    <Text style={styles.navIconText}>Home</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.navClose, styles.navIcon]}>
                    <Text style={styles.navIconText}>X</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};




// const styles = StyleSheet.create({
//     appContainer: {
//         flex: 1,
//         backgroundColor: Colors.appBg,
//         paddingHorizontal: 20,
//     },
//     // Room View
//     roomView: {
//         flex: 1,
//     },
//     wall: {
//         flex: 1,
//         backgroundColor: Colors.wall,
//     },
//     floor: {
//         height: 80,
//         backgroundColor: Colors.floor,
//     },
//     characterPlaceholder: {
//         backgroundColor: Colors.placeholder,
//         width: 180,
//         height: 300,
//         borderRadius: 10,
//         borderWidth: 3,
//         borderColor: Colors.placeholderBorder,
//         position: 'absolute',
//         bottom: 40, 
        
//         left: '50%',
//         transform: [{ translateX: -90 }], // Center horizontally
        
//     },
//     roomActions: {
//         position: 'absolute',
//         bottom: 20,
//         right: 20,
//         flexDirection: 'row',
//         gap: 10,
//     },
//     iconButton: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         // backgroundColor: 'rgba(255, 255, 255, 0.3)'
//         backgroundColor: 'rgba(88, 88, 88, 0.3)',
//     },
//     closet: {
//         backgroundImage: 'url(`/assets/icons/Navigation.svg`)',
//     },


//     // Info Cards (Shared)
//     infoCard: {
//         backgroundColor: Colors.cardBg,
//         borderRadius: 20,
//         padding: 15,
//         marginTop: 20,
//     },
//     statsCard: {},
//     tasksCard: {},

//     // Stats Card
//     profileHeader: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 15,
//     },
//     avatar: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         backgroundColor: Colors.placeholder,
//         borderWidth: 3,
//         borderColor: Colors.font,
//     },
//     userDetails: { flex: 1 },
//     username: {
//         color: Colors.font,
//         fontWeight: 'bold',
//         fontSize: 18,
//     },
//     currency: {
//         flexDirection: 'row',
//         gap: 15,
//     },
//     currencyText: {
//         color: Colors.font,
//         fontSize: 14,
//     },
//     progressBar: {
//         width: '100%',
//         height: 20,
//         backgroundColor: 'rgba(0, 0, 0, 0.2)',
//         borderRadius: 10,
//         marginTop: 10,
//     },
//     progressFill: {
//         height: '100%',
//         borderRadius: 10,
//     },
//     xpFill: { width: '80%', backgroundColor: Colors.progressXp },
//     waterFill: { width: '50%', backgroundColor: Colors.progressWater },
//     plusIcon: {
//         position: 'absolute',
//         right: -5,
//         top: -2,
//         width: 24,
//         height: 24,
//         borderRadius: 12,
//         backgroundColor: Colors.font,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     plusIconText: {
//         color: '#555',
//         fontWeight: 'bold',
//     },

//     // Tasks Card
//     cardTitle: {
//         color: Colors.font,
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     taskItem: {
//         backgroundColor: '#fff',
//         borderRadius: 15,
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     taskText: { color: '#333' },
//     taskReward: { color: Colors.progressXp, fontWeight: 'bold' },
//     taskCompleteCheck: {
//         width: 30,
//         height: 30,
//         borderRadius: 15,
//         borderWidth: 2,
//         borderColor: '#ccc',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     // Bottom Nav
//     bottomNav: {
//         position: 'absolute',
//         bottom: 30,
//         alignSelf: 'center',
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 10,
//         backgroundColor: Colors.navBg,
//         borderRadius: 50,
//         padding: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.3,
//         shadowRadius: 4,
//         elevation: 8,
//     },
//     navIcon: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     navIconText: {
//         color: Colors.font,
//         fontSize: 24,
//     },
//     navIconActive: {

//     },
//     activeAvatar: {
//         width: '100%',
//         height: '100%',
//         borderRadius: 25,
//         backgroundColor: Colors.placeholder,
//         borderWidth: 3,
//         borderColor: Colors.font,
//     },
// });

export default HomeScreen;