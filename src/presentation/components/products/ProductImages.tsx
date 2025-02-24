import { Layout } from '@ui-kitten/components'
import { FlatList, Image } from 'react-native'
import { FadeInImage } from '../ui/FadeInImage'

interface Props {
    images: string[]
}

export const ProductImages = ({ images }: Props) => {
    return (
        <Layout>
            {
                images.length > 0
                    ?
                    (
                        <FlatList
                            data={images}
                            keyExtractor={(item) => item}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <FadeInImage
                                    uri={item}
                                    style={{ width: 300, height: 300, marginHorizontal: 7 }}
                                />
                            )}
                        >
                        </FlatList>

                    )
                    :
                    <Image
                        source={require('../../../assets/no-product-image.png')}
                        style={{
                            width: 300,
                            height: 300,
                            alignSelf: 'center'
                        }}
                    />
            }
        </Layout>

    )
}
