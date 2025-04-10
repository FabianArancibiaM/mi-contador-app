import { Ionicons } from '@expo/vector-icons';
import { Text, Pressable, PressableProps, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props extends PressableProps {
    children: string;
    icon?: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
}

const ThemedButton = ({ children, icon, onPress, ...rest }: Props) => {
    const primaryColor = useThemeColor({}, 'primary') || '#000';

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                backgroundColor: primaryColor,
            }}
            onPress={onPress}
        >
            <Text style={{ color: '#fff', fontSize: 16 }}>{children}</Text>
            {icon && <Ionicons name={icon} size={24} color="#fff" style={{ marginHorizontal: 5 }} />}
        </TouchableOpacity>
    );
};
export default ThemedButton;

const styles = StyleSheet.create({
    button: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
