import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Colors } from "../constants/theme";
 
 type TaskCardProps = {
   iconColor: string;
   title: string;
   time: string;
   duration?: string; // <-- The ? makes this prop optional
   energy: string;
   completed: boolean;
 };
 
 export const TaskCard = ({ iconColor, title, time, duration, energy, completed }: TaskCardProps) => {
   return (
     <View style={styles.taskCard}>
       <View style={[styles.placeholderImage, { backgroundColor: iconColor }]} />
       <View style={styles.taskDetails}>
         <Text style={styles.taskTitle}>{title}</Text>
         <Text style={styles.taskTime}>
           {time} {duration && `· ${duration}`}
         </Text>
       </View>
       <View style={styles.taskEnergy}>
         <Image style={styles.energyIcon} source={require("../app/assets/icons/xpIcon.png")}/>
         <Text style={styles.taskEnergyText}>{energy}</Text>
       </View>
       {completed ? (
         <View style={[styles.placeholderCheckIcon, { backgroundColor: Colors.primaryGreen }]} />
       ) : (
         <View style={[styles.placeholderCheckIcon, { backgroundColor: Colors.placeholder }]} />
       )}
     </View>
   );
 };

 const { width, height } = Dimensions.get('window');
 const styles = StyleSheet.create({
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white, 
    borderRadius: 15,
    padding: width * 0.04,
    marginBottom: height * 0.015,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholderImage: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: 10,
    marginRight: width * 0.04,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: Colors.textPrimary, 
  },
  taskTime: {
    fontSize: width * 0.035,
    color: Colors.textSecondary,
    marginTop: height * 0.003,
  },
  taskEnergy: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: width * 0.03,
  },
  energyIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  taskEnergyText: {
    fontSize: width * 0.04,
    fontWeight: 'bold',
    color: Colors.accentOrange, 
  },
  placeholderCheckIcon: {
    width: width * 0.07,
    height: width * 0.07,
    borderRadius: (width * 0.07) / 2,
    borderWidth: 2,
    borderColor: Colors.placeholder,
  },
});