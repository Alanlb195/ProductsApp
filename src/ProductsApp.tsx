import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import * as eva from '@eva-design/eva';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { Platform, useColorScheme } from 'react-native';
import { Fonts } from './config/fonts/Fonts';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient()

export const ProductsApp = () => {

  const colorScheme = useColorScheme();
  const theme = (colorScheme === 'dark') ? eva.dark : eva.light;
  const backgroundColor = (colorScheme === 'dark')
    ? theme['color-basic-800']
    : theme['color-basic-100']

  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <NavigationContainer theme={{
          dark: colorScheme === 'dark',
          colors: {
            primary: theme['color-primary-500'],
            background: backgroundColor,
            card: theme['color-basic-100'],
            text: theme['text-basic-color'],
            border: theme['color-basic-600'],
            notification: theme['color-primary-500'],
          },
          fonts: Platform.select({
            default: {
              regular: {
                fontFamily: Fonts.TitilliumWeb,
                fontWeight: '400',
              },
              medium: {
                fontFamily: Fonts.TitilliumWeb,
                fontWeight: '500',
              },
              bold: {
                fontFamily: Fonts.TitilliumWeb,
                fontWeight: '600',
              },
              heavy: {
                fontFamily: Fonts.TitilliumWeb,
                fontWeight: '700',
              },
            },
          }),

        }}>
          <AuthProvider>
            <StackNavigator />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  )
}
