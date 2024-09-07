export function getTotalItemWeightCharge(cartItems) {
  const weight = cartItems?.reduce(
    (total, item) => total + Math.ceil(item.weight) / 1000,
    0
  );
  let charge = 0;
  if (weight >= 1) {
    charge=parseInt(weight)*20
  }
  return charge;
}

export function getTotalItemWeight(cartItems) {
  return cartItems?.reduce(
    (total, item) => total + Math.ceil(item.weight) / 1000,
    0
  );
}
