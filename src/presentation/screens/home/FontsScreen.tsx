import { StyleSheet, useColorScheme, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import * as eva from '@eva-design/eva';
import { Fonts } from '../../../config/fonts/Fonts';

export const FontsScreen = () => {
    const colorScheme = useColorScheme();

    const theme = (colorScheme === 'dark') ? eva.dark : eva.light;

    const { top } = useSafeAreaInsets();
    return (
        <View style={{
            marginTop: top + 20,
            backgroundColor: theme['background-basic-color-1'],
            marginHorizontal: 30
        }}>
            <Text style={{ ...styles.text, fontFamily: Fonts.MsMadi, paddingLeft: 5 }}>Let's Go</Text>
            <Text style={{ ...styles.text, fontFamily: Fonts.PermanentMarker, paddingLeft: 5 }}>Let's Go</Text>
            <Text style={{ ...styles.text, fontFamily: Fonts.SpaceGrotesk, paddingLeft: 5 }}>Let's Go</Text>
            <Text style={{ ...styles.text, fontFamily: Fonts.TitilliumWeb, paddingLeft: 5 }}>Let's Go</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 50,
    }
})