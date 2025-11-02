import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';

// 1. Define all your available character options
//    We use `require` to load the images into the app
const characterAssets = {
  dog: {
    name: 'Rowdy',
    image: require('../assets/icons/rowdyPFP.svg'), 
  },
  axolotl: {
    name: 'Axolotl',
    image: require('../assets/icons/axolotlPFP.svg'),
  },
};

type CharacterKey = keyof typeof characterAssets;

export default function CharacterSelector() {
  
  // 2. Set up the state variable
  //    'wizard' is the default value.
  //    `selectedCharKey` will store the *key* (e.g., 'wizard')
  //    `setSelectedCharKey` is the function we use to change it
  const [selectedCharKey, setSelectedCharKey] = useState<CharacterKey>('dog');

  // Get the full data object for the currently selected character
  const currentCharacter = characterAssets[selectedCharKey];

  return (
    <View style={styles.container}>
      
      {/* 3. This Image is now dynamic! */}
      {/* Its `source` prop depends on the `currentCharacter` state. */}
      <Image 
        source={currentCharacter.image} 
        style={styles.characterImage} 
      />
      
      <Text style={styles.characterName}>
        {currentCharacter.name}
      </Text>

      {/* 4. These buttons act as the "triggers" */}
      <View style={styles.buttonContainer}>
        <Button
          title="Select Rowdy"
          // When pressed, call the setter function to update the state
          onPress={() => setSelectedCharKey('dog')}
          disabled={selectedCharKey === 'dog'} 
        />
        <Button
          title="Select Axolotl"
          onPress={() => setSelectedCharKey('axolotl')}
          disabled={selectedCharKey === 'axolotl'} 
        />
      </View>
    </View>
  );
}

// Simple styles for this example
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  characterImage: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15, // `gap` is great for simple spacing
  },
});