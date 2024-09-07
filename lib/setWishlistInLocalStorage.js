import { reactLocalStorage } from "reactjs-localstorage";

const setWishlistInLocalStorage = (product) => {
  const items = {
    price: product?.productPrice,
    salePrice: product?.salePrice,
    discount: 0,
    _id: product?._id,
    path: product?.path,
    createdAt: new Date().toString(),
    image: product.imageURLs[0],
    originalPrice: product?.price,
    category: product?.category,
    quantity: 1,
    productTitle: product?.name,
    sku: "",
    itemTotal: product?.salePrice,
    size: product.size,
    productColor: product?.productColor,
  };

  const cartProduct = {
    items: [],
    isEmpty: false,
    totalItems: 1,
    totalUniqueItems: 1,
    cartTotal: product?.salePrice,
    _id: "",
  };

  const getCart = reactLocalStorage.getObject("wishlist", true);
  const cart = JSON.parse(getCart);

  if (cart?.totalItems) {
    const productIndex = cart.items.findIndex((it) => it._id === product._id);
    
    if (productIndex > -1) {
      // Product exists, so remove it from the wishlist
      cart.cartTotal -= cart.items[productIndex].salePrice;
      cart.items.splice(productIndex, 1);
      cart.totalItems--;
      cart.totalUniqueItems--;
      
      if (cart.totalItems === 0) {
        // If no items remain, set cart as empty
        reactLocalStorage.setObject("wishlist", JSON.stringify(cartProduct));
      } else {
        reactLocalStorage.setObject("wishlist", JSON.stringify(cart));
      }
      return false; // Removed from the wishlist
    } else {
      // Product doesn't exist, so add it to the wishlist
      cart.items.push(items);
      cart.totalItems++;
      cart.totalUniqueItems++;
      cart.cartTotal += product.salePrice;
      reactLocalStorage.setObject("wishlist", JSON.stringify(cart));
      return true; // Added to the wishlist
    }
  } else {
    // If product not available in local storage, add it
    cartProduct.items.push(items);
    reactLocalStorage.setObject("wishlist", JSON.stringify(cartProduct));
    return true; // Added to the wishlist
  }
};

export default setWishlistInLocalStorage;
