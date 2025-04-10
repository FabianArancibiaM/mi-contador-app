import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { CircleInfoIcon, HomeIcon } from '../../../components/shared/icons';

export default function TabsLayout() {
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarStyle: { backgroundColor: 'black' } }}>
            <Tabs.Screen
                name="index"
                options={{ title: 'home 5 1', tabBarIcon: ({ color }) => <HomeIcon color={color} /> }}
            />
        </Tabs>
    );
}
