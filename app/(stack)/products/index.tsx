import { Link, router } from 'expo-router';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../components/shared/CustomButton';
const ProductsScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>ProductsScreen!!</Text>
                <Link href="/home">home 3</Link>
                <CustomButton className="mb-2" color="primary" onPress={() => router.push('/home')}>
                    home 2
                </CustomButton>
            </View>
        </SafeAreaView>
    );
};
export default ProductsScreen;
