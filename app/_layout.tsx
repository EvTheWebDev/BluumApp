import { Stack } from 'expo-router';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
function RootLayoutContent() {
  
  return (
    <Stack screenOptions={{ headerShown: false }}></Stack>
  );
}

// Wrap the whole app in the AuthProvider
export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutContent/> 
    </AuthProvider>
      

  );
}