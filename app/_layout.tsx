import '../global.css';
import { Slot, SplashScreen, Stack } from 'expo-router';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLAyout = () => {
    const [fontsLoaded, error] = useFonts({
        'WorkSans-Black': require('../assets/fonts/WorkSans-Black.ttf'),
        'WorkSans-Light': require('../assets/fonts/WorkSans-Light.ttf'),
        'WorkSans-Medium': require('../assets/fonts/WorkSans-Medium.ttf'),
    });

    useEffect(() => {
        if (error) throw error;

        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded, error]);

    if (!fontsLoaded && !error) return null;

    return <Slot />;
};

export default RootLAyout;
