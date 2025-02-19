import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { Alert, ScrollView, useWindowDimensions } from 'react-native'
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth.use.store';


interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {

  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false)
  const { height } = useWindowDimensions();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const onLogin = async () => {

    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await login(form.email, form.password);
    setIsPosting(false);

    if (wasSuccessful) return;
    Alert.alert('Error', 'unexpected error');

  }

  return (
    <Layout style={{ flex: 1 }}>

      <ScrollView style={{ marginHorizontal: 40 }}>

        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category='h1'>Login</Text>
          <Text category='p2' style={{ marginTop: 10 }}>Por favor, ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}

        <Layout style={{ marginTop: 20 }}>

          <Input
            placeholder="Correo electrónico"
            keyboardType="email-address"
            autoCapitalize='none'
            style={{ marginBottom: 10 }}
            accessoryLeft={<MyIcon name='email-outline' white />}
            onChangeText={email => setForm({ ...form, email })}
            value={form.email}
          />

          <Input
            placeholder='Contraseña'
            autoCapitalize='none'
            secureTextEntry
            accessoryLeft={<MyIcon name='lock-outline' white />}
            style={{ marginBottom: 10 }}
            onChangeText={(password) => setForm({ ...form, password })}
            value={form.password}
          />

          <Layout style={{ height: 20 }} />

          <Layout>
            <Button
              disabled={isPosting}
              accessoryRight={<MyIcon name='arrow-forward-outline' white />}
              onPress={onLogin}
            >
              Ingresar
            </Button>
          </Layout>

          {/* informacion para crear cuenta */}
          <Layout style={{ height: 50 }} />

          <Layout style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <Text>¿No tienes cuenta?</Text>
            <Text
              status='primary'
              category='s1'
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              {' '}
              crea una{' '}
            </Text>
          </Layout>

        </Layout>

      </ScrollView>

    </Layout>
  )
}
