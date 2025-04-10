import { Stack } from 'expo-router';
const StackLayout = () => {
    return (
        <Stack
            screenOptions={{
                // headerShown: false,
                headerShadowVisible: false,
                contentStyle: {
                    backgroundColor: 'white',
                },
                headerTitleStyle: {
                    color: 'white',
                },
            }}
        >
            <Stack.Screen
                name="home/index"
                options={{
                    title: 'Volver',
                }}
            />
            <Stack.Screen
                name="products/index"
                options={{
                    title: 'Productos',
                }}
            />
        </Stack>
    );
};
export default StackLayout;
