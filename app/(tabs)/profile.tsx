import { Button, Text, View } from 'react-native';

export default function ProfileScreen() {


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile Settings Go Here</Text>

        <Button 
        title="Sign Out Now"
        color="red"
      />
    </View>
  );
}