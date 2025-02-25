import { tesloApi } from "../../config/api/tesloApi";
import type { Product } from "../../domain/entities/product";
import type { TesloProduct } from "../../infrastructure/interfaces/teslo.product.response";
import { ProductMapper } from "../../infrastructure/mappers/product.mapper";

export const getProductsByPage = async (page: number, limit: number = 20): Promise<Product[]> => {

    try {

        const { data } = await tesloApi.get<TesloProduct[]>(`/products?limit=${limit}&offset=${page * 10}`);

        const products = data.map(ProductMapper.tesloProductToEntity);

        const sortedProducts = products.sort((a, b) => a.title.localeCompare(b.title));

        return sortedProducts;

    }
    catch (error) {
        console.log({ error });
        throw new Error(`Error getting products by page: ${error}`)
    }
}