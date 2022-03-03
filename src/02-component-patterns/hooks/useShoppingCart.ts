import { useState } from "react";
import { Product, ProductInCart } from "../interfaces/interfaces";


export const useShoppingCart = () => {
  const [shoppingCart, setShoppingCart] = useState<{ [key: string]: ProductInCart }>({});

  const onProductCountChange = ({ count, product }: { count: number; product: Product }) => {
    setShoppingCart((oldShoppingCart) => {
      const productInCard: ProductInCart = oldShoppingCart[product.id] || {
        ...product,
        count: 0,
      };

      //Añadir producto
      if (Math.max(productInCard.count + count, 0) > 0) {
        productInCard.count += count;
        return {
          ...oldShoppingCart,
          [product.id]: productInCard,
        };
      }

      //Borrar el producto
      const { [product.id]: toDelete, ...rest } = oldShoppingCart;
      return rest;

      // if(count === 0){
      //     const { [product.id]: toDelete, ...rest } = oldShoppingCart;
      //     return rest;
      // }
      // return {
      //     ...oldShoppingCart,
      //     [ product.id ]: { ...product, count }
      // }
    });
  };

  return  {
    onProductCountChange,
    shoppingCart
  }
};
