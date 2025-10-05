import { Stack, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

function RootLayoutContent() {
  const { isLoggedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is in a protected route group.
    const inTabsGroup = segments[0] === '(tabs)';

    if (isLoggedIn && !inTabsGroup) {
      // If the user is signed in and not in the protected '(tabs)' group,
      // redirect them to the home screen.
      router.replace('/(tabs)/home');
    } else if (!isLoggedIn && inTabsGroup) {
      // If the user is not signed in and tries to access a protected route,
      // redirect them to the login screen.
      router.replace('/');
    }
  }, [isLoggedIn, segments]); // Re-run the effect when auth state or route changes

  return (
    <Stack screenOptions={{ headerShown: false }}>
        {/* These screens are always available in the layout.
            The useEffect hook above handles the redirection logic. */}
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
    </Stack>
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