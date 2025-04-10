import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';
import { useState } from 'react';
import { colors } from '../../../assets/styles/globalStyles';

interface Props {
    style?: object;
    [key: string]: any;
    onSelect: (option: string) => void;
}

const ThemedPicker = ({ onSelect, ...rest }: Props) => {
    const primaryColor = useThemeColor({}, 'primary');
    const textColor = useThemeColor({}, 'text');

    const [isActive, setIsActive] = useState(false);

    let selectedValue = 'transferencia';

    return (
        <View>
            <Text>Movimiento:</Text>
            <View
                style={[
                    {
                        ...styles.border,
                        borderColor: isActive ? primaryColor : '#ccc',
                        borderWidth: 1,
                        borderRadius: 5,
                        marginTop: 1,
                        padding: 0,
                    },
                ]}
            >
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(text) => {
                        selectedValue = text;
                        return onSelect(text);
                    }}
                    onFocus={() => setIsActive(true)}
                    onBlur={() => setIsActive(false)}
                    style={{ color: 'black' }}
                >
                    <Picker.Item label="Transferencia" value="transferencia" />
                    <Picker.Item label="Gastos" value="gastos" />
                </Picker>
            </View>
        </View>
    );
};
export default ThemedPicker;
const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
