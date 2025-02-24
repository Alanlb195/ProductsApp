import { useAuthStore } from '../../store/auth.use.store'
import { getProductsByPage } from '../../../actions/product/get-products-by-page';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layout/MainLayout';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';
import { Button, Layout, useTheme } from '@ui-kitten/components';
import { FAB } from '../../components/ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const HomeScreen = () => {

  const { logOut } = useAuthStore();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60,
  //   queryFn: () => getProductsByPage(0),
  // });


  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,

    queryFn: async (params) => {
      // console.log(params);
      const products = await getProductsByPage(params.pageParam);
      return products;
    },
    getNextPageParam: (lastPage, allPages) => allPages.length,
  });

  return (
    <>
      <MainLayout
        title='TesloShop - Products'
        subTitle='Administrated application'
      // rightAction={ () => {} }
      // rightActionIcon='plus-outline'
      >

        <Layout>
          <Button
            onPress={logOut}
            style={{ marginVertical: 5 }}
            appearance='outline'
          >
            Logout
          </Button>
        </Layout>

        {
          isLoading
            ? (<FullScreenLoader />)
            : (
              <>
                <ProductList products={data?.pages.flat() ?? []}
                  fetchNextPage={fetchNextPage}
                />
              </>
            )
        }
      </MainLayout>
      <FAB
        style={{
          position: 'absolute',
          bottom: 30,
          right: 20
        }}
        iconName='plus-outline'
        onPress={ () => navigation.navigate('ProductScreen', { productId: 'new' }) }
      />
    </>

  )
}
