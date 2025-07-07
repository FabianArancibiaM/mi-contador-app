import '../global.css';
import { Slot, SplashScreen, Stack } from 'expo-router';

import { useFonts } from 'expo-font';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLAyout = () => {

    return <Slot />;
};

export default RootLAyout;
