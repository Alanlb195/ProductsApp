import { Icon, IconElement, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components'
import { useAuthStore } from '../../store/auth.use.store'
import { getProductsByPage } from '../../../actions/product/get-products-by-page';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { MainLayout } from '../../layout/MainLayout';

export const HomeScreen = () => {

  const { logOut } = useAuthStore();

  // getProductsByPage(0);

  const { isLoading, data: products } = useQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProductsByPage(0),
  })

  return (


    <MainLayout
      title='TesloShop - Products'
      subTitle='Administrated application'
    >
      <Text>Hello world</Text>
    </MainLayout>

  )
}
