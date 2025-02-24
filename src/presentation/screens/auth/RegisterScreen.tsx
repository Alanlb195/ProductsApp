import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { Alert, ScrollView, useWindowDimensions } from 'react-native'
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useAuthStore } from '../../store/auth.use.store';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'> { }

export const RegisterScreen = ({ navigation }: Props) => {
  const { top } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  const { register } = useAuthStore();
  const [isPosting, setIsPosting] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    fullName: '',
  })

  const authRegister = async () => {

    if (form.email.length === 0 || form.password.length === 0, form.fullName.length === 0) {
      return;
    }

    setIsPosting(true);
    const wasSuccessful = await register(form.email, form.password, form.fullName);
    if (wasSuccessful) {
      Alert.alert('Success', 'User created.');
      if (wasSuccessful) return;
    }
    setIsPosting(false);

    Alert.alert('Error', 'User cannot be created.');
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

        <Layout style={{ alignItems: 'center' }}>
          <Text category='h1'>Create account</Text>
          <Text category='p2'>Please, create an account to continue</Text>
        </Layout>

        {/* Inputs */}

        <Layout style={{ marginTop: 20 }}>

          <Input
            placeholder="Full name"
            autoCapitalize='none'
            style={{ marginBottom: 10 }}
            accessoryLeft={<MyIcon name='person-outline' white />}
            onChangeText={fullName => setForm({ ...form, fullName })}
            value={form.fullName}
          />

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
            onChangeText={password => setForm({ ...form, password })}
            value={form.password}

            style={{ marginBottom: 10 }}
          />

          <Layout style={{ height: 20 }} />

          <Layout>
            <Button
              accessoryRight={<MyIcon name='arrow-forward-outline' white />}
              onPress={authRegister}
              disabled={isPosting}
            >
              Create
            </Button>
          </Layout>

          {/* information to create account */}
          <Layout style={{ height: 50 }} />

          <Layout style={{
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Text>Do you have an account?</Text>
            <Text
              status='primary'
              category='s1'
              onPress={() => navigation.goBack()}
            >
              {' '}
              Login page{' '}
            </Text>
          </Layout>

        </Layout>

      </ScrollView>

    </Layout>
  )
}
