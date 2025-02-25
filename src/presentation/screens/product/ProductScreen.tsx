import { useRef } from 'react';
import { Alert, ScrollView } from 'react-native';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { ButtonGroup, Button, Input, Layout, useTheme, Text } from '@ui-kitten/components';
import { Formik } from 'formik';

import { MainLayout } from '../../layout/MainLayout'
import { Product } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';
import { ProductImages } from '../../components/products/ProductImages';
import { getProductById, updateCreateProduct } from '../../../actions/product';
import { genders, sizes } from '../../../config/constants/variables';
import { CameraAdapter } from '../../../config/adapters/camera-adapter';


interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> { }

export const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId);
  const theme = useTheme();
  const queryClient = useQueryClient();

  // useQuery - Product Data
  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    queryFn: () => getProductById(productIdRef.current)
  });

  // useMutation - Update/Create Product
  const mutation = useMutation({
    mutationFn: (data: Product) => updateCreateProduct({ ...data, id: productIdRef.current }),
    onSuccess(data: Product) {
      productIdRef.current = data.id
      queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
      queryClient.invalidateQueries({ queryKey: ['product', data.id] });
      Alert.alert('Ok', 'product successfully updated.')
    },
    onError(error) {
      console.error('Mutation error', error);
      Alert.alert('Error', 'There was an error updating the product.');
    }
  })

  if (!product) {
    return (<MainLayout title='Loading...' />)
  }

  return (

    <Formik
      initialValues={product}
      onSubmit={values => mutation.mutate(values)}
    >
      {
        ({ handleChange, handleSubmit, values, setFieldValue }) => (
          <MainLayout
            title='Products'
            subTitle={`Price: ${values.price} `}
            rightAction={ async() => {
              const photos = await CameraAdapter.getPicturesFromLibrary();
              setFieldValue('images', [...values.images, ...photos])
            } }
            rightActionIcon='camera-outline'
          >

            <ScrollView>

              {/* Image of the product */}
              <ProductImages images={values.images} />

              {/* Title of the product, slug and description */}
              <Layout style={{ marginHorizontal: 10 }}>
                <Input
                  label="Title"
                  style={{ marginVertical: 5 }}
                  value={values.title}
                  onChangeText={handleChange('title')}
                />
                <Input
                  label="Slug"
                  style={{ marginVertical: 5 }}
                  value={values.slug}
                  onChangeText={handleChange('slug')}
                />
                <Input
                  label="Description"
                  multiline
                  numberOfLines={5}
                  style={{ marginVertical: 5 }}
                  value={values.description}
                  onChangeText={handleChange('description')}
                />
              </Layout>

              {/* Price and stock */}
              <Layout style={{ marginVertical: 5, marginHorizontal: 15, flexDirection: 'row', gap: 10 }} >
                <Input
                  label="Price"
                  style={{ flex: 1 }}
                  value={values.price.toString()}
                  onChangeText={handleChange('price')}
                  keyboardType='numeric'
                />

                <Input
                  label="Stock"
                  style={{ flex: 1 }}
                  value={values.stock.toString()}
                  onChangeText={handleChange('stock')}
                  keyboardType='numeric'
                />
              </Layout>


              {/* Sizes */}
              <ButtonGroup
                style={{ margin: 2, marginTop: 20, marginHorizontal: 10 }}
                size='small'
                appearance='outline'>
                {
                  sizes.map(size => (
                    <Button
                      onPress={() => setFieldValue(
                        'sizes',
                        values.sizes.includes(size)
                          ? values.sizes.filter(s => s !== size)
                          : [...values.sizes, size]
                      )}
                      key={size}
                      style={{
                        flex: 1,
                        backgroundColor: values.sizes.includes(size)
                          ? theme['color-primary-200']
                          : undefined
                      }}
                    >{size}</Button>
                  ))
                }
              </ButtonGroup>

              {/* Genres */}
              <ButtonGroup
                style={{ margin: 2, marginTop: 20, marginHorizontal: 10 }}
                size='small'
                appearance='outline'>
                {
                  genders.map(gender => (
                    <Button
                      onPress={() => setFieldValue('gender', gender)}
                      key={gender}
                      style={{
                        flex: 1,
                        backgroundColor: values.gender.startsWith(gender)
                          ? theme['color-primary-200']
                          : undefined
                      }}
                    >{gender}</Button>
                  ))
                }
              </ButtonGroup>

              {/* Save button */}
              <Button
                accessoryLeft={<MyIcon name='save-outline' white />}
                onPress={() => handleSubmit()}
                disabled={mutation.isPending}
                style={{ margin: 15 }}
              >
                Save
              </Button>

              <Text>
                {JSON.stringify(values, null, 2)}
              </Text>

              <Layout style={{ height: 100 }} />

            </ScrollView>

          </MainLayout>
        )
      }

    </Formik>


  )
}
