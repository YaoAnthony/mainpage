import { Product } from "../Types/Product"

interface ProductWithQuantity {
    product: Product;
    quantity: number;
}

export const http = (url: string) => {
    console.log('http request to ' + url)
    return new Promise((resolve) => {
      const timeout = Math.random() * 5000
        setTimeout(() => {
            resolve(undefined)
        }, timeout)
    })
}

export const validProduct = async (prodIds: string[]) => {
    console.log('validating product', prodIds)
    return http('/checkout/checkProductStatus')
}

export const validShippingMethod = async () => {
    return http('/checkout/checkShippingMethod')
}


export function findProductsAndQuantities(cart: { productid: string; quantity: number }[]): ProductWithQuantity[] {
    if (cart.length === 0) {
        console.log('cart is empty' )
        return [];
    }
    return [];
    // return cart.map(item => {
    //     const product = getProductById(item.productid);
    //     return product ? { product, quantity: item.quantity } : [];
    // }).filter((item): item is ProductWithQuantity => item !== null);
}
