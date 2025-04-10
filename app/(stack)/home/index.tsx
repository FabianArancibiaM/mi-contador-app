import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../../../components/shared/CustomButton';
import Card from '../../../components/shared/CustomCard';

import { ImageAssets } from '../../../assets/image';
import { colors } from '../../../assets/styles/globalStyles';

import { Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Screen from '../../../components/shared/Screen';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
    const menuList = [
        { title: ' Movimiento', icon: ImageAssets.add, route: '/movements' },
        { title: 'Products', icon: ImageAssets.add, route: '/products' },
        { title: 'Agregar Movimiento', icon: ImageAssets.add, route: '/add-movement' },
        { title: 'Agregar Movimiento', icon: ImageAssets.add, route: '/add-movement' },
        { title: 'Agregar Movimiento', icon: ImageAssets.add, route: '/add-movement' },
        { title: 'Agregar Movimiento', icon: ImageAssets.add, route: '/add-movement' },
    ];
    return (
        <Screen>
            <CardDetails />
            <ScrollView>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', padding: 10 }}>
                    {menuList.map((menu, index) => (
                        <Menu key={index} title={menu.title} image={menu.icon} route={menu.route} />
                    ))}
                </View>
            </ScrollView>
            <Link href="/products" asChild>
                <CustomButton variant="text-only" className="mb-10" color="primary">
                    Productos
                </CustomButton>
            </Link>
        </Screen>
    );
};

const Menu = ({ title, image, route }) => {
    return (
        <TouchableOpacity style={stylesCardMenu.cardContainer} onPress={() => router.push(route)}>
            <Image source={image} style={stylesCardMenu.cardImage} />
            <Text style={stylesCardMenu.cardTitle}>{title}</Text>
        </TouchableOpacity>
    );
};

const stylesCardMenu = StyleSheet.create({
    cardContainer: {
        width: '48%', // Para hacer 2 columnas por fila
        height: 100,
        backgroundColor: colors.base2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderRadius: 8,
        padding: 5,
    },
    cardImage: {
        width: '40%',
        height: '40%',
        resizeMode: 'contain',
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10,
        fontFamily: 'WorkSans-Medium',
    },
});

const Graphycs = ({ earnings, expense }) => {
    const data = [
        {
            name: 'Gastos',
            population: expense,
            color: '#f94144',
        },
        {
            name: 'Abonos',
            population: earnings,
            color: '#1e96fc',
        },
    ];
    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional
    };
    return (
        <View>
            <PieChart
                data={data}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                center={[50, 0]}
                absolute
                hasLegend={false}
            />
        </View>
    );
};

const CardDetails = () => {
    const info = {
        earnings: 2123000,
        expense: 432122,
    };
    return (
        <View style={stylesCardDetails.cardContainer}>
            <Graphycs earnings={info.earnings} expense={info.expense} />
            <Text style={stylesCardDetails.cardTitle}>Balance General</Text>
            <View style={stylesCardDetails.cardDetails}>
                <Image source={ImageAssets.contador} style={stylesCardDetails.cardImage} />
                <View style={stylesCardDetails.cardInfoDetails}>
                    <Text style={stylesCardDetails.cardField}>Total</Text>
                    <Text style={stylesCardDetails.cardField}>Abonos</Text>
                    <Text style={stylesCardDetails.cardField}>Descuentos</Text>
                </View>
                <View style={stylesCardDetails.cardInfoDetails}>
                    <Text style={stylesCardDetails.cardvalue}>
                        $ {(info.earnings - info.expense).toLocaleString('es-ES')}.-
                    </Text>
                    <Text style={stylesCardDetails.cardvalue}>$ {info.earnings.toLocaleString('es-ES')}.-</Text>
                    <Text style={stylesCardDetails.cardvalue}>$ {info.expense.toLocaleString('es-ES')}.-</Text>
                </View>
            </View>
        </View>
    );
};
const stylesCardDetails = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.base2,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5, // Sombras en Android
        margin: 10,
        padding: 10,
        overflow: 'hidden', // Para que los bordes redondeados funcionen con la imagen
    },
    cardImage: {
        width: '20%',
        height: '100%',
        resizeMode: 'contain',
    },
    cardDetails: {
        display: 'flex',
        flexDirection: 'row',
    },
    cardInfoDetails: { paddingLeft: 10 },
    cardTitle: {
        textAlign: 'center',
        fontSize: 32,
        marginBottom: 10,
        fontFamily: 'WorkSans-Black',
    },
    cardField: {
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'WorkSans-Light',
    },
    cardvalue: {
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'WorkSans-Medium',
    },
});

export default HomeScreen;
