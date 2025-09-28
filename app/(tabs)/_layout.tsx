import { Tabs } from 'expo-router';
import React from 'react';
import { Text } from 'react-native'; // Import Text if you haven't already

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          // 💡 CORRECT: Accepts the 'color' prop from the Tabs component
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🏠</Text>, 
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          // 💡 CORRECT: Accepts the 'color' prop
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}