import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigator';
import { PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '../store/auth.use.store';
import { API_URL } from '../../config/api/tesloApi';

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
    const { checkStatus, status } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, [])

    useEffect(() => {

        console.log('API URL used: ')
        console.log(API_URL);

        if (status !== 'checking') {
            if (status === 'authenticated') {
                navigator.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                })
            }
            else {
                navigator.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }]
                })
            }
        }
    }, [status])
    return (
        <>
            {children}
        </>
    )
}
