import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { TaskCard } from "../../components/taskCard";

const { width, height } = Dimensions.get('window');

// Placeholder for your Colors object if it's used elsewhere
const Colors = {
  primaryGreen: '#27A36A', 
  lightGreen: '#2EB778',
  primaryPurple: '#5A3E9B', 
  white: '#f7f7f7ff',
  textPrimary: '#333333',
  textSecondary: '#666666',
  placeholder: '#CCCCCC',
  accentOrange: '#FFC107', 
};




export default function TasksScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>Upcoming Tasks</Text>

      {/* Nursing Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Nursing</Text>
        <View style={styles.sectionContent}>
          <TaskCard
            iconColor={Colors.primaryPurple}
            title="Morning Medication"
            time="6:00 am"
            energy="00"
            completed={true}
          />
          <TaskCard
            iconColor={Colors.primaryPurple}
            title="Bandage Change"
            time="6:00 am"
            energy="00"
            completed={false}
          />
          <TaskCard
            iconColor={Colors.primaryPurple}
            title="Night Medication"
            time="6:00 am"
            energy="00"
            completed={false}
          />
        </View>
      </View>

      {/* Nutrition Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Nutrition</Text>
        <View style={styles.sectionContent}>
          <TaskCard
            iconColor={'#FFB3BA'} // Light Red/Pink
            title="Breakfast"
            time="8:00 am"
            duration="30 mins"
            energy="00"
            completed={true}
          />
          <TaskCard
            iconColor={'#FFE082'} // Light Yellow
            title="Lunch"
            time="12:00 pm"
            duration="1 hr"
            energy="00"
            completed={false}
          />
          <TaskCard
            iconColor={'#A5D6A7'} // Light Green
            title="Dinner"
            time="6:00 pm"
            duration="45 mins"
            energy="00"
            completed={false}
          />
        </View>
      </View>

      {/* Leisure Section - Extrapolated */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Leisure</Text>
        <View style={styles.sectionContent}>
          <TaskCard
            iconColor={'#81D4FA'} // Light Blue
            title="Drink Water"
            time="All Day"
            energy="00"
            completed={false}
          />
          <TaskCard
            iconColor={'#F8BBD0'} // Light Pink
            title="Take a Walk"
            time="3:00 pm"
            duration="30 mins"
            energy="00"
            completed={false}
          />
          <TaskCard
            iconColor={'#D1C4E9'} // Light Purple
            title="Read a Book"
            time="Anytime"
            energy="00"
            completed={true}
          />
          <TaskCard
            iconColor={'#B2DFDB'} // Teal
            title="Make a Friend"
            time="Today"
            energy="00"
            completed={false}
          />
           <TaskCard
            iconColor={'#C5CAE9'} // Indigo
            title="Meditate"
            time="10:00 pm"
            duration="15 mins"
            energy="00"
            completed={false}
          />
        </View>
      </View>

      {/* Add some padding at the bottom so the nav bar doesn't overlap content */}
      <View style={{ height: height * 0.15 }} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryGreen,
    paddingTop: height * 0.05, 
  },
  headerTitle: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: height * 0.04,
    color: Colors.white,
  },
  sectionContainer: {
    marginBottom: height * 0.03,
    backgroundColor: Colors.lightGreen,
    width: "90%",
    alignSelf: "center",
    borderRadius: 20
},
  sectionTitle: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    padding: 5,
    marginTop: 10,
    color: Colors.white,
    alignSelf: "center"
    
  },
  sectionContent: {
    marginHorizontal: width * 0.03,
    borderRadius: 20,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.03,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
 
});