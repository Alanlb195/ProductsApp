import { useNavigation } from '@react-navigation/native';
import { Divider, Layout, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MyIcon } from '../components/ui/MyIcon';


interface Props {
    title: string;
    subTitle: string;

    rightAction?: () => void;
    rightActionIcon?: string;

    children: React.ReactNode;
}

export const MainLayout = ({ children, rightAction, subTitle, title, rightActionIcon }: Props) => {

    const { top } = useSafeAreaInsets();
    const { canGoBack, goBack } = useNavigation();

    const renderBackAction = (): React.ReactElement => (
        <TopNavigationAction
            icon={<MyIcon name='arrow-back-outline' />}
            onPress={goBack}
        />
    )

    const renderRightAction = () => {
        return (
            <TopNavigationAction
                onPress={rightAction}
            />
        )
    }

    return (
        <Layout style={{ paddingTop: top }}>

            <TopNavigation
                title={title}
                subtitle={subTitle}
                alignment='center'
                accessoryLeft={canGoBack() ? renderBackAction : undefined}
            />
            <Divider />

            <Layout style={{ height: '100%' }}>
                {children}
            </Layout>

        </Layout>
    )
}
