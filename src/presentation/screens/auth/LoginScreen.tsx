import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { Alert, ScrollView, useWindowDimensions } from 'react-native'
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth.use.store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {

  const { login } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false)
  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

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
    Alert.alert('Error', 'Invalid user');

  }

  return (
    <Layout style={{ flex: 1, top: top, }}>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 40,
          height: height - top,
          justifyContent: 'center'
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >

        <Layout style={{ 
          alignItems: 'center'
         }}>
          <Text category='h1'>Login</Text>
          <Text category='p2' style={{ marginTop: 10 }}>Please login to continue</Text>
        </Layout>

        {/* Inputs and Login button */}
        <Layout style={{ marginTop: 20 }}>

          <Input
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize='none'
            style={{ marginBottom: 10 }}
            accessoryLeft={<MyIcon name='email-outline' white />}
            onChangeText={email => setForm({ ...form, email })}
            value={form.email}
          />

          <Input
            placeholder='Password'
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
              Login
            </Button>
          </Layout>

          {/* information to create account */}
          <Layout style={{ height: 50 }} />

          <Layout style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
            <Text>Do you have an account?</Text>
            <Text
              status='primary'
              category='s1'
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              {' '}
              Create account{' '}
            </Text>
          </Layout>

        </Layout>

      </ScrollView>

    </Layout>
  )
}
