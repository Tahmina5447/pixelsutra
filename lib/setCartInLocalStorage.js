import { reactLocalStorage } from "reactjs-localstorage";

const setCartInLocalStorage = (product, filterItem) => {
  const items = {
    price: product?.variantType ? filterItem?.productPrice : product.productPrice,
    salePrice: product?.variantType ? filterItem?.salePrice : product?.salePrice,
    originalPrice: product?.variantType ? filterItem?.price : product?.price,
    discount: 0,
    _id: product?._id,
    path: product?.path,
    createdAt: new Date().toString(),
    image: product.imageURLs[0],
    parent_category: product?.parent_category,
    first_child_category: product?.first_child_category,
    second_child_category: product?.second_child_category,
    quantity: 1,
    productTitle: product?.name,
    delivery: product?.delivery,
    sku: "",
    weight: product?.weight,
    userSize: filterItem,
    userSelectSize: product?.variant[0]?.size3,
    size: product.size,
    variant: product?.variant,
    offer_discount: product?.offer_discount,
    offer_quantity: product?.offer_quantity,
    type: product?.type,
    size: product?.variantType ? filterItem.size : "",
    color: product?.variantType ? filterItem.color : "",
    set: product?.variantType ? filterItem.set : "",
    design: product?.variantType ? filterItem.design : "",
    other: product?.variantType ? filterItem.other : "",
    variantType: product?.variantType,
    attributes: product?.attributes,
    itemTotal: product?.variantType ? filterItem?.salePrice : product?.salePrice,
  };

  const cartProduct = {
    items: [],
    isEmpty: false,
    totalItems: 1,
    totalUniqueItems: 1,
    offerTotal: 0,
    cartTotal: product?.salePrice,
    _id: "",
  };

  const getCart = reactLocalStorage.getObject("shopping-cart", true);
  const cart = JSON.parse(getCart);

  if (cart.totalItems) {
    const isAvailableProduct = cart.items.find((it) => it._id === product._id);

    if (isAvailableProduct) {
      // If the product exists, remove it from the cart
      cart.items = cart.items.filter((it) => it._id !== product._id);
      cart.totalItems--;
      cart.totalUniqueItems--;
      cart.cartTotal = cart.cartTotal - isAvailableProduct.salePrice;

      // Update the cart in localStorage
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
    } else {
      // If the product doesn't exist, add it to the cart
      cart.items.push(items);
      cart.totalItems++;
      cart.totalUniqueItems++;
      cart.cartTotal = cart.cartTotal + product.salePrice;

      // Update the cart in localStorage
      reactLocalStorage.setObject("shopping-cart", JSON.stringify(cart));
    }
  } else {
    // If the cart is empty, add the first product
    cartProduct.items.push(items);
    reactLocalStorage.setObject("shopping-cart", JSON.stringify(cartProduct));
  }
};

export default setCartInLocalStorage;
