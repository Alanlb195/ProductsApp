import { tesloApi } from "../../config/api/tesloApi"
import { Gender, Product } from "../../domain/entities/product";
import { TesloProduct } from "../../infrastructure/interfaces/teslo.product.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

const emptyProduct: Product = {
    id: '',
    title: 'New product',
    description: '',
    price: 0,
    images: [],
    slug: '',
    gender: Gender.Unisex,
    sizes: [],
    stock: 0,
    tags: []
}


export const getProductById = async (productId: string): Promise<Product> => {

    try {

        if (productId === 'new') return emptyProduct;

        const { data } = await tesloApi.get<TesloProduct>(`/products/${productId}`);

        return ProductMapper.tesloProductToEntity(data);

    }

    catch (error) {
        console.log({ error })
        throw new Error(`Error trying to get product by id. Error: ${error}`)
    }


}