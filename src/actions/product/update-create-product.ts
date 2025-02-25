import { isAxiosError } from "axios";
import { tesloApi } from "../../config/api/tesloApi";
import { Product } from "../../domain/entities/product";


export const updateCreateProduct = (product: Partial<Product>) => {

    product.stock = isNaN(Number(product.stock)) ? 0 : Number(product.stock);
    product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);


    if (product.id && product.id !== 'new') {
        return updateProduct(product);
    }

    return createProduct(product);


}

const prepareImages = async(images: string[]) => {

    // todo: check the files

    const fileImages = images.filter(image => image.includes('file://'));
    const currentImages = images.filter(image => !image.includes('file://'));

    if (fileImages.length > 0) {
        const uploadPromises = fileImages.map( uploadImage );
        const uploadedImages = await Promise.all (uploadPromises);
        currentImages.push(...uploadedImages);
    }

    return currentImages.map(
        image => image.split('/').pop()
    )
}

const uploadImage = async (image: string) => {
    const formData = new FormData();
    formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: image.split('/').pop()
    });

    const { data } = await tesloApi.post('/files/product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return data.image;
}

// todo: check if user comes
const updateProduct = async (product: Partial<Product>) => {

    // console.log(product);
    const { id, images = [], ...rest } = product


    try {
        const checkImages = await prepareImages(images);
        // console.log({ checkImages });


        const { data } = await tesloApi.patch(`/products/${id}`, {
            images: checkImages,
            ...rest
        })

        return data;
    }

    catch (error) {


        if (isAxiosError(error)) {
            console.log(error.response?.data);
        }

        throw new Error('Error updating the product')
    }

}


const createProduct = async (product: Partial<Product>): Promise<Product> => {
    // console.log(product);
    const { id, images = [], ...rest } = product


    try {
        const checkImages = await prepareImages(images);
        // console.log({ checkImages });


        const { data } = await tesloApi.post(`/products/`, {
            images: checkImages,
            ...rest
        })

        return data;
    }

    catch (error) {


        if (isAxiosError(error)) {
            console.log(error.response?.data);
        }

        throw new Error('Error updating the product')
    }
}